"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Lightbox from "@/components/ui/Lightbox";
import Reveal from "@/components/ui/Reveal";
import { MedalBadge, medalLabels } from "@/components/awards/medals";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { wineNames, type allAwards } from "@/components/data/awards";

// Every recognition this wine has received, across vintages.
export default function WineAwards({ awards }: { awards: typeof allAwards }) {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const medals = medalLabels(t);

  const certificates = awards.filter((award) => award.certificate);

  return (
    <section id="awards" className="on-dark bg-night py-24 text-paper md:py-32">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-gold">{t.awards.eyebrow}</p>
            <h2 className="display-md mt-6">{t.winePage.awardsTitle}</h2>
            <Link href="/awards" className="label link-line mt-10 inline-block text-paper/70 hover:text-paper">
              {t.awards.viewAll}
            </Link>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-paper/15">
              {awards.map((award) => (
                <li
                  key={`${award.competition.id}-${award.vintage}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-6 border-b border-paper/15 py-6"
                >
                  <div>
                    <MedalBadge medal={award.medal} label={medals[award.medal]} className="text-gold" />
                    <p className="display-sm mt-3">
                      {award.competition.title[language]}
                      {award.competition.year && <span className="text-paper/45"> {award.competition.year}</span>}
                    </p>
                    <p className="mt-1 text-sm text-paper/55">
                      <span className="caps">{wineNames[award.wine][language]}</span> {award.vintage}
                      {award.score && ` · ${award.score} ${t.awards.points}`}
                    </p>
                  </div>

                  {award.certificate && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoIndex(certificates.indexOf(award));
                        setOpen(true);
                      }}
                      aria-label={t.awards.viewCertificate}
                      className="group relative h-24 w-[4.5rem] shrink-0 overflow-hidden bg-paper/5 sm:h-28 sm:w-20"
                    >
                      <Image
                        src={`/images/awards/${award.certificate}`}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain p-1.5 transition-transform duration-700 group-hover:scale-105"
                      />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
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
    </section>
  );
}
