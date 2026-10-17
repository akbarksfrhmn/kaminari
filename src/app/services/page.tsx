import { Button, ClosingCTA } from "@/components/ui";
import { services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Services", "AI automation, websites and digital products, creative technology, and digital strategy. Find the right starting point for your project.", "/services/");

export default function Services() {
  return <><section className="page-hero container"><p className="eyebrow">THE STUDIO / SERVICES</p><h1>GOOD IDEAS.<br/><span className="muted-heading">BUILT WITH INTENT.</span></h1><div className="page-intro"><p>We bring design and engineering to the same table. Start with a challenge, an unfinished idea, or a process that needs to work better.</p><a href="#ai-automation" className="text-link">Find your starting point ↓</a></div></section><div className="container">{services.map(service => <section id={service.slug} key={service.slug} className="service-detail" data-reveal><div className="service-detail-heading"><span className="eyebrow">{service.number} / SERVICE</span><h2>{service.title}</h2><p>{service.short}</p><Button href={`/contact/?service=${service.slug}`} variant="secondary">Discuss a Project</Button></div><div className="service-detail-content"><div><h3>The challenge</h3><p>{service.problem}</p></div><div><h3>Our approach</h3><p>{service.solution}</p></div><div className="deliverables"><h3>What we can make</h3><ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>A good fit for</h3><p>{service.ideal}</p></div></div></section>)}</div><ClosingCTA/></>;
}
