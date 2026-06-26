export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md text-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <h1 className="text-2xl font-bold tracking-[0.3em]">
          OKAMI
        </h1>

        <ul className="flex gap-8 text-sm uppercase tracking-wider">
          <li className="cursor-pointer hover:text-yellow-400 transition">Home</li>
          <li className="cursor-pointer hover:text-yellow-400 transition">History</li>
          <li className="cursor-pointer hover:text-yellow-400 transition">Wines</li>
          <li className="cursor-pointer hover:text-yellow-400 transition">Export</li>
          <li className="cursor-pointer hover:text-yellow-400 transition">Contact</li>
        </ul>

      </div>
    </nav>
  );
}