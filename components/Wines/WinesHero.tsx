"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function WinesHero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[460px]">
      <Image
        src="/images/22.jpg"
        alt={t.navbar.wines}
        fill
        priority
        className="object-cover"
      />
    </section>
  );
}
