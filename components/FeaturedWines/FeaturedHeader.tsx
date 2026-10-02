"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function FeaturedHeader() {
  const { t } = useLanguage();

  return (
    <div className="mb-24 text-center">

      <p className="uppercase tracking-[0.5em] text-[#C8A15A] text-sm">
        {t.featured.eyebrow}
      </p>

      <h2
        className="mt-5 text-6xl text-white font-light"
      >
        {t.featured.title}
      </h2>

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/65">
        {t.featured.description}
      </p>

    </div>
  );
}