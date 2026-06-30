"use client";

import Image from "next/image";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md transition-all duration-500">
      <div className="relative mx-auto flex h-24 max-w-7xl items-center justify-between px-12">

        {/* Left Menu */}
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

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">

          <Image
  src="/images/logo.png"
  alt="Okami Winery"
  width={95}
  height={95}
  priority
  className="object-contain"
/>

          <div className="mt-1 h-px w-20 bg-[#C8A15A]/70"></div>

        </div>

        {/* Right Menu */}
        <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.28em] text-white">

          <button className="transition duration-300 hover:text-[#C8A15A]">
            Export
          </button>

          <button className="transition duration-300 hover:text-[#C8A15A]">
            {t.navbar.contact}
          </button>

          <LanguageSwitcher />

        </div>

      </div>
    </nav>
  );
}