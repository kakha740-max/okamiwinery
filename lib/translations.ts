import en from "@/messages/en.json";
import ka from "@/messages/ka.json";

export const translations = {
  en,
  ka,
} as const;

export type Language = keyof typeof translations;

export function getTranslations(language: Language) {
  return translations[language];
}