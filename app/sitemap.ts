import type { MetadataRoute } from "next";

import { wines } from "@/components/data/wines";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/wines", priority: 0.9 },
    { path: "/story", priority: 0.8 },
    { path: "/awards", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
  ];

  return [
    ...pages.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...wines.map((wine) => ({
      url: `${SITE_URL}/wines/${wine.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${SITE_URL}${wine.image}`],
    })),
  ];
}
