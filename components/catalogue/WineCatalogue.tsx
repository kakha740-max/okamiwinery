"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { wines } from "@/components/data/wines";

import WineCard from "./WineCard";

// "Brand" is the Georgian Wine Brand range (spirits, not wine); it has no products yet.
type CategoryFilter = "all" | "Red" | "White" | "Qvevri" | "Brand";
type SortOption = "name" | "year";

const ease = [0.22, 1, 0.36, 1] as const;

const matches = (category: CategoryFilter) => (wine: (typeof wines)[number]) => {
  if (category === "all") return true;
  if (category === "Brand") return false;
  if (category === "Qvevri") return wine.method === "Qvevri";
  return wine.category === category;
};

export default function WineCatalogue() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const visibleWines = useMemo(
    () =>
      wines.filter(matches(category)).sort((a, b) =>
        // Filtering and sorting use the English fields on the original object.
        sortBy === "year" ? b.year.localeCompare(a.year) : a.name.localeCompare(b.name)
      ),
    [category, sortBy]
  );

  const tabs: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: t.wineList.tabAll },
    { value: "Red", label: t.wineList.tabRed },
    { value: "White", label: t.wineList.tabWhite },
    { value: "Qvevri", label: t.wineList.tabQvevri },
    { value: "Brand", label: t.wineList.tabBrand },
  ];

  const sorts: { value: SortOption; label: string }[] = [
    { value: "name", label: t.wineList.sortName },
    { value: "year", label: t.wineList.sortYear },
  ];

  return (
    <>
      <PageHero
        image="/images/22.jpg"
        eyebrow={t.wineList.eyebrow}
        title={t.wineList.title}
        intro={t.featured.description}
        focus="50% 60%"
      />

      <Container size="wide" className="py-16 md:py-24">
        {/* Toolbar */}
        <div className="flex flex-col gap-6 border-b border-ink/15 pb-5 md:flex-row md:items-end md:justify-between">
          <div role="group" aria-label={t.wineList.eyebrow} className="flex flex-wrap gap-x-8 gap-y-3">
            {tabs.map((tab) => {
              const active = category === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setCategory(tab.value)}
                  aria-pressed={active}
                  className={`label relative flex items-start gap-1.5 py-1 transition-colors duration-300 ${
                    active ? "text-ink" : "text-stone hover:text-ink"
                  }`}
                >
                  {tab.label}
                  {tab.value !== "Brand" && (
                    <sup className="text-[0.625rem] tracking-normal opacity-60">{wines.filter(matches(tab.value)).length}</sup>
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-[1.3rem] h-px bg-ink transition-transform duration-500 ease-[var(--ease-luxe)] ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div role="group" aria-label={t.wineList.sortLabel} className="flex items-center gap-5 text-sm">
            <span className="text-stone">{t.wineList.sortLabel}</span>
            {sorts.map((sort) => (
              <button
                key={sort.value}
                type="button"
                onClick={() => setSortBy(sort.value)}
                aria-pressed={sortBy === sort.value}
                className={`transition-colors duration-300 ${
                  sortBy === sort.value ? "text-ink underline decoration-1 underline-offset-[6px]" : "text-stone hover:text-ink"
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.ul layout className="mt-14 grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 md:mt-16 md:grid-cols-3 md:gap-y-20 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleWines.map((wine, index) => (
              <motion.li
                key={wine.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease, delay: Math.min(index, 7) * 0.05 }}
              >
                <WineCard wine={wine} headingLevel="h2" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {visibleWines.length === 0 && <p className="mt-14 text-sm text-stone md:mt-16">{t.wineList.comingSoon}</p>}
      </Container>
    </>
  );
}
