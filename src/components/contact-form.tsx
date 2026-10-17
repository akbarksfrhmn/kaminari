"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Download, LoaderCircle } from "lucide-react";
import { services } from "@/lib/content";
import { useSearchParams } from "next/navigation";

type Fields = { name: string; email: string; company: string; service: string; budget: string; description: string; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
const initial: Fields = { name: "", email: "", company: "", service: "", budget: "", description: "", website: "" };
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export function ContactForm() {
  const params = useSearchParams();
  const requested = params.get("service") ?? "";
  const service = services.some(item => item.slug === requested) ? requested : "";
  return <InquiryForm key={service} initialService={service}/>;
}

function InquiryForm({ initialService }: { initialService: string }) {
  const [fields, setFields] = useState({ ...initial, service: initialService });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "loading" | "ready" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const started = useRef(0);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  function update(key: keyof Fields, value: string) {
    setFields(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
    if (state !== "loading") setState("idle");
  }

  function validate() {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = "Enter a valid work email address.";
    if (!fields.company.trim()) next.company = "Enter your company or business name.";
    if (!services.some(service => service.slug === fields.service) && fields.service !== "not-sure") next.service = "Choose a service, or select ‘Not sure yet’.";
    if (fields.description.trim().length < 20) next.description = "Tell us a little more about the project (at least 20 characters).";
    return next;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (fields.website) {
      setMessage("We couldn’t process this request. Reload the page and try again.");
      setState("error");
      return;
    }
    if (!endpoint) {
      setState("ready");
      setMessage("Your brief is ready. Nothing has been sent. Download a copy to keep your project details.");
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }
    setState("loading");
    setMessage("");
    try {
      const destination = new URL(endpoint, window.location.origin);
      if (destination.protocol !== "https:" && destination.hostname !== "localhost" && destination.hostname !== "127.0.0.1") throw new Error("Invalid endpoint");
      const response = await fetch(destination, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, elapsedMs: Date.now() - started.current }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Delivery unconfirmed");
      setState("success");
      setMessage("Your project inquiry has been sent. Thank you for sharing what you’re working on.");
      setFields(initial);
    } catch {
      setState("error");
      setMessage("We couldn’t confirm delivery. Your details are still here. Try again, or download your brief before leaving this page.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  function download() {
    const selected = services.find(service => service.slug === fields.service)?.title ?? "Not sure yet";
    const brief = `KAMINARI CREATIVE STUDIO\nProject brief (not submitted)\n\nName: ${fields.name}\nWork email: ${fields.email}\nCompany: ${fields.company}\nService: ${selected}\nBudget: ${fields.budget || "Not specified"}\n\nPROJECT\n${fields.description}\n`;
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "kaminari-project-brief.txt"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const fieldProps = (key: keyof Fields) => ({
    id: key, name: key, value: fields[key], "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(key, event.target.value),
  });

  return <form ref={formRef} className="contact-form" onSubmit={submit} noValidate>
    <div className="form-heading"><h2>Tell us about your project.</h2><p>All fields are required unless marked optional.</p></div>
    {!endpoint && <div className="development-banner"><strong>Development mode</strong><p>Online delivery is not connected yet. You can prepare and download a project brief here. Nothing will be sent to the studio.</p></div>}
    <fieldset disabled={state === "loading"}>
      <legend className="sr-only">Project inquiry details</legend>
      <div className="form-grid">
        <div className="field"><label htmlFor="name">Name</label><input {...fieldProps("name")} autoComplete="name" required maxLength={120}/>{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}</div>
        <div className="field"><label htmlFor="email">Work email</label><input {...fieldProps("email")} type="email" autoComplete="email" required maxLength={254}/>{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div>
        <div className="field full-width"><label htmlFor="company">Company or business name</label><input {...fieldProps("company")} autoComplete="organization" required maxLength={160}/>{errors.company && <p id="company-error" className="field-error">{errors.company}</p>}</div>
        <div className="field"><label htmlFor="service">Service of interest</label><select {...fieldProps("service")} required><option value="">Select a service</option>{services.map(service => <option key={service.slug} value={service.slug}>{service.title}</option>)}<option value="not-sure">Not sure yet</option></select>{errors.service && <p id="service-error" className="field-error">{errors.service}</p>}</div>
        <div className="field"><label htmlFor="budget">Budget range <span>(optional)</span></label><input {...fieldProps("budget")} placeholder="Amount or range, with currency" maxLength={120}/></div>
        <div className="field full-width"><label htmlFor="description">Project description</label><textarea {...fieldProps("description")} placeholder="What would you like to build, improve, or automate?" rows={5} required minLength={20} maxLength={6000}/>{errors.description && <p id="description-error" className="field-error">{errors.description}</p>}<p className="field-hint">Include your goals, any existing tools, and a timeline if you have one. Please leave out passwords and confidential information.</p></div>
      </div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input {...fieldProps("website")} autoComplete="off" tabIndex={-1}/></div>
      <div className="form-submit"><button type="submit" className="button button-primary">{state === "loading" ? <><LoaderCircle className="loading-icon" size={18} aria-hidden="true"/>Sending Inquiry…</> : <>{endpoint ? "Send Project Inquiry" : "Prepare Project Brief"}<ArrowUpRight size={18} aria-hidden="true"/></>}</button><p>{endpoint ? "Your details will be sent to the studio’s configured inquiry service." : "Your details stay in this browser until you download them."}</p></div>
    </fieldset>
    {state !== "idle" && state !== "loading" && <div ref={statusRef} tabIndex={-1} className={`form-status ${state}`} role={state === "error" ? "alert" : "status"}>{state === "success" && <Check size={22} aria-hidden="true"/>}<p>{message}</p>{(state === "ready" || state === "error") && <button type="button" className="button button-secondary" onClick={download}><Download size={18} aria-hidden="true"/>Download Brief</button>}</div>}
  </form>;
}
