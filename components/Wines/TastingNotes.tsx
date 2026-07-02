type TastingNotesProps = {
  notes: string[];
};

export default function TastingNotes({
  notes,
}: TastingNotesProps) {
  return (
    <div className="mt-16">

      <h3
        className="mb-8 text-2xl text-white"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Tasting Notes
      </h3>

      <div className="flex flex-wrap gap-4">

        {notes.map((note) => (
          <div
            key={note}
            className="rounded-full bg-white/5 px-5 py-2 text-sm text-white/80"
          >
            {note}
          </div>
        ))}

      </div>

    </div>
  );
}