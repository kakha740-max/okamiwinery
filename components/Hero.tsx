export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover animate-fade"
      >
        <source src="/video/okamivideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end justify-start px-5 pb-16 sm:px-8 sm:pb-20 md:px-20 md:pb-24">
        <div className="max-w-xl md:max-w-2xl border-l-2 border-[#C8A15A] pl-5 sm:pl-8">

          {/* Subtitle */}
          <p className="mb-4 text-[11px] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.45em] text-[#C8A15A]">
            A Legacy of Georgian Winemaking
          </p>

          {/* Main Title */}
          <h1
            className="leading-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <span className="block text-4xl sm:text-5xl md:text-7xl font-light tracking-[0.08em] md:tracking-[0.12em] text-white">
              OKAMI
            </span>

            <span className="mt-2 block text-xl sm:text-2xl md:text-3xl font-light tracking-[0.3em] md:tracking-[0.45em] text-white/90">
              WINERY
            </span>
          </h1>

          {/* Decorative Line */}
          <div className="mt-6 mb-6 h-px w-20 sm:w-28 md:w-32 bg-[#C8A15A]" />

          {/* Description */}
          <p
            className="text-base sm:text-lg md:text-2xl leading-7 sm:leading-8 md:leading-9 text-white/85"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Crafted in the historic Okami Microzone,
            where tradition, heritage and excellence
            come together in every bottle.
          </p>

          {/* Button */}
          <button className="mt-8 md:mt-10 w-full sm:w-auto border border-[#C8A15A] px-8 py-3 uppercase tracking-[0.25em] md:tracking-[0.3em] text-sm text-white transition-all duration-500 hover:bg-[#C8A15A] hover:text-black">
            Discover More
          </button>

        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 md:h-10 md:w-10 text-white/70"
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