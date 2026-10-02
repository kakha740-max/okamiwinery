"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8A6A3A] sm:text-sm">
              {t.experience.eyebrow}
            </p>
            <h2
              className="mt-5 text-3xl font-normal text-black sm:text-4xl md:text-5xl"
            >
              {t.experience.title}
            </h2>
            <p
              className="mt-6 max-w-2xl text-base leading-8 text-[#1E1610] sm:text-lg"
            >
              {t.experience.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/wines"
                className="w-full sm:w-auto border border-[#C8A15A] px-7 py-3 text-center text-sm uppercase tracking-[0.25em] text-black transition-all duration-500 hover:bg-[#C8A15A] hover:text-black"
              >
                {t.experience.actionDiscover}
              </Link>
            </div>
          </div>

          <div className="relative h-[380px] overflow-hidden sm:h-[460px]">
            <Image
              src="/images/2.png"
              alt={t.experience.title}
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
