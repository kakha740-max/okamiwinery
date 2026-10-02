import type { Metadata } from "next";
import { notFound } from "next/navigation";

import WineProduct from "@/components/wine/WineProduct";
import JsonLd from "@/components/seo/JsonLd";
import { wines } from "@/components/data/wines";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, wineJsonLd } from "@/lib/structured-data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return wines.map((wine) => ({ slug: wine.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wine = wines.find((wine) => wine.slug === slug);
  if (!wine) return {};

  const vintage = wine.year !== "—" ? ` ${wine.year}` : "";

  return pageMetadata({
    title: `${wine.name}${vintage} — ${wine.subtitle}`,
    description: wine.description,
    path: `/wines/${wine.slug}`,
    image: `/images/og/wine-${wine.slug}.jpg`,
    imageAlt: `${wine.name}${vintage} — ${wine.subtitle}`,
  });
}

export default async function WinePage({ params }: Props) {
  const { slug } = await params;
  const wine = wines.find((wine) => wine.slug === slug);

  if (!wine) {
    notFound();
  }

  return (
    <main id="main" className="bg-paper">
      <JsonLd data={wineJsonLd(wine)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Wines", path: "/wines" },
          { name: wine.name, path: `/wines/${wine.slug}` },
        ])}
      />
      <WineProduct wine={wine} />
    </main>
  );
}
