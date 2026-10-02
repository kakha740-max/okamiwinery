import HomeHero from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeWines from "@/components/home/HomeWines";
import HomeQvevri from "@/components/home/HomeQvevri";
import HomeAwards from "@/components/home/HomeAwards";
import HomeEstate from "@/components/home/HomeEstate";
import HomeVisit from "@/components/home/HomeVisit";
import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={organizationJsonLd()} />
      <HomeHero />
      <HomeIntro />
      <HomeWines />
      <HomeQvevri />
      <HomeAwards />
      <HomeEstate />
      <HomeVisit />
    </main>
  );
}
