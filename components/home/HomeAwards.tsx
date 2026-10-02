"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Arrow from "@/components/ui/Arrow";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Lightbox from "@/components/ui/Lightbox";
import Reveal from "@/components/ui/Reveal";
import { MedalBadge, medalLabels } from "@/components/awards/medals";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { allAwards, wineNames } from "@/components/data/awards";

// Only awards with a scanned certificate appear here; the full list with
// stories lives on the /awards page.
const awards = allAwards.filter((award) => award.certificate);

const years = [...new Set(awards.map((award) => award.competition.year))];

const AUTOPLAY_MS = 4500;
const SLIDE_MS = 1100;

export default function HomeAwards() {
  const { t, language } = useLanguage();
  const [year, setYear] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const visible = year === null ? awards : awards.filter((award) => award.competition.year === year);

  // Slider: cards move right-to-left one at a time. The first few cards are
  // repeated at the end of the track so the wrap-around looks continuous;
  // after that slide finishes the track jumps back without animating.
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);
  const pendingIndex = useRef<number | null>(null);

  const count = visible.length;
  const loops = count > perView;
  const track = loops ? [...visible, ...visible.slice(0, perView)] : visible;

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const medium = window.matchMedia("(min-width: 640px)");
    const update = () => setPerView(wide.matches ? 4 : medium.matches ? 2 : 1);
    update();
    wide.addEventListener("change", update);
    medium.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      medium.removeEventListener("change", update);
    };
  }, []);

  const next = () => {
    if (!loops) return;
    setIndex((prev) => Math.min(prev + 1, count));
  };

  const previous = () => {
    if (!loops) return;
    if (index === 0) {
      pendingIndex.current = visible.length - 1;
      setAnimate(false);
      setIndex(visible.length);
      return;
    }
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const chooseYear = (value: number | null) => {
    setYear(value);
    setAnimate(false);
    setIndex(0);
  };

  // Re-enable the transition a couple of frames after an unanimated jump.
  useEffect(() => {
    if (animate) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        setAnimate(true);
        if (pendingIndex.current !== null) {
          setIndex(pendingIndex.current);
          pendingIndex.current = null;
        }
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  useEffect(() => {
    if (paused || open || !loops) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((prev) => Math.min(prev + 1, count)), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, open, loops, count]);

  const handleTransitionEnd = (event: React.TransitionEvent) => {
    if (event.target !== event.currentTarget) return;
    if (index >= visible.length) {
      setAnimate(false);
      setIndex(index - visible.length);
    }
  };

  const medals = medalLabels(t);

  const stats = [
    { value: allAwards.length, label: t.awards.statAwards },
    { value: allAwards.filter((a) => a.medal === "gold").length, label: t.awards.statGold },
    { value: allAwards.filter((a) => a.medal === "silver").length, label: t.awards.statSilver },
    { value: allAwards.filter((a) => a.medal === "bronze").length, label: t.awards.statBronze },
  ];

  const filters = [{ value: null, label: t.awards.filterAll }, ...years.map((y) => ({ value: y, label: String(y) }))];

  const control =
    "flex h-12 w-12 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink";

  return (
    <section id="awards" className="on-dark overflow-hidden bg-night py-24 text-paper md:py-36">
      <Container size="wide">
        {/* Heading + stats */}
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-gold">{t.awards.eyebrow}</p>
            <h2 className="display-lg mt-6">{t.awards.title}</h2>
            <p className="body-copy mt-6 max-w-lg text-paper/65">{t.awards.description}</p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <dl className="grid grid-cols-4 border-t border-paper/15">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col-reverse justify-end pt-6 ${i > 0 ? "border-l border-paper/15 pl-4 sm:pl-6" : ""}`}
                >
                  <dt className="mt-2 text-[0.6875rem] leading-snug tracking-[0.08em] text-paper/55 uppercase">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-5xl font-light text-gold lining-nums sm:text-6xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Year filter + controls */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-b border-paper/10 pb-6 md:mt-28">
          <div role="group" className="flex flex-wrap gap-x-8 gap-y-3">
            {filters.map((filter) => {
              const active = filter.value === year;
              return (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => chooseYear(filter.value)}
                  aria-pressed={active}
                  className={`label relative py-1 transition-colors duration-300 ${
                    active ? "text-paper" : "text-paper/45 hover:text-paper"
                  }`}
                >
                  {filter.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-[1.6rem] h-px bg-gold transition-transform duration-500 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {loops && (
            <div className="flex gap-3">
              <button type="button" onClick={previous} aria-label={t.ui.previous} className={control}>
                <Arrow direction="left" className="w-5" />
              </button>
              <button type="button" onClick={next} aria-label={t.ui.next} className={control}>
                <Arrow className="w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Certificates */}
        <div
          className="-mx-3 mt-12 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            key={year ?? "all"}
            onTransitionEnd={handleTransitionEnd}
            className="flex"
            style={{
              transform: `translateX(-${(index * 100) / perView}%)`,
              transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : "none",
            }}
          >
            {track.map((award, trackIndex) => (
              <div
                key={`${award.certificate}-${trackIndex}`}
                className="shrink-0 px-3"
                style={{ width: `${100 / perView}%` }}
                aria-hidden={trackIndex >= visible.length ? true : undefined}
              >
                <button
                  type="button"
                  tabIndex={trackIndex >= visible.length ? -1 : undefined}
                  onClick={() => {
                    setPhotoIndex(trackIndex % visible.length);
                    setOpen(true);
                  }}
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper/[0.04] transition-colors duration-700 group-hover:bg-paper/[0.08]">
                    <Image
                      src={`/images/awards/${award.certificate}`}
                      alt={`${wineNames[award.wine][language]} ${award.vintage} — ${award.competition.title[language]} ${award.competition.year}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-contain p-8 transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <MedalBadge medal={award.medal} label={medals[award.medal]} className="text-paper/80" />
                    <span className="text-xs text-paper/45">{award.competition.year}</span>
                  </div>
                  <h3 className="display-sm caps mt-3 text-paper">
                    {wineNames[award.wine][language]} <span className="text-paper/45">{award.vintage}</span>
                  </h3>
                  <p className="mt-1 text-sm text-paper/50">{award.competition.title[language]}</p>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <ButtonLink href="/awards" variant="outline-light" arrow>
            {t.awards.viewAll}
          </ButtonLink>
        </div>
      </Container>

      <Lightbox
        open={open}
        index={photoIndex}
        slides={visible.map((award) => ({
          src: `/images/awards/${award.certificate}`,
          alt: `${wineNames[award.wine][language]} ${award.vintage}`,
        }))}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
