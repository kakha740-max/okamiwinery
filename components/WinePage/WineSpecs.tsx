type WineSpecsProps = {
  wine: {
    variety: string;
    year: string;
    alcohol: string;
    volume: string;
    region: string;
    method: string;
  };
};

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#C8A15A]/10 py-5">
      <span className="uppercase tracking-[0.2em] text-xs text-[#C8A15A]">
        {label}
      </span>

      <span className="text-white/85">
        {value}
      </span>
    </div>
  );
}

export default function WineSpecs({ wine }: WineSpecsProps) {
  return (
    <section className="mt-16">

      <h3
        className="text-3xl font-light text-white"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Wine Details
      </h3>

      <div className="mt-8">

        <Row label="Variety" value={wine.variety} />

        <Row label="Vintage" value={wine.year} />

        <Row label="Alcohol" value={wine.alcohol} />

        <Row label="Volume" value={wine.volume} />

        <Row label="Region" value={wine.region} />

        <Row label="Winemaking" value={wine.method} />

      </div>

    </section>
  );
}