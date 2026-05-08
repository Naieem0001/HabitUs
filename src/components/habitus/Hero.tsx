import { motion } from "framer-motion";
import { Flame, Zap, CheckCircle2, TrendingUp, Trophy, ArrowRight } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Aarav S.", xp: 2840, streak: 42, accent: true },
  { rank: 2, name: "Maya K.", xp: 2615, streak: 31 },
  { rank: 3, name: "Diego R.", xp: 2402, streak: 28 },
  { rank: 4, name: "Lin W.", xp: 2188, streak: 19 },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* background */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#F6B17A]/15 blur-[140px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#E07B39]/10 blur-[120px]" />

      {/* floating particles */}
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/60"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 37) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Copy */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Now in private beta · 800+ challenge groups
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Build consistency
            <br />
            you <span className="text-gradient-amber">can&apos;t fake</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Daily goals become public commitments. Create tasks, submit proof,
            earn XP, and climb the leaderboard with your friends.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full gradient-amber px-6 py-3.5 text-sm font-semibold text-[#1C1F2E] shadow-xl shadow-[#E07B39]/25 transition-transform hover:scale-[1.03]"
            >
              Start Your First Challenge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {["#F6B17A", "#E07B39", "#7C83A8", "#424769"].map((c, i) => (
                <span
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-background"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>Joined by 12,000+ goal-getters this week</span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Dashboard mock */}
            <div className="relative rounded-2xl glass-strong ring-gradient p-5 shadow-2xl glow-cosmic">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Weekly Leaderboard</span>
                </div>
                <span className="rounded-full bg-surface-2/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Live
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {leaderboard.map((p, i) => (
                  <motion.div
                    key={p.rank}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                      p.accent
                        ? "border-primary/40 bg-primary/10 glow-amber"
                        : "border-border bg-surface/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                          p.accent ? "gradient-amber text-[#1C1F2E]" : "bg-surface-2 text-foreground"
                        }`}
                      >
                        {p.rank}
                      </span>
                      <div>
                        <div className="text-sm font-semibold">{p.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          🔥 {p.streak} day streak
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{p.xp.toLocaleString()} XP</div>
                      <div className="text-[11px] text-muted-foreground">+{120 - i * 18} today</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -left-6 hidden sm:flex items-center gap-2 rounded-2xl glass-strong px-4 py-3 shadow-xl"
            >
              <Flame className="h-5 w-5 text-primary animate-flame" />
              <div>
                <div className="text-xs text-muted-foreground">Streak</div>
                <div className="text-sm font-bold">12 Days</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-5 -right-2 sm:-right-6 flex items-center gap-2 rounded-2xl glass-strong px-4 py-3 shadow-xl"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-amber">
                <Zap className="h-4 w-4 text-[#1C1F2E]" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">XP Earned</div>
                <div className="text-sm font-bold text-primary">+15 XP</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
              className="absolute top-1/2 -right-3 sm:-right-10 hidden md:flex items-center gap-2 rounded-2xl glass-strong px-4 py-3 shadow-xl"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <div className="text-xs">
                <div className="font-semibold">Proof submitted</div>
                <div className="text-muted-foreground">2 minutes ago</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-10 left-2 sm:left-8 hidden sm:flex items-center gap-2 rounded-2xl glass-strong px-4 py-3 shadow-xl"
            >
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <div className="font-semibold">You moved to Rank #2</div>
                <div className="text-muted-foreground">+1 position</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
