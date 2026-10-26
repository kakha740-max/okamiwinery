"use client";

import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Localized } from "@/components/data/awards";
import { galleryImage } from "@/components/data/gallery";

// The partnership with Caucasus International University, told by the story
// page's own chain — university → faculty → research → practice — with one
// photograph for each link, set as a bento grid on the warm bone ground.
const tiles: { src: string; alt?: Localized; position: string; cell: string; sizes: string }[] = [
  {
    src: "university.png",
    position: "30% 50%",
    cell: "col-span-2 aspect-[4/3] lg:col-span-6 lg:row-span-2 lg:aspect-auto",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  {
    src: "56.png",
    alt: galleryImage("56.png").alt,
    position: "50% 60%",
    cell: "aspect-square lg:col-span-3 lg:aspect-auto",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    src: "53.png",
    alt: galleryImage("53.png").alt,
    position: "45% 50%",
    cell: "aspect-square lg:col-span-3 lg:aspect-auto",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    src: "42.png",
    alt: {
      en: "A student checks the grapes’ sugar with a refractometer",
      ka: "სტუდენტი რეფრაქტომეტრით ყურძნის შაქრიანობას ამოწმებს",
      ru: "Студент проверяет сахаристость винограда рефрактометром",
      zh: "学生用折射仪检测葡萄的糖度",
    },
    position: "40% 35%",
    cell: "col-span-2 aspect-[16/9] lg:col-span-6 lg:aspect-auto",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
];

export default function HomeUniversity() {
  const { t, language } = useLanguage();
  const h = t.history;

  return (
    <section id="university" className="bg-bone py-24 text-ink md:py-36">
      <Container size="wide">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-bronze">{h.academic.chain[0]}</p>
            <h2 className="display-lg mt-6">{h.academic.title}</h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <p className="body-copy text-umber">{h.intro[2]}</p>
          </Reveal>
        </div>

        {/* Each photograph carries its link in the chain, numbered in reading order */}
        <ol className="grid grid-cols-2 gap-3 md:gap-4 lg:h-[min(84vh,48rem)] lg:grid-cols-12 lg:grid-rows-2">
          {tiles.map(({ src, alt, position, cell, sizes }, index) => (
            <li key={src} className={cell}>
              <ImageReveal delay={index * 0.12} className="group h-full w-full">
                <Image
                  src={`/images/${src}`}
                  alt={alt ? alt[language] : h.academic.chain[0]}
                  fill
                  quality={90}
                  sizes={sizes}
                  className="object-cover brightness-[0.88] transition-[transform,filter] duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04] group-hover:brightness-100 motion-reduce:transition-none"
                  style={{ objectPosition: position }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-baseline gap-4 p-4 md:p-6">
                  <span className="text-[0.6875rem] tracking-[0.12em] text-gold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-base leading-snug text-paper md:text-xl uncased:text-sm md:uncased:text-base">
                    {h.academic.chain[index]}
                  </p>
                </div>
              </ImageReveal>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 border-t border-ink/12 pt-12 md:mt-24 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span aria-hidden="true" className="block h-px w-12 bg-gold" />
            <p className="mt-8 font-display text-[clamp(1.5rem,2.5vw,2.4rem)] leading-[1.3] font-light text-ink italic lining-nums uncased:text-[clamp(1.2rem,1.8vw,1.7rem)] uncased:leading-[1.65] uncased:not-italic">
              {h.academic.paragraphs[3]}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:flex lg:justify-end">
            <ButtonLink href="/story#academic" variant="outline" arrow>
              {t.home.universityLink}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
