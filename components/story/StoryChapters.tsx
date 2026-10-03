"use client";

import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImageReveal from "@/components/ui/ImageReveal";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { galleryImage } from "@/components/data/gallery";

function ChapterLabel({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${light ? "text-gold" : "text-bronze"}`}>
      <span>{number}</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
      <span>{label}</span>
    </p>
  );
}

export default function StoryChapters() {
  const { t, language } = useLanguage();
  const c = t.storyPage;
  const [microzone, heritage, today, mission] = t.story.paragraphs;
  const estate = galleryImage("29.webp");

  const knowledge = [
    { image: "/images/story-university.jpg", ...t.story.university, focus: "50% 30%" },
    { image: "/images/24.png", ...t.story.harvest, focus: "50% 50%" },
    { image: "/images/6.png", ...t.story.lab, focus: "50% 50%" },
  ];

  return (
    <>
      <PageHero
        image="/images/26.png"
        imageAlt={galleryImage("26.png").alt[language]}
        eyebrow={t.story.eyebrow}
        title={t.story.title}
        focus="62% 45%"
      />

      {/* 01 — The Microzone */}
      <section className="bg-paper py-24 md:py-32">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <ChapterLabel number="01" label={c.chapterMicrozone} />
                <p className="mt-10 max-w-xl font-display text-[clamp(1.35rem,1.9vw,1.85rem)] leading-[1.5] font-light text-ink [&:lang(ka)]:text-[clamp(1.15rem,1.5vw,1.45rem)] [&:lang(ka)]:leading-[1.75]">
                  {microzone}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <span aria-hidden="true" className="mt-10 block h-px w-12 bg-gold" />
                <p className="eyebrow mt-6 text-stone">{t.hero.location}</p>
              </Reveal>
            </div>
            {/* The vineyard in black and white (scripts/generate-heritage-bw.mjs), framed at the
                photo's own 16:9 so nothing is cropped from the sides */}
            <ImageReveal className="aspect-[16/9] lg:col-span-7 lg:col-start-6">
              <Image
                src="/images/heritage/vineyard-bw.jpg"
                alt=""
                fill
                quality={90}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </Container>
      </section>

      {/* 02 — Heritage, since 1965 */}
      <section className="bg-bone py-24 md:py-36">
        <Container size="wide">
          {/* Text above: the year on the left, the story on the right */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
            <Reveal className="lg:col-span-5">
              <ChapterLabel number="02" label={c.chapterHeritage} />
              {/* Lining figures (not the font's old-style ones, where "1" reads as a Roman "I") */}
              <p
                aria-hidden="true"
                className="mt-8 font-display text-[clamp(5.5rem,14vw,11.5rem)] leading-[0.85] font-normal tracking-[-0.035em] text-ink lining-nums tabular-nums"
              >
                1965
              </p>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
              <p className="body-copy max-w-xl text-umber md:text-lg">{heritage}</p>
            </Reveal>
          </div>

          {/* The winery building across the full width — only sky and paving are trimmed, never the sides */}
          <ImageReveal className="mt-14 aspect-[3/2] md:mt-20 md:aspect-[2/1]">
            <Image
              src={`/images/${estate.src}`}
              alt={estate.alt[language]}
              fill
              quality={90}
              sizes="(min-width: 1536px) 1440px, 100vw"
              className="object-cover object-[50%_55%]"
            />
          </ImageReveal>
        </Container>
      </section>

      {/* 03 — Today */}
      <section className="bg-paper py-24 md:py-36">
        <Container size="wide">
          {/* Text centred on the photo's height, set like chapter 01, so no empty band is left above it */}
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            <ImageReveal className="aspect-[16/10] lg:col-span-7">
              <Image
                src="/images/heritage/wine-library-bw.jpg"
                alt={galleryImage("35.png").alt[language]}
                fill
                quality={90}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <ChapterLabel number="03" label={c.chapterToday} />
                <p className="mt-10 font-display text-[clamp(1.35rem,1.9vw,1.85rem)] leading-[1.5] font-light text-ink [&:lang(ka)]:text-[clamp(1.15rem,1.5vw,1.45rem)] [&:lang(ka)]:leading-[1.75]">
                  {today}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <span aria-hidden="true" className="mt-10 block h-px w-12 bg-gold" />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Knowledge & craft: university, harvest, laboratory */}
      <section className="bg-paper pb-24 md:pb-36">
        <Container size="wide">
          <Reveal className="max-w-3xl border-t border-ink/15 pt-16 md:pt-24">
            <p className="eyebrow text-bronze">{c.knowledgeEyebrow}</p>
            <h2 className="display-md mt-6 text-ink">{c.knowledgeTitle}</h2>
          </Reveal>

          <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8">
            {knowledge.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.12} as="figure" className={index === 1 ? "md:mt-20" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: item.focus }}
                  />
                </div>
                <figcaption className="mt-7">
                  <h3 className="display-sm text-ink">{item.title}</h3>
                  <p className="body-copy mt-4 text-umber">{item.text}</p>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 04 — Mission */}
      <section className="bg-bone py-24 md:py-32">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            {/* Grapes on the vine — the natural edit (scripts/generate-natural-edits.mjs), at the photo's own 16:9 so nothing is cropped */}
            <ImageReveal className="aspect-[16/9] lg:col-span-7">
              <Image src="/images/story/grapes-natural.jpg" alt="" fill quality={90} sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
            </ImageReveal>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <ChapterLabel number="04" label={c.chapterMission} />
                <p className="mt-10 font-display text-[clamp(1.45rem,2.1vw,2.05rem)] leading-[1.45] font-light text-ink lining-nums [&:lang(ka)]:text-[clamp(1.2rem,1.6vw,1.55rem)] [&:lang(ka)]:leading-[1.7]">
                  {mission}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <span aria-hidden="true" className="mt-10 block h-px w-12 bg-gold" />
                <ButtonLink href="/wines" variant="outline" arrow className="mt-10">
                  {t.hero.button}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
