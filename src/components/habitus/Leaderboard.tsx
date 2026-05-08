import { motion } from "framer-motion";
import { Crown, Flame, TrendingUp } from "lucide-react";

const rows = [
  { rank: 1, name: "Aarav Sharma", xp: 4820, streak: 56, tasks: 142, momentum: 98 },
  { rank: 2, name: "Maya Kapoor", xp: 4615, streak: 41, tasks: 138, momentum: 91 },
  { rank: 3, name: "Diego Ramos", xp: 4402, streak: 38, tasks: 131, momentum: 88 },
  { rank: 4, name: "Lin Wei", xp: 4188, streak: 29, tasks: 124, momentum: 79 },
  { rank: 5, name: "Sara Khalil", xp: 3995, streak: 33, tasks: 121, momentum: 76 },
  { rank: 6, name: "Jonah Reed", xp: 3820, streak: 21, tasks: 118, momentum: 70 },
];

export function Leaderboard() {
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
            <div className="col-span-2 text-right">Momentum</div>
          </div>

          <ul className="divide-y divide-border">
            {rows.map((r, i) => (
              <motion.li
                key={r.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-12 items-center gap-4 px-6 py-5 text-sm transition-colors hover:bg-surface/40 ${
                  r.rank === 1 ? "leader-row-1 glow-cosmic" : ""
                }`}
              >
                <div className="col-span-2 sm:col-span-1">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${
                      r.rank === 1
                        ? "gradient-cosmic text-foreground shadow-lg shadow-[#7C5CFF]/30"
                        : r.rank <= 3
                          ? "bg-surface-2 text-primary"
                          : "bg-surface text-muted-foreground"
                    }`}
                  >
                    {r.rank === 1 ? <Crown className="h-4 w-4" /> : r.rank}
                  </span>
                </div>
                <div className="col-span-7 sm:col-span-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-amber text-xs font-bold">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-[11px] text-muted-foreground sm:hidden">
                      {r.xp.toLocaleString()} XP · 🔥 {r.streak}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block sm:col-span-2 text-right font-semibold text-primary">
                  {r.xp.toLocaleString()}
                </div>
                <div className="hidden sm:flex sm:col-span-2 items-center justify-end gap-1.5 text-foreground">
                  <Flame className="h-4 w-4 text-primary" /> {r.streak}d
                </div>
                <div className="hidden sm:block sm:col-span-1 text-right text-muted-foreground">
                  {r.tasks}
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-2">
                  <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-surface sm:block">
                    <div
                      className="h-full gradient-amber"
                      style={{ width: `${r.momentum}%` }}
                    />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    <TrendingUp className="h-3.5 w-3.5" /> {r.momentum}%
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
