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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end justify-start px-8 pb-20 md:px-20 md:pb-24">
        <div className="max-w-2xl border-l-2 border-[#C8A15A] pl-8">

          {/* Subtitle */}
          <p className="mb-5 text-sm uppercase tracking-[0.45em] text-[#C8A15A]">
            A Legacy of Georgian Winemaking
          </p>

          {/* Main Title */}
          <h1
  className="leading-none"
  style={{ fontFamily: "Georgia, serif" }}
>
  <span className="block text-5xl md:text-7xl font-light tracking-[0.12em] text-white">
    OKAMI
  </span>

  <span className="mt-2 block text-2xl md:text-3xl font-light tracking-[0.45em] text-white/90">
    WINERY
  </span>
</h1>

          {/* Decorative Line */}
          <div className="mt-8 mb-8 h-px w-32 bg-[#C8A15A]" />

          {/* Description */}
          <p
            className="text-lg md:text-2xl leading-9 text-white/80"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Crafted in the historic Okami Microzone,
            where tradition, heritage and excellence
            come together in every bottle. ბარო ბიჯო იკაკია და ბექაია
          </p>

          {/* Button */}
          <button className="mt-10 border border-[#C8A15A] px-8 py-3 uppercase tracking-[0.3em] text-sm text-white transition-all duration-300 hover:bg-[#C8A15A] hover:text-black">
            Discover More
          </button>

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