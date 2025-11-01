// src/components/Projects.jsx
const personal = [
  { title: "EconoVerse", desc: "A fun online terminal game about basic economy—grind, chill, and trade.", tags: ["Python", "Game", "CLI"], link: "https://github.com/UdontKnowMe-git/EconoVerse" },
  { title: "music-player", desc: "A desktop music player built with Java.", tags: ["Java", "Desktop"], link: "https://github.com/UdontKnowMe-git/music-player" },
  { title: "morse-py", desc: "Simple Morse encoder/decoder in Python.", tags: ["Python", "CLI"], link: "https://github.com/UdontKnowMe-git/morse-py" },
  { title: "josaa-parser", desc: "Parses JoSAA course list to structured data.", tags: ["Python", "Parsing"], link: "https://github.com/UdontKnowMe-git/josaa-parser" },
  { title: "profile", desc: "Personal resume website.", tags: ["Web", "HTML/CSS"], link: "https://github.com/UdontKnowMe-git/profile" },
  { title: "spotigrab", desc: "Download Spotify songs to MP3 for offline listening.", tags: ["Python", "Automation"], link: "https://github.com/UdontKnowMe-git/spotigrab" }
];

const teamHackathons = [
  {
    title: "Agrinova",
    desc: "Smart agriculture toolkit built during a hackathon—crop insights, assistance, and tooling.",
    tags: ["Hackathon", "Web", "Team"],
    link: "https://github.com/M-Arjun-07/Agrinova"
  },
  {
    title: "wiseeyou",
    desc: "Safety/awareness application prototype created with the team during a fast‑paced hackathon.",
    tags: ["Hackathon", "Prototype", "ESP32", "Team"],
    link: "https://github.com/M-Arjun-07/wiseeyou"
  },
  {
    title: "Fake Twitter Detection (D3)",
    desc: "XGBoost model to detect fake Twitter accounts and compute trust score; built collaboratively for D3 hackathon.",
    tags: ["ML", "API", "Python", "Team"],
    link: "https://github.com/CV-Vignesh/D3-hackathon"
  }
];

function Cards({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((p) => (
        <a key={p.title} href={p.link} target="_blank" rel="noreferrer"
           className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] hover:scale-[1.02] transition will-change-transform">
          <h3 className="text-xl font-bold group-hover:text-cyan-300 transition">{p.title}</h3>
          <p className="mt-2 text-gray-300">{p.desc}</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            {p.tags.map(t => (
              <span key={t} className="px-2 py-0.5 rounded bg-cyan-600/20 text-cyan-200 text-xs border border-cyan-400/20">
                {t}
              </span>
            ))}
          </div>
          <span className="mt-4 inline-block text-sm text-cyan-300/90 group-hover:text-cyan-200">View on GitHub →</span>
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
        <Cards items={personal} />
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-5 text-cyan-300">Team Hackathons</h3>
        <p className="text-gray-400 mb-6">Highlights from hackathons collaborated with teammates. Roles: full‑stack + ML integration, feature prototyping, and polish.</p>
        <Cards items={teamHackathons} />
      </div>
    </div>
  );
}
