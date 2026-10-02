"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

type WineSpecsProps = {
  wine: {
    variety: string;
    year: string;
    alcohol: string;
    volume: string;
    region: string;
    method: string;
  };
};

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#C8A15A]/35 py-5">
      <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#7A5C2E]">
        {label}
      </span>

      <span className="font-medium text-[#1E1610]">
        {value}
      </span>
    </div>
  );
}

export default function WineSpecs({ wine }: WineSpecsProps) {
  const { t } = useLanguage();
  const s = t.winePage;

  return (
    <section className="mt-16">

      <h3 className="text-3xl font-normal text-[#1E1610]">
        {s.specsTitle}
      </h3>

      <div className="mt-8">

        <Row label={s.variety} value={wine.variety} />

        <Row label={s.vintage} value={wine.year} />

        <Row label={s.alcohol} value={wine.alcohol} />

        <Row label={s.volume} value={wine.volume} />

        <Row label={s.region} value={wine.region} />

        <Row label={s.winemaking} value={wine.method} />

      </div>

    </section>
  );
}
