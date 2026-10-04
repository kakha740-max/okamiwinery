"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeWine, type Wine } from "@/components/data/wines";

type HomeWineCardProps = {
  wine: Wine;
  /** Copies used to loop the carousel are hidden from assistive tech. */
  hidden?: boolean;
};

// Homepage catalogue entry: the bottle displayed on a soft-lit plinth rather
// than in a boxed product tile, with category, name and vintage set below.
export default function HomeWineCard({ wine: original, hidden = false }: HomeWineCardProps) {
  const { language } = useLanguage();
  const wine = localizeWine(original, language);
  // Never break a word: the title is capped so its longest word fits the card.
  const longestWord = Math.max(...wine.name.split(/[s-]+/).map((word) => word.length));

  const details = [wine.year, wine.variety].filter((value) => value && value !== "—");

  return (
    <Link
      href={`/wines/${wine.slug}`}
      draggable={false}
      tabIndex={hidden ? -1 : undefined}
      className="group block select-none"
    >
      <div className="relative flex aspect-[4/5] items-end justify-center overflow-hidden border border-ink/[0.05] bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgb(246_242_234/0.9),rgb(246_242_234/0.35)_80%)] transition-[border-color,box-shadow] duration-1000 ease-[var(--ease-luxe)] group-hover:border-ink/[0.09] group-hover:shadow-[0_30px_50px_-44px_rgb(23_19_15/0.4)]">
        {/* Floor shadow */}
        <span
          aria-hidden="true"
          className="absolute bottom-[9%] left-1/2 h-3 w-[30%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-md transition-all duration-1000 ease-[var(--ease-luxe)] group-hover:w-[26%] group-hover:bg-ink/15"
        />
        <Image
          src={wine.image}
          alt={hidden ? "" : `${wine.name} — ${wine.subtitle}`}
          width={300}
          height={1140}
          draggable={false}
          sizes="(min-width: 1280px) 120px, (min-width: 768px) 12vw, 30vw"
          className="relative mb-[10%] h-[74%] w-auto object-contain transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:-translate-y-1.5"
        />
      </div>

      <div className="@container mt-7 pr-3">
        {/* Height matched across the row by WineCarousel, so every name lines up. */}
        <p data-wine-category className="eyebrow text-bronze">{wine.subtitle}</p>
        <h3 style={{ "--title-fit": `calc(100cqi / ${(longestWord * 0.82).toFixed(2)})` } as React.CSSProperties} className="display-sm caps mt-3 font-medium text-ink text-[length:min(clamp(1.55rem,2.3vw,2.15rem),var(--title-fit))] [&:lang(ka)]:text-[length:min(clamp(1.3rem,1.8vw,1.65rem),var(--title-fit))] [&:lang(ka)]:font-normal">
          {wine.name}
        </h3>
        {details.length > 0 && (
          <p className="mt-2.5 text-[0.8125rem] leading-relaxed tracking-[0.02em] text-umber tabular-nums">
            {details.join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
