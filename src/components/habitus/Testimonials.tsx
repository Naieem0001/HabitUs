import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const items = [
  {
    quote: "I went from skipping leg day every other week to a 60-day streak. The group chat keeps me honest in a way no app ever has.",
    name: "Hana Yusuf",
    role: "Bootcamp grad · Berlin",
  },
  {
    quote: "We run our entire med-school study cohort on HabitUs. Submitting flashcard proof every night completely changed our exam results.",
    name: "Daniel Park",
    role: "Med student · Toronto",
  },
  {
    quote: "I built more in 30 days using HabitUs than in the previous six months. Public XP is a wildly underrated motivator.",
    name: "Ruby Alvarez",
    role: "Indie hacker · Mexico City",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Loved by people who <span className="text-gradient-amber">finish what they start</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-3xl glass-strong p-8 transition-transform hover:-translate-y-1.5"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/30" />
              <blockquote className="text-base leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full gradient-amber text-sm font-bold text-[#1C1F2E]">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
