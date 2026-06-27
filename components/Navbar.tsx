import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-white/10 transition-all duration-500">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-10">

        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Okami Winery"
            width={95}
            height={95}
            priority
            className="object-contain"
          />
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.28em] text-white">

          <li className="cursor-pointer transition-all duration-300 hover:text-yellow-400">
            Home
          </li>

          <li className="cursor-pointer transition-all duration-300 hover:text-yellow-400">
            Story
          </li>

          <li className="cursor-pointer transition-all duration-300 hover:text-yellow-400">
            Wines
          </li>

          <li className="cursor-pointer transition-all duration-300 hover:text-yellow-400">
            Export
          </li>

          <li className="cursor-pointer transition-all duration-300 hover:text-yellow-400">
            Contact
          </li>

        </ul>

      </div>
    </nav>
  );
}