"use client";

import { useEffect, useRef, useState } from "react";

import Arrow from "@/components/ui/Arrow";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Wine } from "@/components/data/wines";

import WineCard from "./WineCard";

type WineRailProps = {
  wines: Wine[];
  tone?: "bone" | "paper";
};

// Horizontal, swipeable row of bottles. Native scrolling with snap points —
// no carousel library — plus previous / next buttons for pointer users.
export default function WineRail({ wines, tone = "paper" }: WineRailProps) {
  const { t } = useLanguage();
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const max = element.scrollWidth - element.clientWidth;
      setEdges({ start: element.scrollLeft <= 4, end: element.scrollLeft >= max - 4 });
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (direction: 1 | -1) => {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : element.clientWidth * 0.8;
    element.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const button =
    "flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <ul
        ref={track}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
      >
        {wines.map((wine) => (
          <li key={wine.id} className="w-[64%] shrink-0 snap-start sm:w-[40%] md:w-[30%] lg:w-[23%] xl:w-[19%]">
            <WineCard wine={wine} tone={tone} />
          </li>
        ))}
      </ul>

      <div className="mt-10 hidden justify-end gap-3 md:flex">
        <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label={t.ui.previous} className={button}>
          <Arrow direction="left" className="w-5" />
        </button>
        <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label={t.ui.next} className={button}>
          <Arrow className="w-5" />
        </button>
      </div>
    </div>
  );
}
