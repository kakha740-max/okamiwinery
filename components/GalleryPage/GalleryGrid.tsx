"use client";

import { useState } from "react";
import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";
import LightboxViewer from "@/components/DiscoverGallery/Lightbox";
import { galleryImages } from "@/components/DiscoverGallery/images";

export default function GalleryGrid() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-6">

      {/* Heading */}

      <div className="mb-14 text-center md:mb-20">

        <h1 className="text-4xl font-normal text-black sm:text-5xl md:text-6xl">
          {t.discover.title}
        </h1>

        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-5 md:mt-8">
          <div className="h-px w-14 bg-[#C8A15A] sm:w-24" />
          <div className="h-2 w-2 rounded-full bg-[#C8A15A]" />
          <div className="h-px w-14 bg-[#C8A15A] sm:w-24" />
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-base leading-7 text-[#5C5245] sm:text-lg sm:leading-9 md:mt-10">
          {t.discover.description}
        </p>

      </div>

      {/* Photos */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {galleryImages.map((image, index) => (

          <button
            key={image}
            type="button"
            onClick={() => {
              setPhotoIndex(index);
              setOpen(true);
            }}
            className="group relative cursor-pointer overflow-hidden border border-[#C8A15A]/30 transition-all duration-500 hover:border-[#C8A15A] hover:shadow-[0_0_40px_rgba(200,161,90,0.25)]"
          >

            <Image
              src={`/images/${image}`}
              alt={`${t.discover.pageTitle} ${index + 1}`}
              width={700}
              height={700}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-square w-full object-cover transition-all duration-700 group-hover:scale-110"
            />

            {/* Overlay */}

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-500 group-hover:bg-black/40">
              <div className="translate-y-6 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-full border border-yellow-500 px-6 py-3 text-sm uppercase tracking-[0.25em] text-yellow-400">
                  {t.discover.viewPhoto}
                </div>
              </div>
            </div>

          </button>

        ))}

      </div>

      <LightboxViewer
        open={open}
        index={photoIndex}
        images={galleryImages}
        onClose={() => setOpen(false)}
      />

    </section>
  );
}
