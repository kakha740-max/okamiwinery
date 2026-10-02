"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function StoryHero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[460px]">
      <Image
        src="/images/story9.png"
        alt={t.navbar.story}
        fill
        priority
        className="object-cover grayscale"
      />
    </section>
  );
}
