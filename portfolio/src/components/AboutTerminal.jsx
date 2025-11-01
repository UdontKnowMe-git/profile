// src/components/AboutTerminal.jsx
import { useEffect, useMemo, useRef, useState } from "react";

const HELP = `Available commands:
- help                Show this help
- whoami              Your name and quick blurb
- skills              List key technologies
- location            Where you are
- github              Open your GitHub
- projects            Short list with links
- socials [name]      Show all socials or open one (github/linkedin/instagram/discord)
- clear               Clear the terminal
`;


export default function AboutTerminal() {
  const [lines, setLines] = useState([
    "Welcome to the interactive terminal.",
    "Type 'help' to get started.",
    "Try: whoami, skills, projects"
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);     // removed <string[]>
  const [hiPtr, setHiPtr] = useState(-1);
  const [retro, setRetro] = useState(false);
  const boxRef = useRef(null);                    // removed <HTMLDivElement>
  const inputRef = useRef(null);                  // removed <HTMLInputElement>


  const commands = useMemo(() => ({
    help: () => HELP,
    whoami: () => `Hari Ram S
Full‑stack tinkerer • Python/JS enthusiast`,
    skills: () => "JavaScript  TypeScript  React  Node.js  Tailwind  Python  Flask  SQL  Git  Docker  Linux",
    location: () => "Remote / Vijayawada",
    github: () => {
      window.open("https://github.com/UdontKnowMe-git", "_blank", "noopener,noreferrer");
      return "Opening GitHub...";
    },
    socials: (args = []) => {
      const links = {
        github: "https://github.com/UdontKnowMe-git",
        linkedin: "https://www.linkedin.com/in/hariram-s-01a98b292/",
        instagram: "https://www.instagram.com/udontknowme_git/",
        discord: "https://discordapp.com/users/679200590353399839",
        email: "hariram.s2399@gmail.com"
      };

      // open a specific social if passed (e.g., "socials github")
      const key = (args[0] || "").toLowerCase();
      if (links[key]) {
        window.open(links[key], "_blank", "noopener,noreferrer");
        return `Opening ${key}…`;
      }

      // otherwise print all
      return [
        "Socials:",
        `- GitHub     — ${links.github}`,
        `- LinkedIn   — ${links.linkedin}`,
        `- Instagram  — ${links.instagram}`,
        `- Discord    — ${links.discord}`,
        `- Email      — ${links.email}`,
        "",
        'Tip: type "socials github" (or linkedin/instagram/discord) to open directly.'
      ].join("\n");
    },
    projects: () => [
      "music-player — https://github.com/UdontKnowMe-git/music-player",
      "morse-py — https://github.com/UdontKnowMe-git/morse-py",
      "josaa-parser — https://github.com/UdontKnowMe-git/josaa-parser",
      "profile — https://github.com/UdontKnowMe-git/profile",
      "spotigrab — https://github.com/UdontKnowMe-git/spotigrab"
    ].join("\n"),
    clear: () => {
      setLines([]);
      return "";
    },
    theme: () => {
      setRetro(v => !v);
      return "Theme toggled.";
    },
    secret: () => {
      const evt = new CustomEvent("trigger-easter-egg");
      window.dispatchEvent(evt);
      return "Initializing secret protocol… 🕹️";
    }
  }), []);

  useEffect(() => {
    // auto scroll to bottom on new lines
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [lines]);

    useEffect(() => {
    // focus input when clicking anywhere inside the terminal
    const focus = () => inputRef.current?.focus();
    boxRef.current?.addEventListener("mousedown", focus);
    return () => boxRef.current?.removeEventListener("mousedown", focus);
  }, []);

  const runCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const [name, ...args] = cmd.split(/\s+/);
    const exec = commands[name];

    setLines(prev => [...prev, `$ ${cmd}`]);

    if (exec) {
      const out = exec(args);
      if (typeof out === "string" && out.length) {
        setLines(prev => [...prev, out]);
      }
    } else {
      setLines(prev => [...prev, `Command not found: ${name}\nType "help" for options.`]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHistory(h => [input, ...h]);
    setHiPtr(-1);
    runCommand(input);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hiPtr + 1, history.length - 1);
      if (history[next]) {
        setInput(history[next]);
        setHiPtr(next);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(hiPtr - 1, -1);
      setHiPtr(next);
      setInput(next === -1 ? "" : history[next]);
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      commands.clear();
    }
  };
  return (
    <div className={`w-full ${retro ? "saturate-[1.2] contrast-125" : ""}`}>
      {/* Stretch across screen container */}
      <div
        className="w-full rounded-xl border border-white/10 bg-black/70 shadow-2xl overflow-hidden"
        style={{ backdropFilter: "blur(6px)" }}
      >
        {/* window controls */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="w-3 h-3 rounded-full bg-red-500/85"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400/85"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/85"></span>
          <div className="ml-3 text-xs text-cyan-200/80">About Terminal — try: help, whoami, skills, projects</div>
        </div>

        {/* output area */}
        <div ref={boxRef} className="max-h-[55vh] md:max-h-[60vh] overflow-auto px-4 sm:px-6 py-5 font-mono text-sm md:text-base text-green-300">
          {lines.map((l, i) => (
            <pre key={i} className="whitespace-pre-wrap leading-relaxed">{l}</pre>
          ))}

          {/* prompt */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent outline-none placeholder:text-green-800/60 text-green-200"
              placeholder="type a command… (help)"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
