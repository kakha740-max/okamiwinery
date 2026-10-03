"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, type AnimationPlaybackControls, type PanInfo } from "framer-motion";

import Arrow from "@/components/ui/Arrow";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Wine } from "@/components/data/wines";

import HomeWineCard from "./HomeWineCard";

// Slow editorial glide: one card at a time, eased in and out.
const GLIDE = { duration: 1.25, ease: [0.65, 0, 0.35, 1] as const };
// Settling after a drag starts from a moving card, so it only eases out.
const SETTLE = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };
const AUTOPLAY_MS = 5000;

const wrap = (value: number, length: number) => ((value % length) + length) % length;

// Looping carousel of the wine range for the homepage. The list is rendered
// three times and the track is recentred on the middle copy after every
// glide, so it moves right-to-left indefinitely. Drag, swipe, trackpad and
// the arrow buttons all move it; autoplay pauses on hover, focus and drag,
// and is off entirely with reduced motion.
export default function WineCarousel({ wines }: { wines: Wine[] }) {
  const { t, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const count = wines.length;

  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const index = useRef(count); // position on the tripled track; the middle copy starts at `count`
  const step = useRef(0); // card width + gap, in px
  const glide = useRef<AnimationPlaybackControls | null>(null);
  const dragging = useRef(false);
  const lastDragEnd = useRef(0);

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [restart, setRestart] = useState(0);

  const goTo = useCallback(
    (target: number, transition: typeof GLIDE | typeof SETTLE = GLIDE) => {
      // Stay within the copies on either side of the middle one.
      const next = Math.min(Math.max(target, count - 3), 2 * count + 2);
      index.current = next;
      setActive(wrap(next, count));
      glide.current?.stop();
      glide.current = animate(x, -next * step.current, {
        ...transition,
        duration: reduceMotion ? 0 : transition.duration,
        onComplete: () => {
          // Jump back to the same card in the middle copy — identical, so invisible.
          const centred = wrap(index.current, count) + count;
          if (centred !== index.current) {
            index.current = centred;
            x.set(-centred * step.current);
          }
        },
      });
    },
    [count, reduceMotion, x]
  );

  const move = useCallback((delta: number) => goTo(index.current + delta), [goTo]);

  const nudge = (delta: number) => {
    move(delta);
    setRestart((value) => value + 1); // a manual move restarts the autoplay timer
  };

  // Measure the step and keep the track in place across resizes; give every
  // category line the height of the tallest, so the wine names align.
  useEffect(() => {
    const measure = () => {
      const items = track.current?.children;
      if (!items || items.length < 2) return;
      const categories = [...track.current!.querySelectorAll<HTMLElement>("[data-wine-category]")];
      categories.forEach((element) => (element.style.minHeight = ""));
      const tallest = Math.max(...categories.map((element) => element.offsetHeight));
      categories.forEach((element) => (element.style.minHeight = `${tallest}px`));
      step.current = items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
      glide.current?.stop();
      x.set(-index.current * step.current);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x, language]);

  // Only run while the section is on screen.
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Horizontal trackpad swipes move one card per gesture.
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    let total = 0;
    let lockedUntil = 0;
    let idle: ReturnType<typeof setTimeout>;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      clearTimeout(idle);
      idle = setTimeout(() => (total = 0), 200);
      if (performance.now() < lockedUntil) return;
      total += event.deltaX;
      if (Math.abs(total) > 40) {
        move(Math.sign(total));
        setRestart((value) => value + 1);
        total = 0;
        lockedUntil = performance.now() + 1000;
      }
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
      clearTimeout(idle);
    };
  }, [move]);

  // Slow autoplay.
  useEffect(() => {
    if (reduceMotion || hovered || focused || held || !inView) return;
    const timer = setInterval(() => move(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, hovered, focused, held, inView, move, restart]);

  const settleNearest = (velocity = 0) => {
    if (!step.current) return;
    const projected = -(x.get() + velocity * 0.2) / step.current;
    const nearest = Math.round(-x.get() / step.current);
    goTo(Math.min(Math.max(Math.round(projected), nearest - 2), nearest + 2), SETTLE);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    lastDragEnd.current = performance.now();
    settleNearest(info.velocity.x);
    // Let the click that ends a drag be swallowed before links work again.
    requestAnimationFrame(() => (dragging.current = false));
    setHeld(false);
    setRestart((value) => value + 1);
  };

  // A press stops the glide; if it wasn't a drag, carry on to the nearest card.
  const onPointerUp = () => {
    if (dragging.current || performance.now() - lastDragEnd.current < 80) return;
    setHeld(false);
    settleNearest();
  };

  // Keep a keyboard-focused card in view.
  const onFocusCard = (position: number) => {
    setFocused(true);
    if (viewport.current) viewport.current.scrollLeft = 0;
    const visible = step.current ? Math.floor((viewport.current?.clientWidth ?? 0) / step.current) : 1;
    const start = wrap(index.current, count) + count;
    if (position < start || position >= start + Math.max(1, visible)) goTo(position);
  };

  const loop = [...wines, ...wines, ...wines];
  const arrowButton =
    "group/arrow -m-2 p-2 text-ink/60 transition-colors duration-500 hover:text-ink";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t.featured.title}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        ref={viewport}
        onScroll={(event) => (event.currentTarget.scrollLeft = 0)}
        onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setFocused(false)}
        className="-mr-5 overflow-hidden sm:-mr-8 lg:-mr-12"
      >
        <motion.ul
          ref={track}
          style={{ x }}
          drag="x"
          dragMomentum={false}
          onPointerDown={() => setHeld(true)}
          onPointerUp={onPointerUp}
          onDragStart={() => (dragging.current = true)}
          onDragEnd={onDragEnd}
          onClickCapture={(event) => {
            if (dragging.current) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          className="flex cursor-grab gap-5 active:cursor-grabbing md:gap-8"
        >
          {loop.map((wine, position) => {
            const clone = position < count || position >= 2 * count;
            return (
              <li
                key={`${wine.id}-${position}`}
                aria-hidden={clone || undefined}
                onFocus={clone ? undefined : () => onFocusCard(position)}
                className="w-[76%] shrink-0 sm:w-[44%] md:w-[34%] lg:w-[26%] xl:w-[22%]"
              >
                <HomeWineCard wine={wine} hidden={clone} />
              </li>
            );
          })}
        </motion.ul>
      </div>

      {/* Position and controls */}
      <div className="mt-12 flex items-center justify-between gap-8 md:mt-16">
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="label tabular-nums text-ink">{String(active + 1).padStart(2, "0")}</span>
          <span className="relative h-px w-20 overflow-hidden bg-ink/15 md:w-28">
            <span
              className="absolute inset-y-0 left-0 bg-ink transition-transform duration-[1250ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
              style={{ width: `${100 / count}%`, transform: `translateX(${active * 100}%)` }}
            />
          </span>
          <span className="label tabular-nums text-stone">{String(count).padStart(2, "0")}</span>
        </div>

        <div className="flex items-center gap-7">
          <button type="button" onClick={() => nudge(-1)} aria-label={t.ui.previous} className={arrowButton}>
            <Arrow
              direction="left"
              className="w-9 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover/arrow:-translate-x-1"
            />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label={t.ui.next} className={arrowButton}>
            <Arrow className="w-9 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover/arrow:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
