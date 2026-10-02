"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Arrow from "@/components/ui/Arrow";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { navItems } from "@/lib/site";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="on-dark border-t border-paper/10 bg-night text-paper">
      <Container size="wide" className="pt-20 pb-10 md:pt-28">
        {/* Statement + contact */}
        <div className="grid gap-14 border-b border-paper/10 pb-16 lg:grid-cols-12 lg:gap-10 md:pb-20">
          <div className="lg:col-span-6">
            <Image
              src="/images/brand/etno-okami-logo.png"
              alt="Etno Okami Winery"
              width={1000}
              height={528}
              sizes="140px"
              className="h-16 w-auto"
            />
            <p className="display-sm mt-10 max-w-xl text-paper/90">{t.footer.title}</p>
            <p className="body-copy mt-5 max-w-lg text-paper/55">{t.footer.description}</p>
          </div>

          <div className="lg:col-span-3 lg:col-start-8">
            <h2 className="eyebrow text-gold">{t.footer.contact}</h2>
            <a
              href={`mailto:${t.footer.email}`}
              className="group mt-6 inline-flex items-center gap-4 text-lg text-paper transition-colors hover:text-gold"
            >
              <span className="link-line">{t.footer.email}</span>
              <Arrow className="transition-transform duration-500 group-hover:translate-x-1.5" />
            </a>
            <p className="mt-4 text-paper/55">{t.footer.address}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-gold">{t.footer.explore}</h2>
            <ul className="mt-6 space-y-3">
              {navItems
                .filter((item) => item.key !== "contact")
                .map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-paper/70 transition-colors duration-300 hover:text-paper"
                    >
                      {t.navbar[item.key]}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-col gap-6 pt-8 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>{t.footer.copyright}</p>
          <p>18+ · {t.footer.responsible}</p>
          <div className="flex items-center gap-6 text-paper/70">
            <LanguageSwitcher />
            <a href="#main" className="label flex items-center gap-3 transition-colors hover:text-gold">
              {t.ui.backToTop}
              <Arrow direction="up" className="w-3" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
