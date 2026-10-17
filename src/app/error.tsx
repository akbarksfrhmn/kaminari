"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <section className="container page-hero"><p className="eyebrow">SOMETHING WENT WRONG</p><h1>LET’S TRY<br/>THAT AGAIN.</h1><p>The page couldn’t load. Your browser may have lost its connection.</p><button type="button" className="button button-primary" onClick={reset}>Reload This Page</button></section>; }
