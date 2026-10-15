"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import type { Wine } from "@/components/data/wines";

// The winery's tasting note on a dark ground, set large like a quotation:
// colour, nose, palate and finish in the words of the wine sheet.
export default function WineTasting({ wine }: { wine: Wine }) {
  const paragraphs = wine.description.split("\n\n");

  return (
    <section className="on-dark relative overflow-hidden bg-night py-28 text-paper md:py-40">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 aspect-square w-[60rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(201_167_102/0.12),transparent)]"
      />
      <Container size="default" className="relative">
        <Reveal className="mx-auto max-w-[58rem] text-center">
          <span aria-hidden="true" className="mx-auto block h-14 w-px bg-gold/80" />
          <div className="mt-12 space-y-8">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-display text-[clamp(1.45rem,2.3vw,2.25rem)] leading-[1.5] font-light text-paper/90 lining-nums [&:lang(ka)]:text-[clamp(1.15rem,1.65vw,1.6rem)] [&:lang(ka)]:leading-[1.85]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
