// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Home, User, FolderGit2, Mail, Menu, BookOpenCheck, Clock } from "lucide-react";

const links = [
  { href: "#home", label: "Home", Icon: Home },
  { href: "#about", label: "About", Icon: User },
  { href: "#bio", label: "Bio", Icon: BookOpenCheck },
  { href: "#timeline", label: "Timeline", Icon: Clock },
  { href: "#projects", label: "Projects", Icon: FolderGit2 },
  { href: "#contact", label: "Contact", Icon: Mail },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // close on route/hash change
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <>
      {/* Top brand bar (minimal) */}
      <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
          <a href="#home" className="text-lg font-extrabold tracking-wide">
            <span className="text-cyan-400">HariRam S</span>
          </a>

          {/* Hamburger for mobile / also available on desktop */}
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="relative size-10 grid place-items-center rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Drop-left overlay and panel */}
      <div className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Dim backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        {/* Sliding panel from right */}
        <aside
          className={`absolute top-0 right-0 h-full w-[78vw] max-w-sm border-l border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Close button */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
            <div className="text-sm text-gray-300">Menu</div>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="size-9 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition"
            >
              ✕
            </button>
          </div>

          {/* Staggered links */}
          <nav className="px-4 py-4">
            <ul>
              {links.map(({ href, label, Icon }, i) => (
                <li key={href} style={{ transitionDelay: `${open ? i * 60 : 0}ms` }} className="overflow-hidden">
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block text-lg rounded-lg border border-transparent hover:border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 mb-3 translate-x-6 opacity-0 transition-all ${open ? "translate-x-0 opacity-100" : ""} flex items-center gap-3`}
                  >
                    <Icon size={18} className="text-cyan-300" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
