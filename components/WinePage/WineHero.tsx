"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  fadeLeft,
  fadeRight,
} from "@/lib/animations";

import WineSpecs from "./WineSpecs";
import WineTaste from "./WineTaste";
import WineNotes from "./WineNotes";
import WinePairing from "./WinePairing";

type WineHeroProps = {
  wine: {
    image: string;
    name: string;
    subtitle: string;
    description: string;

    variety: string;
    year: string;
    alcohol: string;
    volume: string;
    region: string;
    method: string;

    taste: {
      sweetness: number;
      acidity: number;
      body: number;
      tannins: number;
    };

    notes: string[];
    pairing: string[];
  };
};

export default function WineHero({ wine }: WineHeroProps) {
  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-start gap-24 px-8 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <motion.div
          className="flex justify-center"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">

            {/* Luxury Glow */}

            <div className="absolute inset-0 rounded-full bg-[#C8A15A]/10 blur-[140px]" />

            <Image
              src={wine.image}
              alt={wine.name}
              width={430}
              height={850}
              priority
              className="relative z-10 object-contain transition duration-700 hover:scale-[1.02]"
            />

          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >

          <p className="uppercase tracking-[0.45em] text-[#C8A15A] text-sm">
            OUR COLLECTION
          </p>

          <h1
            className="mt-4 text-6xl font-light text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {wine.name}
          </h1>

          <p className="mt-4 uppercase tracking-[0.35em] text-[#C8A15A]">
            {wine.subtitle}
          </p>

          <div className="my-10 h-px w-24 bg-[#C8A15A]" />

          <p className="max-w-xl text-lg leading-9 text-white/70">
            {wine.description}
          </p>

          <WineSpecs wine={wine} />

          <WineTaste taste={wine.taste} />

          <WineNotes notes={wine.notes} />

          <WinePairing pairing={wine.pairing} />

        </motion.div>

      </div>
    </section>
  );
}