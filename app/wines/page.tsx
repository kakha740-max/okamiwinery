import WineCatalogue from "@/components/catalogue/WineCatalogue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wines",
  description:
    "Seven Georgian wines from the Etno Okami Microzone — Shavkapito, Tavkveri, Khashmi Saperavi, Rkatsiteli, Chinuri and Goruli Mtsvane, most of them made in Qvevri.",
  path: "/wines",
  image: "/images/og/wines.jpg",
  imageAlt: "Etno Okami wines",
});

export default function WinesPage() {
  return (
    <main id="main" className="bg-paper">
      <WineCatalogue />
    </main>
  );
}
