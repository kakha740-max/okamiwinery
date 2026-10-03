"use client";

import Link from "next/link";

import Arrow from "@/components/ui/Arrow";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

import AwardsCertificateSlider from "./AwardsCertificateSlider";

// Minimal roll of honour: the certificate slider beside a heading,
// one line of text and a link to the full awards page. Positioned, so it
// slides over the qvevri section folding away above it.
export default function HomeAwards() {
  const { t } = useLanguage();

  return (
    <section id="awards" className="relative bg-paper py-8 md:py-10">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-5">
            <AwardsCertificateSlider />
          </Reveal>

          <Reveal delay={0.15} className="max-lg:order-first lg:col-span-6 lg:col-start-7">
            <h2 className="display-lg font-normal text-ink">{t.home.awardsTitle}</h2>
            <span aria-hidden="true" className="mt-8 block h-px w-12 bg-gold" />
            <p className="body-copy mt-8 max-w-sm text-umber">{t.home.awardsIntro}</p>
            <Link href="/awards" className="label group mt-10 inline-flex items-center gap-4 text-ink">
              <span className="link-line">{t.home.awardsLink}</span>
              <Arrow className="transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
