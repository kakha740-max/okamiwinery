"use client";

import { useState } from "react";

import { wines } from "../data/wines";

import WineCard from "./WineCard";
import Arrow from "./Arrow";

export default function Carousel() {
  const [startIndex, setStartIndex] = useState(0);

  const next = () => {
    setStartIndex((prev) => (prev + 1) % wines.length);
  };

  const previous = () => {
    setStartIndex((prev) => (prev - 1 + wines.length) % wines.length);
  };

  const visibleWines = [
    wines[startIndex],
    wines[(startIndex + 1) % wines.length],
    wines[(startIndex + 2) % wines.length],
  ];

  return (
    <div className="flex items-center justify-center gap-8">

      <Arrow direction="left" onClick={previous} />

      <div className="grid gap-8 md:grid-cols-3">

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

      <Arrow direction="right" onClick={next} />

    </div>
  );
}