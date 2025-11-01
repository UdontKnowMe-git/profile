import { TIMELINE } from "../data/timeline";
import { ExternalLink, FileDown } from "lucide-react";
import { useRef, useEffect } from "react";

// Small coin with brand image
function BrandCoin({ src, alt }) {
  return (
    <div className="relative size-12 rounded-xl border border-white/10 bg-white/5 shadow-[0_0_18px_rgba(34,211,238,0.15)]">
      <img src={src} alt={alt} className="w-full h-full object-contain p-2" />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
    </div>
  );
}

function ItemCard({ item }) {
  const isCert = item.kind === "cert";
  return (
    <div className="relative shrink-0 min-w-[320px] max-w-[360px] snap-start rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
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
  const isInteractive = (el) => {
    return el.closest("a, button") != null;
  };
  const getClientX = (e) => (e.touches ? e.touches[0]?.clientX : e.clientX);
  const railRef = useRef(null);
  const dragging = useRef(false);
  const start = useRef({ x: 0, left: 0 });
  // Removed snappingRef as we want to remove custom snap logic for smoother scrolling
  const moved = useRef(false);
  const threshold = 5; // pixels
  
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const wheel = (e) => {
      if (el.scrollWidth <= el.clientWidth) return;

      // prevent page scroll while over the rail
      e.preventDefault();

      // --- START: Smoother Scroll Logic ---
      // Prioritize horizontal delta (e.deltaX) for horizontal scrolling.
      // If e.deltaX is 0, use e.deltaY (for vertical mouse wheels).
      let delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      
      // Scaling factor: Reduce the scroll distance for a smoother, less jumpy scroll.
      // A factor like 0.8 or 1.0 is generally better than a fixed large number.
      // This makes the scroll step proportional to the actual scroll input.
      const SCROLL_SCALE_FACTOR = 0.8; 
      
      // Constants for deltaMode normalization (same as before, but less aggressive)
      const LINE_HEIGHT = 16;
      const PAGE_SCROLL_FACTOR = el.clientWidth * 0.9;

      // Scale according to deltaMode: 0=pixels (default), 1=lines, 2=pages
      if (e.deltaMode === 1) delta *= LINE_HEIGHT;
      else if (e.deltaMode === 2) delta *= PAGE_SCROLL_FACTOR;

      // Apply the scaling factor
      const step = delta * SCROLL_SCALE_FACTOR;

      // Use `scrollBy` for a potentially smoother (though still synchronous) scroll
      el.scrollLeft += step; 
      // --- END: Smoother Scroll Logic ---
    };

    el.addEventListener("wheel", wheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", wheel);
    };
  }, []); // Snapping logic removed from useEffect

  const onDown = (e) => {
    moved.current = false;
    const el = railRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    if (isInteractive(e.target)) return;
    if (!(e.touches || e.button === 0 || e.buttons === 1)) return;
    dragging.current = true;
    el.classList.add("cursor-grabbing");
    if (el.setPointerCapture && e.pointerId != null) {
      try { el.setPointerCapture(e.pointerId); } catch {}
    }
    start.current = { x: getClientX(e), left: el.scrollLeft };
  };

  const onMoveDrag = (e) => {
    const el = railRef.current;
    if (!dragging.current || !el) return;
    const x = getClientX(e);
    if (x == null) return;

    const dx = x - start.current.x;
    if (Math.abs(dx) < threshold) return; // don't act until threshold crossed
    moved.current = true;

    e.preventDefault();
    e.stopPropagation();

    // Removed custom snap logic here as well
    el.scrollLeft = start.current.left - dx;
  };

  const onUp = (e) => {
    const el = railRef.current;
    if (!el) return;
    // remove grabbing state
    dragging.current = false;
    el.classList.remove("cursor-grabbing");
    if (el.releasePointerCapture && e?.pointerId != null) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
    }
    if (moved.current && e.type === "pointerup") {
      // prevent “click-through” after drag
      e.preventDefault();
      e.stopPropagation();
    }
  };


  return (
    <section id="timeline" className="px-4 md:px-8 lg:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-extrabold text-cyan-300 mb-6">Timeline</h3>

        {/* horizontal scroll on md+, stacked on mobile */}
        <div className="relative">
          {/* rail */}
          <div className="hidden md:block absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div
              ref={railRef}
              className={`flex md:flex-row flex-col gap-5 md:gap-6 overflow-x-auto pb-2 cursor-grab select-none`}
              style={{ WebkitOverflowScrolling: "touch" }}
              onPointerDown={onDown}
              onPointerMove={onMoveDrag}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onMouseDownCapture={onDown}
              onMouseMove={onMoveDrag}
              onMouseLeave={onUp}
              onMouseUp={onUp}
              onTouchStartCapture={onDown}
              onTouchMove={onMoveDrag}
              onTouchEnd={onUp}
            >
              {TIMELINE.map((it) => <ItemCard key={it.id} item={it} />)}
            </div>

        </div>
      </div>
    </section>
  );
}