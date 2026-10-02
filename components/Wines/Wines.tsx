"use client";

import { useMemo, useState } from "react";

import { wines } from "../data/wines";

import WineTabs from "./WineTabs";
import WineBottle from "./WineBottle";
import WineDetails from "./WineDetails";
import TasteProfile from "./TasteProfile";
import TastingNotes from "./TastingNotes";
import FoodPairing from "./FoodPairing";

export default function Wines() {
  const [activeWine, setActiveWine] = useState(wines[0].id);

  const wine = useMemo(
    () => wines.find((w) => w.id === activeWine)!,
    [activeWine]
  );

  return (
    <section className="bg-[#050505] py-32">
      <div className="mx-auto max-w-7xl px-8">

        {/* Section Title */}
        <div className="mb-20 text-center">

          <p className="uppercase tracking-[0.45em] text-[#C8A15A] text-sm">
            Our Collection
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl text-white font-light">
            Wines
          </h2>

        </div>

        {/* Wine Tabs */}
        <WineTabs
          wines={wines}
          activeWine={activeWine}
          onChange={setActiveWine}
        />

        {/* Main Content */}
        <div className="mt-24 grid items-start gap-24 lg:grid-cols-[40%_60%]">

          {/* Bottle */}
          <WineBottle
            image={wine.image}
            name={wine.name}
          />

          {/* Right Side */}
          <div>

            <WineDetails
              wine={wine}
            />

            <TasteProfile
              taste={wine.taste}
            />

            <TastingNotes
              notes={wine.notes}
            />

            <FoodPairing
              pairing={wine.pairing}
            />

          </div>

        </div>

      </div>
    </section>
  );
}