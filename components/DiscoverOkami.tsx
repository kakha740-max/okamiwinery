import Image from "next/image";

const images = [
  "story1.png",
  "story2.png",
  "story3.png",
  "story4.png",
  "story5.png",
  "story6.png",
  "story7.png",
  "story8.png",
  "story9.png",
];

export default function DiscoverOkami() {
  return (
    <section className="bg-[#050505] py-28">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-20 text-center">

          <p className="uppercase tracking-[0.45em] text-yellow-500 text-sm">
            Explore Our Estate
          </p>

          <h2
            className="mt-6 text-5xl md:text-6xl font-light text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Discover Okami
          </h2>

          <div className="mt-8 flex items-center justify-center gap-5">

            <div className="h-px w-24 bg-yellow-500"></div>

            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>

            <div className="h-px w-24 bg-yellow-500"></div>

          </div>

          <p
            className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-white/60"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Discover the beauty of Okami Winery through our vineyards,
            historic cellars, production spaces and the timeless atmosphere
            that defines our estate.
          </p>

        </div>

        {/* Gallery */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {images.map((image) => (

            <div
  key={image}
  className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-yellow-500/30
    transition-all
    duration-500
    hover:border-yellow-500
    hover:shadow-[0_0_40px_rgba(200,161,90,0.25)]
  "
>

              <Image
  src={`/images/${image}`}
  alt={image}
  width={700}
  height={500}
  className="
    h-80
    w-full
    object-cover
    transition-all
    duration-1000
    ease-out
    group-hover:scale-115
    group-hover:brightness-110
    cursor-zoom-in
  "
/>

              {/* Overlay */}

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-500 group-hover:bg-black/45">

                <div className="translate-y-8 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                  <div className="rounded-full border border-yellow-500 px-8 py-3 uppercase tracking-[0.3em] text-sm text-yellow-400">

                    View Photo

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}