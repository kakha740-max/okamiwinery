// Site-wide constants shared by metadata, structured data and navigation.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://okamiwinery.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Etno Okami Winery";

export const DEFAULT_DESCRIPTION =
  "Etno Okami Winery makes Georgian Qvevri wines in the historic Etno Okami Microzone of Shida Kartli — a winemaking tradition carried since 1965.";

export const DEFAULT_OG_IMAGE = "/images/og/etno-okami.jpg";

// Contact details that don't change with the language (email and address
// are translated, in messages/*.json under "footer").
export const PHONE = "+995 591 27 11 88";
export const PHONE_HREF = "tel:+995591271188";
export const FACEBOOK_URL = "https://www.facebook.com/Etnookami";

export type NavKey = "home" | "story" | "wines" | "gallery" | "awards" | "contact";

export const navItems: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "story", href: "/story" },
  { key: "wines", href: "/wines" },
  { key: "gallery", href: "/gallery" },
  { key: "awards", href: "/awards" },
  { key: "contact", href: "#footer" },
];

// Routes that open with a full-bleed dark image, so the header starts
// transparent over it. Every other route gets the solid header from the top.
export const darkHeroRoutes = ["/", "/story", "/wines", "/gallery", "/awards"];
