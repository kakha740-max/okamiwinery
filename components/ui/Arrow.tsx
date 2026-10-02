type ArrowProps = {
  direction?: "left" | "right" | "down" | "up";
  className?: string;
};

const rotation = { right: "", left: "rotate-180", down: "rotate-90", up: "-rotate-90" };

// Thin editorial arrow used in buttons, links and slider controls.
export default function Arrow({ direction = "right", className = "" }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 28 12"
      fill="none"
      aria-hidden="true"
      className={`h-3 w-7 shrink-0 ${rotation[direction]} ${className}`}
    >
      <path d="M0 6h26M21 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
