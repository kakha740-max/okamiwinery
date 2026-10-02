"use client";

import { useState } from "react";
import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import Lightbox from "@/components/ui/Lightbox";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { galleryImage } from "@/components/data/gallery";

// Four photographs in an asymmetric mosaic — a doorway to the full gallery.
const mosaic = [
  { image: galleryImage("story9.png"), layout: "col-span-2 aspect-[4/5] md:col-span-6 md:row-span-2 md:aspect-auto", sizes: "(min-width: 768px) 48vw, 100vw" },
  { image: galleryImage("story5.png"), layout: "aspect-square md:col-span-3 md:aspect-auto", sizes: "(min-width: 768px) 24vw, 50vw" },
  { image: galleryImage("2.png"), layout: "aspect-square md:col-span-3 md:aspect-auto", sizes: "(min-width: 768px) 24vw, 50vw" },
  { image: galleryImage("24.png"), layout: "col-span-2 aspect-[16/10] md:col-span-6 md:aspect-auto", sizes: "(min-width: 768px) 48vw, 100vw" },
];

export default function HomeEstate() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <section id="gallery" className="bg-paper py-24 md:py-36">
      <Container size="wide">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-bronze">{t.discover.eyebrow}</p>
            <h2 className="display-lg mt-6 text-ink">{t.discover.title}</h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <p className="body-copy text-umber">{t.discover.description}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 md:h-[min(82vh,52rem)] md:grid-cols-12 md:grid-rows-2 md:gap-4">
          {mosaic.map(({ image, layout, sizes }, index) => (
            <ImageReveal key={image.src} delay={index * 0.12} className={layout}>
              <button
                type="button"
                onClick={() => {
                  setPhotoIndex(index);
                  setOpen(true);
                }}
                aria-label={`${t.ui.openImage}: ${image.alt[language]}`}
                className="group absolute inset-0 block h-full w-full"
              >
                <Image
                  src={`/images/${image.src}`}
                  alt={image.alt[language]}
                  fill
                  sizes={sizes}
                  className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
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
        slides={mosaic.map(({ image }) => ({ src: `/images/${image.src}`, alt: image.alt[language] }))}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
