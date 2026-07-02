type WineNotesProps = {
  notes: string[];
};

export default function WineNotes({
  notes,
}: WineNotesProps) {
  return (
    <section className="mt-16">

      <h3
        className="text-3xl font-light text-white"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Tasting Notes
      </h3>

      <p className="mt-3 text-white/60">
        Discover the unique aromas and flavors of this wine.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        {notes.map((note) => (

          <span
            key={note}
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
            {note}
          </span>

        ))}

      </div>

    </section>
  );
}