type Taste = {
  sweetness: number;
  acidity: number;
  body: number;
  tannins: number;
};

type TasteProfileProps = {
  taste: Taste;
};

export default function TasteProfile({ taste }: TasteProfileProps) {
  return (
    <div className="mt-16">

      <h3
        className="mb-8 text-2xl text-white"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Taste Profile
      </h3>

      <Progress label="Sweetness" value={taste.sweetness} />
      <Progress label="Acidity" value={taste.acidity} />
      <Progress label="Body" value={taste.body} />
      <Progress label="Tannins" value={taste.tannins} />

    </div>
  );
}

function Progress({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-8">

      <div className="mb-2 flex justify-between">

        <span className="uppercase tracking-[0.2em] text-xs text-white/60">
          {label}
        </span>

        <span className="text-[#C8A15A] text-sm">
          {value}/5
        </span>

      </div>

      <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">

        <div
          className="h-full rounded-full bg-[#C8A15A]"
          style={{
            width: `${value * 20}%`,
          }}
        />

      </div>

    </div>
  );
}