import type { Metadata } from "next";

const configured = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = configured ? new URL(configured).origin : undefined;

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    ...(siteUrl ? { alternates: { canonical: `${siteUrl}${path}` } } : {}),
    openGraph: {
      title: `${title} | Kaminari Creative Studio`, description, type: "website",
      siteName: "Kaminari Creative Studio",
      ...(siteUrl ? { url: `${siteUrl}${path}` } : {}),
    },
  };
}
