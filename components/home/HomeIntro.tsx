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

          {/* Image pair */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            <ImageReveal className="aspect-[4/5] w-[82%] sm:aspect-[5/6]">
              <Image
                src="/images/2.png"
                alt={t.experience.title}
                fill
                sizes="(min-width: 1024px) 40vw, 82vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="absolute right-0 bottom-[-12%] w-[44%] border-[6px] border-paper sm:border-[10px]">
              <ImageReveal delay={0.25} className="aspect-[4/5]">
                <Image
                  src="/images/film/qvevri-cellar.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22vw, 44vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
