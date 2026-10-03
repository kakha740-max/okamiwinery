"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { darkHeroRoutes, navItems } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the full-screen menu is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const overHero = darkHeroRoutes.includes(pathname) && !scrolled;
  const light = overHero || menuOpen;

  // Already on the home page: a plain Link to "/" would do nothing, so scroll
  // back to the top instead (and drop any #hash).
  const goHome = (event: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href.startsWith("/") && pathname.startsWith(href);

  const linkClass = (href: string) =>
    `label relative py-2 text-[0.84375rem] transition-opacity duration-300 hover:opacity-100 [&:lang(ka)]:text-[0.9375rem] ${
      isActive(href) ? "opacity-100" : "opacity-90"
    }`;

  const left = navItems.slice(0, 3);
  const right = navItems.slice(3);

  const renderLink = (item: (typeof navItems)[number]) => (
    <Link
      key={item.key}
      href={item.href}
      onClick={item.href === "/" ? goHome : undefined}
      aria-current={isActive(item.href) ? "page" : undefined}
      className={linkClass(item.href)}
    >
      {t.navbar[item.key]}
      {isActive(item.href) && (
        <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-px bg-current" />
      )}
    </Link>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,height] duration-700 ease-[var(--ease-luxe)] ${
          light ? "on-dark text-paper" : "text-ink"
        } ${
          overHero || menuOpen
            ? "border-b border-transparent bg-transparent"
            : "border-b border-ink/10 bg-paper/92 backdrop-blur-md"
        }`}
      >
        {/* Soft shade so white navigation stays legible over bright imagery. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/65 to-transparent transition-opacity duration-700 ${
            overHero && !menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative mx-auto grid max-w-[96rem] grid-cols-[1fr_auto_1fr] items-center px-5 transition-[height] duration-700 ease-[var(--ease-luxe)] sm:px-8 lg:px-12 ${
            scrolled ? "h-16 lg:h-20" : "h-20 lg:h-24"
          }`}
        >
          {/* Left: desktop links / mobile menu button */}
          <div className="flex items-center">
            <nav aria-label={t.ui.mainNav} className="hidden items-center gap-10 xl:flex">
              {left.map(renderLink)}
            </nav>

            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="label -ml-2 flex items-center gap-3 p-2 xl:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-luxe)] ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-luxe)] ${
                    menuOpen ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
                  }`}
                />
              </span>
              <span className="hidden sm:inline">{menuOpen ? t.ui.close : t.ui.menu}</span>
              <span className="sr-only sm:hidden">{menuOpen ? t.ui.close : t.ui.menu}</span>
            </button>
          </div>

          {/* Centre: logo */}
          <Link href="/" onClick={goHome} className="block" aria-label="Etno Okami Winery">
            <Image
              src="/images/brand/etno-okami-logo.png"
              alt=""
              width={1000}
              height={528}
              preload
              sizes="160px"
              className={`w-auto transition-[height] duration-700 ease-[var(--ease-luxe)] ${
                scrolled ? "h-10 lg:h-12" : "h-12 lg:h-[4.25rem]"
              }`}
            />
          </Link>

          {/* Right: desktop links (the language switcher lives in the footer) */}
          <div className="flex items-center justify-end gap-9">
            <nav aria-label={t.ui.mainNav} className="hidden items-center gap-10 xl:flex">
              {right.map(renderLink)}
            </nav>
          </div>
        </div>
      </header>

      {/* Full-screen menu (below xl) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            className="on-dark fixed inset-0 z-40 flex flex-col bg-night text-paper xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <nav
              aria-label={t.ui.mainNav}
              className="flex flex-1 flex-col justify-center px-6 pt-24 pb-10 sm:px-12"
            >
              <ul className="space-y-1 sm:space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.08 + index * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={item.href === "/" ? goHome : () => setMenuOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="group flex items-baseline gap-5 py-1.5"
                    >
                      <span className="w-6 text-[0.6875rem] tracking-[0.2em] text-gold/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`display-md transition-colors duration-300 group-hover:text-gold ${
                          isActive(item.href) ? "text-gold" : ""
                        }`}
                      >
                        {t.navbar[item.key]}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="flex flex-col gap-4 border-t border-paper/10 px-6 py-8 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between sm:px-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a href={`mailto:${t.footer.email}`} className="transition-colors hover:text-gold">
                {t.footer.email}
              </a>
              <span>{t.footer.address}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
