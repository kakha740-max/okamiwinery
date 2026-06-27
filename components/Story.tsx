import Image from "next/image";

export default function Story() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}
      <Image
        src="/images/story8.png"
        alt="Okami Story"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/35 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-end">

        <div className="max-w-2xl px-8 md:px-20 text-right">

          <p className="uppercase tracking-[0.45em] text-yellow-400 text-sm">
            OUR STORY
          </p>

          <div className="mt-6 flex justify-end">
            <div className="h-[2px] w-24 rounded-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700"></div>
          </div>

          <h2
            className="mt-10 text-5xl md:text-6xl font-light text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            A Heritage
            <br />
            Rooted in Georgia
          </h2>

          <p
            className="mt-10 text-lg md:text-xl leading-9 font-light text-white/60"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Okami Winery stands in one of Georgia's historic
            winemaking regions, where generations of passionate
            winemakers have cultivated vineyards with dedication,
            patience and deep respect for the land.
          </p>

          <p
            className="mt-8 text-lg md:text-xl leading-9 font-light text-white/60"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Every vineyard, every harvest and every bottle reflects
            the identity of the Okami Microzone, preserving the
            traditions of Georgian winemaking while embracing
            innovation for future generations.
          </p>

          <div className="mt-12 flex justify-end">
            <div className="h-[2px] w-36 rounded-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700"></div>
          </div>

        </div>

      </div>

    </section>
  );
}