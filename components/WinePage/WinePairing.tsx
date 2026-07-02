type WinePairingProps = {
  pairing: string[];
};

export default function WinePairing({
  pairing,
}: WinePairingProps) {
  return (
    <section className="mt-16">

      <h3
        className="text-3xl font-light text-white"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Food Pairing
      </h3>

      <p className="mt-3 text-white/60">
        Recommended dishes to enjoy with this wine.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        {pairing.map((item) => (

          <span
            key={item}
            className="
              rounded-full
              border
              border-[#C8A15A]/20
              bg-[#111111]
              px-5
              py-3
              text-sm
              text-white/85
              transition-all
              duration-300
              hover:border-[#C8A15A]
              hover:bg-[#161616]
            "
          >
            {item}
          </span>

        ))}

      </div>

    </section>
  );
}