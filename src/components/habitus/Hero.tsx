import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Flame,
  Zap,
  CheckCircle2,
  TrendingUp,
  Trophy,
  ArrowRight,
  Users,
  Star,
  Sparkles,
  Activity,
} from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Aarav S.", xp: 2840, streak: 42, accent: true },
  { rank: 2, name: "Maya K.", xp: 2615, streak: 31 },
  { rank: 3, name: "Diego R.", xp: 2402, streak: 28 },
  { rank: 4, name: "Lin W.", xp: 2188, streak: 19 },
];

const avatars = [
  { initials: "JS", grad: "linear-gradient(135deg,#818cf8,#a78bfa)" },
  { initials: "MK", grad: "linear-gradient(135deg,#a78bfa,#f472b6)" },
  { initials: "DR", grad: "linear-gradient(135deg,#22d3ee,#818cf8)" },
  { initials: "LW", grad: "linear-gradient(135deg,#4ade80,#22d3ee)" },
  { initials: "SK", grad: "linear-gradient(135deg,#fbbf24,#f472b6)" },
];

const stats = [
  { v: "12k+", l: "Active users", icon: Users, color: "text-primary" },
  { v: "2.4M", l: "Proofs sent", icon: Activity, color: "text-[var(--neon-green)]" },
  { v: "94%", l: "Streak survival", icon: Flame, color: "text-[var(--neon-amber)]" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yMock = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityCopy = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const scaleMock = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-36"
    >
      {/* ── Background layers ── */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10 grid-bg opacity-60" />

      {/* Central hero glow blob */}
      <motion.div
        style={{ y: yBg, background: "radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, rgba(56,189,248,0.15) 50%, transparent 70%)" }}
        className="absolute -top-40 left-1/2 -z-10 h-[700px] w-[1000px] -translate-x-1/2 rounded-full blur-[160px]"
      />
      <motion.div
        style={{ y: yBg, background: "rgba(139,92,246,0.2)" }}
        className="absolute -bottom-24 right-0 -z-10 h-[400px] w-[600px] rounded-full blur-[140px]"
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? "3px" : "2px",
            height: i % 3 === 0 ? "3px" : "2px",
            top: `${(i * 47 + 8) % 92}%`,
            left: `${(i * 31 + 5) % 95}%`,
            background: i % 4 === 0
              ? "rgba(74,222,128,0.8)"
              : i % 4 === 1
              ? "rgba(129,140,248,0.8)"
              : i % 4 === 2
              ? "rgba(251,191,36,0.8)"
              : "rgba(56,189,248,0.8)",
          }}
          animate={{
            y: [0, -(16 + (i % 5) * 4), 0],
            opacity: [0.1, 0.9, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3.5 + (i % 5) * 0.5,
            repeat: Infinity,
            delay: i * 0.22,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* ── Copy ── */}
        <motion.div style={{ opacity: opacityCopy }} className="lg:col-span-6 xl:col-span-5">

          {/* Announcement badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full glass border border-primary/20 px-4 py-2 text-xs font-semibold"
          >
            <span className="flex h-2 w-2 rounded-full bg-[var(--neon-green)] shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
            <span className="text-muted-foreground">Now in private beta</span>
            <span className="h-3 w-px bg-border" />
            <span className="badge-neon px-2 py-0.5 rounded-full text-[10px]">800+ groups</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-7 font-display text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl"
          >
            Build habits
            <br />
            <span className="text-gradient">you can't fake.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Daily goals become public commitments. Submit proof,{" "}
            <span className="text-foreground font-medium">earn XP</span>, and climb the
            leaderboard with your crew. Miss once — they all see it.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="/login"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full gradient-brand px-7 py-3.5 text-sm font-bold text-white shadow-brand transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_8px_40px_-4px_rgba(129,140,248,0.7)]"
            >
              <Sparkles className="h-4 w-4" />
              Start Your Challenge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-white/5 hover:border-white/20"
            >
              See how it works
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-[9px] font-bold text-white ring-1 ring-white/10"
                  style={{ background: a.grad }}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[var(--neon-amber)] text-[var(--neon-amber)]" />
                ))}
              </div>
              <span className="text-muted-foreground">
                from <span className="text-foreground font-semibold">1,200+</span> goal-getters
              </span>
            </div>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 grid grid-cols-3 gap-3 max-w-sm"
          >
            {stats.map((s, i) => (
              <div
                key={s.l}
                className="group relative overflow-hidden rounded-2xl glass border border-white/5 px-3 py-3.5 text-center transition-all hover:border-primary/20 hover:bg-white/5"
              >
                <s.icon className={`mx-auto mb-1.5 h-4 w-4 ${s.color}`} />
                <div className="font-display text-xl font-bold text-foreground">{s.v}</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Visual / Dashboard Mock ── */}
        <motion.div
          style={{ y: yMock, scale: scaleMock }}
          className="relative lg:col-span-6 xl:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
              style={{ background: "radial-gradient(ellipse, rgba(129,140,248,0.5), transparent 70%)" }}
            />

            {/* Main dashboard card */}
            <div className="relative rounded-2xl glass-strong ring-gradient p-6 shadow-[0_40px_80px_rgba(0,0,0,0.6)] glow-cosmic">
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand">
                    <Trophy className="h-4 w-4 text-white" />
                  </span>
                  <div>
                    <div className="text-sm font-bold text-foreground">Weekly Leaderboard</div>
                    <div className="text-[10px] text-muted-foreground">Challenge: "30-Day Code Streak"</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full badge-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-green)] animate-pulse" />
                  Live
                </div>
              </div>

              {/* Leaderboard rows */}
              <div className="space-y-2">
                {leaderboard.map((p, i) => (
                  <motion.div
                    key={p.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3.5 transition-all ${
                      p.accent
                        ? "bg-gradient-to-r from-primary/15 via-violet-500/10 to-cyan-500/8 border border-primary/30"
                        : "border border-white/5 bg-white/3 hover:bg-white/5"
                    }`}
                  >
                    {p.accent && (
                      <div className="absolute inset-0 animate-shimmer rounded-xl" />
                    )}
                    <div className="relative flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-extrabold ${
                          p.accent
                            ? "gradient-brand text-white shadow-brand"
                            : "bg-white/8 text-muted-foreground"
                        }`}
                      >
                        {p.accent ? "👑" : p.rank}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          {p.name}
                          {p.accent && (
                            <span className="rounded-md badge-neon px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                              #1
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Flame className="h-3 w-3 text-[var(--neon-amber)]" />
                          {p.streak} day streak
                        </div>
                      </div>
                    </div>
                    <div className="relative text-right">
                      <div className={`text-sm font-bold ${p.accent ? "text-gradient" : "text-primary"}`}>
                        {p.xp.toLocaleString()} XP
                      </div>
                      <div className="text-[10px] text-[var(--neon-green)]">+{120 - i * 18} today</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar at bottom */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                  <span>Your progress to next rank</span>
                  <span className="text-primary font-semibold">68%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full gradient-brand shadow-brand"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge — streak */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -left-5 hidden sm:flex items-center gap-2.5 rounded-2xl glass-strong border border-white/10 px-4 py-3 shadow-xl"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl gradient-brand shadow-brand">
                <Flame className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--neon-amber)] text-[8px] font-extrabold text-black">42</span>
              </span>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Current Streak</div>
                <div className="text-base font-extrabold text-foreground">42 Days 🔥</div>
              </div>
            </motion.div>

            {/* Floating badge — XP */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-5 -right-4 sm:-right-8 flex items-center gap-2.5 rounded-2xl glass-strong border border-primary/20 px-4 py-3 shadow-xl"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand shadow-brand">
                <Zap className="h-5 w-5 text-white" fill="white" />
              </span>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">XP Earned Today</div>
                <div className="text-base font-extrabold text-gradient">+350 XP</div>
              </div>
            </motion.div>

            {/* Floating badge — proof submitted */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/3 -right-4 sm:-right-10 hidden md:flex items-center gap-2.5 rounded-2xl glass-strong border border-[var(--neon-green)]/20 px-4 py-3 shadow-xl"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--neon-green)]/15">
                <CheckCircle2 className="h-5 w-5 text-[var(--neon-green)]" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Proof submitted</div>
                <div className="text-[10px] text-muted-foreground">2 minutes ago</div>
              </div>
            </motion.div>

            {/* Floating badge — rank up */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-10 left-4 sm:left-10 hidden sm:flex items-center gap-2.5 rounded-2xl glass-strong border border-primary/15 px-4 py-3 shadow-xl"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                <TrendingUp className="h-5 w-5 text-primary" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Moved to Rank #2!</div>
                <div className="text-[10px] text-[var(--neon-green)]">▲ +1 position</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-5 w-px rounded-full bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
