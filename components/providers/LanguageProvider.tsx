"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage === "ka" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      return;
    }

    const browserLanguage = navigator.language.toLowerCase();

    if (browserLanguage.startsWith("ka")) {
      setLanguage("ka");
    } else {
      setLanguage("en");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
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
      {children}
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