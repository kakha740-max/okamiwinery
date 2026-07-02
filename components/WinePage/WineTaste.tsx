type WineTasteProps = {
  taste: {
    sweetness: number;
    acidity: number;
    body: number;
    tannins: number;
  };
};

function TasteBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const percentage = (value / 5) * 100;

  return (
    <div className="mb-8">

      <div className="mb-2 flex justify-between">

        <span className="text-sm uppercase tracking-[0.2em] text-[#C8A15A]">
          {label}
        </span>

        <span className="text-white/70">
          {value}/5
        </span>

      </div>

      <div className="h-[4px] w-full rounded-full bg-white/10 overflow-hidden">

        <div
          className="h-full rounded-full bg-[#C8A15A]"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

export default function WineTaste({
  taste,
}: WineTasteProps) {
  return (
    <section className="mt-16">

      <h3
        className="text-3xl font-light text-white"
        style={{
          fontFamily: "Georgia, serif",
        }}
      >
        Taste Profile
      </h3>

      <div className="mt-10">

        <TasteBar
          label="Sweetness"
          value={taste.sweetness}
        />

        <TasteBar
          label="Acidity"
          value={taste.acidity}
        />

        <TasteBar
          label="Body"
          value={taste.body}
        />

        <TasteBar
          label="Tannins"
          value={taste.tannins}
        />

      </div>

    </section>
  );
}