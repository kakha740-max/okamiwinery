import { wines } from "../data/wines";

import FeaturedHeader from "./FeaturedHeader";
import WineCard from "./WineCard";

export default function FeaturedWines() {
  return (
    <section className="bg-[#050505] py-36">
      <div className="mx-auto max-w-7xl px-8">

        <FeaturedHeader />

        <div className="mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-3">

          {wines.map((wine) => (

            <WineCard
              key={wine.id}
              slug={wine.slug}
              image={wine.image}
              name={wine.name}
              subtitle={wine.subtitle}
            />

          ))}

        </div>

      </div>
    </section>
  );
}