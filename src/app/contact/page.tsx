import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = pageMetadata("Contact", "Tell Kaminari Creative Studio what you want to build, improve, or automate. Prepare a project inquiry with your goals and scope.", "/contact/");

export default function Contact() {
  return <><section className="page-hero container contact-hero"><p className="eyebrow">THE STUDIO / CONTACT</p><h1>EVERY BUILD<br/>STARTS WITH<br/><span className="accent-text">A CONVERSATION.</span></h1></section><section className="container contact-layout"><aside><p className="contact-lead">An idea on paper.<br/>A workflow that slows you down.<br/>A product ready for its next step.</p><p>Tell us where you are and where you want to go. You don’t need a finished brief to start.</p><div className="contact-aside-note"><span className="eyebrow">WHAT COMES NEXT</span><p>Once inquiry delivery is connected, we can review your goals, discuss the scope, and work out a practical starting point.</p></div></aside><Suspense fallback={<p role="status">Loading the project inquiry form…</p>}><ContactForm/></Suspense></section></>;
}
