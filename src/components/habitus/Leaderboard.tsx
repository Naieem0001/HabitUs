import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Flame, TrendingUp, Loader2 } from "lucide-react";

<<<<<<< Updated upstream
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
=======
const rows = [
  { rank: 1, name: "Naieem Qureshi", xp: 4820, streak: 56, tasks: 142, momentum: 98 },
  { rank: 2, name: "Mohammad Owais", xp: 4615, streak: 41, tasks: 138, momentum: 91 },
  { rank: 3, name: "Affan", xp: 4402, streak: 38, tasks: 131, momentum: 88 },
  { rank: 4, name: "Tufail", xp: 4188, streak: 29, tasks: 124, momentum: 79 },
  { rank: 5, name: "Sara Khalil", xp: 3995, streak: 33, tasks: 121, momentum: 76 },
  { rank: 6, name: "Jonah Reed", xp: 3820, streak: 21, tasks: 118, momentum: 70 },
];
>>>>>>> Stashed changes

export function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const response = await fetch(`${backendUrl}/api/leaderboard`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section id="leaderboard" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-border bg-surface/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Live Leaderboard
          </span>
          <h2 className="mt-6 text-3xl font-bold sm:text-5xl">
            Where consistency <span className="text-gradient-amber">earns its bragging rights</span>.
          </h2>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl glass-strong ring-gradient">
          {/* Header */}
          <div className="hidden grid-cols-12 gap-4 border-b border-border px-6 py-4 text-[11px] uppercase tracking-wider text-muted-foreground sm:grid">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2 text-right">XP</div>
            <div className="col-span-2 text-right">Streak</div>
            <div className="col-span-1 text-right">Tasks</div>
            <div className="col-span-2 text-right">Score</div>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {users.map((r, i) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-12 items-center gap-4 px-6 py-5 text-sm transition-colors hover:bg-surface/40 ${
                    i === 0 ? "leader-row-1 glow-cosmic" : ""
                  }`}
                >
                  <div className="col-span-2 sm:col-span-1">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${
                        i === 0
                          ? "gradient-cosmic text-foreground shadow-lg shadow-[#7C5CFF]/30"
                          : i < 3
                            ? "bg-surface-2 text-primary"
                            : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {i === 0 ? <Crown className="h-4 w-4" /> : i + 1}
                    </span>
                  </div>
                  <div className="col-span-7 sm:col-span-4 flex items-center gap-3">
                    {r.avatar_url ? (
                      <img src={r.avatar_url} alt="" className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-amber text-xs font-bold uppercase">
                        {r.display_name.charAt(0)}
                      </span>
                    )}
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {r.display_name}
                        {r.is_mock && <span className="text-[10px] bg-white/5 px-1.5 rounded-md text-muted-foreground">MOCK</span>}
                      </div>
                      <div className="text-[11px] text-muted-foreground sm:hidden">
                        {r.xp.toLocaleString()} XP · 🔥 {r.streak_days}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block sm:col-span-2 text-right font-semibold text-primary">
                    {r.xp.toLocaleString()}
                  </div>
                  <div className="hidden sm:flex sm:col-span-2 items-center justify-end gap-1.5 text-foreground">
                    <Flame className="h-4 w-4 text-primary" /> {r.streak_days}d
                  </div>
                  <div className="hidden sm:block sm:col-span-1 text-right text-muted-foreground">
                    {r.tasks_completed}
                  </div>
                  <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-tighter">
                      {r.score.toLocaleString()} PTS
                    </span>
                  </div>
                </motion.li>
              ))}
              {users.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  No players found. Seed the database to see the leaderboard!
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

