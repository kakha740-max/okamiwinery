import Hero from "@/components/Hero";
import DiscoverOkami from "@/components/DiscoverOkami";
import ExperienceSection from "@/components/ExperienceSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import FeaturedWines from "@/components/FeaturedWines/FeaturedWines";

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <ContactSection />
      <DiscoverOkami />
      <AwardsSection />
      <FeaturedWines />
    </>
  );
}