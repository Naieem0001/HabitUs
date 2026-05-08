import { motion } from "framer-motion";
import { GraduationCap, Code2, Sparkles, Dumbbell } from "lucide-react";

const users = [
  { icon: GraduationCap, title: "Students", desc: "Crush study schedules with your cohort. Daily proof, weekly ranks." },
  { icon: Code2, title: "Developers", desc: "Ship daily commits. Track focus blocks and side-project momentum." },
  { icon: Sparkles, title: "Creators", desc: "Build the publishing habit. One reel, one post, one streak at a time." },
  { icon: Dumbbell, title: "Fitness Groups", desc: "Workout proof, PR boards and group challenges that actually stick." },
];

export function TargetUsers() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Built for the <span className="text-gradient-amber">obsessed</span>.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Whoever you are, if you're chasing daily progress — HabitUs makes it stick.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {users.map((u, i) => (
            <motion.article
              key={u.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#E07B39]/10"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface/60 transition-colors group-hover:border-primary/50">
                <u.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{u.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
