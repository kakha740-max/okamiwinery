"use client";

import Link from "next/link";

import Gallery from "./DiscoverGallery/Gallery";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DiscoverOkami() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="bg-white py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}

        <div className="mb-14 text-center md:mb-20">

          <h2
            className="text-4xl font-normal text-black sm:text-5xl md:text-6xl"
          >
            {t.discover.title}
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-5 md:mt-8">
            <div className="h-px w-14 bg-[#C8A15A] sm:w-24" />
            <div className="h-2 w-2 rounded-full bg-[#C8A15A]" />
            <div className="h-px w-14 bg-[#C8A15A] sm:w-24" />
          </div>

          <p
            className="mx-auto mt-8 max-w-3xl text-base leading-7 text-[#5C5245] sm:text-lg sm:leading-9 md:mt-10"
          >
            {t.discover.description}
          </p>

        </div>

        {/* Gallery */}

        <Gallery />

        

        <div className="mt-12 text-center md:mt-16">

          <Link

            href="/gallery"

            className="inline-block border border-[#C8A15A] px-8 py-3 text-sm uppercase tracking-[0.25em] text-[#1E1610] transition-all duration-500 hover:bg-[#C8A15A] hover:text-black"

          >

            {t.discover.viewAll}

          </Link>

        </div>

      </div>
    </section>
  );
}