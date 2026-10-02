"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="scroll-mt-24 border-t border-white/10 bg-[#030303] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A15A]">
              {t.footer.eyebrow}
            </p>
            <h3
              className="mt-3 text-2xl font-light text-white sm:text-3xl"
            >
              {t.footer.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/70">
              {t.footer.description}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] text-white/90">{t.footer.explore}</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><Link href="/" className="transition hover:text-[#C8A15A]">{t.footer.home}</Link></li>
                <li><Link href="/wines" className="transition hover:text-[#C8A15A]">{t.footer.wines}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] text-white/90">{t.footer.contact}</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><a href={`mailto:${t.footer.email}`} className="transition hover:text-[#C8A15A]">{t.footer.email}</a></li>
                <li><span>{t.footer.address}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
