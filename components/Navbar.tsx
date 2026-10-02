"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Already on the home page: a plain Link to "/" would do nothing, so scroll
  // back to the top instead (and drop any #gallery / #footer hash).
  const goHome = (event: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500">
        <div className="relative mx-auto flex h-20 md:h-24 max-w-7xl items-center justify-between px-5 md:px-12">

          {/* Desktop Left */}
          <div className="hidden xl:flex items-center gap-10 text-sm uppercase tracking-[0.28em] text-white">

            <Link href="/" onClick={goHome} className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.home}
            </Link>

            <Link href="/story" className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.story}
            </Link>

            <Link href="/wines" className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.wines}
            </Link>

            <Link href="/awards" className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.awards}
            </Link>

          </div>

          {/* Mobile Left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden flex flex-col justify-center gap-1.5"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>

          {/* Logo */}
          <Link
            href="/"
            onClick={goHome}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <Image
              src="/images/logo21.png"
              alt="Etno Okami Winery"
              width={168}
              height={168}
              priority
              className="hidden md:block object-contain"
            />

            <Image
              src="/images/logo21.png"
              alt="Etno Okami Winery"
              width={120}
              height={120}
              priority
              className="md:hidden object-contain"
            />
          </Link>

          {/* Desktop Right */}
          <div className="hidden xl:flex items-center gap-10 text-sm uppercase tracking-[0.28em] text-white">

            <Link href="/gallery" className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.gallery}
            </Link>

            <Link href="#footer" className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.contact}
            </Link>

            <LanguageSwitcher />

          </div>

          {/* Mobile Right */}
          <div className="xl:hidden">
            <LanguageSwitcher />
          </div>

        </div>

        {/* Mobile Menu */}

        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
          }`}
        >
          <div className="bg-black/90 backdrop-blur-xl">

            <Link
              href="/"
              onClick={goHome}
              className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition"
            >
              {t.navbar.home}
            </Link>

            <Link
              href="/story"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition"
            >
              {t.navbar.story}
            </Link>

            <Link
              href="/wines"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition"
            >
              {t.navbar.wines}
            </Link>

            <Link
              href="/gallery"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition"
            >
              {t.navbar.gallery}
            </Link>

            <Link
              href="/awards"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition"
            >
              {t.navbar.awards}
            </Link>

            <Link
              href="#footer"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition"
            >
              {t.navbar.contact}
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
}