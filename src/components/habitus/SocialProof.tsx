import { motion } from "framer-motion";

const stats = [
  "12,000+ tasks completed",
  "3,500+ proof submissions",
  "800+ active challenge groups",
  "92% weekly consistency rate",
  "47k XP earned this week",
  "210+ universities onboard",
];

const testimonials = [
  { quote: "Studying alone never worked for me. The leaderboard pressure changed everything.", name: "Priya N.", role: "Med student" },
  { quote: "Once my streak became public, skipping a day felt impossible.", name: "Marcus T.", role: "Indie hacker" },
  { quote: "It feels like Duolingo for real life goals.", name: "Sana A.", role: "Designer" },
];

export function SocialProof() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center text-3xl font-bold sm:text-4xl"
        >
          Built for people who <span className="text-gradient-amber">grow together</span>.
        </motion.h2>

        {/* Marquee */}
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-3">
            {[...stats, ...stats].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-foreground whitespace-nowrap"
              >
                <span className="h-1.5 w-1.5 rounded-full gradient-amber" />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl glass p-6 transition-transform hover:-translate-y-1"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-amber text-xs font-bold text-[#1C1F2E]">
                  {t.name.charAt(0)}
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
