"use client";

import { motion } from "framer-motion";

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

// Image container that unveils with a slow curtain wipe from the bottom
// while the picture inside settles from a slight zoom.
export default function ImageReveal({ children, className = "", delay = 0 }: ImageRevealProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(12% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 2, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
