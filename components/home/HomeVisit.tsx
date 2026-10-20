"use client";

import Image from "next/image";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Closing invitation to visit, with the direct contact details.
export default function HomeVisit() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="on-dark relative overflow-hidden bg-night text-paper">
      {/* Only the mosaic: the frame is taller than the section and set around
          the mosaic, so the ceiling and the chairs along the bottom fall away. */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-[14%] h-[195%]">
        <Image
          src="/images/39.png"
          alt=""
          fill
          sizes="100vw"
          // Softly blurred (scaled a touch so the blur doesn't fade the edges)
          className="scale-105 object-cover object-top blur-[3px]"
        />
      </div>
      {/* Darkened overall, with a deeper shade behind the copy so it stays legible on the mosaic */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-night/50 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgb(14_12_10/0.45),transparent_75%)]"
      />

      <Container className="relative py-28 text-center md:py-36">
        <Reveal>
          <p className="eyebrow text-gold">{t.contact.eyebrow}</p>
          <h2 className="display-lg mx-auto mt-6 max-w-3xl">{t.contact.title}</h2>
          <p className="lead mx-auto mt-8 max-w-2xl text-paper/80">{t.contact.description}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-8">
          {/* Scrolls to the contact details in the footer */}
          <ButtonLink href="#footer" variant="light" arrow>
            {t.contact.buttonContact}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
