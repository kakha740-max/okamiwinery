import AwardsHero from "@/components/AwardsPage/AwardsHero";
import AwardsStories from "@/components/AwardsPage/AwardsStories";

export const metadata = {
  title: "Awards",
};

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-white">
      <AwardsHero />

      <div className="pt-20 pb-24 sm:pt-24">
        <AwardsStories />
      </div>
    </main>
  );
}
