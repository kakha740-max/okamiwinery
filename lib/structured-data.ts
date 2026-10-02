import en from "@/messages/en.json";
import type { Wine } from "@/components/data/wines";
import { awardsForWine, wineNames } from "@/components/data/awards";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

const absolute = (path: string) => `${SITE_URL}${path}`;

const organizationId = `${SITE_URL}/#organization`;

// The winery itself — only facts stated elsewhere on the site.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Winery",
    "@id": organizationId,
    name: SITE_NAME,
    alternateName: ["Etno Okami", "ეთნო ოკამის მეღვინეობა", "Винодельня Этно Оками"],
    url: SITE_URL,
    logo: absolute("/images/brand/etno-okami-logo.png"),
    image: absolute("/images/story9.png"),
    description: DEFAULT_DESCRIPTION,
    foundingDate: "1965",
    founder: { "@type": "Person", name: "Tengiz Kekelidze" },
    email: en.footer.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Etno Okami Microzone",
      addressRegion: "Shida Kartli",
      addressCountry: "GE",
    },
  };
}

export function wineJsonLd(wine: Wine) {
  const awards = awardsForWine(wine.slug).map(
    (award) =>
      `${award.competition.title.en}${award.competition.year ? ` ${award.competition.year}` : ""} — ${
        award.medal === "rosso" ? "ROSSO" : award.medal.charAt(0).toUpperCase() + award.medal.slice(1)
      } (${wineNames[award.wine].en} ${award.vintage})`
  );

  const properties = [
    { name: "Grape variety", value: wine.variety },
    { name: "Vintage", value: wine.year },
    { name: "Alcohol", value: wine.alcohol },
    { name: "Volume", value: wine.volume },
    { name: "Region", value: wine.region },
    { name: "Winemaking", value: wine.method },
  ].filter((property) => property.value && property.value !== "—");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${wine.name} — ${wine.subtitle}`,
    description: wine.description,
    image: absolute(wine.image),
    url: absolute(`/wines/${wine.slug}`),
    category: "Wine",
    brand: { "@type": "Brand", name: "Etno Okami" },
    manufacturer: { "@id": organizationId },
    countryOfOrigin: { "@type": "Country", name: "Georgia" },
    additionalProperty: properties.map((property) => ({ "@type": "PropertyValue", ...property })),
    ...(awards.length > 0 && { award: awards }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}
