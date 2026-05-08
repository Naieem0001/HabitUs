import { motion } from "framer-motion";
import { Target, Camera, Zap, Swords } from "lucide-react";
import img1 from "@/assets/how-1-goal.jpg";
import img2 from "@/assets/how-2-proof.jpg";
import img3 from "@/assets/how-3-xp.jpg";
import img4 from "@/assets/how-4-leaderboard.jpg";

const steps = [
  {
    icon: Target,
    title: "Create a Goal",
    desc: "Define a daily or weekly habit. Set your stakes and invite your group.",
    img: img1,
    alt: "Goal creation screen mockup",
  },
  {
    icon: Camera,
    title: "Submit Proof",
    desc: "Drop a photo, screenshot or short note as evidence — every single day.",
    img: img2,
    alt: "Proof submission flow mockup",
  },
  {
    icon: Zap,
    title: "Earn XP & Streaks",
    desc: "Each verified proof unlocks XP. Miss a day and the streak resets — publicly.",
    img: img3,
    alt: "XP and streak dashboard mockup",
  },
  {
    icon: Swords,
    title: "Compete Together",
    desc: "Climb the live leaderboard and earn badges with your challenge crew.",
    img: img4,
    alt: "Live leaderboard screen mockup",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll">
          <span className="inline-block rounded-full border border-border bg-surface/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            How It Works
          </span>
          <h2 className="mt-6 text-3xl font-bold sm:text-5xl">
            From idea to <span className="text-gradient-amber">winning streak</span> in 4 steps.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            A clear loop: commit publicly, prove daily, earn XP, climb together.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent lg:block" />
          <ol className="space-y-16 lg:space-y-28">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative">
                  <div className="absolute -left-2 -top-2 hidden h-16 w-16 rounded-2xl bg-primary/10 blur-xl lg:block" />
                  <div className="relative rounded-2xl glass ring-gradient p-6 lg:p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg gradient-amber text-sm font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <s.icon className="h-5 w-5 text-primary" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Step {i + 1} of 4
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{s.title}</h3>
                    <p className="mt-3 text-base text-muted-foreground">{s.desc}</p>
                  </div>
                </div>

                {/* image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotate: i % 2 ? 2 : -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="group relative overflow-hidden rounded-2xl glass-strong ring-gradient shadow-2xl"
                >
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <img
                    src={s.img}
                    alt={s.alt}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
