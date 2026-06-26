import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen">

      <Image
        src="/images/herogravireba.png"
        alt="Okami Winery"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex h-full items-center justify-center text-center text-white">

        <div>

          <p className="uppercase tracking-[0.5em] text-yellow-400">
            Georgian Premium Winery
          </p>

          <h1 className="mt-6 text-8xl md:text-9xl font-bold tracking-[0.35em] drop-shadow-2xl">
            OKAMI
          </h1>

          <p className="mt-6 text-2xl text-gray-200">
            From the Heart of Georgia to the World
          </p>

          <button className="mt-10 rounded-full border border-yellow-500 px-10 py-4 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-500">

            Explore Wines
          </button>

        </div>

      </div>

    </section>
  );
}