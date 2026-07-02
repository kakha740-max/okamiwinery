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
          rounded-3xl
          border
          border-[#C8A15A]/15
          bg-[#0B0B0B]
          p-8
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-[#C8A15A]/50
          hover:shadow-[0_20px_60px_rgba(200,161,90,0.08)]
        "
      >
        {/* Bottle */}
        <div className="flex h-[300px] items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={190}
            height={380}
            className="
              h-full
              w-auto
              object-contain
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-[#C8A15A]/10 transition-colors duration-500 group-hover:bg-[#C8A15A]/30" />

        {/* Wine Name */}
        <h3
          className="
            text-center
            text-3xl
            font-light
            text-white
            transition-colors
            duration-500
            group-hover:text-[#F6E7C1]
          "
          style={{ fontFamily: "Georgia, serif" }}
        >
          {name}
        </h3>

        {/* Subtitle */}
        <p className="mt-3 text-center uppercase tracking-[0.3em] text-sm text-[#C8A15A]">
          {subtitle}
        </p>

        {/* Decorative Divider */}
        <div className="my-6 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-[#C8A15A]/30 transition-all duration-500 group-hover:w-14" />
          <span className="text-sm text-[#C8A15A] transition-transform duration-500 group-hover:rotate-180">
            ✦
          </span>
          <div className="h-px w-10 bg-[#C8A15A]/30 transition-all duration-500 group-hover:w-14" />
        </div>
      </article>
    </Link>
  );
}