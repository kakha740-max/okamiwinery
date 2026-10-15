"use client";

import Arrow from "@/components/ui/Arrow";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Wine } from "@/components/data/wines";

const present = (value: string) => value && value !== "—";

// The technical sheet as an editorial spread: the four figures that define
// the wine set large, the rest beneath them, then the food pairing as a row
// and the printable PDF.
export default function WineDetails({ wine }: { wine: Wine }) {
  const { t, language } = useLanguage();
  const s = t.winePage;

  const sweetness: Record<string, string> = {
    Dry: t.wineList.sweetnessDry,
    "Semi-Sweet": t.wineList.sweetnessSemiSweet,
  };

  const figures = [
    { label: s.vintage, value: wine.year },
    { label: s.alcohol, value: wine.alcohol },
    { label: s.region, value: wine.region },
    { label: s.variety, value: wine.variety },
  ].filter((row) => present(row.value));

  const details = [
    { label: s.type, value: wine.subtitle },
    { label: s.volume, value: wine.volume },
    { label: s.winemaking, value: wine.method },
    { label: s.style, value: sweetness[wine.sweetness] ?? wine.sweetness },
  ].filter((row) => present(row.value));

  return (
    <section className="bg-paper py-24 md:py-36">
      <Container size="wide">
        <Reveal>
          <h2 className="eyebrow flex items-center gap-4 text-bronze">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {s.technicalTitle}
          </h2>
        </Reveal>

        {/* The defining figures, large */}
        <Reveal delay={0.08}>
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-16 lg:grid-cols-4 lg:gap-x-10">
            {figures.map((row) => (
              <div key={row.label} className="border-t border-ink/20 pt-5">
                <dt className="eyebrow text-stone">{row.label}</dt>
                <dd className="mt-4 font-display text-[clamp(1.7rem,2.9vw,2.9rem)] leading-[1.1] font-light text-ink lining-nums [&:lang(ka)]:text-[clamp(1.35rem,2vw,2rem)] [&:lang(ka)]:leading-[1.3]">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* The rest of the sheet, quieter */}
        <Reveal delay={0.12}>
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4 lg:gap-x-10">
            {details.map((row) => (
              <div key={row.label} className="border-t border-ink/10 pt-4">
                <dt className="eyebrow text-[0.625rem] text-stone">{row.label}</dt>
                <dd className="mt-2 text-ink md:text-lg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Food pairing, as a row */}
        {wine.pairing.length > 0 && (
          <Reveal delay={0.1} className="mt-20 bg-bone px-6 py-10 md:mt-28 md:px-12 md:py-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-3">
                <h2 className="eyebrow text-bronze">{s.pairingTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-stone">{s.pairingDescription}</p>
              </div>
              <ol className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 lg:col-span-9">
                {wine.pairing.map((dish, index) => (
                  <li key={dish} className="border-l border-ink/15 pl-5">
                    <span className="font-sans text-[0.6875rem] tracking-[0.2em] text-bronze tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <p className="display-sm mt-2 text-ink max-md:text-[1.15rem] max-md:[&:lang(ka)]:text-[1rem]">{dish}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        )}

        {/* The printable A4 sheet (scripts/generate-wine-sheets.mjs) */}
        <Reveal className="mt-12 flex justify-center md:mt-16">
          <a
            href={`/sheets/${wine.slug}-${language}.pdf`}
            download
            className="label inline-flex items-center gap-4 border border-ink/25 px-8 py-4 text-ink transition-colors duration-500 ease-[var(--ease-luxe)] hover:border-ink hover:bg-ink hover:text-paper"
          >
            <Arrow direction="down" className="w-5" />
            {s.sheetDownload}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
