// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-black/30 border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16">
        <a href="#home" className="text-lg font-extrabold tracking-wide">
          <span className="text-cyan-400">Hari</span>ram S
        </a>
        <ul className="flex items-center gap-6 text-sm">
          <li><a href="#home" className="hover:text-cyan-300 transition">Home</a></li>
          <li><a href="#about" className="hover:text-cyan-300 transition">About</a></li>
          <li><a href="#projects" className="hover:text-cyan-300 transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-cyan-300 transition">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
