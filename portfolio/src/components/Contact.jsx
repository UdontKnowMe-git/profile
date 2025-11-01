// src/components/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [state, setState] = useState({ loading: false, ok: false, err: "" });

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkgppvly"; // <-- replace
  
  const USE_WEB3FORMS = false;
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;           // capture before awaits
    const fd = new FormData(form);

    setState({ loading: true, ok: false, err: "" });

    try {
      if (USE_WEB3FORMS) {
        const payload = Object.fromEntries(fd.entries());
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...payload })
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Submission failed");
      } else {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Submission failed");
      }

      setState({ loading: false, ok: true, err: "" });
      form.reset();                         // safe now
    } catch (err) {
      setState({ loading: false, ok: false, err: err.message || "Something went wrong" });
    }
  }


  return (
    <div className="w-full grid place-items-center">
      <div className="w-full max-w-3xl">
        {/* header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-cyan-300">Say hello</h3>
          <p className="text-gray-400 mt-1">Got a project or just want to chat? Drop a message.</p>
        </div>

        {/* form card */}
        <form
          onSubmit={onSubmit}
          className="relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 overflow-hidden"
          style={{ backdropFilter: "blur(8px)" }}
        >
          {/* animated accents */}
          <div className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-fuchsia-500/15 blur-3xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Your name</label>
              <input name="name" required className="bg-black/40 border border-white/10 rounded-md px-4 py-2 outline-none focus:border-cyan-400" placeholder="John Doe" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Email</label>
              <input name="email" type="email" required className="bg-black/40 border border-white/10 rounded-md px-4 py-2 outline-none focus:border-cyan-400" placeholder="you@email.com" />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm text-gray-300 mb-1 block">Subject</label>
            <input name="subject" className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2 outline-none focus:border-cyan-400" placeholder="Let's build something" />
          </div>

          <div className="mt-4">
            <label className="text-sm text-gray-300 mb-1 block">Message</label>
            <textarea name="message" required className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2 min-h-[140px] outline-none focus:border-cyan-400" placeholder="Tell me about your idea…" />
          </div>

          {/* hidden bot field for spam reduction */}
          <input type="text" name="_gotcha" className="hidden" />

          {/* status */}
          <div className="mt-5 flex items-center gap-3">
            <button
              disabled={state.loading}
              className="px-5 py-2.5 rounded-md bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 transition"
            >
              {state.loading ? "Sending..." : "Send message"}
            </button>
            {state.ok && <span className="text-green-400 text-sm">Sent! Thanks for reaching out.</span>}
            {state.err && <span className="text-red-400 text-sm">{state.err}</span>}
          </div>
        </form>

        {/* alt contact row */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span>Prefer email?</span>
          <a href="mailto:hariram.s2399@email.com" className="text-cyan-300 hover:text-cyan-200">hariram.s2399@email.com</a>
          <span className="opacity-50">•</span>
          <a href="https://github.com/UdontKnowMe-git" target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200">GitHub</a>
          <span className="opacity-50">•</span>
          <a href="#about" className="text-cyan-300 hover:text-cyan-200">About</a>
        </div>
      </div>
    </div>
  );
}
