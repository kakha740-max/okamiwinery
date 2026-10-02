import FeaturedHeader from "./FeaturedHeader";
import ProductRail from "./ProductRail";

export default function FeaturedWines() {
  return (
    <section id="featured-wines" className="bg-[#050505] py-36 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-8">

        <FeaturedHeader />

        <div className="mt-20">
          <ProductRail />
        </div>

      </div>
    </section>
  );
}