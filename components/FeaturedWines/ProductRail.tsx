"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { localizeWine, wines } from "../data/wines";
import { useLanguage } from "@/components/providers/LanguageProvider";

import Arrow from "./Arrow";
import WineCard from "./WineCard";

const WINES_PER_PAGE = 4;

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

export default function ProductRail() {
  const { language } = useLanguage();
  const [[page, direction], setState] = useState<[number, number]>([0, 0]);

  const totalPages = Math.ceil(wines.length / WINES_PER_PAGE);

  const next = () => {
    setState(([prev]) => [(prev + 1) % totalPages, 1]);
  };

  const previous = () => {
    setState(([prev]) => [(prev - 1 + totalPages) % totalPages, -1]);
  };

  const start = page * WINES_PER_PAGE;

  const visibleWines = wines.slice(
    start,
    start + WINES_PER_PAGE
  );

  return (
    <div className="flex items-center gap-8">

      {/* Left Arrow */}

      <Arrow
        direction="left"
        onClick={previous}
      />

      {/* Cards */}

      <div className="flex-1 overflow-visible">

        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.25 },
            }}
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
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

      {/* Right Arrow */}

      <Arrow
        direction="right"
        onClick={next}
      />

    </div>
  );
}