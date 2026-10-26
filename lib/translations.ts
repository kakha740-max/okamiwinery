import en from "@/messages/en.json";
import ka from "@/messages/ka.json";
import ru from "@/messages/ru.json";
import zh from "@/messages/zh.json";

export const translations = {
  en,
  ka,
  ru,
  zh,
} as const;

export type Language = keyof typeof translations;

// Every language the site is offered in, in the order pickers list them.
export const languages: Language[] = ["ka", "en", "ru", "zh"];

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && value in translations;
}

// The short code shown in language pickers: Georgian appears as GE and
// Chinese as CN, the countries, though the language codes stay "ka" and "zh".
export const languageLabels: Record<Language, string> = {
  en: "EN",
  ka: "GE",
  ru: "RU",
  zh: "CN",
};

// The value for <html lang>: Simplified Chinese is marked as such, so
// browsers pick Simplified glyph forms from system fonts.
export const htmlLang: Record<Language, string> = {
  en: "en",
  ka: "ka",
  ru: "ru",
  zh: "zh-CN",
};

export function getTranslations(language: Language) {
  return translations[language];
}
