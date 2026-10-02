import Image from "next/image";
import Link from "next/link";

type WineCardProps = {
  slug: string;
  image: string;
  name: string;
  subtitle: string;
};

export default function WineCard({
  slug,
  image,
  name,
  subtitle,
}: WineCardProps) {
  return (
    <Link href={`/wines/${slug}`} className="block">
      <article
        className="
          group
          cursor-pointer
          overflow-visible
          rounded-3xl
          border
          border-[#C8A15A]/15
          bg-[#0B0B0B]
          p-6
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-[#C8A15A]/50
          hover:shadow-[0_25px_70px_rgba(200,161,90,0.12)]
        "
      >
        {/* Bottle */}

        <div className="flex h-[260px] items-center justify-center overflow-visible py-4">
          <div className="flex h-full items-center justify-center rounded-2xl px-2">
            <Image
              src={image}
              alt={name}
              width={160}
              height={320}
              className="
                h-full
                w-auto
                object-contain
                transition-all
                duration-700
                group-hover:scale-110
                group-hover:rotate-[-1deg]
                group-hover:drop-shadow-[0_25px_45px_rgba(200,161,90,0.28)]
              "
            />
          </div>
        </div>

        {/* Divider */}

        <div className="my-5 h-px w-full bg-[#C8A15A]/10 transition-all duration-500 group-hover:w-[90%] group-hover:bg-[#C8A15A]/35" />

        {/* Wine Name */}

        <h3
          className="
            text-center
            text-2xl
            font-light
            text-white
            transition-all
            duration-500
            group-hover:text-[#F6E7C1]
          "
            
        >
          {name}
        </h3>

        {/* Subtitle */}

        <p className="mt-2 text-center uppercase tracking-[0.3em] text-xs text-[#C8A15A]">
          {subtitle}
        </p>

        {/* Decorative Divider */}

        <div className="my-5 flex items-center justify-center gap-3">

          <div className="h-px w-8 bg-[#C8A15A]/30 transition-all duration-500 group-hover:w-12 group-hover:bg-[#C8A15A]/60" />

          <span className="text-sm text-[#C8A15A] transition-all duration-500 group-hover:rotate-180 group-hover:scale-125">
            ✦
          </span>

          <div className="h-px w-8 bg-[#C8A15A]/30 transition-all duration-500 group-hover:w-12 group-hover:bg-[#C8A15A]/60" />

        </div>

      </article>
    </Link>
  );
}