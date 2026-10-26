"use client";

import { motion } from "framer-motion";

import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { kaspiPath, mapPoints, mapRegions, mapSize, mapSurroundings } from "@/components/data/georgia-map";

const ease = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: "0px 0px -15% 0px" } as const;

// Positions on the map, as percentages, so the HTML labels laid over the
// drawing stay at a readable size however wide the map is drawn.
const at = (x: number, y: number) => ({ left: `${(x / mapSize.width) * 100}%`, top: `${(y / mapSize.height) * 100}%` });

// Where the Okami microzone lies: Georgia's regions on the page's paper,
// Shida Kartli and Kaspi Municipality brought up in gold one after the
// other, and a pin on Okami with its name drawn out to the side.
export default function OkamiMap() {
  const { t, language } = useLanguage();
  const m = t.history.pdo.map;
  const { okami, tbilisi } = mapPoints;
  // The callout runs up and to the right from the pin to the name.
  const elbow = { x: okami.x + 34, y: okami.y - 34 };
  const end = { x: okami.x + 120, y: okami.y - 34 };

  const facts = [
    { label: m.region, value: m.regionValue },
    { label: m.municipality, value: m.municipalityValue },
  ];

  return (
    <div>
      {/* The words in one row above, so the map can take the full width */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow text-bronze">{m.eyebrow}</p>
          <h3 className="display-md mt-6 text-ink">{m.title}</h3>
          <p className="body-copy mt-8 max-w-lg text-umber">{m.text}</p>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <dl className="border-t border-ink/12">
            {facts.map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between gap-6 border-b border-ink/12 py-4">
                <dt className="eyebrow text-stone">{label}</dt>
                <dd className="font-display text-lg text-ink lining-nums tabular-nums uncased:text-base">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <figure className="mt-14 md:mt-20">
        <div aria-hidden="true" className="relative -mx-5 sm:-mx-8 lg:mx-0">
          <svg viewBox={`0 0 ${mapSize.width} ${mapSize.height}`} className="block h-auto w-full overflow-visible">
            {mapRegions.map((region) => (
              <path
                key={region.id}
                d={region.d}
                className="fill-paper stroke-ink/15 transition-colors duration-500 hover:fill-white"
                strokeWidth={1}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Shida Kartli, then Kaspi Municipality inside it. Outlines fade in
                rather than draw: with non-scaling strokes a drawn (pathLength)
                line is measured in screen pixels and stops short once scaled. */}
            <motion.path
              d={mapRegions.find((region) => region.id === "shida-kartli")!.d}
              className="fill-gold/25 stroke-gold"
              strokeWidth={1.25}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 1.2, ease, delay: 0.2 }}
            />
            <motion.path
              d={kaspiPath}
              className="fill-gold/60 stroke-bronze"
              strokeWidth={1.25}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 1.6, ease, delay: 0.7 }}
            />

            {/* Tbilisi, for scale */}
            <circle cx={tbilisi.x} cy={tbilisi.y} r={3.5} className="fill-ink" />

            {/* The callout from Okami to its name */}
            <motion.polyline
              points={`${okami.x},${okami.y} ${elbow.x},${elbow.y} ${end.x},${end.y}`}
              className="fill-none stroke-wine"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.9, ease, delay: 1.7 }}
            />

            {/* The pin, with a slow pulse around it */}
            <circle
              cx={okami.x}
              cy={okami.y}
              r={7}
              className="origin-center fill-wine/30 [transform-box:fill-box] motion-safe:animate-[map-pulse_2.8s_var(--ease-luxe)_infinite]"
            />
            <motion.circle
              cx={okami.x}
              cy={okami.y}
              r={6}
              className="fill-wine stroke-paper"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={inView}
              transition={{ duration: 0.8, ease, delay: 1.4 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </svg>

          {/* Labels: the regions (the minor ones from tablet width up), the
              neighbours in italic, Tbilisi beside its dot */}
          {mapRegions.map(({ id, label }) =>
            label ? (
              <span
                key={id}
                style={at(label.x, label.y)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 text-[0.5625rem] tracking-[0.14em] whitespace-nowrap uppercase md:text-[0.6875rem] lg:text-xs uncased:tracking-[0.04em] ${
                  label.minor ? "hidden text-stone md:block" : "font-semibold text-bronze"
                }`}
              >
                {label.name[language]}
              </span>
            ) : null
          )}
          {mapSurroundings.map(({ name, x, y }) => (
            <span
              key={name.en}
              style={at(x, y)}
              className="absolute hidden -translate-x-1/2 -translate-y-1/2 font-display text-sm whitespace-nowrap text-stone/80 italic md:block lg:text-base uncased:text-xs lg:uncased:text-sm uncased:not-italic"
            >
              {name[language]}
            </span>
          ))}
          <span
            style={at(tbilisi.x + 9, tbilisi.y)}
            className="absolute -translate-y-1/2 text-[0.5625rem] font-semibold tracking-[0.14em] whitespace-nowrap text-ink uppercase md:text-[0.6875rem] lg:text-xs uncased:tracking-[0.04em]"
          >
            {m.tbilisi}
          </span>

          {/* Okami's name at the end of the callout */}
          <motion.span
            style={at(end.x + 8, end.y)}
            className="absolute -translate-y-1/2 font-display text-xl leading-none whitespace-nowrap text-wine md:text-3xl lg:text-4xl uncased:text-lg md:uncased:text-2xl lg:uncased:text-3xl"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.9, ease, delay: 2.2 }}
          >
            {m.okami}
          </motion.span>
        </div>

        {/* Legend */}
        <ul aria-hidden="true" className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/12 pt-6">
          <li className="eyebrow flex items-center gap-3 text-stone">
            <span className="h-3 w-3 border border-gold bg-gold/25" />
            {m.regionValue}
          </li>
          <li className="eyebrow flex items-center gap-3 text-stone">
            <span className="h-3 w-3 border border-bronze bg-gold/60" />
            {m.legendMunicipality}
          </li>
          <li className="eyebrow flex items-center gap-3 text-stone">
            <span className="h-2.5 w-2.5 rounded-full bg-wine" />
            {m.okami}
          </li>
        </ul>
        <figcaption className="sr-only">{m.caption}</figcaption>
      </figure>
    </div>
  );
}
