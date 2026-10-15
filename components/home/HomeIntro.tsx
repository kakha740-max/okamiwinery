"use client";

import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import ImageReveal from "@/components/ui/ImageReveal";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HomeIntro() {
  const { t } = useLanguage();

  return (
    <section className="bg-paper py-24 md:py-36">
      {/* As on the story page: the photograph whole and running to the
          screen's edge, the words beside it, aligned with the page's grid */}
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-0">
        {/* Text */}
        <div className="px-5 sm:px-8 lg:col-span-5 lg:pr-16 lg:pl-[max(3rem,calc((100vw-96rem)/2+3rem))]">
          <Reveal>
            <p className="eyebrow text-bronze">{t.experience.eyebrow}</p>
            <h2 className="display-md mt-6 text-ink lining-nums">{t.experience.title}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="body-copy mt-8 max-w-md text-umber">{t.experience.description}</p>
            <ButtonLink href="/story" variant="text" arrow className="mt-10">
              {t.home.storyLink}
            </ButtonLink>
          </Reveal>
        </div>

        {/* The small barrels in black and white (scripts/generate-heritage-bw.mjs),
            at the photograph's own proportions */}
        <ImageReveal className="aspect-[1764/891] w-full lg:col-span-7">
          <Image
            src="/images/heritage/barrels-bw.jpg"
            alt={t.experience.title}
            fill
            quality={90}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </ImageReveal>
      </div>
    </section>
  );
}
