// src/components/ContributionHeatmap.jsx
import { useEffect, useMemo, useRef, useState } from "react";

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
  }
}
`;

// GitHub greens + dark gray zero
const LEVELS = [
  "#161b22", // zero
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353"
];

function levelFor(count, max) {
  if (count === 0) return 0;
  const q = Math.max(1, Math.ceil(max / 4));
  if (count <= q) return 1;
  if (count <= q * 2) return 2;
  if (count <= q * 3) return 3;
  return 4;
}

export default function ContributionHeatmap({ login = "UdontKnowMe-git" }) {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [maxCount, setMaxCount] = useState(1);
  const [error, setError] = useState("");

  // tooltip
  const tipRef = useRef(null);
  const [tip, setTip] = useState({ show: false, text: "", x: 0, y: 0 });

  useEffect(() => {
    async function run() {
      try {
        const token = import.meta.env.VITE_GH_TOKEN;
        if (!token) { setError("Token missing."); return; }
        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ query: QUERY, variables: { login } })
        });
        const json = await res.json();
        const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (!cal) throw new Error("No calendar data");
        setWeeks(cal.weeks || []);
        setTotal(cal.totalContributions || 0);

        let m = 1;
        cal.weeks.forEach(w => w.contributionDays.forEach(d => { if (d.contributionCount > m) m = d.contributionCount; }));
        setMaxCount(m);
      } catch {
        setError("Failed to load heatmap.");
      }
    }
    run();
  }, [login]);

  const legend = useMemo(() => [0, 1, 2, 3, 4], []);

  // tooltip helpers
  const showTip = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTip({ show: true, text, x: rect.left + rect.width / 2, y: rect.top - 8 });
  };
  const moveTip = (e) => {
    setTip(t => ({ ...t, x: e.clientX + 10, y: e.clientY - 10 }));
  };
  const hideTip = () => setTip(t => ({ ...t, show: false }));

  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 p-4">
      {/* floating tooltip */}
      {tip.show && (
        <div
          ref={tipRef}
          className="fixed z-40 px-2 py-1 text-xs rounded-md bg-black/80 text-gray-200 border border-white/10 pointer-events-none"
          style={{ left: tip.x, top: tip.y, transform: "translate(-50%, -100%)" }}
        >
          {tip.text}
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <h4 className="text-cyan-300 font-semibold">Contribution Heatmap</h4>
        <div className="text-sm text-gray-400">{total ? `${total} contributions in the last year` : "…"}</div>
      </div>

      <div className="w-full rounded-lg bg-neutral-900/80 p-3 overflow-x-auto">
        {error ? (
          <div className="text-sm text-gray-400">Couldn’t load contributions. Please refresh later.</div>
        ) : (
          <div className="flex gap-1">
            {weeks.map((w, wi) => (
              <div key={wi} className="grid gap-1" style={{ gridTemplateRows: "repeat(7, 12px)" }}>
                {w.contributionDays.map((d, di) => {
                  const lvl = levelFor(d.contributionCount, maxCount);
                  const text = `${d.contributionCount} contribution${d.contributionCount === 1 ? "" : "s"} on ${new Date(d.date).toDateString()}`;
                  return (
                    <div
                      key={di}
                      className="w-3 h-3 rounded-[2px]"
                      style={{ background: LEVELS[lvl] }}
                      onMouseEnter={(e) => showTip(e, text)}
                      onMouseMove={moveTip}
                      onMouseLeave={hideTip}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex gap-1">
          {legend.map(l => (
            <span key={l} className="w-3 h-3 rounded-[2px] block" style={{ background: LEVELS[l] }} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
