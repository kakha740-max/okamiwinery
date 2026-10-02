import Link from "next/link";

import Arrow from "./Arrow";

type Variant = "solid" | "outline" | "light" | "outline-light" | "text" | "text-light";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  /** Plain <a> for mailto:, tel: and in-page hashes. */
  external?: boolean;
};

const base =
  "label group inline-flex items-center justify-center gap-4 transition-colors duration-500 ease-[var(--ease-luxe)]";

const variants: Record<Variant, string> = {
  solid: "bg-ink px-8 py-4 text-paper hover:bg-wine",
  outline: "border border-ink/25 px-8 py-4 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper px-8 py-4 text-ink hover:bg-gold",
  "outline-light": "border border-paper/40 px-8 py-4 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  text: "text-ink hover:text-bronze",
  "text-light": "text-paper hover:text-gold",
};

export default function ButtonLink({
  href,
  children,
  variant = "solid",
  arrow = false,
  className = "",
  external = false,
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <Arrow className="transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
