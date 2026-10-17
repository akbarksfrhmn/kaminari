import { ClosingCTA, ProjectCard } from "@/components/ui";
import { projects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Work", "Explore Kaminari Flow, our internal AI customer support product in development, and the thinking behind our work.", "/work/");

export default function Work() {
  return <><section className="page-hero container"><p className="eyebrow">THE STUDIO / WORK</p><h1>SELECTED WORK.<br/><span className="muted-heading">REAL INTENT.</span></h1><div className="page-intro"><p>A closer look at what we’re building, the problems behind it, and the decisions that shape the work.</p><span className="index-label">01 / INTERNAL PRODUCT</span></div></section><section className="container portfolio" aria-label="Projects">{projects.map(project => <ProjectCard key={project.name} project={project}/>)}<div className="portfolio-note"><span className="eyebrow">A PRACTICE IN PROGRESS</span><p>Our portfolio starts with Kaminari Flow. We’ll add further work here when it is ready to share.</p></div></section><ClosingCTA/></>;
}
