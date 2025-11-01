// src/components/Stats.jsx
import { useEffect, useState } from "react";

const GH = "https://api.github.com";

export default function Stats() {
  const [data, setData] = useState({ followers: 0, repos: 0, stars: 0, latest: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = "gh_stats_v1";
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.ts < 1000 * 60 * 60 * 12) { // 12h cache
          setData(parsed.data);
          setLoading(false);
          return;
        }
      } catch {}
    }

    async function run() {
      try {
        const user = await fetch(`${GH}/users/UdontKnowMe-git`).then(r => r.json());
        const repos = await fetch(`${GH}/users/UdontKnowMe-git/repos?per_page=100&sort=updated`).then(r => r.json());
        const stars = Array.isArray(repos) ? repos.reduce((s, r) => s + (r.stargazers_count || 0), 0) : 0;
        const latest = Array.isArray(repos) && repos[0]?.pushed_at ? new Date(repos[0].pushed_at).toDateString() : "";
        const next = { followers: user.followers || 0, repos: user.public_repos || 0, stars, latest };
        setData(next);
        localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data: next }));
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  const Card = ({ label, value }) => (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-cyan-300">{loading ? "…" : value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Followers" value={data.followers} />
        <Card label="Public Repos" value={data.repos} />
        <Card label="Total Stars" value={data.stars} />
        <Card label="Latest Push" value={data.latest || "—"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          src="https://github-readme-stats.vercel.app/api?username=UdontKnowMe-git&show_icons=true&theme=tokyonight&hide_title=true&hide_border=true&cache_seconds=7200"
          alt="GitHub stats"
          className="w-full rounded-xl border border-white/10 bg-black/40"
          loading="lazy"
        />
        <img
          src="https://streak-stats.demolab.com?user=UdontKnowMe-git&theme=tokyonight&hide_border=true&card_width=420"
          alt="GitHub Streak"
          className="w-full rounded-xl border border-white/10 bg-black/40"
          loading="lazy"
        />
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=UdontKnowMe-git&layout=compact&theme=tokyonight&hide_title=true&hide_border=true&langs_count=8&cache_seconds=7200"
          alt="Top Languages"
          className="w-full rounded-xl border border-white/10 bg-black/40"
          loading="lazy"
        />
      </div>
    </div>
  );
}
