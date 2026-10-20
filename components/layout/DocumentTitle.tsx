"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SHOW_VINTAGE, localizeWine, wines } from "@/components/data/wines";

// The site's titles are rendered on the server in English. A visitor who has
// chosen Russian sees the browser tab's title in Russian too: this replaces it
// on every route, and puts the server's title back when the language changes
// again. (Georgian keeps the server's titles for now.)
const SITE = "Винодельня «Этно Оками»";

function russianTitle(pathname: string, t: ReturnType<typeof useLanguage>["t"]): string | null {
  if (pathname === "/") return `${SITE} — грузинские вина в квеври с 1965 года`;
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
  const wine = localizeWine(original, "ru");
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
      const wanted = language === "ru" ? russianTitle(pathname, t) : null;
      const next = wanted ?? serverTitle.current;
      ourTitle.current = wanted ?? "";
      if (document.title !== next) document.title = next;
    };
    apply();
    // Navigation can update the title after this effect; follow it.
    const observer = new MutationObserver(() => {
      if (language === "ru" && document.title !== ourTitle.current) apply();
    });
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [pathname, language, t]);

  return null;
}
