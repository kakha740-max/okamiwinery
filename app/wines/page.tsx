import WinesHero from "@/components/Wines/WinesHero";
import WinesListing from "@/components/Wines/WinesListing";

export const metadata = {
  title: "Wines",
};

export default function WinesPage() {
  return (
    <main className="min-h-screen bg-white">
      <WinesHero />

      <div className="pt-20 pb-24 sm:pt-24">
        <WinesListing />
      </div>
    </main>
  );
}
