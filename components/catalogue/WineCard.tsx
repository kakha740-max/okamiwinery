"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeWine, type Wine } from "@/components/data/wines";

type WineCardProps = {
  wine: Wine;
  /** Visual tone of the bottle panel: bone on paper, paper on bone. */
  tone?: "bone" | "paper";
  headingLevel?: "h2" | "h3";
};

// Editorial bottle card: the bottle stands in a quiet panel, the name set
// below it like a catalogue entry. Used by the catalogue and every rail.
export default function WineCard({ wine: original, tone = "bone", headingLevel = "h3" }: WineCardProps) {
  const { language } = useLanguage();
  const wine = localizeWine(original, language);
  const Heading = headingLevel;

  const details = [wine.year, wine.variety].filter((value) => value && value !== "—");

  return (
    <Link href={`/wines/${wine.slug}`} className="group block">
      <div
        className={`relative flex aspect-[3/4] items-end justify-center overflow-hidden transition-colors duration-700 ease-[var(--ease-luxe)] ${
          tone === "bone" ? "bg-bone group-hover:bg-[#e4dccd]" : "bg-paper group-hover:bg-[#efe9de]"
        }`}
      >
        {/* Floor shadow */}
        <span
          aria-hidden="true"
          className="absolute bottom-[7%] left-1/2 h-4 w-[38%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-md transition-all duration-700 ease-[var(--ease-luxe)] group-hover:w-[30%] group-hover:bg-ink/15"
        />
        <Image
          src={wine.image}
          alt={`${wine.name} — ${wine.subtitle}`}
          width={300}
          height={1140}
          sizes="(min-width: 1280px) 120px, (min-width: 768px) 14vw, 30vw"
          className="relative mb-[8%] h-[80%] w-auto object-contain transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:-translate-y-2.5"
        />
      </div>

      <div className="mt-5 pr-2">
        <p className="eyebrow text-bronze">{wine.subtitle}</p>
        <Heading className="display-sm caps mt-2 font-medium text-ink [&:lang(ka)]:font-normal">{wine.name}</Heading>
        {details.length > 0 && <p className="mt-1.5 text-sm text-stone">{details.join(" · ")}</p>}
      </div>
    </Link>
  );
}
