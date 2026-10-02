import StoryHero from "@/components/StoryPage/StoryHero";
import StoryContent from "@/components/StoryPage/StoryContent";

export const metadata = {
  title: "Our Story",
};

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <StoryHero />

      <div className="pt-20 pb-24 sm:pt-24">
        <StoryContent />
      </div>
    </main>
  );
}
