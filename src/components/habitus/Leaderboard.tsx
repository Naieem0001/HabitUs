import { Crown, Flame, TrendingUp, Zap, Star } from "lucide-react";

interface LeaderboardUser {
  id: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  level: number;
  streak_days: number;
  tasks_completed: number;
  is_mock: boolean;
  score: number;
}

const rankColors = [
  { bg: "gradient-brand", text: "text-white", glow: "shadow-brand" },
  { bg: "bg-gradient-to-br from-slate-300 to-slate-500", text: "text-white", glow: "" },
  { bg: "bg-gradient-to-br from-amber-600 to-amber-800", text: "text-white", glow: "" },
];

const levelColors = [
  "#818cf8", "#22d3ee", "#4ade80", "#fbbf24", "#f472b6", "#a78bfa",
];

const staticUsers: LeaderboardUser[] = [
  { id: "1", display_name: "Alex", xp: 15400, level: 42, streak_days: 128, tasks_completed: 450, is_mock: false, score: 28400 },
  { id: "2", display_name: "Sarah M.", xp: 14200, level: 38, streak_days: 85, tasks_completed: 390, is_mock: false, score: 24200 },
  { id: "3", display_name: "David K.", xp: 12800, level: 35, streak_days: 64, tasks_completed: 310, is_mock: false, score: 19800 },
  { id: "4", display_name: "Emma W.", xp: 11500, level: 31, streak_days: 42, tasks_completed: 280, is_mock: false, score: 16500 },
  { id: "5", display_name: "James T.", xp: 9800, level: 28, streak_days: 21, tasks_completed: 210, is_mock: false, score: 12800 },
];

export function Leaderboard() {
  return (
    <section id="leaderboard" className="relative py-28 sm:py-36">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full blur-[180px] opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.6), transparent 70%)" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full badge-neon px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-amber)]" style={{ boxShadow: "0 0 8px var(--neon-amber)" }} />
            Live Leaderboard
          </span>
          <h2 className="mt-6 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Consistency earns{" "}
            <span className="text-gradient">bragging rights.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Real-time rankings updated every hour. Every XP point is backed by verified proof.
          </p>
        </div>

        {/* Leaderboard table */}
        <div className="mt-14 overflow-hidden rounded-3xl glass-strong ring-gradient shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-white/5 bg-white/2 px-6 py-4">
            {[
              { label: "Rank", span: "col-span-1" },
              { label: "Player", span: "col-span-4" },
              { label: "XP", span: "col-span-2 text-right" },
              { label: "Streak", span: "col-span-2 text-right" },
              { label: "Tasks", span: "col-span-1 text-right" },
              { label: "Score", span: "col-span-2 text-right" },
            ].map((h) => (
              <div
                key={h.label}
                className={`${h.span} text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground`}
              >
                {h.label}
              </div>
            ))}
          </div>

          <ul className="divide-y divide-white/3">
            {staticUsers.map((r, i) => (
              <li
                key={r.id}
                className={`group relative grid grid-cols-12 items-center gap-4 px-6 py-5 text-sm hover:bg-white/2 ${
                  i === 0 ? "leader-row-1" : ""
                }`}
              >
                {/* Rank */}
                <div className="col-span-2 sm:col-span-1">
                  <span
                    className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-extrabold ${
                      i < 3
                        ? `${rankColors[i].bg} ${rankColors[i].text} ${rankColors[i].glow}`
                        : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    {i === 0 ? <Crown className="h-4 w-4" /> : i + 1}
                  </span>
                </div>

                {/* Player */}
                <div className="col-span-7 sm:col-span-4 flex items-center gap-3">
                  {r.avatar_url ? (
                    <img
                      src={r.avatar_url}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
                    />
                  ) : (
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ring-1 ring-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${levelColors[i % levelColors.length]}, ${levelColors[(i + 2) % levelColors.length]})`,
                      }}
                    >
                      {r.display_name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-foreground">
                      <span className="truncate">{r.display_name}</span>
                      {i === 0 && (
                        <span className="flex items-center gap-0.5 text-[9px] badge-amber rounded-full px-2 py-0.5 font-bold uppercase">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          Top
                        </span>
                      )}
                      {r.is_mock && (
                        <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] text-muted-foreground">DEMO</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground sm:hidden">
                      <Flame className="h-3 w-3 text-[var(--neon-amber)]" />
                      {r.xp.toLocaleString()} XP · {r.streak_days}d streak
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
                      <span className="text-[var(--neon-green)]">Lv.{r.level}</span>
                    </div>
                  </div>
                </div>

                {/* XP */}
                <div className="hidden sm:block sm:col-span-2 text-right">
                  <span className={`font-bold ${i === 0 ? "text-gradient" : "text-primary"}`}>
                    {r.xp.toLocaleString()}
                  </span>
                </div>

                {/* Streak */}
                <div className="hidden sm:flex sm:col-span-2 items-center justify-end gap-1.5 font-semibold text-foreground">
                  <Flame className="h-3.5 w-3.5 text-[var(--neon-amber)]" />
                  {r.streak_days}d
                </div>

                {/* Tasks */}
                <div className="hidden sm:block sm:col-span-1 text-right text-muted-foreground">
                  {r.tasks_completed}
                </div>

                {/* Score */}
                <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
                  <div className="flex items-center gap-1 rounded-full badge-neon px-3 py-1.5 text-[11px] font-bold">
                    <TrendingUp className="h-3 w-3" />
                    {r.score.toLocaleString()} PTS
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
            <p className="text-[11px] text-muted-foreground">
              Updates every hour · Based on XP + streak multiplier
            </p>
            <a
              href="/login"
              className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-accent-hover"
            >
              Join the board <TrendingUp className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
