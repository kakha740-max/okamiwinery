"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { MotionConfig } from "framer-motion";

import { Language, getTranslations } from "@/lib/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: ReturnType<typeof getTranslations>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] = useState<Language>("en");

  // A language the visitor chose is only readable on the client, so it is
  // applied right after hydration. Otherwise the site stays in English.
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");

    const initial: Language =
      savedLanguage === "ka" || savedLanguage === "en" || savedLanguage === "ru" ? savedLanguage : "en";

    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser-only storage
    setLanguage(initial);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: getTranslations(language),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {/* Framer Motion animations follow the visitor's reduced-motion setting. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}