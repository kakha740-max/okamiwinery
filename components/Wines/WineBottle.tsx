import Image from "next/image";

type WineBottleProps = {
  image: string;
  name: string;
};

export default function WineBottle({
  image,
  name,
}: WineBottleProps) {
  return (
    <div className="flex items-center justify-center">

      <div className="group relative">

        {/* Soft Glow */}
        <div className="absolute inset-0 rounded-full bg-[#C8A15A]/10 blur-3xl scale-75 transition-all duration-700 group-hover:scale-100 group-hover:bg-[#C8A15A]/20" />

        {/* Bottle */}
        <Image
          src={image}
          alt={name}
          width={340}
          height={900}
          priority
          className="relative z-10 object-contain transition-all duration-700 group-hover:scale-105"
        />

      </div>

    </div>
  );
}