import Image from "next/image";

export default function Wines() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-yellow-500">
            Our Collection
          </p>

          <h2 className="mt-4 text-5xl font-bold text-black">
            Featured Wines
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
            Discover premium wines crafted from Georgia's finest vineyards,
            combining centuries of tradition with modern winemaking excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Wine 1 */}
          <div className="group rounded-3xl overflow-hidden shadow-xl bg-white">

            <div className="relative h-[450px]">

              <Image
                src="/images/hero.png"
                alt="Saperavi"
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

            </div>

            <div className="p-8">

              <h3 className="text-2xl font-bold">
                Saperavi
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                Powerful Georgian red wine with rich aromas and elegant structure.
              </p>

              <button className="mt-8 rounded-full border border-yellow-500 px-6 py-3 text-yellow-500 hover:bg-yellow-500 hover:text-white transition">
                View Wine
              </button>

            </div>

          </div>

          {/* Wine 2 */}

          <div className="group rounded-3xl overflow-hidden shadow-xl bg-white">

            <div className="relative h-[450px]">

              <Image
                src="/images/hero.png"
                alt="Rkatsiteli"
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

            </div>

            <div className="p-8">

              <h3 className="text-2xl font-bold">
                Rkatsiteli
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                Elegant white wine expressing freshness, minerality and balance.
              </p>

              <button className="mt-8 rounded-full border border-yellow-500 px-6 py-3 text-yellow-500 hover:bg-yellow-500 hover:text-white transition">
                View Wine
              </button>

            </div>

          </div>

          {/* Wine 3 */}

          <div className="group rounded-3xl overflow-hidden shadow-xl bg-white">

            <div className="relative h-[450px]">

              <Image
                src="/images/hero.png"
                alt="Kisi"
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

            </div>

            <div className="p-8">

              <h3 className="text-2xl font-bold">
                Kisi
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                A premium Georgian variety with exceptional aroma and character.
              </p>

              <button className="mt-8 rounded-full border border-yellow-500 px-6 py-3 text-yellow-500 hover:bg-yellow-500 hover:text-white transition">
                View Wine
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}