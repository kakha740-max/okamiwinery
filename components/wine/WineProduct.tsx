"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import WineRail from "@/components/catalogue/WineRail";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeWine, wines, type Wine } from "@/components/data/wines";
import { awardsForWine } from "@/components/data/awards";

import WineHero from "./WineHero";
import WineStory from "./WineStory";
import WineDetails from "./WineDetails";
import WineAwards from "./WineAwards";

// A product page: bottle and name, tasting, winemaking, technical sheet,
// awards, then the rest of the range.
export default function WineProduct({ wine: original }: { wine: Wine }) {
  const { t, language } = useLanguage();
  const wine = localizeWine(original, language);
  const awards = awardsForWine(original.slug);

  // The rest of the range, starting after this wine so each page differs.
  const position = wines.findIndex((w) => w.id === original.id);
  const others = [...wines.slice(position + 1), ...wines.slice(0, position)];

  return (
    <>
      <WineHero wine={wine} awards={awards} />
      <WineStory wine={wine} isQvevri={original.method === "Qvevri"} />
      <WineDetails wine={wine} />
      {awards.length > 0 && <WineAwards awards={awards} />}

      <section className="bg-bone py-24 md:py-32">
        <Container size="wide">
          <Reveal>
            <h2 className="display-md mb-14 text-ink md:mb-16">{t.winePage.moreWines}</h2>
          </Reveal>
          <WineRail wines={others} tone="paper" />
        </Container>
      </section>
    </>
  );
}
