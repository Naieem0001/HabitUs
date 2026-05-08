import { motion } from "framer-motion";
import { ShieldCheck, Trophy, Users, Gamepad2 } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Proof-Based Accountability", desc: "Submit photos, screenshots or notes. Real evidence, not checkmarks." },
  { icon: Trophy, title: "Live Leaderboards", desc: "Real-time ranking that updates the moment your friends ship." },
  { icon: Users, title: "Challenge Rooms", desc: "Private groups for study squads, gyms, and creators." },
  { icon: Gamepad2, title: "Gamified Growth", desc: "XP, streaks, badges and seasons that turn habits into a game." },
];

export function Solution() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-border bg-surface/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            The Solution
          </span>
          <h2 className="mt-6 text-3xl font-bold sm:text-5xl">
            HabitUs turns consistency into a <span className="text-gradient-amber">shared game</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative rounded-2xl glass p-6 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#E07B39]/10"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl gradient-amber transition-transform group-hover:scale-110">
                <f.icon className="h-5 w-5 text-[#1C1F2E]" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
