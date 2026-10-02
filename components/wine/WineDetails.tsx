"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Wine } from "@/components/data/wines";

// Technical sheet beside the food pairing suggestions.
export default function WineDetails({ wine }: { wine: Wine }) {
  const { t } = useLanguage();
  const s = t.winePage;

  const sweetness: Record<string, string> = {
    Dry: t.wineList.sweetnessDry,
    "Semi-Sweet": t.wineList.sweetnessSemiSweet,
  };

  const rows = [
    { label: s.type, value: wine.subtitle },
    { label: s.vintage, value: wine.year },
    { label: s.variety, value: wine.variety },
    { label: s.alcohol, value: wine.alcohol },
    { label: s.volume, value: wine.volume },
    { label: s.region, value: wine.region },
    { label: s.winemaking, value: wine.method },
    { label: s.style, value: sweetness[wine.sweetness] ?? wine.sweetness },
  ].filter((row) => row.value && row.value !== "—");

  return (
    <section className="bg-paper py-24 md:py-36">
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <h2 className="eyebrow text-bronze">{s.technicalTitle}</h2>
            <dl className="mt-8 border-t border-ink/15">
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 border-b border-ink/15 py-5">
                  <dt className="eyebrow self-center text-stone">{row.label}</dt>
                  <dd className="text-ink md:text-lg">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {wine.pairing.length > 0 && (
            <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
              <div className="bg-bone px-8 py-10 md:px-10 md:py-12">
                <h2 className="eyebrow text-bronze">{s.pairingTitle}</h2>
                <p className="mt-4 text-sm text-stone">{s.pairingDescription}</p>
                <ul className="mt-8">
                  {wine.pairing.map((dish, index) => (
                    <li
                      key={dish}
                      className={`display-sm flex items-baseline gap-4 py-3 text-ink ${index > 0 ? "border-t border-ink/10" : ""}`}
                    >
                      <span className="font-sans text-[0.6875rem] tracking-[0.2em] text-bronze">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
