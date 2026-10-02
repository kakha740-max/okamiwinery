import en from "@/messages/en.json";
import ka from "@/messages/ka.json";
import ru from "@/messages/ru.json";

export const translations = {
  en,
  ka,
  ru,
} as const;

export type Language = keyof typeof translations;

export function getTranslations(language: Language) {
  return translations[language];
}