"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations, type Language } from "@/lib/translations";

import { AGE_STORAGE_KEY, startIntro } from "./entry";

const languages: Language[] = ["ka", "en", "ru"];
const subscribe = () => () => {};

// Renders the copy in all three languages; CSS shows the one named by
// html[data-entry-lang], which the inline entry script sets before the first
// paint — so the gate never flashes English before the visitor's language.
function Copy({ pick }: { pick: (t: (typeof translations)[Language]) => string }) {
  return (
    <>
      {languages.map((code) => (
        <span key={code} lang={code} className="entry-copy">
          {pick(translations[code])}
        </span>
      ))}
    </>
  );
}

// The 18+ entrance: a quiet, warm-dark screen in the winery's copper tones.
// Confirming fades its contents, then hands over to the qvevri preloader beneath.
export default function AgeGate() {
  const { t, language } = useLanguage();
  const [verified, setVerified] = useState(false);
  const [denied, setDenied] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const confirmButton = useRef<HTMLButtonElement>(null);
  const previousLanguage = useRef<Language | null>(null);
  // The language switcher shows the active language, which is only known after hydration.
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);

  // Keep the pre-hydration copy in step when the visitor switches language here.
  useEffect(() => {
    if (previousLanguage.current !== null && previousLanguage.current !== language) {
      document.documentElement.setAttribute("data-entry-lang", language);
    }
    previousLanguage.current = language;
  }, [language]);

  // Move focus into the gate while it is showing.
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-age-ok")) confirmButton.current?.focus({ preventScroll: true });
  }, []);

  if (verified) return null;

  const confirm = () => {
    try {
      localStorage.setItem(AGE_STORAGE_KEY, "1");
    } catch {}
    setLeaving(true);
    // Once the gate's contents have faded, hand over to the preloader on the same dark ground.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      startIntro();
      document.documentElement.setAttribute("data-age-ok", "");
      setVerified(true);
    }, reduce ? 0 : 500);
  };

  // Keep Tab within the dialog.
  const trapFocus = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || !dialog.current) return;
    const focusable = [...dialog.current.querySelectorAll<HTMLElement>("button:not([disabled])")];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      onKeyDown={trapFocus}
      data-leaving={leaving || undefined}
      className={`age-gate on-dark fixed top-0 left-0 z-[110] flex h-screen h-[100dvh] w-screen items-center justify-center overflow-y-auto bg-[#15110F] px-6 py-16 text-paper ${
        leaving ? "pointer-events-none" : ""
      }`}
    >
      {/* A hairline copper frame and the faintest warm light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgb(184_115_51/0.09),transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-4 border border-[#B87333]/20 sm:inset-8" />

      <div className={`absolute top-8 right-8 transition-opacity duration-700 sm:top-12 sm:right-12 ${hydrated ? "opacity-100" : "opacity-0"}`}>
        <LanguageSwitcher className="text-paper/80" />
      </div>

      <div className="age-gate__content relative w-full max-w-xl text-center">
        <Image
          src="/images/brand/etno-okami-logo.png"
          alt="Etno Okami Winery"
          width={1000}
          height={528}
          sizes="160px"
          preload
          className="mx-auto h-16 w-auto sm:h-20"
        />

        <div aria-hidden="true" className="mx-auto mt-10 h-14 w-px bg-gradient-to-b from-transparent via-[#B87333] to-transparent" />

        {denied ? (
          <>
            <h2 id="age-gate-title" className="display-md mt-10">
              {t.ageGate.deniedTitle}
            </h2>
            <p className="body-copy mx-auto mt-6 max-w-md text-paper/65">{t.ageGate.deniedText}</p>
            <button
              type="button"
              onClick={() => setDenied(false)}
              className="label mt-12 border border-[#B87333]/40 px-10 py-4 text-paper/80 transition-colors duration-500 hover:border-[#D6A06A] hover:text-paper"
            >
              {t.ageGate.back}
            </button>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="display-md caps mt-10 text-paper">
              <Copy pick={(c) => c.ageGate.title} />
            </h2>
            <p className="body-copy mx-auto mt-6 max-w-md text-paper/65">
              <Copy pick={(c) => c.ageGate.text} />
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                ref={confirmButton}
                type="button"
                onClick={confirm}
                className="label w-full bg-[#B87333] px-10 py-4 text-[#15110F] transition-colors duration-500 hover:bg-[#D6A06A] sm:w-auto"
              >
                <Copy pick={(c) => c.ageGate.yes} />
              </button>
              <button
                type="button"
                onClick={() => setDenied(true)}
                className="label w-full border border-[#B87333]/40 px-10 py-4 text-paper/75 transition-colors duration-500 hover:border-[#D6A06A] hover:text-paper sm:w-auto"
              >
                <Copy pick={(c) => c.ageGate.no} />
              </button>
            </div>
          </>
        )}
      </div>

      <p className="absolute inset-x-6 bottom-8 text-center text-[0.6875rem] tracking-[0.04em] text-paper/50 sm:bottom-12">
        18+ · <Copy pick={(c) => c.footer.responsible} />
      </p>
    </div>
  );
}
