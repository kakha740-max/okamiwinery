import Image from "next/image";
import Link from "next/link";

type WineGridCardProps = {
  slug: string;
  image: string;
  name: string;
  year: string;
  categoryLabel: string;
  sweetnessLabel: string;
  priceLabel: string;
};

export default function WineGridCard({
  slug,
  image,
  name,
  year,
  categoryLabel,
  sweetnessLabel,
  priceLabel,
}: WineGridCardProps) {
  return (
    <Link
      href={`/wines/${slug}`}
      className="group relative block border-r border-b border-[#C8A15A]/35 bg-white transition-colors duration-500 hover:z-10 hover:bg-[#FFFCF5] hover:shadow-[0_20px_50px_rgba(200,161,90,0.18)]"
    >
      <div className="flex h-[320px] items-center justify-center p-6">
        <Image
          src={image}
          alt={name}
          width={140}
          height={280}
          className="bottle-sway h-full w-auto object-contain"
        />
      </div>

      <div className="border-t border-[#C8A15A]/25 px-5 py-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg text-[#231A12]">{name}</h3>
          <span className="whitespace-nowrap text-sm text-[#8A6A3A]">
            {priceLabel}
          </span>
        </div>

        <p className="mt-1 text-sm text-[#8A7F6E]">{year}</p>

        <p className="mt-0.5 text-sm text-[#8A7F6E]">
          {categoryLabel} · {sweetnessLabel}
        </p>
      </div>
    </Link>
  );
}
