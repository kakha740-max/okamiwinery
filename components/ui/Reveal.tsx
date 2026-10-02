"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before revealing — for staggering siblings. */
  delay?: number;
  /** Distance travelled upwards while fading in, in px. */
  y?: number;
  as?: "div" | "li" | "section" | "header" | "figure";
};

const ease = [0.22, 1, 0.36, 1] as const;

// Slow fade-and-rise as the element scrolls into view. Runs once; with
// reduced motion enabled MotionConfig turns it into a plain fade.
export default function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </Component>
  );
}
