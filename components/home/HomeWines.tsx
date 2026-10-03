"use client";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { wines } from "@/components/data/wines";

import WineCarousel from "./WineCarousel";

export default function HomeWines() {
  const { t } = useLanguage();

  return (
    <section className="bg-bone py-24 md:py-32">
      <Container size="wide">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-bronze">{t.featured.eyebrow}</p>
            <h2 className="display-lg mt-6 text-ink">{t.featured.title}</h2>
            <p className="body-copy mt-6 max-w-lg text-umber">{t.featured.description}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ButtonLink href="/wines" variant="outline" arrow>
              {t.ui.allWines}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <WineCarousel wines={wines} />
        </Reveal>
      </Container>
    </section>
  );
}
