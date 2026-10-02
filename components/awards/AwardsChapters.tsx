"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Lightbox from "@/components/ui/Lightbox";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { allAwards, competitions, wineNames, wineSlugForAward } from "@/components/data/awards";

import { MedalBadge, medalLabels } from "./medals";

// Every certificate on the page, in page order, so the lightbox can step through them all.
const certificates = allAwards.filter((award) => award.certificate);

export default function AwardsChapters() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const medals = medalLabels(t);

  const stats = [
    { value: allAwards.length, label: t.awards.statAwards },
    { value: allAwards.filter((a) => a.medal === "gold").length, label: t.awards.statGold },
    { value: allAwards.filter((a) => a.medal === "silver").length, label: t.awards.statSilver },
    { value: allAwards.filter((a) => a.medal === "bronze").length, label: t.awards.statBronze },
  ];

  return (
    <>
      <PageHero
        image="/images/19.jpg"
        eyebrow={t.awards.eyebrow}
        title={t.awards.pageTitle}
        intro={t.awards.pageIntro}
      />

      <Container size="wide" className="py-16 md:py-24">
        {/* Stats */}
        <dl className="grid grid-cols-2 border-y border-ink/15 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse justify-end py-8 pr-4 ${index % 2 === 1 ? "border-l border-ink/15 pl-6" : ""} ${
                index > 0 ? "md:border-l md:border-ink/15 md:pl-8" : ""
              } ${index > 1 ? "border-t border-ink/15 md:border-t-0" : ""}`}
            >
              <dt className="eyebrow mt-3 text-stone">{stat.label}</dt>
              <dd className="font-display text-6xl leading-none font-light text-ink lining-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* Chapter index */}
        <nav aria-label={t.awards.pageTitle} className="mt-10">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {competitions.map((competition) => (
              <li key={competition.id}>
                <a href={`#${competition.id}`} className="text-stone transition-colors hover:text-ink">
                  <span className="mr-2 text-bronze">{competition.year ?? t.awards.kartliShort}</span>
                  {competition.title[language]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Competitions */}
        <div className="mt-20 md:mt-28">
          {competitions.map((competition) => {
            const withCertificate = competition.awards.filter((award) => award.certificate);

            return (
              <article
                key={competition.id}
                id={competition.id}
                className="grid gap-10 border-t border-ink/15 py-16 md:py-24 lg:grid-cols-12 lg:gap-10"
              >
                {/* Year + facts */}
                <Reveal className="lg:col-span-4">
                  <p className="font-display text-[clamp(4.5rem,9vw,8rem)] leading-[0.85] font-light text-ink">
                    {competition.year ?? t.awards.kartliShort}
                  </p>
                  {competition.date && <p className="mt-8 text-sm text-umber">{competition.date[language]}</p>}
                  <dl className="mt-6 text-sm">
                    <div>
                      <dt className="eyebrow text-stone">{t.awards.organizer}</dt>
                      <dd className="mt-1.5 text-umber">{competition.organizer[language]}</dd>
                    </div>
                  </dl>
                </Reveal>

                {/* Story + medals */}
                <Reveal delay={0.12} className="lg:col-span-7 lg:col-start-6">
                  <h2 className="display-md text-ink">{competition.title[language]}</h2>

                  <div className="body-copy mt-8 space-y-5 text-umber">
                    {competition.story.map((paragraph) => (
                      <p key={paragraph.en}>{paragraph[language]}</p>
                    ))}
                  </div>

                  <ul className="mt-12 border-t border-ink/15">
                    {competition.awards.map((award) => {
                      const slug = wineSlugForAward(award);
                      const name = <span className="caps">{wineNames[award.wine][language]}</span>;
                      return (
                        <li
                          key={`${award.wine}-${award.vintage}`}
                          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink/15 py-5"
                        >
                          <span className="display-sm text-ink">
                            {slug ? (
                              <Link href={`/wines/${slug}`} className="transition-colors hover:text-bronze">
                                {name}
                              </Link>
                            ) : (
                              name
                            )}{" "}
                            <span className="text-stone">{award.vintage}</span>
                          </span>
                          <span className="flex items-center gap-5">
                            {award.score && (
                              <span className="text-sm text-stone">
                                {award.score} {t.awards.points}
                              </span>
                            )}
                            <MedalBadge medal={award.medal} label={medals[award.medal]} className="text-ink" />
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {withCertificate.length > 0 && (
                    <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {withCertificate.map((award) => (
                        <li key={award.certificate}>
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoIndex(certificates.findIndex((c) => c.certificate === award.certificate));
                              setOpen(true);
                            }}
                            className="group block w-full text-left"
                          >
                            <span className="relative block aspect-[4/5] overflow-hidden bg-bone">
                              <Image
                                src={`/images/awards/${award.certificate}`}
                                alt={`${wineNames[award.wine][language]} ${award.vintage} — ${competition.title[language]}`}
                                fill
                                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                                className="object-contain p-4 transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                              />
                            </span>
                            <span className="mt-3 block text-xs text-stone transition-colors group-hover:text-ink">
                              {t.awards.viewCertificate} →
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center border-t border-ink/15 pt-16">
          <ButtonLink href="/wines" variant="solid" arrow>
            {t.awards.discoverWines}
          </ButtonLink>
        </div>
      </Container>

      <Lightbox
        open={open}
        index={photoIndex}
        slides={certificates.map((award) => ({
          src: `/images/awards/${award.certificate}`,
          alt: `${wineNames[award.wine][language]} ${award.vintage}`,
        }))}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
