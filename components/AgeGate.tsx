"use client";

import { useState } from "react";
import Image from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Language } from "@/lib/translations";

export const AGE_STORAGE_KEY = "age-verified";

// Runs inline at the top of <body>, before the page paints, so visitors who
// already confirmed their age never see the gate flash. The gate itself is
// hidden by the `html[data-age-ok]` rule in globals.css.
export const ageGateScript = `try{if(localStorage.getItem("${AGE_STORAGE_KEY}")==="1")document.documentElement.setAttribute("data-age-ok","")}catch(e){}`;

const languages: Language[] = ["ka", "en", "ru"];

export default function AgeGate() {
  const { t, language, setLanguage } = useLanguage();
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
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className={`age-gate fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#070707] px-5 py-10 transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/images/front1.png"
        alt=""
        fill
        priority
        className="object-cover opacity-20 blur-sm"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8A15A]/10 blur-[120px]" />

      <div className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-black/40 px-6 py-10 text-center shadow-2xl shadow-black/60 backdrop-blur-md sm:px-12 sm:py-14">

        {/* Language */}

        <div className="absolute top-5 right-6 flex gap-3 text-xs">
          {languages.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLanguage(code)}
              className={`uppercase transition-colors ${
                language === code ? "text-[#C8A15A]" : "text-white/50 hover:text-white"
              }`}
            >
              {code}
            </button>
          ))}
        </div>

        <Image
          src="/images/logo21.png"
          alt="Etno Okami Winery"
          width={140}
          height={140}
          className="mx-auto object-contain"
        />

        <p className="mt-6 text-xs uppercase tracking-[0.35em] text-[#C8A15A]">
          {t.ageGate.eyebrow}
        </p>

        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#C8A15A]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#C8A15A]" />
          <div className="h-px w-12 bg-[#C8A15A]" />
        </div>

        {denied ? (
          <>
            <h2 id="age-gate-title" className="mt-8 text-3xl font-light text-white sm:text-4xl">
              {t.ageGate.deniedTitle}
            </h2>
            <p className="mt-5 text-base leading-7 text-white/70">
              {t.ageGate.deniedText}
            </p>
            <button
              type="button"
              onClick={() => setDenied(false)}
              className="mt-10 border border-white/25 px-8 py-3 text-sm uppercase tracking-[0.25em] text-white/80 transition-colors duration-300 hover:border-[#C8A15A] hover:text-white"
            >
              {t.ageGate.back}
            </button>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="mt-8 text-3xl font-light text-white sm:text-4xl">
              {t.ageGate.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/65">
              {t.ageGate.text}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={confirm}
                className="border border-[#C8A15A] bg-[#C8A15A] px-8 py-3 text-sm uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                {t.ageGate.yes}
              </button>
              <button
                type="button"
                onClick={() => setDenied(true)}
                className="border border-white/25 px-8 py-3 text-sm uppercase tracking-[0.25em] text-white/80 transition-colors duration-300 hover:border-white hover:text-white"
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
