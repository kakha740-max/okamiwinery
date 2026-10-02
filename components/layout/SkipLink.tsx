"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main"
      className="label fixed top-3 left-3 z-[200] -translate-y-24 bg-ink px-5 py-3 text-paper transition-transform focus:translate-y-0"
    >
      {t.ui.skipToContent}
    </a>
  );
}
