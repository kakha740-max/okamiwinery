"use client";

import { useMemo, useState } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { wines } from "@/components/data/wines";

import WineGridCard from "./WineGridCard";

type CategoryFilter = "all" | "Red" | "White" | "Qvevri";
type SortOption = "name" | "year";

export default function WinesListing() {
  const { t } = useLanguage();

  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortOpen, setSortOpen] = useState(false);

  const categoryLabels: Record<string, string> = {
    Red: t.wineList.categoryRed,
    White: t.wineList.categoryWhite,
  };

  const sweetnessLabels: Record<string, string> = {
    Dry: t.wineList.sweetnessDry,
    "Semi-Sweet": t.wineList.sweetnessSemiSweet,
  };

  const visibleWines = useMemo(() => {
    const filtered = wines.filter((wine) => {
      if (category === "all") return true;
      if (category === "Qvevri") return wine.method === "Qvevri";
      return wine.category === category;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "year") {
        return b.year.localeCompare(a.year);
      }
      return a.name.localeCompare(b.name);
    });
  }, [category, sortBy]);

  const tabs: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: t.wineList.tabAll },
    { value: "Red", label: t.wineList.tabRed },
    { value: "White", label: t.wineList.tabWhite },
    { value: "Qvevri", label: t.wineList.tabQvevri },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-[#1E1610] text-4xl font-bold tracking-tight sm:text-5xl">
          {t.wineList.eyebrow}
        </h1>
        <p className="mt-4 text-[#8A7F6E]">{t.wineList.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setCategory(tab.value)}
            className={`text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
              category === tab.value
                ? "text-[#8A6A3A] font-medium"
                : "text-[#8A7F6E] hover:text-[#8A6A3A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter & Sort */}
      <div className="relative mt-10 flex justify-end border-t border-[#C8A15A]/25 pt-6">
        <button
          type="button"
          onClick={() => setSortOpen((open) => !open)}
          className="flex items-center gap-2 text-sm text-[#8A6A3A] transition hover:text-[#5E4620]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M6 12h12M10 18h4"
            />
          </svg>
          {t.wineList.filterSort}
        </button>

        {sortOpen && (
          <div className="absolute right-0 top-full z-10 mt-2 w-48 border border-[#C8A15A]/35 bg-white py-2 shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
            <p className="px-4 py-1 text-xs uppercase tracking-[0.15em] text-[#8A7F6E]">
              {t.wineList.sortLabel}
            </p>
            <button
              type="button"
              onClick={() => {
                setSortBy("name");
                setSortOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-[#F7F1E6] ${
                sortBy === "name" ? "text-[#8A6A3A]" : "text-[#1E1610]"
              }`}
            >
              {t.wineList.sortName}
            </button>
            <button
              type="button"
              onClick={() => {
                setSortBy("year");
                setSortOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-[#F7F1E6] ${
                sortBy === "year" ? "text-[#8A6A3A]" : "text-[#1E1610]"
              }`}
            >
              {t.wineList.sortYear}
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 border-t border-l border-[#C8A15A]/35 sm:grid-cols-2 lg:grid-cols-3">
        {visibleWines.map((wine) => (
          <WineGridCard
            key={wine.id}
            slug={wine.slug}
            image={wine.image}
            name={wine.name}
            year={wine.year}
            categoryLabel={categoryLabels[wine.category] ?? wine.category}
            sweetnessLabel={sweetnessLabels[wine.sweetness] ?? wine.sweetness}
          />
        ))}
      </div>
    </div>
  );
}
