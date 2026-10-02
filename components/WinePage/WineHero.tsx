"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  fadeLeft,
  fadeRight,
} from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeWine, type Wine } from "@/components/data/wines";

import WineSpecs from "./WineSpecs";
import WinePairing from "./WinePairing";

type WineHeroProps = {
  wine: Wine;
};

export default function WineHero({ wine: original }: WineHeroProps) {
  const { t, language } = useLanguage();
  const wine = localizeWine(original, language);

  return (
    <section className="relative overflow-hidden bg-white pt-40 pb-24">

      <Image
        src="/images/front1.png"
        alt=""
        fill
        priority
        className="pointer-events-none object-cover object-top opacity-[0.035]"
      />

      {/* Content */}

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-24 px-8 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          className="flex justify-center"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">

            {/* Gold Glow */}

            <div className="absolute inset-0 rounded-full bg-[#C8A15A]/15 blur-[160px]" />

            <Image
              src={wine.image}
              alt={wine.name}
              width={170}
              height={640}
              quality={90}
              priority
              className="relative z-10 h-[480px] w-auto object-contain transition duration-700 hover:scale-[1.02] md:h-[640px]"
            />

          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >

          <p className="text-sm font-medium uppercase tracking-[0.45em] text-[#8A6A3A]">
            {t.featured.eyebrow}
          </p>

          <h1
            className="mt-5 text-5xl md:text-6xl font-light uppercase tracking-[0.04em] text-[#1E1610]"
          >
            {wine.name}
          </h1>

          <p className="mt-5 font-medium uppercase tracking-[0.35em] text-[#8A6A3A]">
            {wine.subtitle}
          </p>

          <div className="my-10 h-px w-24 bg-[#C8A15A]" />

          <p className="max-w-xl text-lg leading-9 text-[#2E261E]">
            {wine.description}
          </p>

          <WineSpecs wine={wine} />

          <WinePairing pairing={wine.pairing} />

        </motion.div>

      </div>

    </section>
  );
}