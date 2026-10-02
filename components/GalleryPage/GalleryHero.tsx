"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function GalleryHero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[460px]">
      <Image
        src="/images/21.jpg"
        alt={t.discover.pageTitle}
        fill
        priority
        className="object-cover"
      />
    </section>
  );
}
