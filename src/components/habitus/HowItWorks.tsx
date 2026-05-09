import { motion } from "framer-motion";
import { Target, Camera, Zap, Swords, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Target,
    number: "01",
    title: "Set Your Goal",
    desc: "Define a daily or weekly habit. Set your stakes, choose a challenge type, and invite your accountability group. Public commitment is the first step.",
    color: "from-primary/20 to-violet-500/10",
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    accent: "#818cf8",
    tag: "Setup",
    detail: "2 minutes to launch",
  },
  {
    icon: Camera,
    number: "02",
    title: "Submit Daily Proof",
    desc: "Drop a photo, screenshot or short video as evidence — every single day. No excuses. Your group votes on validity.",
    color: "from-cyan-500/15 to-blue-500/10",
    iconColor: "text-[var(--neon-cyan)]",
    iconBg: "bg-cyan-500/15",
    accent: "#22d3ee",
    tag: "Accountability",
    detail: "30 seconds per day",
  },
  {
    icon: Zap,
    number: "03",
    title: "Earn XP & Streaks",
    desc: "Each verified proof unlocks XP. Miss a day and the streak resets — publicly. Your consistency score is always visible.",
    color: "from-amber-500/15 to-orange-500/10",
    iconColor: "text-[var(--neon-amber)]",
    iconBg: "bg-amber-500/15",
    accent: "#fbbf24",
    tag: "Gamification",
    detail: "+15–50 XP per proof",
  },
  {
    icon: Swords,
    number: "04",
    title: "Compete & Win",
    desc: "Climb the live leaderboard, earn rare badges, and trigger challenge events. Your crew stays sharp because everyone's watching.",
    color: "from-green-500/15 to-emerald-500/10",
    iconColor: "text-[var(--neon-green)]",
    iconBg: "bg-green-500/15",
    accent: "#4ade80",
    tag: "Competition",
    detail: "Weekly season resets",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full badge-neon px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            From zero to{" "}
            <span className="text-gradient">winning streak</span>
            <br />in 4 steps.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A tight accountability loop: commit publicly → prove daily → earn XP → climb together.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-12 left-full z-10 hidden w-6 lg:block"
                  style={{ transform: "translateX(-50%)" }}
                >
                  <div className="h-px w-full bg-gradient-to-r from-white/10 to-white/5" />
                  <ArrowRight className="absolute -top-2 -right-2 h-4 w-4 text-white/20" />
                </div>
              )}

              <div className={`relative h-full overflow-hidden rounded-2xl glass border border-white/5 p-6 transition-all duration-500 group-hover:border-white/10 group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Step number — large bg */}
                <div className="absolute top-4 right-4 font-display text-[56px] font-extrabold leading-none text-white/3 select-none">
                  {s.number}
                </div>

                {/* Icon */}
                <div className="relative">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${s.iconBg} transition-transform duration-300 group-hover:scale-110`}
                    style={{ boxShadow: `0 0 24px ${s.accent}30` }}
                  >
                    <s.icon className={`h-6 w-6 ${s.iconColor}`} />
                  </div>
                </div>

                {/* Tag */}
                <div className="relative mt-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Step {s.number} · {s.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>

                {/* Detail pill */}
                <div className="relative mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/3 px-3 py-1.5 text-[10px] font-medium text-muted-foreground">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: s.accent, boxShadow: `0 0 6px ${s.accent}` }}
                  />
                  {s.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="/login"
            className="group inline-flex items-center gap-2 rounded-full gradient-brand px-8 py-4 text-sm font-bold text-white shadow-brand transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_40px_-4px_rgba(129,140,248,0.7)]"
          >
            Start in 2 minutes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">No credit card required · Free forever for groups under 10</p>
        </motion.div>
      </div>
    </section>
  );
}
