"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { localizeWine, wines } from "../data/wines";
import { useLanguage } from "@/components/providers/LanguageProvider";

import WineCard from "./WineCard";
import Arrow from "./Arrow";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function Carousel() {
  const { language } = useLanguage();
  const [[startIndex, direction], setState] = useState<[number, number]>([0, 0]);

  const next = () => {
    setState(([prev]) => [(prev + 1) % wines.length, 1]);
  };

  const previous = () => {
    setState(([prev]) => [(prev - 1 + wines.length) % wines.length, -1]);
  };

  const visibleWines = [
    wines[startIndex],
    wines[(startIndex + 1) % wines.length],
    wines[(startIndex + 2) % wines.length],
  ];

  return (
    <div className="flex items-center justify-center gap-8">

      <Arrow direction="left" onClick={previous} />

      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={startIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.25 },
            }}
            className="grid gap-8 md:grid-cols-3"
          >
            {visibleWines.map((wine) => (
              <WineCard
                key={wine.id}
                slug={wine.slug}
                image={wine.image}
                name={wine.name}
                subtitle={localizeWine(wine, language).subtitle}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Arrow direction="right" onClick={next} />

    </div>
  );
}