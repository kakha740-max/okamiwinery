"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Lightbox from "@/components/ui/Lightbox";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { allAwards, competitions, wineNames, wineSlugForAward, type Medal } from "@/components/data/awards";

import { MedalBadge, medalLabels } from "./medals";

type AwardEntry = (typeof allAwards)[number];

const medalRank: Record<Medal, number> = { gold: 0, silver: 1, bronze: 2, rosso: 3 };

// Every award with a certificate, most recent first and highest medal first.
const certificates = allAwards
  .filter((award) => award.certificate)
  .sort((a, b) => (b.competition.year ?? 0) - (a.competition.year ?? 0) || medalRank[a.medal] - medalRank[b.medal]);

// The competition paragraph that names this wine and vintage, else its general introduction.
const storyFor = (award: AwardEntry) =>
  award.competition.story.find((paragraph) => paragraph.en.includes(`${wineNames[award.wine].en} ${award.vintage}`)) ??
  award.competition.story[0];

const AUTOPLAY_MS = 7000;
const glide = { duration: 1.1, ease: [0.65, 0, 0.35, 1] as const };
const fade = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

// Certificates glide in from the side they travel from (right for "next").
const slide = {
  enter: (direction: number) => ({ x: direction > 0 ? "30%" : "-30%", opacity: 0 }),
  center: { x: "0%", opacity: 1, transition: { ...glide, delay: 0.2 } },
  exit: (direction: number) => ({
    x: direction > 0 ? "-30%" : "30%",
    opacity: 0,
    transition: { duration: 0.55, ease: [0.55, 0, 1, 0.45] as const },
  }),
};

const pad = (value: number) => String(value).padStart(2, "0");

// The awards page: every certificate in turn as a large editorial feature,
// gliding right to left, then the competitions' own stories. Certificates
// open full screen.
export default function AwardsEditorial() {
  const { t, language } = useLanguage();
  const medals = medalLabels(t);
  const reduceMotion = useReducedMotion();
  const stage = useRef<HTMLElement>(null);

  const [[index, direction], setPosition] = useState([0, 1]);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);
  const [restart, setRestart] = useState(0);

  const count = certificates.length;
  const award = certificates[index];
  const slug = wineSlugForAward(award);
  const name = wineNames[award.wine][language];
  // Hyphens are natural break points, so only the pieces between them count.
  const longestWord = Math.max(...name.split(/[s-]+/).map((word) => word.length));

  const go = (step: number) => {
    setPosition(([current]) => [(current + step + count) % count, step]);
    setRestart((value) => value + 1);
  };

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || hovered || open || !inView) return;
    const timer = setInterval(() => setPosition(([current]) => [(current + 1) % count, 1]), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, hovered, open, inView, count, restart]);

  return (
    <>
      <PageHero image="/images/19.jpg" eyebrow={t.awards.eyebrow} title={t.awards.pageTitle} intro={t.awards.pageIntro} />

      {/* Featured certificates */}
      <section
        ref={stage}
        aria-roledescription="carousel"
        aria-label={t.awards.featured}
        onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className="py-20 md:py-32"
      >
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-[5/6] w-full overflow-hidden bg-bone">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.button
                    key={award.certificate}
                    type="button"
                    custom={direction}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    onClick={() => setOpen(true)}
                    aria-label={`${t.awards.viewCertificate} — ${name} ${award.vintage}`}
                    className="group absolute inset-0 flex cursor-zoom-in items-center justify-center"
                  >
                    <span className="relative block h-[80%] w-[64%] transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:-translate-y-1.5">
                      <Image
                        src={`/images/awards/${award.certificate}`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, 64vw"
                        className="object-contain drop-shadow-[0_28px_36px_rgb(23_19_15/0.18)]"
                      />
                    </span>
                  </motion.button>
                </AnimatePresence>

                {/* Arrows either side of the certificate */}
                {[
                  { step: -1, label: t.ui.previous, side: "left-4", path: "M9.5 3 4.5 8l5 5" },
                  { step: 1, label: t.ui.next, side: "right-4", path: "M6.5 3l5 5-5 5" },
                ].map(({ step, label, side, path }) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => go(step)}
                    aria-label={label}
                    className={`absolute top-1/2 ${side} z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-paper/80 text-ink/60 backdrop-blur-sm transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper`}
                  >
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
                      <path d={path} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
              <p className="eyebrow flex items-center gap-4 text-bronze">
                {t.awards.featured}
                <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
                <span className="tabular-nums">
                  {pad(index + 1)} / {pad(count)}
                </span>
              </p>

              {/* Details change with a soft fade as the certificate glides in */}
              <div aria-live="polite" className="@container lg:min-h-[34rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={award.certificate}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0, transition: { ...fade, delay: 0.25 } }}
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.35 } }}
                  >
                    <MedalBadge medal={award.medal} label={medals[award.medal]} className="mt-10 text-ink" />
                    {/* Never break a word: capped so the longest word fits the column (see WineHero). */}
                    <h2
                      style={{ "--title-fit": `calc(100cqi / ${(longestWord * 0.82).toFixed(2)})` } as React.CSSProperties}
                      className="display-lg caps mt-5 text-ink text-[length:min(clamp(2.6rem,6.4vw,6rem),var(--title-fit))] [&:lang(ka)]:text-[length:min(clamp(2rem,4.6vw,4.2rem),var(--title-fit))]"
                    >
                      {name}
                    </h2>
                    <p className="font-display mt-3 text-3xl font-light text-stone lining-nums">{award.vintage}</p>

                    <div className="mt-10 border-t border-ink/15 pt-8">
                      <p className="display-sm text-ink">{award.competition.title[language]}</p>
                      <p className="mt-3 text-sm text-umber">
                        {award.competition.organizer[language]}
                        {award.competition.date && <span className="text-stone"> · {award.competition.date[language]}</span>}
                      </p>
                    </div>

                    <p className="body-copy mt-8 max-w-lg text-umber">{storyFor(award)[language]}</p>

                    <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
                      {slug && (
                        <ButtonLink href={`/wines/${slug}`} variant="outline" arrow>
                          {name}
                        </ButtonLink>
                      )}
                      <button type="button" onClick={() => setOpen(true)} className="label link-line text-ink">
                        {t.awards.viewCertificate}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The competitions and their stories */}
      <section aria-labelledby="competitions" className="py-20 md:py-28">
        <Container size="wide">
          <Reveal>
            <h2 id="competitions" className="display-md text-ink">
              {t.awards.competitionsTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-12 border-b border-ink/12">
              {competitions.map((competition) => (
                <li key={competition.id} id={competition.id} className="border-t border-ink/12">
                  <details className="group">
                    <summary className="grid cursor-pointer list-none grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-6 py-7 md:grid-cols-[8rem_1fr_16rem_auto] md:gap-x-10 [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-2xl font-light text-bronze lining-nums md:text-3xl">
                        {competition.year ?? t.awards.kartliShort}
                      </span>
                      <span className="display-sm text-ink transition-colors duration-500 group-hover:text-bronze">
                        {competition.title[language]}
                      </span>
                      <span className="hidden text-sm text-stone md:block">{competition.date?.[language]}</span>
                      <span
                        aria-hidden="true"
                        className="relative h-3 w-3 self-center before:absolute before:top-1/2 before:left-0 before:h-px before:w-3 before:bg-ink after:absolute after:top-0 after:left-1/2 after:h-3 after:w-px after:bg-ink after:transition-transform after:duration-500 group-open:after:scale-y-0"
                      />
                    </summary>
                    <div className="grid pb-10 md:grid-cols-[8rem_1fr_16rem_auto] md:gap-x-10">
                      <div className="body-copy max-w-2xl space-y-5 text-umber md:col-start-2">
                        <p className="eyebrow text-stone">{competition.organizer[language]}</p>
                        {competition.story.map((paragraph) => (
                          <p key={paragraph.en}>{paragraph[language]}</p>
                        ))}
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-20 flex justify-center">
            <ButtonLink href="/wines" variant="solid" arrow>
              {t.awards.discoverWines}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Lightbox
        open={open}
        index={index}
        slides={certificates.map((entry) => ({
          src: `/images/awards/${entry.certificate}`,
          alt: `${wineNames[entry.wine][language]} ${entry.vintage} — ${entry.competition.title[language]}`,
        }))}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
