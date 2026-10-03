"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import WineCarousel from "@/components/home/WineCarousel";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeWine, wines, type Wine } from "@/components/data/wines";

import WineHero from "./WineHero";
import WineDetails from "./WineDetails";

// A deliberately simple product page: bottle and name, the technical sheet
// with food pairing, then the rest of the range in the home page carousel.
export default function WineProduct({ wine: original }: { wine: Wine }) {
  const { t, language } = useLanguage();
  const wine = localizeWine(original, language);

  // The rest of the range, starting after this wine so each page differs.
  const position = wines.findIndex((w) => w.id === original.id);
  const others = [...wines.slice(position + 1), ...wines.slice(0, position)];

  return (
    <>
      <WineHero wine={wine} />
      <WineDetails wine={wine} />

      <section className="bg-bone py-24 md:py-32">
        <Container size="wide">
          <Reveal>
            <h2 className="display-md mb-14 text-ink md:mb-16">{t.winePage.moreWines}</h2>
          </Reveal>
          <WineCarousel wines={others} />
        </Container>
      </section>
    </>
  );
}
