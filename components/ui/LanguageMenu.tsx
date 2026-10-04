"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Language } from "@/lib/translations";

// Each language named in itself, as is conventional for language pickers.
const options: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ka", name: "ქართული" },
  { code: "ru", name: "Русский" },
];

// Compact header language control: the current code ("EN ▾") opens a small
// list of the three languages. Closes on choice, outside click or Escape.
export default function LanguageMenu({ className = "" }: { className?: string }) {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    // Focus the current language when the list opens.
    const current = options.findIndex((option) => option.code === language);
    requestAnimationFrame(() => items.current[current]?.focus());
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, language]);

  const choose = (code: Language) => {
    setLanguage(code);
    setOpen(false);
    trigger.current?.focus();
  };

  // Arrow keys move between the options; Tab out closes the list.
  const onListKey = (event: React.KeyboardEvent) => {
    const index = items.current.findIndex((item) => item === document.activeElement);
    const move = (to: number) => {
      event.preventDefault();
      items.current[(to + options.length) % options.length]?.focus();
    };
    if (event.key === "ArrowDown") move(index + 1);
    else if (event.key === "ArrowUp") move(index - 1);
    else if (event.key === "Home") move(0);
    else if (event.key === "End") move(options.length - 1);
    else if (event.key === "Tab") setOpen(false);
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.ui.language}: ${options.find((option) => option.code === language)?.name}`}
        className="flex items-center gap-1.5 py-2 pl-1 text-[0.75rem] font-semibold tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-100 [&:not(:hover)]:opacity-90"
      >
        <span lang={language}>{language}</span>
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`h-1.5 w-2.5 transition-transform duration-500 ease-[var(--ease-luxe)] ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="list"
            aria-label={t.ui.language}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 z-50 mt-2 min-w-[11rem] border border-ink/10 bg-paper py-2 text-ink shadow-[0_18px_40px_-18px_rgb(23_19_15/0.35)]"
          >
            {options.map((option, index) => {
              const active = option.code === language;
              return (
                <li key={option.code}>
                  <button
                    ref={(element) => {
                      items.current[index] = element;
                    }}
                    type="button"
                    lang={option.code}
                    aria-current={active || undefined}
                    onClick={() => choose(option.code)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-300 hover:bg-bone focus-visible:bg-bone focus-visible:outline-none ${
                      active ? "text-ink" : "text-umber"
                    }`}
                  >
                    <span className="w-6 text-[0.6875rem] font-semibold tracking-[0.16em] text-bronze uppercase">{option.code}</span>
                    <span className="flex-1">{option.name}</span>
                    {active && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-bronze" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
