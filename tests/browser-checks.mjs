import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../package.json', import.meta.url));
const { chromium } = require('@playwright/test');
const { default: AxeBuilder } = require('@axe-core/playwright');
mkdirSync(new URL('../test-results/', import.meta.url), { recursive: true });
const browser = await chromium.launch({ ...(process.env.BROWSER_PATH ? { executablePath: process.env.BROWSER_PATH } : { channel: 'chrome' }), headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const results = { layouts: [], accessibility: [], links: [], interactions: [], errors };
const origin = process.env.TEST_BASE_URL || 'http://localhost:3000';
const paths = ['/', '/services/', '/work/', '/kaminari-flow/', '/contact/'];
try {
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of paths) {
      const response = await page.goto(origin + path);
      await page.locator('h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth, h1: document.querySelector('h1').innerText, title: document.title }));
      results.layouts.push({ width, path, status: response.status(), ...layout, pass: layout.scroll <= width });
      if (width === 1440) {
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
        results.accessibility.push({path, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))});
        await page.screenshot({ path: fileURLToPath(new URL(`../test-results/${path === '/' ? 'home' : path.split('/')[1]}-desktop.png`, import.meta.url)), fullPage: true });
      }
      if (width === 360 && (path === '/' || path === '/contact/')) await page.screenshot({path: fileURLToPath(new URL(`../test-results/${path === '/' ? 'home' : 'contact'}-mobile.png`,import.meta.url)),fullPage:true});
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const path of paths) {
    await page.goto(origin + path);
    const links = await page.locator('a:visible').evaluateAll(elements => elements.map((e, i) => ({ i, href: e.getAttribute('href'), text: e.textContent.trim() })));
    for (const link of links) {
      await page.goto(origin + path);
      const item = page.locator('a:visible').nth(link.i);
      if (link.href === '#main') { await item.focus(); await page.keyboard.press('Enter'); }
      else await item.click();
      await page.waitForTimeout(80);
      const target = new URL(link.href, origin + path);
      const current = new URL(page.url());
      const pass = current.pathname.replace(/\/$/,'') === target.pathname.replace(/\/$/,'') && (!target.hash || await page.locator(target.hash).count() > 0);
      results.links.push({ from: path, text: link.text, href: link.href, pass });
    }
  }
  await page.setViewportSize({width:360,height:800});
  await page.goto(origin);
  const menu = page.getByRole('button',{name:'Menu'});
  await menu.click();
  results.interactions.push({name:'Mobile menu opens',pass:await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible()});
  await page.keyboard.press('Escape');
  results.interactions.push({name:'Escape closes menu and returns focus',pass:await menu.getAttribute('aria-expanded') === 'false' && await menu.evaluate(e=>e===document.activeElement)});
  await menu.click();
  await page.getByRole('button',{name:'Close'}).click();
  results.interactions.push({name:'Close button closes menu',pass:await menu.getAttribute('aria-expanded') === 'false'});
  await menu.click();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Services'}).click();
  await page.waitForURL('**/services/');
  results.interactions.push({name:'Mobile navigation navigates and closes',pass:page.url().includes('/services') && await menu.getAttribute('aria-expanded') === 'false'});
  await page.goto(origin + '/contact/?service=ai-automation');
  results.interactions.push({name:'Service query preselects interest',pass:await page.locator('#service').inputValue() === 'ai-automation'});
  await page.getByRole('button',{name:'Prepare Project Brief'}).click();
  results.interactions.push({name:'Empty form shows accessible errors and focuses name',pass:await page.locator('.field-error').count() === 4 && await page.locator('#name').evaluate(e=>e===document.activeElement)});
  await page.locator('#name').fill('QA test');
  await page.locator('#email').fill('invalid');
  await page.locator('#company').fill('QA company');
  await page.locator('#description').fill('Testing project inquiry validation and local brief download.');
  await page.getByRole('button',{name:'Prepare Project Brief'}).click();
  results.interactions.push({name:'Invalid email rejected',pass:await page.locator('#email-error').isVisible()});
  await page.locator('#email').fill('qa@example.com');
  await page.getByRole('button',{name:'Prepare Project Brief'}).click();
  results.interactions.push({name:'Development mode never claims submission',pass:await page.getByRole('status').innerText().then(t=>t.includes('Nothing has been sent'))});
  const downloadWait = page.waitForEvent('download');
  await page.getByRole('button',{name:'Download Brief'}).click();
  const download = await downloadWait;
  results.interactions.push({name:'Brief download works',pass:download.suggestedFilename()==='kaminari-project-brief.txt'});
  await page.goto(origin + '/not-a-page');
  results.interactions.push({name:'Custom 404 renders',pass:await page.getByRole('heading',{name:/NO STRIKE HERE/}).isVisible()});
  await page.getByRole('link',{name:'Back to the Studio'}).click();
  await page.waitForURL(origin + '/');
  results.interactions.push({name:'404 return link works',pass:new URL(page.url()).pathname==='/'});
} catch (error) { results.failure = error.stack; }
await browser.close();
writeFileSync(new URL('../test-results/browser-results.json',import.meta.url),JSON.stringify(results,null,2));
if (results.failure || errors.length || results.layouts.some(x=>!x.pass) || results.accessibility.some(x=>x.violations.length) || results.links.some(x=>!x.pass) || results.interactions.some(x=>!x.pass)) process.exitCode = 1;
console.log(JSON.stringify({layouts:results.layouts.length,overflow:results.layouts.filter(x=>!x.pass),a11y:results.accessibility,linkCount:results.links.length,failedLinks:results.links.filter(x=>!x.pass),interactions:results.interactions,errors,failure:results.failure},null,2));
