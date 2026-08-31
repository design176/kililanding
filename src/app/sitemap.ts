import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/** /files is gated behind a password and intentionally excluded (see robots.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/advertiser`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
