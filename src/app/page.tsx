import { ArrowDown } from "lucide-react";
import { Button, ClosingCTA, KaminariFlowDiagram, ProjectCard, SectionHeading, ServiceCard, StrikeVisual } from "@/components/ui";
import { process, projects, services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Make Ideas Strike.", "Independent creative technology studio. We turn ambitious ideas into digital experiences, intelligent systems, and practical business solutions.", "/");

export default function Home() {
  return <>
    <section className="hero container">
      <div className="hero-topline"><p className="eyebrow">KAMINARI CREATIVE STUDIO</p><span className="hero-discipline">DESIGN / DEVELOPMENT / AI</span></div>
      <div className="hero-composition"><h1>MAKE IDEAS<br/><span>STRIKE.</span></h1><div className="hero-art"><StrikeVisual/></div></div>
      <div className="hero-bottom"><div className="hero-copy"><p>We turn ambitious ideas into digital experiences, intelligent systems, and creative solutions that move businesses forward.</p><div className="hero-actions"><Button href="/work/" arrow>Explore Our Work</Button><Button href="/contact/" variant="secondary">Let’s Build Something</Button></div></div><div className="hero-aside"><p>From digital products to AI-powered automation, we help businesses build what comes next.</p><a href="#services" className="scroll-link">Meet the studio <ArrowDown size={18} aria-hidden="true"/></a></div></div>
      <div className="hero-baseline"><span>IDEAS INTO IMPACT.</span><span>INDEPENDENT BY DESIGN.</span></div>
    </section>
    <section id="services" className="services-section container" data-reveal>
      <div className="section-intro"><SectionHeading number="01" label="WHAT WE DO">WE BUILD WHAT<br/>MOVES YOU FORWARD.</SectionHeading><p>Design, development, and AI.<br/>The right disciplines, working together.</p></div>
      <div className="service-list">{services.map((service, index) => <ServiceCard service={service} index={index} key={service.slug}/>)}</div>
    </section>
    <section className="work-section container" data-reveal><div className="section-intro"><SectionHeading number="02" label="SELECTED WORK">SELECTED WORK.<br/><span className="muted-heading">REAL INTENT.</span></SectionHeading><Button href="/work/" variant="secondary">View Our Work</Button></div><ProjectCard project={projects[0]}/></section>
    <section className="flow-section" data-reveal><div className="container flow-grid"><div><p className="eyebrow"><span>03</span>BUILT IN THE STUDIO</p><h2>YOUR BUSINESS.<br/>MORE<br/><span className="muted-heading">INTELLIGENT.</span></h2><p className="flow-intro">Meet Kaminari Flow, an AI-powered customer support system designed to help businesses respond to inquiries and retrieve relevant business knowledge.</p><p className="development-note">Internal product · In development</p><ul className="feature-list"><li>AI-powered responses</li><li>Business knowledge retrieval</li><li>Conversation persistence</li><li>Foundation for future workflow automation</li></ul><p className="small-note">Development scope, not a list of released features.</p><Button href="/kaminari-flow/" variant="secondary">Explore Kaminari Flow</Button></div><KaminariFlowDiagram compact/></div></section>
    <section className="process-section container" data-reveal><SectionHeading number="04" label="HOW WE WORK">FROM FIRST THOUGHT<br/>TO FINAL BUILD.</SectionHeading><ol className="process-list">{process.map((step, index) => <li key={step.title}><span className="process-number">0{index+1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>
    <ClosingCTA/>
  </>;
}
