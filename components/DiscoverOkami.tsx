import Gallery from "./DiscoverGallery/Gallery";

export default function DiscoverOkami() {
  return (
    <section className="bg-[#050505] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}

        <div className="mb-14 text-center md:mb-20">

          <p className="text-xs uppercase tracking-[0.3em] text-yellow-500 sm:text-sm sm:tracking-[0.45em]">
            Explore Our Estate
          </p>

          <h2
            className="mt-5 text-4xl font-light text-white sm:text-5xl md:mt-6 md:text-6xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Discover Okami
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-5 md:mt-8">
            <div className="h-px w-14 bg-yellow-500 sm:w-24" />
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <div className="h-px w-14 bg-yellow-500 sm:w-24" />
          </div>

          <p
            className="mx-auto mt-8 max-w-3xl text-base leading-7 text-white/60 sm:text-lg sm:leading-9 md:mt-10"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Discover the beauty of Okami Winery through our vineyards,
            historic cellars, production spaces and the timeless atmosphere
            that defines our estate.
          </p>

        </div>

        {/* Gallery */}

        <Gallery />

      </div>
    </section>
  );
}