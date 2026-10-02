import type { Metadata } from "next";

import { DEFAULT_OG_IMAGE, SITE_NAME } from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

// Complete metadata for a route. Next.js replaces (rather than merges) a
// parent's openGraph / twitter objects, so every page sets them in full.
export function pageMetadata({ title, description, path, image = DEFAULT_OG_IMAGE, imageAlt }: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      alternateLocale: ["ka_GE", "ru_RU"],
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
