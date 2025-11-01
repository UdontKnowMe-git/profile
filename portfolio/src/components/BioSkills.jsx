import { BIO, LANGUAGES, TOOLS, SKILL_CONCEPTS, LABELS } from "../data/profile";
import DevLogo from "./DevLogo";
import {
  UserRound, BookOpenCheck, Cpu, Code2, Blocks, Atom,
  Database, Network as Net, TestTube, TerminalSquare,
  Wrench, Globe2, Palette, Bot, Server, Boxes, CircleCheck,
  Layers3, Brain, Braces
} from "lucide-react";
import { useRef, useState } from "react";

function useHoverTip() {
  const [tip, setTip] = useState({ show: false, text: "", x: 0, y: 0 });
  const show = (e, text) => setTip({ show: true, text, x: e.clientX + 12, y: e.clientY + 12 });
  const move = (e) => setTip((t) => ({ ...t, x: e.clientX + 12, y: e.clientY + 12 }));
  const hide = () => setTip((t) => ({ ...t, show: false }));
  const Tip = () =>
    tip.show ? (
      <div
        className="fixed z-50 px-2 py-1 text-xs rounded-md bg-black/80 text-gray-200 border border-white/10 pointer-events-none"
        style={{ left: tip.x, top: tip.y }}
      >
        {tip.text}
      </div>
    ) : null;
    return { show, move, hide, Tip };
}

const ICON_FOR = {
  "Object‑Oriented Programming (OOP)": Blocks,
  "Data Structures and Algorithms": Layers3,
  "Web Scraping": Server,
  "Testing": TestTube,
  "Databases": Database,
  "Project Management": Wrench,
  "Communication": CircleCheck,
  "Artificial Intelligence (AI)": Atom,
  "Machine Learning (ML)": Brain,
  "Networking": Net,
  "Linux": Bot
};

function ConceptPill({ label, hover }) {
  const Icon = ICON_FOR[label] || Blocks;
  return (
    <div
      className="group size-12 grid place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(167,139,250,0.25)]"
      onMouseEnter={(e) => hover?.show(e, label)}
      onMouseMove={hover?.move}
      onMouseLeave={hover?.hide}
      aria-label={label}
    >
      <Icon size={18} className="text-cyan-300" />
    </div>
  );
}

function SectionRow({ title, children }) {
  return (
    <div className="mt-10">
      <h4 className="text-cyan-200 mb-3 text-center">{title}</h4>
      <div className="flex flex-wrap gap-3 justify-center">{children}</div>
    </div>
  );
}

function SkillPill({ name }) {
  const Icon = ICONS[name] || Boxes;
  return (
    <div className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10 transition">
      <Icon size={16} className="text-cyan-300" />
      <span className="text-gray-200 text-sm">{name}</span>
    </div>
  );
}

export default function BioSkills() {
    const hover = useHoverTip();
    const Tip = hover.Tip;
    return (
        <section id="bio" className="px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-6">
            <UserRound className="text-cyan-300" size={20} />
            <h3 className="text-2xl md:text-3xl font-extrabold text-cyan-300">Bio</h3>
            </div>

            {/* Split: text left, photo right */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            {/* Text */}
                <div className="md:col-span-3">
                    <p className="text-base md:text-lg leading-7 md:leading-8">
                        <span className="bg-gradient-to-r from-gray-100 via-cyan-200 to-gray-100 bg-clip-text text-transparent">
                        {BIO}
                        </span>
                    </p>
                </div>


            {/* Photo with effects */}
            <div className="md:col-span-2 relative w-full flex justify-center">
                {/* soft neon blobs */}
                <div className="pointer-events-none absolute -top-10 -left-6 w-28 h-28 rounded-full bg-cyan-500/25 blur-2xl"></div>
                <div className="pointer-events-none absolute -bottom-10 -right-4 w-32 h-32 rounded-full bg-fuchsia-500/25 blur-2xl"></div>

                {/* avatar frame */}
                <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-cyan-400/30 via-fuchsia-400/20 to-transparent blur-lg"></div>
                <img
                    src="/profile.jpg"   /* put your image file in public/profile.jpg or adjust path */
                    alt="Hariram S"
                    className="relative z-[1] w-44 h-44 md:w-56 md:h-56 object-cover rounded-xl border border-white/15 shadow-[0_0_30px_rgba(34,211,238,.15)]"
                />
                {/* thin inner ring */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 pointer-events-none"></div>
                </div>
            </div>
            </div>
            {/* Skills Sections */}
            <div className="flex items-center gap-2 mt-10 mb-3">
            <Code2 className="text-cyan-300" size={20} />
            <h3 className="text-2xl font-bold text-cyan-300">Skills</h3>
            </div>

            <SectionRow title="Programming Languages">
            {LANGUAGES.map((slug) => (
                <DevLogo key={slug} name={slug} title={LABELS[slug] || slug.toUpperCase()} hover={hover} />
            ))}
            </SectionRow>

            <SectionRow title="Tools & Frameworks">
            {TOOLS.map((slug) => (
                <DevLogo key={slug} name={slug} title={LABELS[slug] || slug} hover={hover} />
            ))}
            </SectionRow>

            <SectionRow title="Core Skills">
            {SKILL_CONCEPTS.map((s) => <ConceptPill key={s} label={s} hover={hover} />)}
            </SectionRow>

            {/* floating tooltip */}
            <Tip />

        </div>
        </section>
    );
}
