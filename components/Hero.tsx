import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <Image
        src="/images/hero3.png"
        alt="Okami Winery"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-3xl text-center">

          <p className="mb-8 text-xs uppercase tracking-[0.45em] text-yellow-400">
            A Legacy of Georgian Winemaking
          </p>

          <p
            className="text-lg md:text-2xl leading-9 md:leading-[1.9] font-light text-white/60"
            style={{ fontFamily: "Georgia, serif" }}
          >
            In the heart of Georgia, where vineyards have flourished for
            centuries, <strong className="text-white/90">Okami Winery</strong> continues a
            legacy shaped by tradition, respect for the land, and the pursuit
            of excellence.
          </p>

          <p
            className="mt-8 text-lg md:text-2xl leading-9 md:leading-[1.9] font-light text-white/60"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Every vineyard, every harvest, and every bottle reflects the soul
            of the Okami Microzone, crafted to share the authentic spirit of
            Georgian wine with the world.
          </p>

        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}