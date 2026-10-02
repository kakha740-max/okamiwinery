"use client";

import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function StoryContent() {
  const { t } = useLanguage();
  const [intro, left1, left2, closing] = t.story.paragraphs;

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* Header */}
      <div className="text-center">
        <p className="uppercase tracking-[0.4em] text-[#C8A15A] text-sm">
          {t.story.eyebrow}
        </p>

        <h1 className="mt-4 text-4xl font-light text-[#1E1610] sm:text-5xl md:text-6xl">
          {t.story.title}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#5C5245]">
          {intro}
        </p>
      </div>

      {/* Two-column body */}
      <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 h-[420px] overflow-hidden sm:h-[480px] lg:order-1">
          <Image
            src="/images/story1.png"
            alt={t.story.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 space-y-6 text-base leading-8 text-[#5C5245] lg:order-2">
          <p>{left1}</p>
          <p>{left2}</p>
        </div>
      </div>

      {/* University partnership */}
      <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-2xl font-light text-[#1E1610] sm:text-3xl">
            {t.story.university.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5C5245]">
            {t.story.university.text}
          </p>
        </div>

        <div className="relative h-[380px] overflow-hidden sm:h-[440px]">
          <Image
            src="/images/story-university.jpg"
            alt={t.story.university.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Students at the harvest */}
      <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 h-[380px] overflow-hidden sm:h-[440px] lg:order-1">
          <Image
            src="/images/24.png"
            alt={t.story.harvest.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-2xl font-light text-[#1E1610] sm:text-3xl">
            {t.story.harvest.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5C5245]">
            {t.story.harvest.text}
          </p>
        </div>
      </div>

      {/* Laboratory research */}
      <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-2xl font-light text-[#1E1610] sm:text-3xl">
            {t.story.lab.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5C5245]">
            {t.story.lab.text}
          </p>
        </div>

        <div className="relative h-[380px] overflow-hidden sm:h-[440px]">
          <Image
            src="/images/6.png"
            alt={t.story.lab.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Closing statement */}
      <div className="mt-24 border-t border-[#C8A15A]/25 pt-12 text-center">
        <p className="mx-auto max-w-2xl text-xl font-light leading-9 text-[#1E1610]">
          {closing}
        </p>
      </div>
    </div>
  );
}
