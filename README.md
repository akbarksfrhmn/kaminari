# Kaminari Creative Studio

A five-page Next.js App Router website with TypeScript, Tailwind CSS, locally bundled Space Grotesk and Inter, and Lucide icons.

## Run locally

Use Node.js 20.9 or newer and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env.local`. Open the local URL printed by Next.js.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The build exports all pages to `out/`. `npm start` serves that production output on port 3000. The project uses static export because these pages do not require a database or authentication. Deploy `out/` to a static host with directory-index support. Map missing paths to `404.html`.

If the machine's npm shim is broken, run the actual npm CLI with Node. On the original development machine that is `node "D:\nodejs\node_modules\npm\bin\npm-cli.js"`. This is an environment workaround, not an application dependency.

## Pages and features

- `/`: editorial hero with SVG strike, service index, selected work, product workflow, four-step process, project CTA.
- `/services/`: four services with the business problem, approach, deliverables, audience, and preselected inquiry links.
- `/work/`: data-driven project listing with Kaminari Flow as an internal product in development.
- `/kaminari-flow/`: product context, accessible workflow diagram, core development scope, and explicitly future integrations.
- `/contact/`: accessible inquiry form with field validation, status feedback, and downloadable project brief.
- Shared responsive navigation with current-page indication, Escape dismissal, and visible keyboard focus.
- Reduced-motion support; content remains present without animation or JavaScript.
- Unique metadata, Open Graph fields, configurable canonical URLs, sitemap, robots, favicon, loading, error, and not-found UI.
- No fabricated clients, testimonials, contact addresses, metrics, or completed projects.

## Content and styling

Edit `src/lib/content.ts` to add services or projects. The project type supports an optional detail link; projects without a link render as articles. Add a cover variant to `ProjectCard` when a future project needs a different cover. The current cover is explicitly labeled a concept visual.

Shared UI lives in `src/components/`; page composition lives in `src/app/`. Tokens, responsive breakpoints, layout, and interaction styles are in `src/app/globals.css`. The rationale for visual choices is in `DESIGN.md`.

## Contact delivery

No backend or recipient was supplied. Without `NEXT_PUBLIC_CONTACT_ENDPOINT`, the form runs in clearly labeled development mode. It validates the brief, explains that nothing was sent, and offers a local text-file download. Input is kept only in React memory; it is not written to localStorage or sent to an AI service.

To enable actual submissions, configure a **public HTTPS endpoint** in `NEXT_PUBLIC_CONTACT_ENDPOINT` and rebuild. This variable is deliberately public; never put an API key or secret in it. An endpoint may be a relative same-origin path when the host provides an appropriate server route. This static Next.js export does not provide that server route.

The endpoint must accept a JSON POST containing `name`, `email`, `company`, `service`, `budget`, `description`, `website` (honeypot), and `elapsedMs`. After durable acceptance or confirmed delivery, return a 2xx response with `{ "success": true }`. Any other response, malformed JSON, network failure, or 15-second timeout shows an error and preserves the entered details. Only that explicit response produces the success state. A success response must not mean merely that the request was received and discarded.

Before enabling delivery:

- Validate and limit every field server-side, including service enum and body size.
- Implement durable rate limiting, origin/CORS restrictions, spam filtering, and honeypot handling. Client-side checks are not a security boundary.
- Keep recipient addresses and provider credentials on the server. Escape submitted text before inserting it in emails or HTML.
- Define retention and privacy terms, and add the appropriate privacy notice for the chosen provider and business.
- Test actual delivery and duplicate handling. Client-side mocked response tests do not verify a provider.

WhatsApp, booking, CRM synchronization, analytics, and the Flow AI backend are outside this marketing website and remain unimplemented. No production readiness of Kaminari Flow itself is implied.

## Site URL and SEO

Set `NEXT_PUBLIC_SITE_URL` to the confirmed deployment origin before building. Canonicals, Open Graph URLs, sitemap, and robots derive from it. With no URL, the site omits canonicals, exports an empty sitemap, and asks crawlers not to index it. Preview access is controlled separately by the host.

For the private Sites build, the assigned origin is `https://kaminari-creative-studio.keenclock7.chatgpt.site`. It is hosting configuration, not a claimed custom domain.

Hosting status at handoff: the private Site was registered, but publication did not complete. Automatic approval review blocked the source-workflow stdin operation because its required approval category is disabled. The local source and production export are complete; the assigned URL must not be treated as a live deployment.

## Validation

See `VALIDATION.md` for executed checks and remaining limits. Dependencies are locked in `package-lock.json`; use `npm ci` for repeatable installs.

With the production preview running on port 3000, run `npm run test:e2e`. It uses installed Google Chrome; set `BROWSER_PATH` to another Chromium executable if needed. `TEST_BASE_URL` can override the preview origin. Results and screenshots go into ignored `test-results/`.

For the intercepted delivery-state check, start a separate development server on port 3001 with `NEXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:3001/api/inquiry`, then run `npm run test:delivery`. That test intercepts every inquiry request in the browser; it sends no real inquiry. Keep this test endpoint out of production configuration.
