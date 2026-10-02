"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

type WineNotesProps = {
  notes: string[];
};

export default function WineNotes({
  notes,
}: WineNotesProps) {
  const { t } = useLanguage();
  const s = t.winePage;

  return (
    <section className="mt-16">

      <h3 className="text-3xl font-light text-[#1E1610]">
        {s.notesTitle}
      </h3>

      <p className="mt-3 text-[#5C5245]">
        {s.notesDescription}
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        {notes.map((note) => (

          <span
            key={note}
            className="
              rounded-full
              border
              border-[#C8A15A]/30
              bg-white
              px-5
              py-3
              text-sm
              text-[#1E1610]/85
              transition-all
              duration-300
              hover:border-[#C8A15A]
              hover:bg-[#F7F1E6]
            "
          >
            {note}
          </span>

        ))}

      </div>

    </section>
  );
}
