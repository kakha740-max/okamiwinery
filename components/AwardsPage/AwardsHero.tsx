"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AwardsHero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[460px]">
      <Image
        src="/images/19.jpg"
        alt={t.awards.pageTitle}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/30" />
    </section>
  );
}
