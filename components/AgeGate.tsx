"use client";

import { useState } from "react";
import Image from "next/image";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageProvider";

export const AGE_STORAGE_KEY = "age-verified";

// Runs inline at the top of <body>, before the page paints, so visitors who
// already confirmed their age never see the gate flash. The gate itself is
// hidden by the `html[data-age-ok]` rule in globals.css.
export const ageGateScript = `try{if(localStorage.getItem("${AGE_STORAGE_KEY}")==="1")document.documentElement.setAttribute("data-age-ok","")}catch(e){}`;

export default function AgeGate() {
  const { t } = useLanguage();
  const [verified, setVerified] = useState(false);
  const [denied, setDenied] = useState(false);
  const [leaving, setLeaving] = useState(false);

  if (verified) return null;

  const confirm = () => {
    try {
      localStorage.setItem(AGE_STORAGE_KEY, "1");
    } catch {}
    setLeaving(true);
    setTimeout(() => {
      document.documentElement.setAttribute("data-age-ok", "");
      setVerified(true);
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className={`age-gate on-dark fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-night px-5 py-10 text-paper transition-opacity duration-700 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/images/film/pouring.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/60 to-night/90" />

      <LanguageSwitcher className="absolute top-6 right-6 text-paper" />

      <div className="relative w-full max-w-xl text-center">
        <Image
          src="/images/brand/etno-okami-logo.png"
          alt="Etno Okami Winery"
          width={1000}
          height={528}
          sizes="180px"
          className="mx-auto h-20 w-auto"
        />

        <div aria-hidden="true" className="mx-auto mt-10 h-12 w-px bg-gold/50" />

        {denied ? (
          <>
            <h2 id="age-gate-title" className="display-md mt-10">
              {t.ageGate.deniedTitle}
            </h2>
            <p className="body-copy mx-auto mt-6 max-w-md text-paper/65">{t.ageGate.deniedText}</p>
            <button
              type="button"
              onClick={() => setDenied(false)}
              className="label mt-12 border border-paper/30 px-10 py-4 text-paper/80 transition-colors duration-500 hover:border-paper hover:text-paper"
            >
              {t.ageGate.back}
            </button>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="display-md mt-10">
              {t.ageGate.title}
            </h2>
            <p className="body-copy mx-auto mt-6 max-w-md text-paper/65">{t.ageGate.text}</p>
            <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={confirm}
                className="label bg-paper px-10 py-4 text-ink transition-colors duration-500 hover:bg-gold"
              >
                {t.ageGate.yes}
              </button>
              <button
                type="button"
                onClick={() => setDenied(true)}
                className="label border border-paper/30 px-10 py-4 text-paper/80 transition-colors duration-500 hover:border-paper hover:text-paper"
              >
                {t.ageGate.no}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
