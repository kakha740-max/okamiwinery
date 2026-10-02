import AwardsChapters from "@/components/awards/AwardsChapters";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Awards",
  description:
    "Medals awarded to Etno Okami wines at the International Qvevri Wine Competition, the Saperavi International Competition, The Qvevri WineHunter Award and the Kartli Wine competition — with certificates and the story behind each.",
  path: "/awards",
  image: "/images/og/awards.jpg",
  imageAlt: "Etno Okami wines at a tasting",
});

export default function AwardsPage() {
  return (
    <main id="main" className="bg-paper">
      <AwardsChapters />
    </main>
  );
}
