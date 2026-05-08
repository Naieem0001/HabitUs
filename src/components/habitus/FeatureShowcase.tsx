import { motion } from "framer-motion";
import { Camera, Trophy, Users } from "lucide-react";

const showcases = [
  {
    icon: Camera,
    eyebrow: "Receipts, not promises",
    title: "Proof over promises.",
    desc: "Every habit needs evidence. Photos, screenshots, or short notes — submitted in seconds, visible to your group instantly.",
    bullets: ["One-tap proof capture", "Group verification", "Auto-archived history"],
  },
  {
    icon: Trophy,
    eyebrow: "Friendly fire",
    title: "Competition that actually motivates.",
    desc: "Live leaderboards turn your week into a season. XP, multipliers, and weekly resets keep momentum compounding.",
    bullets: ["Real-time XP updates", "Weekly + season ranks", "Streak multipliers"],
  },
  {
    icon: Users,
    eyebrow: "Stronger together",
    title: "Built for study groups & ambitious communities.",
    desc: "Spin up private rooms in seconds. Perfect for med-school cohorts, dev squads, gym buddies and creator collectives.",
    bullets: ["Unlimited challenge rooms", "Member analytics", "Group chat & reactions"],
  },
];

export function FeatureShowcase() {
  return (
    <section id="community" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8 lg:space-y-32">
        {showcases.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              i % 2 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                <s.icon className="h-3.5 w-3.5" /> {s.eyebrow}
              </span>
              <h3 className="mt-5 text-3xl font-bold sm:text-4xl">{s.title}</h3>
              <p className="mt-4 text-base text-muted-foreground">{s.desc}</p>
              <ul className="mt-6 space-y-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full gradient-amber" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-2/40"
              >
                Explore feature →
              </a>
            </div>

            {/* mock visual */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="rounded-2xl glass-strong ring-gradient p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-amber">
                      <s.icon className="h-4 w-4 text-[#1C1F2E]" />
                    </span>
                    <span className="text-sm font-semibold">{s.eyebrow}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Today
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((k) => (
                    <div
                      key={k}
                      className="aspect-square rounded-xl border border-border bg-gradient-to-br from-surface-2/40 to-surface/60 p-3"
                    >
                      <div className="h-3/5 rounded-lg gradient-amber opacity-80" />
                      <div className="mt-2 space-y-1.5">
                        <div className="h-1.5 w-full rounded bg-surface-2" />
                        <div className="h-1.5 w-2/3 rounded bg-surface-2/60" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  {[0, 1, 2].map((k) => (
                    <div
                      key={k}
                      className="flex items-center justify-between rounded-lg bg-surface/50 p-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full gradient-amber" />
                        <div className="h-2 w-28 rounded bg-surface-2" />
                      </div>
                      <div className="h-2 w-12 rounded bg-primary/60" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
