"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const clamp = (progress: number) => Math.min(1, Math.max(0, progress));

// Section-to-section reveal: as a section's end scrolls past, it is held
// back — drifting up at half speed — and dims slightly while the next
// section slides up over it, so it never just vanishes. Translation only.
// The next section must be positioned to paint above it. Reduced motion
// switches it off in CSS, so server and client render the same markup.
export default function ScrollFold({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] });
  // Functions rather than keyframe ranges keep the values clamped.
  const y = useTransform(scrollYProgress, (progress) => `${clamp(progress) * 50}vh`);
  const shade = useTransform(scrollYProgress, (progress) => clamp(progress) * 0.35);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y }} className="relative will-change-transform motion-reduce:transform-none!">
        {children}
        <motion.div
          aria-hidden="true"
          style={{ opacity: shade }}
          className="pointer-events-none absolute inset-0 bg-night motion-reduce:hidden"
        />
      </motion.div>
    </div>
  );
}
