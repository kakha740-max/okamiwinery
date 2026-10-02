"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#070707] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#c8a15a]/10 to-transparent p-8 shadow-2xl shadow-black/30">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A15A]">
              {t.about.eyebrow}
            </p>
            <h2
              className="mt-4 text-3xl font-light text-white sm:text-4xl"
            >
              {t.about.title}
            </h2>
            <p
              className="mt-6 text-base leading-8 text-white/70"
            >
              {t.about.description}
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
              <h3 className="text-xl text-white">{t.about.feature1Title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">
                {t.about.feature1Description}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
              <h3 className="text-xl text-white">{t.about.feature2Title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">
                {t.about.feature2Description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/wines"
                className="w-full sm:w-auto border border-[#C8A15A] px-7 py-3 text-center text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-[#C8A15A] hover:text-black"
              >
                {t.about.viewWines}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
