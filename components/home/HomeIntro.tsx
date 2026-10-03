"use client";

import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HomeIntro() {
  const { t } = useLanguage();

  return (
    <section className="bg-paper py-24 md:py-36">
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Text */}
          <div className="lg:col-span-5 lg:pt-10">
            <Reveal>
              <p className="eyebrow text-bronze">{t.experience.eyebrow}</p>
              <h2 className="display-md mt-6 text-ink">{t.experience.title}</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="body-copy mt-8 max-w-md text-umber">{t.experience.description}</p>
              <ButtonLink href="/story" variant="text" arrow className="mt-10">
                {t.home.storyLink}
              </ButtonLink>
            </Reveal>
          </div>

          {/* The small barrels in black and white (scripts/generate-heritage-bw.mjs) */}
          <div className="relative lg:col-span-7 lg:col-start-6">
            <ImageReveal className="ml-auto aspect-square w-full lg:w-[82%]">
              <Image
                src="/images/heritage/barrels-bw.jpg"
                alt={t.experience.title}
                fill
                quality={90}
                // A 2:1 photo in a square frame renders ~2× the frame's width.
                sizes="(min-width: 1024px) 88vw, 200vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
