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
      <Image
        src="/images/story1.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-night/70" />

      <Container className="relative py-32 text-center md:py-44">
        <Reveal>
          <p className="eyebrow text-gold">{t.contact.eyebrow}</p>
          <h2 className="display-lg mx-auto mt-6 max-w-3xl">{t.contact.title}</h2>
          <p className="lead mx-auto mt-8 max-w-2xl text-paper/80">{t.contact.description}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-8">
          <ButtonLink href={`mailto:${t.footer.email}`} external variant="light" arrow>
            {t.contact.buttonContact}
          </ButtonLink>
          <p className="text-sm text-paper/60">
            {t.footer.address}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
