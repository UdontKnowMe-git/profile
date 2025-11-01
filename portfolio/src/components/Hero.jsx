// src/components/Hero.jsx
import Typewriter from "typewriter-effect";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Github, Instagram, Linkedin } from "lucide-react";

export default function Hero() {
  const initParticles = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const line1 = "Hi, I'm Hari Ram S.";
  const line2 = "Full‑stack tinkerer • Python/JS enthusiast.";
  const line3 = "I build playful tools and experiences.";
  const lineAlt = "Let’s craft delightful web experiences.";

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="absolute inset-0 -z-10 md:inset-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:h-[420px] md:w-1/2 pointer-events-none">
        <Particles
          id="heroParticles"
          init={initParticles}
          className="w-full h-full"
          options={{
            background: { color: "transparent" },
            fpsLimit: 60,
            fullScreen: { enable: false },
            particles: {
              number: { value: 50, density: { enable: true, area: 800 } },
              color: { value: ["#22d3ee", "#a78bfa", "#f472b6"] },
              links: { enable: true, opacity: 0.25, distance: 130, color: "#22d3ee" },
              move: { enable: true, speed: 0.6 },
              opacity: { value: 0.5 },
              size: { value: { min: 1, max: 3 } },
              shape: { type: "circle" }
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" }, resize: true },
              modes: { repulse: { distance: 120, duration: 0.3 } }
            },
            detectRetina: true
          }}
        />
      </div>

      <div className="order-2 md:order-1">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            Hari Ram S
          </span>
        </h1>
        <p className="text-gray-300 mt-2">Developer • Problem solver • Curious human</p>

        <div className="mt-5 text-base md:text-lg text-gray-100 font-mono">
          <Typewriter
            options={{
              delay: 35,
              deleteSpeed: 18,
              loop: true,
              cursor: "_",
              wrapperClassName: "whitespace-pre-wrap",
              cursorClassName: "typewriter-caret"
            }}
            onInit={(tw) => {
              // Type lines one after another with explicit deletes between cycles
              tw.typeString(line1)
                .pauseFor(700)
                .typeString("\n" + line2)
                .pauseFor(700)
                .typeString("\n" + line3)
                .pauseFor(1400)
                // Clear whole block safely
                .deleteAll(20) // explicit speed: 20ms per char
                .typeString(line1)
                .pauseFor(500)
                .typeString("\n" + lineAlt)
                .pauseFor(1400)
                .deleteAll(20)
                .start();
            }}
          />
        </div>

        {/* Actions row */}
        <div className="mt-6 flex items-center gap-4">
          <a href="#projects" className="px-5 py-2.5 rounded-md bg-cyan-600 hover:bg-cyan-500 transition">
            View Projects
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/UdontKnowMe-git"
              target="_blank"
              rel="noreferrer"
              className="group size-10 grid place-items-center rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              title="GitHub"
            >
              <Github size={18} className="text-white group-hover:text-cyan-300 transition" />
            </a>
            <a
              href="https://instagram.com/udontknowme_git/"
              target="_blank"
              rel="noreferrer"
              className="group size-10 grid place-items-center rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(244,114,182,0.25)]"
              title="Instagram"
            >
              <Instagram size={18} className="text-white group-hover:text-fuchsia-300 transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/hariram-s-01a98b292/"
              target="_blank"
              rel="noreferrer"
              className="group size-10 grid place-items-center rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              title="LinkedIn"
            >
              <Linkedin size={18} className="text-white group-hover:text-cyan-300 transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2 relative h-[320px] md:h-[420px]">
        <div className="absolute inset-0 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-cyan-500/20 blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-52 h-52 rounded-full bg-fuchsia-500/20 blur-2xl animate-pulse"></div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="size-28 md:size-36 rounded-lg border border-cyan-300/40 shadow-[0_0_40px_rgba(34,211,238,0.25)] animate-[spin_16s_linear_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
