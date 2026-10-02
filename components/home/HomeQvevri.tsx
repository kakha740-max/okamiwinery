"use client";

import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Full-bleed cinematic interlude: the qvevri cellar from the estate film.
export default function HomeQvevri() {
  const { t } = useLanguage();

  return (
    <section className="on-dark relative flex min-h-[90svh] items-center overflow-hidden bg-night py-28 text-paper">
      <Image
        src="/images/film/qvevri-cellar.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[60%_50%]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-night/10" />

      <Container size="wide" className="relative">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-gold">{t.home.qvevriEyebrow}</p>
          <h2 className="display-lg mt-6">{t.home.qvevriTitle}</h2>
          <p className="lead mt-8 text-paper/80">{t.home.qvevriText}</p>
          <ButtonLink href="/wines" variant="outline-light" arrow className="mt-12">
            {t.hero.button}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
