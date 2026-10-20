"use client";

import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Localized } from "@/components/data/awards";
import { galleryImage } from "@/components/data/gallery";

// "The path of our wine", as the section's text tells it: the wooden dome, the harvest
// → qvevri → wine. Four tall photographs side by side in one muted warmth
// (scripts/generate-natural-edits.mjs). No captions and nothing to open: the
// one under the pointer (or finger) widens and comes up a little brighter.
const path: { src: string; alt: Localized; position: string }[] = [
  {
    src: "path/path-ceiling.jpg",
    alt: {
      en: "A wooden dome ceiling spiralling up to a skylight",
      ka: "ხის გუმბათოვანი ჭერი სინათლის ღიობით",
      ru: "Деревянный купольный потолок со световым проёмом",
    },
    position: "56% 45%",
  },
  {
    src: "path/path-grapes.jpg",
    alt: {
      en: "A basket of freshly picked white grapes",
      ka: "კალათა ახლად მოკრეფილი თეთრი ყურძნით",
      ru: "Корзина со свежесобранным белым виноградом",
    },
    position: "58% 50%",
  },
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
            <ImageReveal key={src} delay={index * 0.12} className="group aspect-[3/4] md:aspect-auto md:flex-1 md:transition-[flex-grow] md:duration-[900ms] md:ease-[var(--ease-luxe)] md:hover:flex-[2.3] motion-reduce:transition-none">
              <Image
                src={`/images/${src}`}
                alt={alt[language]}
                fill
                quality={90}
                sizes="(min-width: 768px) 45vw, 50vw"
                className="object-cover brightness-[0.92] transition-[transform,filter] duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04] group-hover:brightness-100 group-active:scale-[1.04] group-active:brightness-100 motion-reduce:transition-none"
                style={{ objectPosition: position }}
              />
            </ImageReveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="/gallery" variant="outline" arrow>
            {t.discover.viewAll}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
