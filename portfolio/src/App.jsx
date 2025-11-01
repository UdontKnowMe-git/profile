// src/App.jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutTerminal from "./components/AboutTerminal";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
// import "./App.css";
// App.css is no longer needed as Tailwind CSS is used
import useReveal from "./components/useReveal";
import useCustomCursor from "./components/useCustomCursor";
import Stats from "./components/Stats";
import ContributionHeatmap from "./components/ContributionHeatmap";
import BioSkills from "./components/BioSkills";
import Timeline from "./components/Timeline";

function App() {
  useCustomCursor();
  useReveal();
  return (
    <div className="relative min-h-screen w-full text-white">
      {/* Fixed background layer */}
      <div className="fixed inset-0 -z-10">
        <img src="/bg.gif" alt="background" className="w-full h-full object-cover" style={{ filter: "brightness(0.75) blur(1px)" }} />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <Navbar />
      {/* Custom cursor nodes */}
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>

      {/* Home / Hero */}
      <section id="home" className="min-h-[90vh] px-6 md:px-12 lg:px-20 pt-28 reveal">
        <Hero />
      </section>

      {/* About */}
      <section id="about" className="px-4 md:px-8 lg:px-12 py-20 reveal">
        <h2 className="text-3xl font-bold mb-6 text-cyan-300">About</h2>
        <AboutTerminal />
      </section>
      
      {/* Bio & Skills */}
      <BioSkills />

      {/* Timeline */}
      <Timeline />

      {/* Projects */}
      <section id="projects" className="px-6 md:px-12 lg:px-20 py-20 reveal">
        <h2 className="text-3xl font-bold mb-8 text-cyan-300">Projects</h2>
        <Projects />
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-5 text-cyan-300">GitHub Stats</h3>
          <Stats />
        </div>
        <div className="mt-6">
          <ContributionHeatmap login="UdontKnowMe-git" />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-12 lg:px-20 py-20 reveal">
        <h2 className="text-3xl font-bold mb-8 text-cyan-300">Contact</h2>
        <Contact />
      </section>
    </div>
  );
}

export default App;
