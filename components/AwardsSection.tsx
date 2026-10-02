"use client";

import { useState } from "react";
import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";

import LightboxViewer from "@/components/DiscoverGallery/Lightbox";
import { allAwards, wineNames } from "@/components/data/awards";
import { medalLabels, medalStyles } from "@/components/AwardsPage/medals";

// Only awards with a scanned certificate appear as cards here; the full list
// with stories lives on the /awards page.
const awards = allAwards.filter((award) => award.certificate);

const years = [...new Set(awards.map((award) => award.competition.year))];

export default function AwardsSection() {
  const { t, language } = useLanguage();
  const [year, setYear] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const visible = year === null ? awards : awards.filter((award) => award.competition.year === year);

  const medalLabel = medalLabels(t);

  const stats = [
    { value: allAwards.length, label: t.awards.statAwards },
    { value: allAwards.filter((a) => a.medal === "gold").length, label: t.awards.statGold },
    { value: allAwards.filter((a) => a.medal === "silver").length, label: t.awards.statSilver },
    { value: allAwards.filter((a) => a.medal === "bronze").length, label: t.awards.statBronze },
  ];

  const filters = [
    { value: null, label: t.awards.filterAll, count: awards.length },
    ...years.map((y) => ({
      value: y,
      label: String(y),
      count: awards.filter((a) => a.competition.year === y).length,
    })),
  ];

  return (
    <section id="awards" className="relative overflow-hidden bg-[#070707] py-24 md:py-32 scroll-mt-24">

      {/* Ambient glow */}

      <div className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#C8A15A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-[28rem] w-[28rem] rounded-full bg-[#6D0F22]/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Heading + stats */}

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A15A]">
              {t.awards.eyebrow}
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-light leading-tight text-white sm:text-5xl">
              {t.awards.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/65">
              {t.awards.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6"
              >
                <div className="bg-gradient-to-br from-[#F3D9A4] via-[#C8A15A] to-[#8A6A3A] bg-clip-text text-4xl font-light text-transparent sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Year filter */}

        <div className="mt-16 flex flex-wrap gap-2 md:mt-20">
          {filters.map((filter) => {
            const active = filter.value === year;
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => setYear(filter.value)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                  active
                    ? "border-[#C8A15A] bg-[#C8A15A] text-black"
                    : "border-white/15 text-white/70 hover:border-[#C8A15A]/60 hover:text-white"
                }`}
              >
                {filter.label}
                <span className={`text-xs ${active ? "text-black/60" : "text-white/40"}`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certificates */}

        <div key={year ?? "all"} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {visible.map((award, index) => (

            <button
              key={award.certificate}
              type="button"
              onClick={() => {
                setPhotoIndex(index);
                setOpen(true);
              }}
              style={{ animationDelay: `${index * 70}ms` }}
              className="award-rise group rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-3 text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C8A15A]/50 hover:shadow-[0_24px_60px_-20px_rgba(200,161,90,0.35)]"
            >

              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-white/[0.09] to-white/[0.02]">

                <Image
                  src={`/images/awards/${award.certificate}`}
                  alt={`${wineNames[award.wine][language]} ${award.vintage} — ${award.competition.title[language]} ${award.competition.year}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain px-5 pt-14 pb-5 transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] shadow-lg ${medalStyles[award.medal]}`}>
                  {medalLabel[award.medal]}
                </span>

                <span className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
                  {award.competition.year}
                </span>

                <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/70 to-transparent pt-12 pb-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full border border-[#C8A15A] px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-[#F3D9A4]">
                    {t.awards.viewCertificate}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>

              </div>

              <div className="px-2 pt-5 pb-2">
                <p className="text-[11px] uppercase leading-5 tracking-[0.18em] text-[#C8A15A]/80">
                  {award.competition.title[language]}
                </p>
                <h3 className="mt-2 text-lg uppercase leading-snug tracking-[0.06em] text-white">
                  {wineNames[award.wine][language]}
                </h3>
                <p className="mt-1 text-sm text-white/45">
                  {award.vintage}
                </p>
              </div>

            </button>

          ))}

        </div>

        <div className="mt-14 text-center">
          <Link
            href="/awards"
            className="inline-block border border-[#C8A15A] px-8 py-3 text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-[#C8A15A] hover:text-black"
          >
            {t.awards.viewAll}
          </Link>
        </div>

      </div>

      <LightboxViewer
        open={open}
        index={photoIndex}
        images={visible.map((award) => `awards/${award.certificate}`)}
        onClose={() => setOpen(false)}
      />

    </section>
  );
}
