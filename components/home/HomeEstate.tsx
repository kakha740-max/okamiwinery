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

// Four photographs in an asymmetric mosaic — a doorway to the full gallery.
// Three in black and white (scripts/generate-heritage-bw.mjs), one in colour.
// Landscape photos fill portrait tiles, so `sizes` covers the width they
// are drawn at.
const mosaic: { src: string; alt: Localized; position: string; layout: string; sizes: string }[] = [
  {
    src: "heritage/estate-qvevri-bw.jpg",
    alt: galleryImage("33.png").alt,
    position: "60% 50%",
    layout: "col-span-2 aspect-[4/5] md:col-span-6 md:row-span-2 md:aspect-auto",
    sizes: "(min-width: 768px) 92vw, 200vw",
  },
  {
    src: "heritage/estate-building-bw.jpg",
    alt: galleryImage("29.webp").alt,
    position: "50% 50%",
    layout: "aspect-square md:col-span-3 md:aspect-auto",
    sizes: "(min-width: 768px) 38vw, 75vw",
  },
  {
    src: "heritage/estate-bottles-bw.jpg",
    alt: galleryImage("4.png").alt,
    position: "30% 50%",
    layout: "aspect-square md:col-span-3 md:aspect-auto",
    sizes: "(min-width: 768px) 38vw, 75vw",
  },
  {
    src: "21.jpg",
    alt: galleryImage("21.jpg").alt,
    position: "50% 60%",
    layout: "col-span-2 aspect-[16/10] md:col-span-6 md:aspect-auto",
    sizes: "(min-width: 768px) 48vw, 100vw",
  },
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

        <div className="grid grid-cols-2 gap-3 md:h-[min(82vh,52rem)] md:grid-cols-12 md:grid-rows-2 md:gap-4">
          {mosaic.map(({ src, alt, position, layout, sizes }, index) => (
            <ImageReveal key={src} delay={index * 0.12} className={layout}>
              <button
                type="button"
                onClick={() => {
                  setPhotoIndex(index);
                  setOpen(true);
                }}
                aria-label={`${t.ui.openImage}: ${alt[language]}`}
                className="group absolute inset-0 block h-full w-full"
              >
                <Image
                  src={`/images/${src}`}
                  alt={alt[language]}
                  fill
                  quality={90}
                  sizes={sizes}
                  className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                  style={{ objectPosition: position }}
                />
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
        slides={mosaic.map(({ src, alt }) => ({ src: `/images/${src}`, alt: alt[language] }))}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
