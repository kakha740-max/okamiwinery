type GalleryArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
};

export default function GalleryArrow({
  direction,
  onClick,
}: GalleryArrowProps) {
  return (
    <button
      onClick={onClick}
      aria-label={
        direction === "left"
          ? "Previous Photos"
          : "Next Photos"
      }
      className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        border
        border-[#C8A15A]/40
        bg-[#0B0B0B]
        text-[#C8A15A]
        text-3xl
        transition-all
        duration-300
        hover:scale-110
        hover:border-[#C8A15A]
        hover:bg-[#C8A15A]/10
        hover:shadow-[0_0_30px_rgba(200,161,90,0.25)]
      "
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}