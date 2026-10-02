"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32 scroll-mt-24">
      <Image
        src="/images/26.png"
        alt=""
        fill
        className="object-cover object-[50%_15%]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/15 bg-white/5 p-8 shadow-2xl shadow-black/40 sm:p-10 lg:p-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-[#C8A15A]">
                {t.contact.eyebrow}
              </p>
              <h2
                className="mt-4 text-3xl font-light text-white sm:text-4xl"
              >
                {t.contact.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                {t.contact.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#footer"
                className="w-full sm:w-auto border border-[#C8A15A] px-7 py-3 text-center text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-[#C8A15A] hover:text-black"
              >
                {t.contact.buttonContact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
