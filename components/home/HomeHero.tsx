"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.3, ease, delay },
});

export default function HomeHero() {
  const { t } = useLanguage();
  const video = useRef<HTMLVideoElement>(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  // The poster (an optimised still from the film) paints first; the film is
  // only attached afterwards, and never for reduced motion or Save-Data.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const frame = requestAnimationFrame(() => setPlayVideo(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="on-dark relative flex h-[100svh] min-h-[38rem] items-end overflow-hidden bg-night text-paper">
      <Image
        src="/images/film/hero-poster.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />

      {playVideo && (
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/video/okami-hero-540.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/video/okami-hero-1080.mp4" type="video/mp4" />
        </video>
      )}

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/35 to-night/25" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night/50 to-transparent" />

      <Container size="wide" className="relative pb-24 md:pb-20">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p {...rise(0.3)} className="eyebrow text-gold">
              {t.hero.eyebrow}
            </motion.p>

            <motion.h1 {...rise(0.45)} lang="en" className="mt-6">
              <span className="display-xl block">Etno Okami</span>
              <span className="label mt-5 block tracking-[0.5em] text-paper/80">Winery</span>
            </motion.h1>

            <motion.p {...rise(0.65)} className="body-copy mt-8 max-w-lg text-paper/80 md:text-lg">
              {t.hero.description}
            </motion.p>

            <motion.div {...rise(0.8)} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              <ButtonLink href="/wines" variant="light" arrow>
                {t.hero.button}
              </ButtonLink>
              <ButtonLink href="/story" variant="text-light" className="link-line">
                {t.hero.secondary}
              </ButtonLink>
            </motion.div>
          </div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.1 }}
            className="hidden border-l border-paper/20 pl-6 text-sm text-paper/70 lg:col-span-3 lg:col-start-10 lg:block"
          >
            <dt className="sr-only">{t.home.factRegion}</dt>
            <dd>{t.hero.location}</dd>
            <dt className="sr-only">{t.home.factFounded}</dt>
            <dd className="mt-2">{t.hero.since}</dd>
          </motion.dl>
        </div>
      </Container>

      {/* Scroll cue */}
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 hidden h-16 w-px -translate-x-1/2 overflow-hidden md:block">
        <span className="scroll-cue block h-full w-full bg-paper/70" />
      </div>
    </section>
  );
}
