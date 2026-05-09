import { motion } from "framer-motion";
import {
  Shield,
  Bell,
  BarChart3,
  Globe,
  Lock,
  Smartphone,
  Layers,
  GitBranch,
  Code2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Proof Verification",
    desc: "Group members vote on submission validity. No gaming the system — everyone sees, everyone judges.",
    color: "#818cf8",
    bg: "bg-primary/10",
    span: "col-span-1",
  },
  {
    icon: BarChart3,
    title: "XP & Analytics",
    desc: "Deep stats on your habit performance. Consistency scores, peak hours, streak history — full visibility.",
    color: "#22d3ee",
    bg: "bg-cyan-500/10",
    span: "col-span-1",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "AI-powered nudges that learn your schedule. Get pinged before your window closes, not after.",
    color: "#4ade80",
    bg: "bg-green-500/10",
    span: "col-span-1",
  },
  {
    icon: Globe,
    title: "Public Challenges",
    desc: "Join global open challenges or create invite-only private leagues. 800+ challenge groups and growing.",
    color: "#fbbf24",
    bg: "bg-amber-500/10",
    span: "col-span-1 sm:col-span-2 lg:col-span-1",
  },
  {
    icon: GitBranch,
    title: "Streak Chains",
    desc: "Team streaks that depend on every member. One person breaks — the whole chain breaks. High stakes, high reward.",
    color: "#f472b6",
    bg: "bg-pink-500/10",
    span: "col-span-1",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    desc: "Submit proof from anywhere in seconds. iOS & Android apps with offline support for no-excuse proof drops.",
    color: "#a78bfa",
    bg: "bg-violet-500/10",
    span: "col-span-1",
  },
];

const techBadges = [
  { label: "API Integrations", icon: Code2, color: "#818cf8" },
  { label: "End-to-end Encrypted", icon: Lock, color: "#4ade80" },
  { label: "99.9% Uptime", icon: Zap, color: "#fbbf24" },
  { label: "Multi-platform", icon: Layers, color: "#22d3ee" },
];

export function FeatureShowcase() {
  return (
    <section id="features" className="relative py-28 sm:py-36">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(129,140,248,0.5), transparent 70%)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full badge-neon px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Everything You Need
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl"
          >
            Built for people who{" "}
            <span className="text-gradient">ship.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            Every feature designed for techies, students, and ambitious builders
            who need accountability with teeth.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl glass border border-white/5 p-6 transition-all duration-500 hover:border-white/10 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${f.span}`}
            >
              {/* Hover glow */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at top left, ${f.color}15, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.bg} mb-5 transition-transform duration-300 group-hover:scale-110`}
                style={{ boxShadow: `0 0 20px ${f.color}25` }}
              >
                <f.icon className="h-5 w-5" style={{ color: f.color }} />
              </div>

              <h3 className="relative font-display text-lg font-bold text-foreground">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Tech trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {techBadges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 rounded-full glass border border-white/5 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-all hover:border-white/10 hover:text-foreground"
            >
              <b.icon className="h-3.5 w-3.5" style={{ color: b.color }} />
              {b.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
