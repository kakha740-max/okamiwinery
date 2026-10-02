"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";
import LightboxViewer from "@/components/DiscoverGallery/Lightbox";
import { allAwards, competitions, wineNames, type Award, type Competition } from "@/components/data/awards";
import type { Language } from "@/lib/translations";
import { medalLabels, medalStyles } from "./medals";

// Every certificate on the page, in page order, so the lightbox can step through them all.
const certificates = allAwards
  .filter((award) => award.certificate)
  .map((award) => award.certificate as string);

export default function AwardsStories() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const medals = medalLabels(t);

  const openCertificate = (file: string) => {
    setPhotoIndex(certificates.indexOf(file));
    setOpen(true);
  };

  const stats = [
    { value: allAwards.length, label: t.awards.statAwards },
    { value: allAwards.filter((a) => a.medal === "gold").length, label: t.awards.statGold },
    { value: allAwards.filter((a) => a.medal === "silver").length, label: t.awards.statSilver },
    { value: allAwards.filter((a) => a.medal === "bronze").length, label: t.awards.statBronze },
  ];

  const chipLabel = (competition: Competition) =>
    competition.year === null ? t.awards.kartliShort : String(competition.year);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

      {/* Intro */}

      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C8A15A]">
          {t.awards.eyebrow}
        </p>
        <h1 className="mt-5 text-4xl font-normal text-[#1E1610] sm:text-5xl md:text-6xl">
          {t.awards.pageTitle}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-5 md:mt-8">
          <div className="h-px w-14 bg-[#C8A15A] sm:w-24" />
          <div className="h-2 w-2 rounded-full bg-[#C8A15A]" />
          <div className="h-px w-14 bg-[#C8A15A] sm:w-24" />
        </div>
        <p className="mt-8 text-base leading-8 text-[#5C5245] sm:text-lg sm:leading-9">
          {t.awards.pageIntro}
        </p>
      </header>

      {/* Stats */}

      <div className="mt-14 grid grid-cols-2 border-y border-[#C8A15A]/30 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-4 py-8 text-center ${index > 0 ? "md:border-l" : ""} ${index % 2 === 1 ? "border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} border-[#C8A15A]/30`}
          >
            <div className="bg-gradient-to-br from-[#D9B56E] via-[#C8A15A] to-[#8A6A3A] bg-clip-text text-5xl font-light text-transparent">
              {stat.value}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8A7A66]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Chapter index */}

      <nav className="mt-10 flex flex-wrap justify-center gap-2">
        {competitions.map((competition) => (
          <a
            key={competition.id}
            href={`#${competition.id}`}
            className="rounded-full border border-[#C8A15A]/40 px-4 py-2 text-sm text-[#5C5245] transition-colors duration-300 hover:border-[#C8A15A] hover:bg-[#C8A15A] hover:text-black"
          >
            {chipLabel(competition)} · {competition.title[language]}
          </a>
        ))}
      </nav>

      {/* Stories */}

      <div className="mt-16">
        {competitions.map((competition, index) => (
          <article
            key={competition.id}
            id={competition.id}
            className="grid scroll-mt-28 gap-12 border-t border-[#C8A15A]/30 py-16 md:py-20 lg:grid-cols-2 lg:gap-16"
          >

            {/* Text */}

            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.25em] text-[#C8A15A]">
                <span>{competition.year ?? t.awards.kartliShort}</span>
                {competition.date && (
                  <>
                    <span className="h-px w-8 bg-[#C8A15A]/60" />
                    <span className="tracking-[0.12em] normal-case text-[#8A7A66]">
                      {competition.date[language]}
                    </span>
                  </>
                )}
              </div>

              <h2 className="mt-5 text-3xl leading-tight text-[#1E1610] sm:text-4xl">
                {competition.title[language]}
                {competition.year && <span className="text-[#C8A15A]"> {competition.year}</span>}
              </h2>

              <p className="mt-3 text-sm text-[#8A7A66]">
                {t.awards.organizer}: {competition.organizer[language]}
              </p>

              <div className="mt-8 space-y-5 text-[15px] leading-8 text-[#4A4036]">
                {competition.story.map((paragraph) => (
                  <p key={paragraph.en}>{paragraph[language]}</p>
                ))}
              </div>

              {/* Medal list */}

              <ul className="mt-10 divide-y divide-[#C8A15A]/20 border-y border-[#C8A15A]/20">
                {competition.awards.map((award) => (
                  <li key={`${award.wine}-${award.vintage}`} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <span className="text-lg uppercase tracking-[0.06em] text-[#1E1610]">{wineNames[award.wine][language]}</span>
                      <span className="ml-2 text-[#8A7A66]">{award.vintage}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {award.score && (
                        <span className="text-sm text-[#8A7A66]">
                          {award.score} {t.awards.points}
                        </span>
                      )}
                      <span className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] ${medalStyles[award.medal]}`}>
                        {medals[award.medal]}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificates or medal emblems */}

            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <StoryMedia
                awards={competition.awards}
                language={language}
                medals={medals}
                onOpen={openCertificate}
              />
            </div>

          </article>
        ))}
      </div>

      {/* Closing CTA */}

      <div className="border-t border-[#C8A15A]/30 pt-16 text-center">
        <Link
          href="/wines"
          className="inline-block border border-[#C8A15A] px-8 py-3 text-sm uppercase tracking-[0.25em] text-[#1E1610] transition-all duration-500 hover:bg-[#C8A15A] hover:text-black"
        >
          {t.awards.discoverWines}
        </Link>
      </div>

      <LightboxViewer
        open={open}
        index={photoIndex}
        images={certificates.map((file) => `awards/${file}`)}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

type StoryMediaProps = {
  awards: Award[];
  language: Language;
  medals: Record<Award["medal"], string>;
  onOpen: (file: string) => void;
};

function StoryMedia({ awards, language, medals, onOpen }: StoryMediaProps) {
  const withCertificate = awards.filter((award) => award.certificate);

  // No scans for this competition: show a typographic medal for each award.
  if (withCertificate.length === 0) {
    return (
      <div className="flex h-full min-h-[320px] flex-wrap items-center justify-center gap-10 rounded-[2rem] bg-[#F7F2E8] p-10">
        {awards.map((award) => (
          <div key={`${award.wine}-${award.vintage}`} className="flex flex-col items-center text-center">
            <div className={`flex h-36 w-36 items-center justify-center rounded-full p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] ${medalStyles[award.medal]}`}>
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/50">
                <span className="text-xs uppercase tracking-[0.2em]">{medals[award.medal]}</span>
                <span className="mt-1 text-3xl font-light">{award.vintage}</span>
              </div>
            </div>
            <span className="mt-5 text-base uppercase tracking-[0.06em] text-[#1E1610]">{wineNames[award.wine][language]}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${withCertificate.length > 1 ? "grid-cols-2" : ""}`}>
      {withCertificate.map((award, index) => {
        // With an odd count, the first certificate spans the full width.
        const featured = withCertificate.length > 1 && withCertificate.length % 2 === 1 && index === 0;
        return (
          <button
            key={award.certificate}
            type="button"
            onClick={() => onOpen(award.certificate as string)}
            className={`group relative overflow-hidden rounded-[1.5rem] bg-[#F7F2E8] text-left transition-all duration-500 hover:shadow-[0_24px_50px_-20px_rgba(138,106,58,0.45)] ${featured ? "col-span-2" : ""}`}
          >
            <div className={`relative ${featured || withCertificate.length === 1 ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
              <Image
                src={`/images/awards/${award.certificate}`}
                alt={`${wineNames[award.wine].en} ${award.vintage}`}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] shadow ${medalStyles[award.medal]}`}>
              {medals[award.medal]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
