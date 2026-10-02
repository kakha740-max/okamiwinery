"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

type WinePairingProps = {
  pairing: string[];
};

export default function WinePairing({
  pairing,
}: WinePairingProps) {
  const { t } = useLanguage();
  const s = t.winePage;

  return (
    <section className="mt-16">

      <h3 className="text-3xl font-normal text-[#1E1610]">{s.pairingTitle}</h3>

      <p className="mt-3 text-[#3A3026]">
        {s.pairingDescription}
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        {pairing.map((item) => (

          <span
            key={item}
            className="
              rounded-full
              border
              border-[#C8A15A]/50
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-[#1E1610]
              transition-all
              duration-300
              hover:border-[#C8A15A]
              hover:bg-[#F7F1E6]
            "
          >
            {item}
          </span>

        ))}

      </div>

    </section>
  );
}
