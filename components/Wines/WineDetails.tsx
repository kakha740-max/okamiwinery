type Wine = {
  name: string;
  subtitle: string;
  description: string;
  variety: string;
  year: string;
  alcohol: string;
  volume: string;
  region: string;
  method: string;
  sweetness: string;
};

type WineDetailsProps = {
  wine: Wine;
};

export default function WineDetails({ wine }: WineDetailsProps) {
  return (
    <div className="text-white">

      {/* Wine Name */}
      <p className="uppercase tracking-[0.45em] text-[#C8A15A] text-sm mb-3">
        Our Collection
      </p>

      <h2
        className="text-5xl md:text-6xl font-light leading-none"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {wine.name}
      </h2>

      <p className="mt-3 text-lg text-white/70 uppercase tracking-[0.25em]">
        {wine.subtitle}
      </p>

      {/* Divider */}
      <div className="mt-8 mb-8 h-px w-full bg-[#2F2A23]" />

      {/* Description */}
      <p className="leading-8 text-white/75 text-lg">
        {wine.description}
      </p>

      {/* Details */}
      <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-8">

        <Info title="Variety" value={wine.variety} />
        <Info title="Vintage" value={wine.year} />
        <Info title="Alcohol" value={wine.alcohol} />
        <Info title="Volume" value={wine.volume} />
        <Info title="Region" value={wine.region} />
        <Info title="Winemaking" value={wine.method} />

      </div>
    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[#C8A15A] uppercase tracking-[0.2em] text-xs">
        {title}
      </p>

      <p className="mt-2 text-white text-lg">
        {value}
      </p>
    </div>
  );
}