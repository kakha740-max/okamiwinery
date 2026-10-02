"use client";

import { useState } from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import Lightbox from "@/components/ui/Lightbox";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { galleryImage, galleryImages } from "@/components/data/gallery";

// A five-beat editorial rhythm that repeats down the page: one wide
// panorama, a large/small pair, then an offset pair.
const rhythm = [
  { cell: "md:col-span-12", frame: "aspect-[4/3] md:aspect-[21/9]", sizes: "100vw" },
  { cell: "md:col-span-7", frame: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
  { cell: "md:col-span-5 md:self-end", frame: "aspect-[4/5]", sizes: "(min-width: 768px) 40vw, 100vw" },
  { cell: "md:col-span-5 md:col-start-2", frame: "aspect-[4/5]", sizes: "(min-width: 768px) 40vw, 100vw" },
  { cell: "md:col-span-5 md:col-start-8 md:mt-40", frame: "aspect-[4/3]", sizes: "(min-width: 768px) 40vw, 100vw" },
];

// If the photos don't fill the last beat, finish on an even pair instead.
const closingPair = { cell: "md:col-span-6", frame: "aspect-[4/3]", sizes: "(min-width: 768px) 48vw, 100vw" };

function layoutFor(index: number, total: number) {
  const leftover = total % rhythm.length;
  if (leftover === 2 && index >= total - 2) return closingPair;
  return rhythm[index % rhythm.length];
}

export default function GalleryEditorial() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      <PageHero
        image="/images/story2.png"
        imageAlt={galleryImage("story2.png").alt[language]}
        eyebrow={t.discover.eyebrow}
        title={t.discover.pageTitle}
        intro={t.discover.description}
      />

      <Container size="wide" className="py-16 md:py-28">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-x-6 md:gap-y-6">
          {galleryImages.map((image, index) => {
            const { cell, frame, sizes } = layoutFor(index, galleryImages.length);
            return (
              <li key={image.src} className={cell}>
                <ImageReveal className={frame}>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoIndex(index);
                      setOpen(true);
                    }}
                    aria-label={`${t.ui.openImage}: ${image.alt[language]}`}
                    className="group absolute inset-0 block h-full w-full cursor-zoom-in"
                  >
                    <Image
                      src={`/images/${image.src}`}
                      alt={image.alt[language]}
                      fill
                      sizes={sizes}
                      className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.035]"
                    />
                  </button>
                </ImageReveal>
                <p className="mt-3 text-xs tracking-[0.04em] text-stone">
                  <span className="mr-3 text-bronze">{String(index + 1).padStart(2, "0")}</span>
                  {image.alt[language]}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>

      <Lightbox
        open={open}
        index={photoIndex}
        slides={galleryImages.map((image) => ({ src: `/images/${image.src}`, alt: image.alt[language] }))}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
