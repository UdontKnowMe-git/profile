// src/components/ContributionHeatmap.jsx
import { useEffect, useState } from "react";

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            color
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

function dayBg(c) {
  // fallback shades if API color is too light; keep dark theme harmony
  return c || "rgba(255,255,255,0.06)";
}

export default function ContributionHeatmap({ login = "UdontKnowMe-git" }) {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function run() {
      try {
        const token = import.meta.env.VITE_GH_TOKEN;
        if (!token) {
          setErr("Missing GitHub token (VITE_GH_TOKEN). Showing static calendar is recommended.");
          return;
        }
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
      } catch (e) {
        setErr("Failed to load heatmap.");
      }
    }
    run();
  }, [login]);

  if (err) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-400">
        {err}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-cyan-300 font-semibold">Contribution Heatmap</h4>
        <div className="text-sm text-gray-400">{total ? `${total} contributions in the last year` : "…"}</div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {weeks.map((w, wi) => (
            <div key={wi} className="grid gap-1" style={{ gridTemplateRows: "repeat(7, 12px)" }}>
              {w.contributionDays.map((d, di) => (
                <div
                  key={di}
                  title={`${d.contributionCount} on ${d.date}`}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: dayBg(d.color) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">Data via GitHub GraphQL API.</div>
    </div>
  );
}
