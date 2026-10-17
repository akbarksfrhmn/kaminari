import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
import { navigation } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return siteUrl ? navigation.map(item => ({ url: `${siteUrl}${item.href}` })) : []; }
