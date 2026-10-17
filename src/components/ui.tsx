import Link from "next/link";
import { ArrowDown, ArrowUpRight, CircuitBoard, Code2, Route, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import { navigation, type Project, services } from "@/lib/content";

export function Button({ href, children, variant = "primary", arrow = false }: { href: string; children: ReactNode; variant?: "primary" | "secondary"; arrow?: boolean }) {
  return <Link href={href} className={`button button-${variant}`}>{children}{arrow && <ArrowUpRight size={18} aria-hidden="true"/>}</Link>;
}

export function SectionHeading({ number, label, children }: { number: string; label: string; children?: ReactNode }) {
  return <div className="section-heading"><p className="eyebrow"><span>{number}</span>{label}</p>{children && <h2>{children}</h2>}</div>;
}

export function StrikeVisual({ compact = false }: { compact?: boolean }) {
  return <svg className={compact ? "strike-visual compact" : "strike-visual"} viewBox="0 0 600 600" fill="none" aria-hidden="true">
    {Array.from({length: 19}, (_, i) => <path key={i} d={`M ${375 + i * 5} ${32 + i * 2} L ${170 + i * 6} ${294 + i * 2} L ${324 + i * 5} ${270 + i * 2} L ${154 + i * 6} ${565 - i * 1.5}`} stroke={i < 4 ? "#79E7FF" : "#5B6CFF"} strokeOpacity={0.9 - i * .027} strokeWidth={i === 0 ? 2 : 1.2}/>)}
  </svg>;
}

const serviceIcons = [Workflow, Code2, CircuitBoard, Route];

export function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const Icon = serviceIcons[index];
  return <Link className="service-row" href={`/services/#${service.slug}`}>
    <span className="service-number">{service.number}</span>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <Icon className="service-icon" size={26} strokeWidth={1.4} aria-hidden="true"/>
    <ArrowUpRight className="service-arrow" size={24} aria-hidden="true"/>
  </Link>;
}

export function FlowCover() {
  return <div className="flow-cover" aria-hidden="true">
    <div className="cover-top"><span>KAMINARI / PRODUCT LAB</span><span>01</span></div>
    <div className="flow-cover-center"><div className="flow-symbol"><span/><span/><span/></div><span className="flow-cover-title">kaminari<span>flow</span></span></div>
    <div className="cover-bottom"><span>KNOWLEDGE, CONNECTED.</span><span>CONCEPT VISUAL</span></div>
  </div>;
}

export function ProjectCard({ project }: { project: Project }) {
  const content = <><FlowCover/><div className="project-details"><div><div className="project-label"><span>{project.ownership}</span><span className="status-label">{project.status}</span></div><h3>{project.name}{project.href && <ArrowUpRight size={28} aria-hidden="true"/>}</h3><p className="project-category">{project.category}</p></div><div className="project-description"><p>{project.description}</p><ul className="tags" aria-label="Technology stack">{project.technologies.map(tag => <li key={tag}>{tag}</li>)}</ul></div></div></>;
  return project.href ? <Link href={project.href} className="project-card" aria-label={`View ${project.name}, ${project.status}`}>{content}</Link> : <article className="project-card">{content}</article>;
}

export function KaminariFlowDiagram({ compact = false }: { compact?: boolean }) {
  const steps = [
    ["Customer message", "A question comes in."],
    ["Knowledge retrieval", "Find relevant business information."],
    ["AI response", "Use that context to draft an answer."],
    ["Conversation storage", "Keep the exchange for continuity."],
  ];
  return <figure className={`flow-diagram ${compact ? "diagram-compact" : ""}`}><figcaption className="eyebrow">Designed workflow <span>IN DEVELOPMENT</span></figcaption><ol>{steps.map(([title, text], i) => <li key={title}><div className="diagram-step"><span className="diagram-number">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></div>{i < steps.length - 1 && <ArrowDown className="diagram-arrow" size={18} aria-hidden="true"/>}</li>)}</ol></figure>;
}

export function ClosingCTA() {
  return <section className="closing-cta container"><p className="eyebrow">HAVE AN IDEA WORTH BUILDING?</p><div className="closing-row"><h2>LET’S MAKE<br/>IT STRIKE<span>.</span></h2><div><p>Tell us what you’re trying to build, improve, or automate. We’ll help you explore the right solution.</p><Button href="/contact/" arrow>Start a Project</Button></div></div></section>;
}

export function SiteFooter() {
  return <footer className="site-footer container"><div className="footer-main"><Link href="/" className="footer-brand">KAMINARI<span>.</span></Link><p>Independent minds.<br/>Connected disciplines.</p><nav aria-label="Footer navigation">{navigation.filter(item => item.href !== "/").map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Kaminari Creative Studio</span><span>DESIGN + CODE + INTELLIGENCE</span></div></footer>;
}
