// src/components/Projects.jsx
import { personalProjects, hackathonProjects } from "../data/projects";

function Cards({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((p) => (
        <a key={p.title} href={p.link} target="_blank" rel="noreferrer"
           className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] hover:scale-[1.02] transition will-change-transform flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold group-hover:text-cyan-300 transition">{p.title}</h3>
            <p className="mt-2 text-gray-300">{p.desc}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {p.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded bg-cyan-600/20 text-cyan-200 text-xs border border-cyan-400/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <span className="mt-4 inline-block text-sm text-cyan-300/90 group-hover:text-cyan-200">
            {p.linkLabel || "View on GitHub →"}
          </span>
        </a>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <div className="space-y-14">
      <div>
        <h3 className="text-2xl font-bold mb-5 text-cyan-300">Personal Projects</h3>
        <Cards items={personalProjects} />
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-5 text-cyan-300">Team Hackathons</h3>
        <p className="text-gray-400 mb-6">Highlights from hackathons collaborated with teammates. Roles: full‑stack + ML integration, feature prototyping, and polish.</p>
        <Cards items={hackathonProjects} />
      </div>
    </div>
  );
}
