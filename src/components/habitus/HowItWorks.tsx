import { motion } from "framer-motion";
import { Target, Camera, Zap, Swords } from "lucide-react";

const steps = [
  { icon: Target, title: "Create a Goal", desc: "Define a daily or weekly habit. Set your stakes and invite your group." },
  { icon: Camera, title: "Submit Proof", desc: "Drop a photo, screenshot or short note as evidence — every single day." },
  { icon: Zap, title: "Earn XP & Streaks", desc: "Each verified proof unlocks XP. Miss a day and the streak resets — publicly." },
  { icon: Swords, title: "Compete Together", desc: "Climb the live leaderboard and earn badges with your challenge crew." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-border bg-surface/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            How It Works
          </span>
          <h2 className="mt-6 text-3xl font-bold sm:text-5xl">
            From idea to <span className="text-gradient-amber">winning streak</span> in 4 steps.
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent lg:block" />
          <ol className="space-y-10 lg:space-y-20">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-12 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="rounded-2xl glass ring-gradient p-6 lg:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg gradient-amber text-sm font-bold text-[#1C1F2E]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-base text-muted-foreground">{s.desc}</p>
                </div>

                {/* mock visual */}
                <div className="rounded-2xl glass-strong p-5">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
                      <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
                      <span className="h-2.5 w-2.5 rounded-full bg-surface-2" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      habitus.app
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[0, 1, 2].map((k) => (
                      <div key={k} className="flex items-center justify-between rounded-lg bg-surface/50 p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-md gradient-amber opacity-80" />
                          <div className="space-y-1.5">
                            <div className="h-2 w-24 rounded bg-surface-2" />
                            <div className="h-2 w-16 rounded bg-surface-2/60" />
                          </div>
                        </div>
                        <div className="h-2 w-10 rounded bg-primary/60" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
