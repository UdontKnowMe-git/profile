// src/components/Stats.jsx
import { useEffect, useState } from "react";

const GH = "https://api.github.com";

const INITIAL_HR_BADGES = [
  { badge_name: "C++", stars: 3, total_points: 150 },
  { badge_name: "Java", stars: 2, total_points: 100 },
  { badge_name: "Python", stars: 2, total_points: 90 },
  { badge_name: "Problem Solving", stars: 1, total_points: 50 },
  { badge_name: "SQL", stars: 1, total_points: 40 }
];

function HackerRankStats({ username = "hariram_s2399" }) {
  const [badges, setBadges] = useState(INITIAL_HR_BADGES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchHR() {
      const url = `https://www.hackerrank.com/rest/hackers/${username}/badges`;
      const proxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        `https://corsproxy.io/?${encodeURIComponent(url)}`
      ];

      for (const p of proxies) {
        try {
          const res = await fetch(p);
          if (res.ok) {
            const json = await res.json();
            if (Array.isArray(json?.models) && json.models.length > 0) {
              setBadges(json.models);
              break;
            }
          }
        } catch {
          // continue to next proxy or fallback
        }
      }
    }
    fetchHR();
  }, [username]);

  const totalBadges = badges.length;
  const totalStars = badges.reduce((acc, b) => acc + (b.stars || 0), 0);
  const sortedBadges = [...badges].sort((a, b) => (b.stars || 0) - (a.stars || 0) || (b.total_points || 0) - (a.total_points || 0));

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#1a1b26] p-6 flex flex-col justify-between min-h-[195px] shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-green-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm-1.2 16.2h-2.4V7.8h2.4v8.4zm4.8 0h-2.4V7.8h2.4v8.4z" />
          </svg>
          <span className="text-cyan-300 font-bold text-lg">HackerRank Profile</span>
        </div>
        <a
          href={`https://www.hackerrank.com/profile/${username}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-gray-400 hover:text-cyan-300 transition"
        >
          @{username} ↗
        </a>
      </div>

      <div className="py-2 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-black/30 rounded-lg p-2 border border-white/5">
            <div className="text-[11px] text-gray-400">Badges Earned</div>
            <div className="text-lg font-bold text-cyan-300">{totalBadges}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-2 border border-white/5">
            <div className="text-[11px] text-gray-400">Total Stars</div>
            <div className="text-lg font-bold text-yellow-400">★ {totalStars}</div>
          </div>
        </div>

        {/* Top Badges */}
        <div>
          <div className="text-xs font-semibold text-gray-400 mb-1.5 flex items-center justify-between">
            <span>Top Badges</span>
            <span className="text-[10px] text-cyan-400/80">Ranked by Stars & Points</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sortedBadges.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-cyan-500/40 transition text-xs"
              >
                <span className="text-cyan-200 font-medium">{b.badge_name || b.badge_type}</span>
                {b.stars > 0 ? (
                  <span className="text-yellow-400 font-bold">{b.stars}★</span>
                ) : (
                  <span className="text-gray-500 text-[10px]">Unlocked</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      } catch { }
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <img
          src="https://github-readme-stats.vercel.app/api?username=UdontKnowMe-git&show_icons=true&theme=tokyonight&hide_border=true&include_all_commits=true"
          alt="GitHub Stats"
          className="w-full rounded-xl border border-white/10 bg-black/40 h-auto object-contain"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://github-readme-stats-sigma-five.vercel.app/api?username=UdontKnowMe-git&show_icons=true&theme=tokyonight&hide_border=true&include_all_commits=true";
          }}
        />
        <HackerRankStats username="hariram_s2399" />
      </div>
    </div>
  );
}
