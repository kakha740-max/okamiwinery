type WineTabsProps = {
  wines: {
    id: string;
    name: string;
  }[];
  activeWine: string;
  onChange: (id: string) => void;
};

export default function WineTabs({
  wines,
  activeWine,
  onChange,
}: WineTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-10 border-b border-[#2E2A22] pb-8">
      {wines.map((wine) => (
        <button
          key={wine.id}
          onClick={() => onChange(wine.id)}
          className={`relative pb-2 text-sm uppercase tracking-[0.35em] transition-all duration-300 ${
            activeWine === wine.id
              ? "text-[#C8A15A]"
              : "text-white/50 hover:text-white"
          }`}
        >
          {wine.name}

          <span
            className={`absolute left-0 -bottom-[9px] h-px bg-[#C8A15A] transition-all duration-300 ${
              activeWine === wine.id ? "w-full" : "w-0"
            }`}
          />
        </button>
      ))}
    </div>
  );
}