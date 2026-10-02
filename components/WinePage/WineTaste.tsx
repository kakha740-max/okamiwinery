"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

type WineTasteProps = {
  taste: {
    sweetness: number;
    acidity: number;
    body: number;
    tannins: number;
  };
};

function TasteBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const percentage = (value / 5) * 100;

  return (
    <div className="mb-8">

      <div className="mb-2 flex justify-between">

        <span className="text-sm uppercase tracking-[0.2em] text-[#C8A15A]">
          {label}
        </span>

        <span className="text-[#5C5245]">
          {value}/5
        </span>

      </div>

      <div className="h-[4px] w-full rounded-full bg-[#C8A15A]/15 overflow-hidden">

        <div
          className="h-full rounded-full bg-[#C8A15A]"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

export default function WineTaste({
  taste,
}: WineTasteProps) {
  const { t } = useLanguage();
  const s = t.winePage;

  return (
    <section className="mt-16">

      <h3 className="text-3xl font-light text-[#1E1610]">{s.tasteTitle}</h3>

      <div className="mt-10">

        <TasteBar
          label={s.sweetness}
          value={taste.sweetness}
        />

        <TasteBar
          label={s.acidity}
          value={taste.acidity}
        />

        <TasteBar
          label={s.body}
          value={taste.body}
        />

        <TasteBar
          label={s.tannins}
          value={taste.tannins}
        />

      </div>

    </section>
  );
}
