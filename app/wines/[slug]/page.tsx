import { notFound } from "next/navigation";

import { wines } from "@/components/data/wines";
import WineHero from "@/components/WinePage/WineHero";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WinePage({ params }: Props) {
  const { slug } = await params;

  const wine = wines.find((wine) => wine.slug === slug);

  if (!wine) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <WineHero wine={wine} />
    </main>
  );
}
