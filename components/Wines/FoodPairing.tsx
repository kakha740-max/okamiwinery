type FoodPairingProps = {
  pairing: string[];
};

export default function FoodPairing({
  pairing,
}: FoodPairingProps) {
  return (
    <div className="mt-16">

      <h3
        className="mb-8 text-2xl text-white"
      >
        Food Pairing
      </h3>

      <div className="flex flex-wrap gap-4">

        {pairing.map((item) => (
          <div
            key={item}
            className="rounded-full border border-[#C8A15A]/30 px-5 py-2 text-sm text-white transition-all duration-300 hover:border-[#C8A15A] hover:bg-[#C8A15A]/10"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}