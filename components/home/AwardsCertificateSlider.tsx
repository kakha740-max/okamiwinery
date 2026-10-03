"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";

import Lightbox from "@/components/ui/Lightbox";
import { medalLabels } from "@/components/awards/medals";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { allAwards, wineNames } from "@/components/data/awards";

const certificates = allAwards.filter((award) => award.certificate);

const AUTOPLAY_MS = 5000;
const glide = { duration: 1.1, ease: [0.65, 0, 0.35, 1] as const };

// Certificates float on the section's own background: each glides in from
// the side it travels from (right for "next") as it fades in, while the
// previous one drifts out the other way and fades — no panel, no hard edge.
// The outgoing certificate leaves quickly and the new one arrives just after,
// so the two never sit half-transparent on top of each other.
const slide = {
  enter: (direction: number) => ({ x: direction > 0 ? "35%" : "-35%", opacity: 0 }),
  center: { x: "0%", opacity: 1, transition: { ...glide, delay: 0.25 } },
  exit: (direction: number) => ({
    x: direction > 0 ? "-35%" : "35%",
    opacity: 0,
    transition: { duration: 0.6, ease: [0.55, 0, 1, 0.45] as const },
  }),
};

// One certificate at a time, gliding right to left between two small
// arrow buttons. Click for the full certificate; swipe or use the arrows; autoplay
// pauses on hover, off screen and with reduced motion.
export default function AwardsCertificateSlider() {
  const { t, language } = useLanguage();
  const medals = medalLabels(t);
  const reduceMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);

  const [[index, direction], setPosition] = useState([0, 1]);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);
  const [restart, setRestart] = useState(0);

  const count = certificates.length;
  const award = certificates[index];

  const go = (step: number) => {
    setPosition(([current]) => [(current + step + count) % count, step]);
    setRestart((value) => value + 1);
  };

  useEffect(() => {
    const element = root.current;
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

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (Math.abs(swipe) > 60) go(swipe < 0 ? 1 : -1);
    requestAnimationFrame(() => (dragged.current = false));
  };

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.home.awardsTitle}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Certificate stage — clipped only on narrow screens, where a slide would reach the viewport edge */}
      <div className="relative aspect-[5/6] w-full max-lg:overflow-x-clip xl:aspect-[4/3]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.button
            key={award.certificate}
            type="button"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={glide}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={onDragEnd}
            onClick={() => !dragged.current && setOpen(true)}
            aria-label={`${t.awards.viewCertificate} — ${wineNames[award.wine][language]} ${award.vintage}`}
            className="group absolute inset-0 flex cursor-zoom-in items-center justify-center"
          >
            <span className="relative block h-[80%] w-[72%] transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:-translate-y-1">
              <Image
                src={`/images/awards/${award.certificate}`}
                alt=""
                fill
                draggable={false}
                sizes="(min-width: 1024px) 26vw, 80vw"
                className="pointer-events-none object-contain drop-shadow-[0_24px_34px_rgb(23_19_15/0.2)]"
              />
            </span>
          </motion.button>
        </AnimatePresence>

        {/* Arrows either side of the certificate: thin chevrons in hairline circles */}
        {[
          { step: -1, label: t.ui.previous, side: "left-0", path: "M9.5 3 4.5 8l5 5" },
          { step: 1, label: t.ui.next, side: "right-0", path: "M6.5 3l5 5-5 5" },
        ].map(({ step, label, side, path }) => (
          <button
            key={step}
            type="button"
            onClick={() => go(step)}
            aria-label={label}
            className={`absolute top-1/2 ${side} z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-paper/80 text-ink/60 backdrop-blur-sm transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-white`}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
              <path d={path} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      {/* Caption */}
      <div aria-live="polite" className="mt-6 min-h-[4.5rem]">
        <p className="eyebrow text-bronze">{medals[award.medal]}</p>
        <p className="mt-2 text-ink">
          <span className="caps font-display text-xl">{wineNames[award.wine][language]}</span>{" "}
          <span className="font-display text-xl text-stone lining-nums">{award.vintage}</span>
        </p>
        <p className="mt-1 text-sm text-stone">
          {award.competition.title[language]}
          {award.competition.year && ` · ${award.competition.year}`}
        </p>
      </div>

      <Lightbox
        open={open}
        index={index}
        slides={certificates.map((entry) => ({
          src: `/images/awards/${entry.certificate}`,
          alt: `${wineNames[entry.wine][language]} ${entry.vintage} — ${entry.competition.title[language]}`,
        }))}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
