"use client";

import { useState } from "react";
import Image from "next/image";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md transition-all duration-500">
        <div className="relative mx-auto flex h-20 md:h-24 max-w-7xl items-center justify-between px-5 md:px-12">

          {/* Desktop Left */}
          <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.28em] text-white">

            <button className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.home}
            </button>

            <button className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.story}
            </button>

            <button className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.wines}
            </button>

          </div>

          {/* Mobile Left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-1.5"
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
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">

            <Image
              src="/images/logo.png"
              alt="Okami Winery"
              width={95}
              height={95}
              priority
              className="hidden md:block object-contain"
            />

            <Image
              src="/images/logo.png"
              alt="Okami Winery"
              width={68}
              height={68}
              priority
              className="md:hidden object-contain"
            />

            <div className="mt-1 h-px w-16 md:w-20 bg-[#C8A15A]/70"></div>

          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.28em] text-white">

            <button className="transition duration-300 hover:text-[#C8A15A]">
              Export
            </button>

            <button className="transition duration-300 hover:text-[#C8A15A]">
              {t.navbar.contact}
            </button>

            <LanguageSwitcher />

          </div>

          {/* Mobile Right */}
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>

        </div>

        {/* Mobile Menu */}

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
          }`}
        >
          <div className="bg-black/90 backdrop-blur-xl">

            <button className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition">
              {t.navbar.home}
            </button>

            <button className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition">
              {t.navbar.story}
            </button>

            <button className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition">
              {t.navbar.wines}
            </button>

            <button className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition">
              Export
            </button>

            <button className="block w-full py-5 text-center uppercase tracking-[0.22em] text-white hover:text-[#C8A15A] transition">
              {t.navbar.contact}
            </button>

          </div>
        </div>
      </nav>
    </>
  );
}