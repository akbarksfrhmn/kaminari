import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { siteUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: { default: "Kaminari Creative Studio | Make Ideas Strike.", template: "%s | Kaminari Creative Studio" },
  description: "An independent creative technology studio combining design, software development, and AI to turn ambitious ideas into practical digital experiences.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  robots: siteUrl ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader/><main id="main" tabIndex={-1}>{children}</main><SiteFooter/><Reveal/></body></html>;
}
