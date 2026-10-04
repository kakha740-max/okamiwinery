"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Arrow from "@/components/ui/Arrow";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { FACEBOOK_URL, PHONE, PHONE_HREF, navItems } from "@/lib/site";

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

          <div className="lg:col-span-4 lg:col-start-7">
            <h2 className="eyebrow text-gold">{t.footer.contact}</h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs tracking-[0.04em] text-paper/45">{t.footer.emailLabel}</dt>
                <dd className="mt-1">
                  <a href={`mailto:${t.footer.email}`} className="link-line text-paper transition-colors hover:text-gold">
                    {t.footer.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.04em] text-paper/45">{t.footer.phoneLabel}</dt>
                <dd className="mt-1">
                  <a href={PHONE_HREF} className="link-line text-paper tabular-nums transition-colors hover:text-gold">
                    {PHONE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.04em] text-paper/45">{t.footer.addressLabel}</dt>
                <dd className="mt-1 text-paper/75">{t.footer.address}</dd>
              </div>
            </dl>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.footer.follow}: Facebook`}
              className="group mt-8 inline-flex items-center gap-3 text-paper/70 transition-colors hover:text-paper"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-night">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.89v2.17H7.92v2.94h2.54V21h3.04Z" />
                </svg>
              </span>
              <span className="text-xs tracking-[0.04em]">{t.footer.follow}</span>
            </a>
          </div>

          <div className="lg:col-span-2 lg:col-start-11">
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
