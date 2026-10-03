"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";

const ease = [0.22, 1, 0.36, 1] as const;

// The film opens on 0.27s of black; playback starts just after it, and the
// poster is that exact frame (hero-film-start.jpg), so the swap is invisible.
const FILM_START = 0.3;

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

  // Scroll reveal: as the page scrolls, the film drifts up at half speed and
  // the copy lifts and fades under a deepening shade, so the hero folds away
  // beneath the next section instead of leaving all at once. Translation
  // only — the film is never scaled. Reduced motion switches it off in CSS, so
  // server and client render the same markup.
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  // A clamped function, not a keyframe range: the browser's scroll-driven
  // version of a range runs past its end and brings the copy back.
  const contentOpacity = useTransform(scrollYProgress, (progress) => Math.max(0, 1 - progress / 0.55));
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

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
    <section ref={section} className="on-dark relative flex h-[100svh] min-h-[38rem] items-end overflow-hidden bg-night text-paper">
      <motion.div
        aria-hidden="true"
        style={{ y: mediaY }}
        className="absolute inset-0 will-change-transform motion-reduce:transform-none!"
      >
        <Image
          src="/images/film/hero-film-start.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />

        {playVideo && (
          <video
            ref={video}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={(event) => {
              // Show the film while still paused on the poster's own frame — an
              // instant, invisible swap, never a crossfade against a moving
              // picture — and only start playback once it is on screen.
              if (playing) return;
              const element = event.currentTarget;
              setPlaying(true);
              requestAnimationFrame(() => requestAnimationFrame(() => element.play().catch(() => {})));
            }}
            onEnded={(event) => {
              // Loop by hand so the restart also skips the black lead-in.
              event.currentTarget.currentTime = FILM_START;
              event.currentTarget.play().catch(() => {});
            }}
            className={`absolute inset-0 h-full w-full object-cover ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={`/video/okami-hero-540.mp4#t=${FILM_START}`} type="video/mp4" media="(max-width: 767px)" />
            <source src={`/video/okami-hero-1080.mp4#t=${FILM_START}`} type="video/mp4" />
          </video>
        )}
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/35 to-night/25" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night/50 to-transparent" />
      <motion.div
        aria-hidden="true"
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 bg-night motion-reduce:hidden"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative w-full motion-reduce:transform-none! motion-reduce:opacity-100!"
      >
        <Container size="wide" className="relative pb-16 md:pb-12">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <motion.p {...rise(0.3)} className="eyebrow text-gold [&:lang(ka)]:tracking-[0.03em]">
                {t.hero.eyebrow}
              </motion.p>

              <motion.h1 {...rise(0.45)} lang="en" className="mt-4">
                <span className="display-lg block">Etno Okami</span>
                <span className="label mt-1 block tracking-[0.5em] text-paper/80">Winery</span>
              </motion.h1>

              <motion.p {...rise(0.65)} className="body-copy mt-3 max-w-lg text-paper/80 md:text-lg [&:lang(ka)]:tracking-[-0.01em]">
                {t.hero.description}
              </motion.p>

              <motion.div {...rise(0.8)} className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-5">
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
      </motion.div>

      {/* Scroll cue */}
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 hidden h-16 w-px -translate-x-1/2 overflow-hidden md:block">
        <span className="scroll-cue block h-full w-full bg-paper/70" />
      </div>
    </section>
  );
}
