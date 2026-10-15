"use client";

import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Full-bleed cinematic interlude: the sunlit qvevri cellar, muted to a trace
// of colour (scripts/generate-natural-edits.mjs).
export default function HomeQvevri() {
  const { t } = useLanguage();

  return (
    <section className="on-dark relative flex min-h-[90svh] items-center overflow-hidden bg-night py-28 text-paper">
      <Image
        src="/images/story/qvevri-muted.jpg"
        alt=""
        fill
        quality={90}
        sizes="100vw"
        className="object-cover object-[60%_50%]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-night/10" />

      <Container size="wide" className="relative">
        <Reveal className="max-w-xl">
          <h2 className="display-lg">{t.home.qvevriTitle}</h2>
          <p className="lead mt-8 text-paper/80 lining-nums">{t.home.qvevriText}</p>
          <ButtonLink href="/wines" variant="outline-light" arrow className="mt-12">
            {t.hero.button}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
