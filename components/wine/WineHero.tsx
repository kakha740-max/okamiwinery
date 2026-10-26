"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import Arrow from "@/components/ui/Arrow";
import ButtonLink from "@/components/ui/ButtonLink";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SHOW_VINTAGE, type Wine } from "@/components/data/wines";

type WineHeroProps = {
  wine: Wine;
};

const ease = [0.22, 1, 0.36, 1] as const;

const present = (value: string) => value && value !== "—";

// The glow behind the bottle takes the wine's colour: garnet for the reds,
// a warm gold for the whites.
const glow = {
  Red: "bg-[radial-gradient(closest-side,rgb(91_26_35/0.3),rgb(91_26_35/0.09)_55%,transparent)]",
  White: "bg-[radial-gradient(closest-side,rgb(201_167_102/0.36),rgb(201_167_102/0.1)_55%,transparent)]",
} as const;

// Width of one capital letter of the display face, in em — Georgian Mtavruli
// sets wider than Cormorant's capitals.
const letterWidth = { en: 0.76, ru: 0.86, ka: 1, zh: 1.05 } as const;

// A name of more than one word is set on two lines, split at the space where
// the two come out most even, so it can be set larger. Hyphenated pairs such
// as "Chinuri-Goruli" stay together. The first line keeps its space, so the
// name still reads whole.
function nameLines(name: string): string[] {
  let best = [name];
  let longest = name.length;
  for (const match of name.matchAll(/\s/g)) {
    const first = name.slice(0, match.index + 1);
    const second = name.slice(match.index + 1);
    const length = Math.max(first.trim().length, second.length);
    if (length < longest) {
      best = [first, second];
      longest = length;
    }
  }
  return best;
}

// First screen of a product page. The words on the left, from just under the
// header and aligned with the page's grid: the type, the name set large, the
// tasting note, the key facts and the next steps — all on one screen. The
// bottle on the right, on its own panel running to the
// screen's edge — a thin gold ring behind it, a glow of the wine's colour and
// the vintage set vertically along the edge. On a phone: name, bottle, facts.
export default function WineHero({ wine }: WineHeroProps) {
  const { t, language } = useLanguage();
  const s = t.winePage;

  // The name fits its column: its size is capped by its longest line.
  const lines = nameLines(wine.name);
  const longestLine = Math.max(...lines.map((line) => line.trim().length));
  const fit = `calc(100cqi / ${(longestLine * letterWidth[language]).toFixed(2)})`;

  const sweetness: Record<string, string> = {
    Dry: t.wineList.sweetnessDry,
    "Semi-Sweet": t.wineList.sweetnessSemiSweet,
  };

  // The whole technical sheet, two rows of four. (The wine type is set above
  // the name.)
  const facts = [
    { label: s.region, value: wine.region },
    { label: s.variety, value: wine.variety },
    { label: s.alcohol, value: wine.alcohol },
    { label: s.volume, value: wine.volume },
    { label: s.winemaking, value: wine.method },
    { label: s.style, value: sweetness[wine.sweetness] ?? wine.sweetness },
    { label: s.vintage, value: SHOW_VINTAGE ? wine.year : "" },
  ].filter((fact) => present(fact.value));

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease, delay },
  });

  // The left column starts where the page's grid does on wide screens.
  const gutter = "px-5 sm:px-8 lg:pr-14 lg:pl-[max(3rem,calc((100vw-96rem)/2+3rem))] xl:pr-20";

  return (
    <section className="grid bg-bone lg:min-h-svh lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
      {/* Type, name and vintage */}
      <div className={`@container pt-28 lg:col-span-7 lg:pt-[calc(6rem+min(2svh,1.5rem))] ${gutter}`}>
        <motion.nav {...rise(0.2)} aria-label={t.ui.breadcrumb}>
          <ol className="flex items-center gap-3 text-sm text-stone">
            <li>
              <Link href="/wines" className="transition-colors hover:text-ink">
                {t.navbar.wines}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="caps text-ink">
              {wine.name}
            </li>
          </ol>
        </motion.nav>

        <motion.p {...rise(0.3)} className="eyebrow mt-12 flex items-center gap-4 text-bronze lg:mt-[min(2.5svh,2rem)]">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          {wine.subtitle}
        </motion.p>

        <motion.h1
          {...rise(0.4)}
          style={{ "--name-fit": fit } as React.CSSProperties}
          className="caps mt-4 font-display text-[length:min(6rem,9svh,var(--name-fit))] leading-[0.92] font-light whitespace-nowrap text-ink uncased:tracking-[0.01em]"
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        {SHOW_VINTAGE && present(wine.year) && (
          <motion.p
            {...rise(0.5)}
            className="mt-5 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-none font-light text-bronze italic lining-nums"
          >
            {wine.year}
          </motion.p>
        )}

        {/* The winery's tasting note, on the first screen with everything else */}
        <motion.div {...rise(0.55)} className="mt-6 max-w-[46rem] space-y-2 lg:mt-[min(2.5svh,1.75rem)]">
          {wine.description.split("\n\n").map((paragraph) => (
            <p
              key={paragraph}
              className="font-display text-[clamp(1rem,min(1.15vw,2.2svh),1.15rem)] leading-[1.55] font-light text-umber lining-nums uncased:text-[clamp(0.85rem,min(0.95vw,1.9svh),0.95rem)] uncased:leading-[1.75]"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      {/* The bottle, on its own panel to the screen's edge */}
      <div className="relative mt-12 flex h-[34rem] items-center justify-center overflow-hidden bg-[#e3d9c8] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-auto">
        <span aria-hidden="true" className={`absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 ${glow[wine.category as keyof typeof glow] ?? glow.White}`} />
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 aspect-square w-[min(78%,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/45"
        />
        {SHOW_VINTAGE && present(wine.year) && (
          <span
            aria-hidden="true"
            className="eyebrow absolute top-1/2 right-5 -translate-y-1/2 rotate-180 text-bronze/80 [writing-mode:vertical-rl] lg:right-8"
          >
            {s.vintage} · <span className="lining-nums">{wine.year}</span>
          </span>
        )}
        <span aria-hidden="true" className="absolute bottom-[calc(50%-min(36svh,22rem)-0.5rem)] left-1/2 h-5 w-36 -translate-x-1/2 rounded-[50%] bg-ink/30 blur-xl max-lg:bottom-[3rem]" />
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 0.1 }}
          className="group relative h-[29rem] lg:mt-16 lg:h-[min(72svh,44rem)]"
        >
          <Image
            src={wine.image}
            alt={`${wine.name} — ${wine.subtitle}`}
            width={300}
            height={1140}
            quality={90}
            preload
            sizes="(min-width: 1024px) 240px, 160px"
            className="h-full w-auto origin-bottom object-contain drop-shadow-[0_30px_40px_rgb(23_19_15/0.2)] transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-[1.06] motion-reduce:transition-none"
          />
        </motion.div>
      </div>

      {/* The technical sheet, the next steps and the food pairing */}
      <div className={`pt-10 pb-14 lg:col-span-7 lg:row-start-2 lg:self-start lg:pt-[min(2.5svh,2rem)] lg:pb-[min(4svh,3rem)] ${gutter}`}>
        <motion.dl {...rise(0.6)} className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-t border-ink/15 py-2.5">
              <dt className="eyebrow text-stone">{fact.label}</dt>
              <dd className="mt-1 font-display text-base leading-snug xl:text-lg text-ink lining-nums uncased:text-base">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div {...rise(0.7)} className="mt-[min(3.5svh,2rem)] flex flex-wrap items-center gap-x-8 gap-y-4">
          {/* Scrolls to the contact details in the footer */}
          <ButtonLink href="#footer" variant="solid" arrow>
            {t.contact.buttonContact}
          </ButtonLink>
          <a
            href={`/sheets/${wine.slug}-${language}.pdf`}
            download
            className="label link-line inline-flex items-center gap-3 text-ink hover:text-bronze"
          >
            <Arrow direction="down" className="w-4" />
            {s.sheetDownload}
          </a>
        </motion.div>

        {wine.pairing.length > 0 && (
          <motion.div {...rise(0.8)} className="mt-[min(4svh,2.5rem)] border-t border-ink/15 pt-[min(2.5svh,1.25rem)]">
            <h2 className="eyebrow text-bronze">{s.pairingTitle}</h2>
            <ol className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {wine.pairing.map((dish, index) => (
                <li key={dish} className="flex items-baseline gap-2.5">
                  <span className="text-[0.625rem] tracking-[0.2em] text-bronze tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg leading-snug text-ink uncased:text-base">{dish}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </div>
    </section>
  );
}
