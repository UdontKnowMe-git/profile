// src/components/Hero.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Github, Instagram, Linkedin } from "lucide-react";

export default function Hero() {
  const initParticles = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);
  const [clicks, setClicks] = useState(0);
  const [cat, setCat] = useState(false);
  const trailRef = useRef([]); // store transient trail dots
  const [, force] = useState(0); // force re-render for decay ticks
  const timeoutRef = useRef(null);
  const line1 = "Hi, I'm Hari Ram S.";
  const line2 = "Full‑stack tinkerer • Python/JS enthusiast.";
  const line3 = "I build awesome tools and experiences.";
  const lineAlt = "Let’s craft delightful web experiences.";
  const handlePanelClick = () => {
    setClicks((c) => {
      const n = c + 1;
      if (n >= 10) {
        setCat(true);
        // auto hide after 1800ms
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => { setCat(false); setClicks(0); }, 5000);
        return 0; // reset stored value
      }
      return n;
    });
  };
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // push a new orb
    trailRef.current.push({
      id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
      x, y,
      r: 4 + Math.random() * 6,
      hue: [182, 276, 310, 190][Math.floor(Math.random() * 4)], // cyan/violet/pink/teal hues
      life: 1 // 1..0
    });
  };

  const PARTICLE_OPTIONS = {
    background: { color: "transparent" },
    fpsLimit: 60,
    fullScreen: { enable: false },
    detectRetina: true,
    particles: {
      number: { value: 120, density: { enable: true, area: 700 } },
      color: { value: ["#22d3ee", "#a78bfa", "#f472b6", "#67e8f9"] },
      shape: { type: ["circle", "square", "triangle"] },
      opacity: {
        value: { min: 0.2, max: 0.7 },
        animation: { enable: true, speed: 0.6, minimumValue: 0.2, sync: false }
      },
      size: {
        value: { min: 1, max: 3.5 },
        animation: { enable: true, speed: 2, minimumValue: 0.8, sync: false }
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      },
      links: { enable: true, distance: 110, color: "#22d3ee", opacity: 0.28, width: 1 }
    },
    interactivity: {
      detectsOn: "canvas",
      events: { onHover: { enable: true, mode: ["repulse", "bubble"] }, resize: true },
      modes: {
        repulse: { distance: 120, duration: 0.25 },
        bubble: { distance: 140, size: 5, duration: 0.2, opacity: 0.8 }
      }
    }
  };
  function TrailLayer({ trailRef, force }) {
    // decay loop
    useEffect(() => {
      let raf;
      const tick = () => {
        const arr = trailRef.current;
        if (arr.length) {
          for (let i = arr.length - 1; i >= 0; i--) {
            const p = arr[i];
            p.life -= 0.04;                  // fade speed
            p.y -= 0.25;                     // slight float up
            p.x += (Math.random() - 0.5) * 0.6; // tiny wander
            if (p.life <= 0) arr.splice(i, 1);
          }
          force((n) => n + 1); // trigger repaint
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [trailRef, force]);

    return (
      <div className="pointer-events-none absolute inset-0">
        {trailRef.current.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x - p.r,
              top: p.y - p.r,
              width: p.r * 2,
              height: p.r * 2,
              background: `radial-gradient(closest-side, hsla(${p.hue}, 95%, 62%, ${0.65 * p.life}) 0%, hsla(${p.hue}, 95%, 62%, 0) 70%)`,
              filter: "blur(0.5px)"
            }}
          />
        ))}
      </div>
    );
  }

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);
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
              number: { value: 200, density: { enable: true, area: 700 } },
              color: { value: ["#22d3ee", "#a78bfa", "#f472b6"] },
              links: { enable: true, opacity: 0.28, distance: 110, color: "#22d3ee" },
              move: { enable: true, speed: 0.8 },
              opacity: { value: 0.55 },
              size: { value: { min: 1, max: 3 } },
              shape: { type: "circle" }
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" }, resize: true },
              modes: { repulse: { distance: 120, duration: 0.25 } }
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

      {/* Right visual — bare particles (no glass box) */}
      <div className="order-1 md:order-2 relative h-[320px] md:h-[420px]">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handlePanelClick}
          onMouseMove={handleMove}
          onTouchMove={(e) => {
            const t = e.touches[0];
            if (!t) return;
            const rect = e.currentTarget.getBoundingClientRect();
            handleMove({ currentTarget: e.currentTarget, clientX: t.clientX, clientY: t.clientY, getBoundingClientRect: () => rect });
          }}
        >
          <Particles
            id="heroParticlesBox"
            init={initParticles}
            className="w-full h-full"
            options={PARTICLE_OPTIONS}
          />
          {/* Atom rings */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-400/15 animate-[spin_14s_linear_infinite]"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-fuchsia-400/10 animate-[spin_22s_linear_infinite_reverse]"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-violet-400/10 animate-[spin_28s_linear_infinite]"></div>
          </div>
          {/* trail layer */}
          <TrailLayer trailRef={trailRef} force={force} />
        </div>

        {/* tiny progress hint (optional) */}
        {clicks > 0 && (
          <div className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded bg-black/50 text-cyan-200 border border-white/10">
            {10 - clicks}
          </div>
        )}
      </div>

      {/* Full‑screen cat overlay */}
      {cat && (
        <div className="fixed inset-0 z-[60] grid place-items-center pointer-events-none">
          {/* backdrop flash */}
          <div className="absolute inset-0 bg-black/50 animate-[fade_1800ms_ease]"></div>
          {/* spinning cat */}
          <img
            src="/media/oiiai-cat.gif"
            alt=""
            className="relative w-[220px] md:w-[300px] h-auto select-none"
          />
        </div>
      )}
    </div>
  );
}
