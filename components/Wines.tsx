import Image from "next/image";

export default function Wines() {
  return (
    <section className="bg-[#050505] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-16 md:mb-24 text-center">

          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.45em] text-[#C8A15A]">
            Our Collection
          </p>

          <h2
            className="mt-5 md:mt-6 text-4xl sm:text-5xl md:text-6xl font-light text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Premium Georgian Wines
          </h2>

          <div className="mx-auto mt-6 md:mt-8 h-px w-20 sm:w-24 md:w-32 bg-[#C8A15A]" />

          <p
            className="mx-auto mt-6 md:mt-8 max-w-3xl text-base sm:text-lg leading-7 sm:leading-9 text-white/70"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Crafted from selected grapes, nurtured by tradition and elevated by
            time. Discover the essence of Okami in every bottle.
          </p>

        </div>

        {/* Bottles */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-20 items-end">

          {/* Bottle 1 */}
          <div className="text-center">

            <Image
              src="/images/botli1.png"
              alt="Saperavi"
              width={240}
              height={700}
              className="mx-auto w-36 sm:w-44 md:w-auto transition duration-500 hover:scale-105"
            />

            <h3
              className="mt-8 md:mt-10 text-2xl md:text-3xl text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Saperavi
            </h3>

            <p className="mt-2 text-sm md:text-base text-white/60">
              Dry Red Wine
            </p>

            <button className="mt-6 md:mt-8 w-full sm:w-auto border border-[#C8A15A] px-8 py-3 uppercase tracking-[0.25em] text-sm text-white transition hover:bg-[#C8A15A] hover:text-black">
              Discover →
            </button>

          </div>

          {/* Bottle 2 */}
          <div className="text-center">

            <Image
              src="/images/botli2.png"
              alt="Chinuri"
              width={280}
              height={760}
              className="mx-auto w-40 sm:w-48 md:w-auto transition duration-500 hover:scale-105"
            />

            <h3
              className="mt-8 md:mt-10 text-3xl md:text-4xl text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Chinuri
            </h3>

            <p className="mt-2 text-sm md:text-base text-white/60">
              Dry White Wine
            </p>

            <button className="mt-6 md:mt-8 w-full sm:w-auto border border-[#C8A15A] px-8 py-3 uppercase tracking-[0.25em] text-sm text-white transition hover:bg-[#C8A15A] hover:text-black">
              Discover →
            </button>

          </div>

          {/* Bottle 3 */}
          <div className="text-center">

            <Image
              src="/images/botli5.png"
              alt="Reserve"
              width={240}
              height={700}
              className="mx-auto w-36 sm:w-44 md:w-auto transition duration-500 hover:scale-105"
            />

            <h3
              className="mt-8 md:mt-10 text-2xl md:text-3xl text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Reserve
            </h3>

            <p className="mt-2 text-sm md:text-base text-white/60">
              Premium Collection
            </p>

            <button className="mt-6 md:mt-8 w-full sm:w-auto border border-[#C8A15A] px-8 py-3 uppercase tracking-[0.25em] text-sm text-white transition hover:bg-[#C8A15A] hover:text-black">
              Discover →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}