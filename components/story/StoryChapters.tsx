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
  const hall = galleryImage("story8.png");

  const knowledge = [
    { image: "/images/story-university.jpg", ...t.story.university, focus: "50% 30%" },
    { image: "/images/24.png", ...t.story.harvest, focus: "50% 50%" },
    { image: "/images/6.png", ...t.story.lab, focus: "50% 50%" },
  ];

  return (
    <>
      <PageHero
        image="/images/story9.png"
        imageAlt={galleryImage("story9.png").alt[language]}
        eyebrow={t.story.eyebrow}
        title={t.story.title}
        focus="50% 65%"
      />

      {/* 01 — The Microzone */}
      <section className="bg-paper py-24 md:py-36">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal>
                <ChapterLabel number="01" label={c.chapterMicrozone} />
                <p className="lead mt-10 text-ink md:text-[clamp(1.5rem,2.3vw,2.1rem)]">{microzone}</p>
              </Reveal>
            </div>
            <ImageReveal className="aspect-[4/5] lg:col-span-5 lg:col-start-8">
              <Image src="/images/film/grapes.jpg" alt="" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
            </ImageReveal>
          </div>
        </Container>
      </section>

      {/* 02 — Heritage, since 1965 */}
      <section className="bg-bone py-24 md:py-36">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <ImageReveal className="aspect-[4/3] lg:order-2 lg:col-span-6 lg:col-start-7 lg:aspect-[5/6]">
              <Image src={`/images/${hall.src}`} alt={hall.alt[language]} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
            </ImageReveal>
            <div className="lg:order-1 lg:col-span-5">
              <Reveal>
                <ChapterLabel number="02" label={c.chapterHeritage} />
                <p aria-hidden="true" className="mt-8 font-display text-[clamp(6rem,16vw,13rem)] leading-[0.8] font-light text-ink/90">
                  1965
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="body-copy mt-10 max-w-md text-umber md:text-lg">{heritage}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — Today */}
      <section className="bg-paper py-24 md:py-36">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
            <ImageReveal className="aspect-[16/10] lg:col-span-7">
              <Image src="/images/3.png" alt={galleryImage("3.png").alt[language]} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
            </ImageReveal>
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <ChapterLabel number="03" label={c.chapterToday} />
              <p className="body-copy mt-8 text-umber md:text-lg">{today}</p>
            </Reveal>
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
      <section className="on-dark bg-night py-28 text-paper md:py-40">
        <Container size="narrow" className="text-center">
          <Reveal>
            <div className="flex justify-center">
              <ChapterLabel number="04" label={c.chapterMission} light />
            </div>
            <p className="display-md mt-12">{mission}</p>
            <ButtonLink href="/wines" variant="outline-light" arrow className="mt-14">
              {t.hero.button}
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
