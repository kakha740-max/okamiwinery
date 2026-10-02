import GalleryHero from "@/components/GalleryPage/GalleryHero";
import GalleryGrid from "@/components/GalleryPage/GalleryGrid";

export const metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <GalleryHero />

      <div className="pt-20 pb-24 sm:pt-24">
        <GalleryGrid />
      </div>
    </main>
  );
}
