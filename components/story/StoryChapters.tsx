"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { galleryImage } from "@/components/data/gallery";
import { localizeWine, wines } from "@/components/data/wines";
import KeepWords from "@/components/ui/KeepWords";

// Shared editorial type. Georgian sets larger and wider than Cormorant, so
// the serif sizes step down for it (as the global display scale does).
// Colour is left to each use, as the story moves between light and dark.
const lead =
  "font-display text-[clamp(1.3rem,1.85vw,1.8rem)] leading-[1.55] font-light lining-nums [&:lang(ka)]:text-[clamp(1.08rem,1.4vw,1.35rem)] [&:lang(ka)]:leading-[1.85]";
const statement =
  "font-display text-[clamp(1.75rem,3.4vw,3.2rem)] leading-[1.22] font-light lining-nums [&:lang(ka)]:text-[clamp(1.35rem,2.4vw,2.2rem)] [&:lang(ka)]:leading-[1.5]";
const quote =
  "font-display text-[clamp(1.5rem,2.5vw,2.4rem)] leading-[1.3] font-light lining-nums [&:lang(ka)]:text-[clamp(1.2rem,1.8vw,1.7rem)] [&:lang(ka)]:leading-[1.65]";
const body = "body-copy md:text-[1.0625rem] md:leading-[1.9]";

// Sets the given phrases of a paragraph in emphasis, leaving the words as they are.
function emphasise(text: string, phrases: readonly string[], className: string) {
  const escaped = phrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return text.split(new RegExp(`(${escaped.join("|")})`)).map((part, index) =>
    phrases.includes(part) ? (
      <span key={index} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

// Chapter title. Never breaks a word: the size is capped so the longest word
// fits the column, which matters for long Russian words in narrow columns.
function Title({ children, className = "" }: { children: string; className?: string }) {
  const longestWord = Math.max(...children.split(/[\s—–-]+/).map((word) => word.length));

  return (
    <div className="@container">
      <h2
        style={{ "--title-fit": `calc(100cqi / ${(longestWord * 0.58).toFixed(2)})` } as React.CSSProperties}
        className={`display-lg text-[length:min(clamp(2.6rem,6.4vw,6rem),var(--title-fit))] [&:lang(ka)]:text-[length:min(clamp(2rem,4.6vw,4.2rem),var(--title-fit))] ${className}`}
      >
        {children}
      </h2>
    </div>
  );
}

// Chapter number with a gold hairline, above each chapter title.
function Chapter({ number, dark = false }: { number: string; dark?: boolean }) {
  return (
    <p aria-hidden="true" className={`eyebrow flex items-center gap-4 tabular-nums ${dark ? "text-gold" : "text-bronze"}`}>
      <span>{number}</span>
      <span className="h-px w-10 bg-gold" />
    </p>
  );
}

// An editorial photograph: rectangular and uncaptioned (the alt text describes it).
function Photo({
  src,
  alt,
  ratio,
  sizes,
  focus = "50% 50%",
  className = "",
}: {
  src: string;
  alt: string;
  ratio: string;
  sizes: string;
  focus?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <ImageReveal className={ratio}>
        <Image src={src} alt={alt} fill quality={90} sizes={sizes} className="object-cover" style={{ objectPosition: focus }} />
      </ImageReveal>
    </figure>
  );
}

// A photograph shown whole at 3:2, half the screen wide and running to its edge.
function EdgePhoto({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <ImageReveal className={`aspect-[3/2] w-full ${className}`}>
      <Image src={src} alt={alt} fill quality={90} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
    </ImageReveal>
  );
}

// A photograph that drifts slowly against the scroll inside its frame.
// "Cinematic" deepens the drift and adds a slow zoom-out as it passes.
function DriftImage({
  src,
  alt,
  sizes,
  focus = "50% 50%",
  cinematic = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  focus?: string;
  cinematic?: boolean;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], cinematic ? ["-12%", "12%"] : ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 1], cinematic ? [1.18, 1] : [1, 1]);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale }}
        className={`absolute inset-x-0 will-change-transform motion-reduce:transform-none! ${cinematic ? "-inset-y-[14%]" : "-inset-y-[8%]"}`}
      >
        <Image src={src} alt={alt} fill quality={90} sizes={sizes} className="object-cover" style={{ objectPosition: focus }} />
      </motion.div>
    </div>
  );
}

// The story of Etno Okami as a sequence of chapters: the opening, the
// introduction, Okami and its history, academic knowledge, the "Okami" PDO,
// the wines, the philosophy and a closing statement. The copy comes verbatim
// from messages/*.json ("history"); only its presentation is designed here.
export default function StoryChapters() {
  const { t, language } = useLanguage();
  const h = t.history;
  const image = (src: string) => galleryImage(src).alt[language];
  // Photograph 45 is not in the gallery, so its description lives here.
  const chapi = {
    en: "A chapi drawing wine from a qvevri",
    ka: "ჩაფით ქვევრიდან ღვინის ამოღება",
    ru: "Чапи для забора вина из квеври",
  };

  return (
    <>
      {/* The same photographic opener as the other inner pages */}
      <PageHero
        image="/images/26.png"
        imageAlt={image("26.png")}
        eyebrow={t.story.eyebrow}
        title={h.hero.title}
        intro={h.hero.subtitle}
        focus="62% 45%"
      />

      {/* Introduction — tradition meets knowledge; the university and its young winemakers */}
      <section className="pt-28 pb-28 md:pt-44 md:pb-40">
        <Container size="wide">
          <Reveal className="max-w-[64rem]">
            <span aria-hidden="true" className="block h-px w-16 bg-gold" />
            <p className={`${statement} mt-10 text-ink`}>{h.intro[0]}</p>
          </Reveal>

        </Container>

        {/* The university and its students, as the philosophy chapter is set:
            each photograph whole, half the screen wide and touching its edge,
            the words in the other half; the second pair mirrors the first */}
        <div className="mt-20 grid md:mt-32 lg:grid-cols-2 lg:items-center">
          <EdgePhoto src="/images/heritage/university-bw.jpg" alt={h.academic.chain[0]} />
          <div className="px-5 pt-12 sm:px-8 lg:px-16 lg:pt-0 xl:px-24">
            <Reveal delay={0.12} className="max-w-xl">
              <p className={`${body} text-umber`}>{h.intro[1]}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid md:mt-28 lg:grid-cols-2 lg:items-center">
          <EdgePhoto src="/images/heritage/harvest-bw.jpg" alt={image("24.png")} className="lg:order-2" />
          <div className="px-5 pt-12 sm:px-8 lg:order-1 lg:flex lg:justify-end lg:px-16 lg:pt-0 xl:px-24">
            <Reveal delay={0.12} className="max-w-xl">
              <p className={`${body} text-umber`}>{h.intro[2]}</p>
            </Reveal>
          </div>
        </div>

        <Container size="wide">
          <Reveal className="mx-auto mt-24 max-w-4xl text-center md:mt-36">
            <span aria-hidden="true" className="mx-auto block h-12 w-px bg-gold/70" />
            <p className={`${quote} mt-10 text-ink`}>{h.intro[3]}</p>
          </Reveal>
        </Container>
      </section>

      {/* 01 — Okami: the place, 1965 and the historic winery */}
      <section className="bg-bone py-28 text-ink md:py-40">
        <Container size="wide">
          <Reveal>
            <Chapter number="01" />
            <Title className="mt-8 max-w-5xl">{h.okami.title}</Title>
          </Reveal>

          <figure className="mt-16 md:mt-24">
            <DriftImage
              src="/images/29.webp"
              alt={image("29.webp")}
              sizes="(min-width: 1536px) 1440px, 100vw"
              className="aspect-[4/3] md:aspect-[21/9]"
            />
          </figure>

          <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-12 lg:gap-10">
            {/* 1965 → the winery → its legacy → Etno Okami, drawn from the text */}
            <Reveal className="lg:col-span-4">
              <ol className="border-l border-ink/15">
                <li className="relative pb-12 pl-8">
                  <span aria-hidden="true" className="absolute top-[0.9em] left-0 h-px w-4 bg-gold" />
                  <p className="font-display text-[clamp(4.5rem,9vw,8rem)] leading-[0.85] font-light lining-nums tabular-nums">
                    {h.okami.year}
                  </p>
                  <p className="eyebrow mt-5 text-bronze">{h.okami.founder}</p>
                </li>
                {h.okami.timeline.map((step) => (
                  <li key={step} className="relative pb-9 pl-8 last:pb-0">
                    <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-4 bg-gold/60" />
                    <p className="display-sm text-ink/85">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.12} className="space-y-8 lg:col-span-7 lg:col-start-6">
              <p className={`${lead} text-ink`}>{h.okami.paragraphs[0]}</p>
              <p className={`${body} text-umber`}>{emphasise(h.okami.paragraphs[1], h.okami.highlight, "text-bronze")}</p>
              <p className={`${body} text-umber`}>{h.okami.paragraphs[2]}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 02 — Academic knowledge, in practice */}
      <section className="pt-28 md:pt-40">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <Chapter number="02" />
              <Title className="mt-8 text-ink">{h.academic.title}</Title>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7 lg:pt-20">
              <p className={`${lead} text-ink`}>{h.academic.paragraphs[0]}</p>
            </Reveal>
          </div>

          {/* From the university to a new generation of winemakers */}
          <Reveal>
            <ol className="mt-16 grid gap-y-8 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
              {h.academic.chain.map((link, index) => (
                <li
                  key={link}
                  className="relative flex items-baseline gap-5 sm:block sm:pr-8 lg:not-first:border-l lg:not-first:border-ink/10 lg:not-first:pl-10"
                >
                  <span className="text-[0.6875rem] tracking-[0.12em] text-bronze tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <p className="font-display text-xl leading-snug text-ink sm:mt-6 md:text-2xl [&:lang(ka)]:text-lg md:[&:lang(ka)]:text-xl">{link}</p>
                  {index < h.academic.chain.length - 1 && (
                    <span aria-hidden="true" className="absolute top-1/2 -right-2 z-10 hidden h-4 w-4 -translate-y-1/2 items-center justify-center bg-paper text-gold lg:flex">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-12 lg:items-end lg:gap-10">
            <Photo
              src="/images/41.png"
              alt={image("41.png")}
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 58vw, 100vw"
              focus="38% 50%"
              className="lg:col-span-7"
            />
            <Reveal delay={0.12} className="space-y-6 lg:col-span-4 lg:col-start-9 lg:pb-14">
              <p className={`${body} text-umber`}>{h.academic.paragraphs[1]}</p>
              <p className={`${body} text-umber`}>{h.academic.paragraphs[2]}</p>
            </Reveal>
          </div>

        </Container>

        {/* The chapter closes on a film still: a chapi in the qvevri, edge to
            edge in black and white, moving with the scroll, with the closing
            thought in the dark lower-right corner */}
        <figure className="on-dark relative mt-20 flex min-h-[38rem] items-end overflow-hidden bg-night text-paper md:mt-32 lg:h-[88svh] lg:max-h-[56rem]">
          <DriftImage
            src="/images/heritage/chapi-bw.jpg"
            alt={chapi[language]}
            sizes="100vw"
            focus="38% 50%"
            cinematic
            className="absolute! inset-0"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/10 lg:bg-[radial-gradient(ellipse_60%_70%_at_100%_100%,rgb(14_12_10/0.92),rgb(14_12_10/0.45)_55%,transparent_80%)]" />
          <Container size="wide" className="relative w-full pt-48 pb-14 lg:pt-0 lg:pb-24">
            <Reveal className="lg:ml-auto lg:w-4/12">
              <span aria-hidden="true" className="block h-px w-12 bg-gold" />
              <p className={`${quote} mt-8 text-paper italic [&:lang(ka)]:not-italic`}>{h.academic.paragraphs[3]}</p>
            </Reveal>
          </Container>
        </figure>
      </section>

      {/* 03 — The "Okami" protected designation of origin */}
      <section className="bg-bone py-28 md:py-40">
        <Container size="wide">
          <Reveal>
            <Chapter number="03" />
            <Title className="mt-8 max-w-5xl text-ink">{h.pdo.title}</Title>
          </Reveal>

          {/* The year set like 1965 in chapter 01: a measured date with a gold
              rule and its label, the text beside it behind a hairline */}
          <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:items-start lg:gap-10">
            <Reveal className="lg:col-span-3">
              <p className="font-display text-[clamp(4.5rem,9vw,8rem)] leading-[0.85] font-light text-ink lining-nums tabular-nums">
                {h.pdo.year}
              </p>
              <span aria-hidden="true" className="mt-6 block h-px w-12 bg-gold" />
              <p className="eyebrow mt-5 text-bronze">PDO</p>
            </Reveal>
            <Reveal delay={0.12} className="space-y-8 lg:col-span-7 lg:col-start-5 lg:border-l lg:border-ink/12 lg:pt-2 lg:pl-12">
              <p className={`${lead} text-ink`}>{emphasise(h.pdo.paragraphs[0], h.pdo.highlight, "text-wine")}</p>
              <p className={`${body} text-umber`}>{h.pdo.paragraphs[1]}</p>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-12 md:mt-32 lg:grid-cols-12 lg:items-center lg:gap-10">
            {/* The Okami vineyards in black and white: the place the designation names */}
            <Photo
              src="/images/heritage/vineyard-bw.jpg"
              alt=""
              ratio="aspect-[4/3]"
              sizes="(min-width: 1536px) 860px, (min-width: 1024px) 58vw, 100vw"
              focus="50% 60%"
              className="lg:col-span-7"
            />
            <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
              <span aria-hidden="true" className="block h-px w-12 bg-gold" />
              <p className={`${quote} mt-10 text-ink`}>{h.pdo.paragraphs[2]}</p>
              <p className={`${body} mt-10 text-umber`}>{h.pdo.paragraphs[3]}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 04 — The wines, as a collection */}
      <section className="py-28 md:py-40">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <Chapter number="04" />
              <Title className="mt-8 text-ink">{h.wines.title}</Title>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7 lg:pt-20">
              <p className={`${lead} text-ink`}>{h.wines.intro}</p>
            </Reveal>
          </div>
        </Container>

        {/* Bottles side by side; a swipeable row on small screens */}
        <div className="mx-auto mt-16 max-w-[96rem] md:mt-24 lg:px-12">
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 md:gap-6 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0 lg:pb-0">
            {wines.map((original, index) => {
              const wine = localizeWine(original, language);
              return (
                <Reveal as="li" key={wine.slug} delay={index * 0.06} className="w-[46vw] shrink-0 snap-start sm:w-[30vw] md:w-[22vw] lg:w-auto">
                  <Link href={`/wines/${wine.slug}`} className="group block">
                    <div className="relative flex aspect-[3/5] items-end justify-center overflow-hidden bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgb(236_229_216/0.95),rgb(236_229_216/0.45)_80%)]">
                      <span
                        aria-hidden="true"
                        className="absolute bottom-[8%] left-1/2 h-3 w-[34%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-md transition-all duration-1000 ease-[var(--ease-luxe)] group-hover:w-[28%] group-hover:bg-ink/15"
                      />
                      <Image
                        src={wine.image}
                        alt={`${wine.name} — ${wine.subtitle}`}
                        width={300}
                        height={1140}
                        sizes="(min-width: 1024px) 110px, 30vw"
                        className="relative mb-[9%] h-[80%] w-auto object-contain transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:-translate-y-2"
                      />
                    </div>
                    <p className="mt-5 font-display text-lg leading-snug text-ink transition-colors duration-500 group-hover:text-bronze [&:lang(ka)]:text-base">
                      <KeepWords text={wine.name} />
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed tracking-[0.04em] text-stone">{wine.subtitle}</p>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Container size="wide" className="mt-20 md:mt-28">
          <Reveal className="text-center">
            <p className="font-display text-[clamp(1.35rem,2.5vw,2.3rem)] leading-[1.45] font-light text-ink [&:lang(ka)]:text-[clamp(1.1rem,1.8vw,1.6rem)] [&:lang(ka)]:leading-[1.7]">
              {h.wines.list}
            </p>
            <p className="mt-5 font-display text-lg text-stone italic [&:lang(ka)]:text-base [&:lang(ka)]:not-italic">{h.wines.more}</p>
            <p className={`${lead} mx-auto mt-14 max-w-3xl text-umber`}>{h.wines.closing}</p>
            <ButtonLink href="/wines" variant="outline" arrow className="mt-12">
              {t.hero.button}
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* 05 — Philosophy: the grapes of the place beside the words */}
      <section className="bg-bone">
        <div className="grid lg:min-h-[92svh] lg:grid-cols-2">
          {/* The whole photograph at its own proportions: nothing cropped or enlarged */}
          <div className="flex items-center">
            <ImageReveal className="aspect-[1672/941] w-full">
              <Image src="/images/story/grapes-natural.jpg" alt="" fill quality={90} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </ImageReveal>
          </div>
          <div className="flex items-center px-5 py-24 sm:px-8 md:py-32 lg:px-16 xl:px-24">
            <Reveal className="max-w-xl">
              <Chapter number="05" />
              <Title className="mt-8 text-ink">{h.philosophy.title}</Title>
              <p className={`${quote} mt-12 text-ink`}>{h.philosophy.paragraphs[0]}</p>
              <p className={`${body} mt-10 text-umber`}>{h.philosophy.paragraphs[1]}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing statement: the words alone, on the page's own ground */}
      <section className="py-32 md:py-48">
        <Container size="default" className="text-center">
          <Reveal>
            <span aria-hidden="true" className="mx-auto block h-14 w-px bg-gold/80" />
            <p className="mx-auto mt-12 max-w-5xl font-display text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.12] font-light text-ink [&:lang(ka)]:text-[clamp(1.6rem,3.4vw,3.2rem)] [&:lang(ka)]:leading-[1.4]">
              {h.final}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
