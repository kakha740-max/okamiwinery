"use client";

import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Wine } from "@/components/data/wines";

// Tasting description, then — for qvevri wines — a cinematic winemaking band.
export default function WineStory({ wine, isQvevri }: { wine: Wine; isQvevri: boolean }) {
  const { t } = useLanguage();
  const s = t.winePage;

  return (
    <>
      <section className="bg-paper py-24 md:py-36">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-bronze">{s.tastingEyebrow}</p>
              <h2 className="display-md mt-6 text-ink">{s.tastingTitle}</h2>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <p className="lead text-umber">{wine.description}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {isQvevri && (
        <section className="on-dark relative flex min-h-[72svh] items-end overflow-hidden bg-night text-paper">
          <Image
            src="/images/film/qvevri-cellar.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/40 to-night/10" />
          <Container size="wide" className="relative pb-16 md:pb-24">
            <Reveal className="max-w-xl">
              <p className="eyebrow text-gold">{s.winemaking}</p>
              <h2 className="display-lg mt-5">{wine.method}</h2>
              <p className="body-copy mt-6 text-paper/75 md:text-lg">{s.qvevriNote}</p>
            </Reveal>
          </Container>
        </section>
      )}
    </>
  );
}
