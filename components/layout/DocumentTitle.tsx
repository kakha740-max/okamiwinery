"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SHOW_VINTAGE, localizeWine, wines } from "@/components/data/wines";

// The site's titles are rendered on the server in English. A visitor who has
// chosen Russian or Chinese sees the browser tab's title in that language too:
// this replaces it on every route, and puts the server's title back when the
// language changes again. (Georgian keeps the server's titles for now.)
const sites = {
  ru: { name: "Винодельня «Этно Оками»", tagline: "грузинские вина в квеври с 1965 года" },
  zh: { name: "埃特诺·奥卡米酒庄", tagline: "始于1965年的格鲁吉亚陶罐葡萄酒" },
} as const;

type TitledLanguage = keyof typeof sites;
const isTitled = (language: string): language is TitledLanguage => language in sites;

function localTitle(language: TitledLanguage, pathname: string, t: ReturnType<typeof useLanguage>["t"]): string | null {
  const { name: SITE, tagline } = sites[language];
  if (pathname === "/") return `${SITE} — ${tagline}`;
  const page: Record<string, string> = {
    "/story": t.story.eyebrow,
    "/wines": t.navbar.wines,
    "/gallery": t.navbar.gallery,
    "/awards": t.navbar.awards,
  };
  if (page[pathname]) return `${page[pathname]} | ${SITE}`;

  const match = pathname.match(/^\/wines\/([^/]+)(\/sheet\/[a-z]+)?$/);
  const original = match && wines.find((wine) => wine.slug === match[1]);
  if (!original) return null;
  const wine = localizeWine(original, language);
  const vintage = SHOW_VINTAGE && wine.year !== "—" ? ` ${wine.year}` : "";
  if (match[2]) return `${wine.name}${vintage} — ${t.winePage.sheetTitle}`;
  return `${wine.name}${vintage} — ${wine.subtitle} | ${SITE}`;
}

export default function DocumentTitle() {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const serverTitle = useRef("");
  const ourTitle = useRef("");

  useEffect(() => {
    const apply = () => {
      // Any title we didn't set is the server's for this route.
      if (document.title !== ourTitle.current) serverTitle.current = document.title;
      const wanted = isTitled(language) ? localTitle(language, pathname, t) : null;
      const next = wanted ?? serverTitle.current;
      ourTitle.current = wanted ?? "";
      if (document.title !== next) document.title = next;
    };
    apply();
    // Navigation can update the title after this effect; follow it.
    const observer = new MutationObserver(() => {
      if (isTitled(language) && document.title !== ourTitle.current) apply();
    });
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [pathname, language, t]);

  return null;
}
