import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import DiscoverOkami from "@/components/DiscoverOkami";
import Wines from "@/components/Wines";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Story />
      <DiscoverOkami />
      <Wines />
    </>
  );
}