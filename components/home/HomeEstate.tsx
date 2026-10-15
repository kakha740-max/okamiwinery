"use client";

import { useState } from "react";
import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import Lightbox from "@/components/ui/Lightbox";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Localized } from "@/components/data/awards";
import { galleryImage } from "@/components/data/gallery";

// "The path of our wine", as the section's text tells it: vineyard → cellar
// → qvevri → wine. Four tall panels side by side in one muted warmth
// (scripts/generate-natural-edits.mjs); the one under the pointer or focus
// widens while the others give way. Names come from messages/*.json
// ("discover.path"), in the same order.
const path: { src: string; alt: Localized; position: string }[] = [
  {
    src: "path/path-vineyard.jpg",
    alt: {
      en: "Students harvesting grapes in the vineyard",
      ka: "სტუდენტები ვენახში რთველზე",
      ru: "Студенты на сборе винограда в винограднике",
    },
    position: "64% 50%",
  },
  { src: "path/path-cellar.jpg", alt: galleryImage("2.png").alt, position: "62% 50%" },
  {
    src: "path/path-qvevri.jpg",
    alt: {
      en: "A chapi drawing wine from a qvevri",
      ka: "ჩაფით ქვევრიდან ღვინის ამოღება",
      ru: "Чапи для забора вина из квеври",
    },
    position: "48% 50%",
  },
  { src: "path/path-wine.jpg", alt: galleryImage("20.jpg").alt, position: "38% 50%" },
];

export default function HomeEstate() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <section id="gallery" className="bg-white py-24 md:py-36">
      <Container size="wide">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-bronze">{t.discover.eyebrow}</p>
            <h2 className="display-lg mt-6 text-ink">{t.discover.title}</h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <p className="body-copy text-umber">{t.discover.estateText}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 md:flex md:h-[min(78vh,46rem)] md:gap-4">
          {path.map(({ src, alt, position }, index) => (
            <ImageReveal
              key={src}
              delay={index * 0.12}
              className="group aspect-[3/4] md:aspect-auto md:flex-1 md:transition-[flex-grow] md:duration-[900ms] md:ease-[var(--ease-luxe)] md:hover:flex-[2.3] md:has-[:focus-visible]:flex-[2.3] motion-reduce:transition-none"
            >
                <button
                  type="button"
                  onClick={() => {
                    setPhotoIndex(index);
                    setOpen(true);
                  }}
                  aria-label={`${t.ui.openImage}: ${alt[language]}`}
                  className="absolute inset-0 block h-full w-full text-left"
                >
                  <Image
                    src={`/images/${src}`}
                    alt={alt[language]}
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 45vw, 50vw"
                    className="object-cover brightness-[0.92] transition-[transform,filter] duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.03] group-hover:brightness-100"
                    style={{ objectPosition: position }}
                  />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/75 via-night/25 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-paper md:p-7">
                    <span className="flex items-center gap-3 text-[0.6875rem] tracking-[0.18em] text-gold tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                      <span aria-hidden="true" className="h-px w-6 bg-gold/70 transition-[width] duration-700 ease-[var(--ease-luxe)] md:group-hover:w-12" />
                    </span>
                    <span className="mt-2 block font-display text-2xl leading-tight font-light md:mt-3 md:text-[clamp(1.6rem,2.2vw,2.3rem)] [&:lang(ka)]:text-xl md:[&:lang(ka)]:text-[clamp(1.25rem,1.6vw,1.75rem)]">
                      {t.discover.path[index]}
                    </span>
                  </span>
                </button>
            </ImageReveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="/gallery" variant="outline" arrow>
            {t.discover.viewAll}
          </ButtonLink>
        </div>
      </Container>

      <Lightbox
        open={open}
        index={photoIndex}
        slides={path.map(({ src, alt }) => ({ src: `/images/${src}`, alt: alt[language] }))}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
