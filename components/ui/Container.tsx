type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** "wide" for full-width editorial grids, "narrow" for reading columns. */
  size?: "default" | "wide" | "narrow";
};

const widths = {
  default: "max-w-[84rem]",
  wide: "max-w-[96rem]",
  narrow: "max-w-[52rem]",
};

export default function Container({ children, className = "", size = "default" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${widths[size]} ${className}`}>
      {children}
    </div>
  );
}
