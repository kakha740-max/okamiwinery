"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import Container from "./Container";

type PageHeroProps = {
  image: string;
  /** Decorative by default — the h1 carries the meaning. */
  imageAlt?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** CSS object-position for the photograph. */
  focus?: string;
};

// Full-bleed photographic opening used by every inner page: the page title
// sits on the image, bottom-left, like a magazine opener.
//
// Scroll reveal, as on the home page hero: the photograph drifts up at half
// speed and the copy lifts and fades under a deepening shade, so the opener
// folds away beneath the content. Translation only. Reduced motion switches
// it off in CSS, so server and client render the same markup.
export default function PageHero({ image, imageAlt = "", eyebrow, title, intro, focus = "50% 50%" }: PageHeroProps) {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  // A clamped function, not a keyframe range: the browser's scroll-driven
  // version of a range runs past its end and brings the copy back.
  const contentOpacity = useTransform(scrollYProgress, (progress) => Math.max(0, 1 - progress / 0.55));
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  return (
    <section
      ref={section}
      className="on-dark relative flex h-[78svh] min-h-[34rem] max-h-[56rem] items-end overflow-hidden bg-night text-paper"
    >
      <motion.div style={{ y: mediaY }} className="absolute inset-0 will-change-transform motion-reduce:transform-none!">
        <Image
          src={image}
          alt={imageAlt}
          fill
          preload
          sizes="100vw"
          className="slow-zoom object-cover"
          style={{ objectPosition: focus }}
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-night/40" />
      <motion.div
        aria-hidden="true"
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 bg-night motion-reduce:hidden"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative w-full motion-reduce:transform-none! motion-reduce:opacity-100!"
      >
        <Container size="wide" className="relative pb-14 md:pb-20">
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="display-lg mt-5 max-w-4xl">{title}</h1>
          {intro && <p className="body-copy mt-6 max-w-xl text-paper/75">{intro}</p>}
        </Container>
      </motion.div>
    </section>
  );
}
