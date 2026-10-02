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
        group
        flex
        h-12
        w-12
        items-center
        justify-center
        text-[#1E1610]
        transition-all
        duration-300
        hover:drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]
      "
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-6 w-6 transition-transform duration-300 ${
          direction === "left"
            ? "group-hover:-translate-x-1"
            : "group-hover:translate-x-1"
        }`}
      >
        <path
          d={
            direction === "left"
              ? "M15 5L8 12L15 19"
              : "M9 5L16 12L9 19"
          }
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
