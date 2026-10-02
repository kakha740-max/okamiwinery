"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Language } from "@/lib/translations";

const languages: Language[] = ["ka", "en", "ru"];

type LanguageSwitcherProps = {
  className?: string;
  /** Tone of the inactive codes: light text on dark backgrounds, or ink. */
  tone?: "light" | "dark";
};

export default function LanguageSwitcher({ className = "", tone = "light" }: LanguageSwitcherProps) {
  const { t, language, setLanguage } = useLanguage();

  const idle = tone === "light" ? "text-current opacity-55 hover:opacity-100" : "text-stone hover:text-ink";
  const active = tone === "light" ? "text-current" : "text-ink";

  return (
    <div role="group" aria-label={t.ui.language} className={`flex items-center gap-1 ${className}`}>
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          aria-label={t.ui.languageNames[code]}
          className={`relative px-1.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] transition-opacity duration-300 ${
            language === code ? active : idle
          }`}
        >
          {code}
          <span
            aria-hidden="true"
            className={`absolute inset-x-1.5 -bottom-0.5 h-px bg-current transition-transform duration-500 ease-[var(--ease-luxe)] ${
              language === code ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
