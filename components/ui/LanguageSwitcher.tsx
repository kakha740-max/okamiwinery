"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-3 border-l border-yellow-500/30 pl-6">
      <button
        type="button"
        onClick={() => setLanguage("ka")}
        className={`text-sm uppercase transition-colors duration-300 ${
          language === "ka"
            ? "text-yellow-400"
            : "text-white/60 hover:text-yellow-400"
        }`}
      >
        KA
      </button>

      <span className="text-white/30">|</span>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`text-sm uppercase transition-colors duration-300 ${
          language === "en"
            ? "text-yellow-400"
            : "text-white/60 hover:text-yellow-400"
        }`}
      >
        EN
      </button>
    </div>
  );
}