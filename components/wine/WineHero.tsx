"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import ButtonLink from "@/components/ui/ButtonLink";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Wine } from "@/components/data/wines";

type WineHeroProps = {
  wine: Wine;
};

const ease = [0.22, 1, 0.36, 1] as const;

const present = (value: string) => value && value !== "—";

// First screen of a product page: the bottle dominates the left half, the
// name, vintage and three key facts sit quietly on the right.
export default function WineHero({ wine }: WineHeroProps) {
  const { t } = useLanguage();
  const s = t.winePage;

  const facts = [
    { label: s.variety, value: wine.variety },
    { label: s.region, value: wine.region },
    { label: s.alcohol, value: wine.alcohol },
  ].filter((fact) => present(fact.value));

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease, delay },
  });

  return (
    <section className="grid bg-paper lg:min-h-[100svh] lg:grid-cols-2">
      {/* Bottle */}
      <div className="relative flex min-h-[80svh] items-end justify-center overflow-hidden bg-bone pt-28 pb-[7svh] lg:min-h-[100svh] lg:pt-32">
        {present(wine.year) && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[44vw] leading-none font-light text-ink/[0.045] select-none lg:text-[22vw]"
          >
            {wine.year}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-[5.5svh] left-1/2 h-6 w-48 -translate-x-1/2 rounded-[50%] bg-ink/25 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 0.1 }}
          className="relative"
        >
          <Image
            src={wine.image}
            alt={`${wine.name} — ${wine.subtitle}`}
            width={300}
            height={1140}
            quality={90}
            preload
            sizes="(min-width: 1024px) 220px, 170px"
            className="h-[min(64svh,36rem)] w-auto object-contain lg:h-[min(76svh,50rem)]"
          />
        </motion.div>
      </div>

      {/* Text */}
      <div className="flex items-center px-5 py-16 sm:px-8 lg:px-16 lg:py-32 xl:px-24">
        <div className="w-full max-w-xl">
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

          <motion.p {...rise(0.3)} className="eyebrow mt-14 text-bronze">
            {wine.subtitle}
          </motion.p>

          <motion.h1 {...rise(0.4)} className="display-lg caps mt-5 font-medium text-ink [&:lang(ka)]:font-normal">
            {wine.name}
          </motion.h1>

          {present(wine.year) && (
            <motion.p {...rise(0.5)} className="mt-4 font-display text-4xl font-light text-bronze italic">
              {wine.year}
            </motion.p>
          )}

          <motion.dl {...rise(0.6)} className="mt-12 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-3">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`border-b border-ink/15 py-5 sm:border-b-0 ${index > 0 ? "sm:border-l sm:pl-5" : ""} sm:pr-4`}
              >
                <dt className="eyebrow text-stone">{fact.label}</dt>
                <dd className="mt-2 text-ink">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div {...rise(0.7)} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
            {/* Scrolls to the contact details in the footer */}
            <ButtonLink href="#footer" variant="solid" arrow>
              {t.contact.buttonContact}
            </ButtonLink>
            <ButtonLink href="/wines" variant="text" className="link-line">
              {t.ui.allWines}
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
