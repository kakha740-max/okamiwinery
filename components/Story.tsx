import Image from "next/image";

export default function Story() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <Image
        src="/images/story8.png"
        alt="Okami Story"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/35 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-end py-24">

        <div className="w-full max-w-2xl px-5 sm:px-8 md:px-20 text-right">

          {/* Subtitle */}
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.45em] text-yellow-400">
            OUR STORY
          </p>

          {/* Top Line */}
          <div className="mt-5 sm:mt-6 flex justify-end">
            <div className="h-[2px] w-20 sm:w-24 rounded-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700"></div>
          </div>

          {/* Title */}
          <h2
            className="mt-8 sm:mt-10 text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            A Heritage
            <br />
            Rooted in Georgia
          </h2>

          {/* Paragraph 1 */}
          <p
            className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl leading-7 sm:leading-8 md:leading-9 font-light text-white/60"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Okami Winery stands in one of Georgia&apos;s historic
            winemaking regions, where generations of passionate
            winemakers have cultivated vineyards with dedication,
            patience and deep respect for the land.
          </p>

          {/* Paragraph 2 */}
          <p
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl leading-7 sm:leading-8 md:leading-9 font-light text-white/60"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Every vineyard, every harvest and every bottle reflects
            the identity of the Okami Microzone, preserving the
            traditions of Georgian winemaking while embracing
            innovation for future generations.
          </p>

          {/* Bottom Line */}
          <div className="mt-10 sm:mt-12 flex justify-end">
            <div className="h-[2px] w-28 sm:w-36 rounded-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700"></div>
          </div>

        </div>

      </div>

    </section>
  );
}