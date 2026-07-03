import FeaturedHeader from "./FeaturedHeader";
import ProductRail from "./ProductRail";

export default function FeaturedWines() {
  return (
    <section className="bg-[#050505] py-36">
      <div className="mx-auto max-w-7xl px-8">

        <FeaturedHeader />

        <div className="mt-20">
          <ProductRail />
        </div>

      </div>
    </section>
  );
}