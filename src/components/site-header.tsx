"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const active = (href: string) => pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    const query = window.matchMedia("(min-width: 900px)");
    const resize = () => { if (query.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    query.addEventListener("change", resize);
    return () => { document.removeEventListener("keydown", close); query.removeEventListener("change", resize); };
  }, [open]);

  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="wordmark" aria-label="Kaminari Creative Studio home" onClick={() => setOpen(false)}>
        <span>KAMINARI<span className="wordmark-period">.</span></span><span className="wordmark-sub">CREATIVE STUDIO</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}{open ? <X size={20} aria-hidden="true"/> : <Menu size={20} aria-hidden="true"/>}
      </button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {navigation.map((item, index) => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} onClick={() => setOpen(false)}><span className="mobile-number">0{index + 1}</span>{item.label}</Link>)}
    </nav>
  </header>;
}
