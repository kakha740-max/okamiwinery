"use client";

import { useState } from "react";

import { wines } from "../data/wines";

import Arrow from "./Arrow";
import WineCard from "./WineCard";

const WINES_PER_PAGE = 4;

export default function ProductRail() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(wines.length / WINES_PER_PAGE);

  const next = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const previous = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
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

      <div className="flex-1">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {visibleWines.map((wine) => (
            <WineCard
              key={wine.id}
              slug={wine.slug}
              image={wine.image}
              name={wine.name}
              subtitle={wine.subtitle}
            />
          ))}

        </div>

      </div>

      {/* Right Arrow */}

      <Arrow
        direction="right"
        onClick={next}
      />

    </div>
  );
}