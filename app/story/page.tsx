import StoryChapters from "@/components/story/StoryChapters";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Story",
  description:
    "Founded in 1965 by Tengiz Kekelidze in the historic Etno Okami Microzone of Shida Kartli, Etno Okami Winery joins centuries-old Georgian winemaking with modern production and a partnership with Caucasus International University.",
  path: "/story",
  image: "/images/og/story.jpg",
  imageAlt: "The Etno Okami winery building",
});

export default function StoryPage() {
  return (
    <main id="main" className="bg-paper">
      <StoryChapters />
    </main>
  );
}
