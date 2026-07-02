import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import DiscoverOkami from "@/components/DiscoverOkami";
import FeaturedWines from "@/components/FeaturedWines/FeaturedWines";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Story />
      <DiscoverOkami />
      <FeaturedWines />
    </>
  );
}