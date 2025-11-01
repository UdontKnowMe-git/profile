import { TIMELINE } from "../data/timeline";
import { ExternalLink, FileDown } from "lucide-react";

// Small coin with brand image
function BrandCoin({ src, alt }) {
  return (
    <div className="relative size-12 rounded-xl border border-white/10 bg-white/5 overflow-hidden shadow-[0_0_18px_rgba(34,211,238,0.15)]">
      <img src={src} alt={alt} className="w-full h-full object-contain p-2" />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
    </div>
  );
}

function ItemCard({ item }) {
  const isCert = item.kind === "cert";
  return (
    <div className="relative min-w-[320px] max-w-[360px] snap-start rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
      {/* date dot connector */}
      <div className="absolute -left-3 top-6 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
      <div className="flex items-start gap-3 transition-transform hover:-translate-y-0.5">
        <BrandCoin src={item.brand} alt={item.title} />
        <div className="flex-1">
          <div className="text-xs text-cyan-300">{item.date}</div>
          <h5 className="mt-1 font-semibold">{item.title}</h5>
          {item.description && (
            <p className="mt-1 text-sm text-gray-300/90">{item.description}</p>
          )}
          {/* actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {item.cred && (
              <a
                href={item.cred}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <ExternalLink size={14} />
                Credential
              </a>
            )}
            {item.pdf && (
              <a
                href={item.pdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <FileDown size={14} />
                Open PDF
              </a>
            )}
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <ExternalLink size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="px-4 md:px-8 lg:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-extrabold text-cyan-300 mb-6">Timeline</h3>

        {/* horizontal scroll on md+, stacked on mobile */}
        <div className="relative">
          {/* rail */}
          <div className="hidden md:block absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          <div className="flex md:flex-row flex-col gap-5 md:gap-6 overflow-x-auto md:snap-x md:snap-mandatory pb-2">
            {TIMELINE.map((it) => <ItemCard key={it.id} item={it} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
