// Renders a Devicon logo by name with hover title.
// name must be a devicon slug like "python", "javascript", "react", "mysql", etc.
// Use the -colored variant when available; falls back to plain.
export default function DevLogo({ name, title, hover }) {
  const cls = name === "nextjs" ? "devicon-nextjs-plain" : `devicon-${name}-plain colored`;
  return (
    <div
      className="group size-12 grid place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
      onMouseEnter={(e) => hover?.show(e, title || name)}
      onMouseMove={hover?.move}
      onMouseLeave={hover?.hide}
      aria-label={title || name}
    >
      <i className={`${cls} text-[28px]`} aria-hidden />
    </div>
  );
}

