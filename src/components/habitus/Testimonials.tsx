import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I went from skipping leg day every other week to a 60-day streak. The group chat keeps me honest in a way no app ever has.",
    name: "Hana Yusuf",
    role: "Bootcamp grad",
    location: "Berlin",
    avatar: "HY",
    stars: 5,
    tag: "Fitness",
    grad: "linear-gradient(135deg, #818cf8, #a78bfa)",
  },
  {
    quote:
      "We run our entire med-school study cohort on HabitUs. Submitting flashcard proof every night completely changed our exam results.",
    name: "Daniel Park",
    role: "Med student",
    location: "Toronto",
    avatar: "DP",
    stars: 5,
    tag: "Study",
    grad: "linear-gradient(135deg, #22d3ee, #818cf8)",
  },
  {
    quote:
      "I built more in 30 days using HabitUs than in the previous six months. Public XP is a wildly underrated motivator.",
    name: "Ruby Alvarez",
    role: "Indie hacker",
    location: "Mexico City",
    avatar: "RA",
    stars: 5,
    tag: "Building",
    grad: "linear-gradient(135deg, #4ade80, #22d3ee)",
  },
  {
    quote:
      "The leaderboard turned our running club into something between a sport and a soap opera. Attendance has never been higher.",
    name: "Marcus Bell",
    role: "Run club captain",
    location: "London",
    avatar: "MB",
    stars: 5,
    tag: "Running",
    grad: "linear-gradient(135deg, #fbbf24, #f472b6)",
  },
  {
    quote:
      "Proof submissions killed my excuses. There's nowhere to hide when your friends can see whether you actually showed up.",
    name: "Priya Nair",
    role: "Designer",
    location: "Bangalore",
    avatar: "PN",
    stars: 5,
    tag: "Design",
    grad: "linear-gradient(135deg, #f472b6, #a78bfa)",
  },
  {
    quote:
      "I've tried every habit tracker. HabitUs is the first one I didn't quit by week two — the streak pressure is just *chef's kiss*.",
    name: "Theo Laurent",
    role: "Founder",
    location: "Paris",
    avatar: "TL",
    stars: 5,
    tag: "Startup",
    grad: "linear-gradient(135deg, #818cf8, #38bdf8)",
  },
  {
    quote:
      "Our writing group went from sporadic Discord posts to 90 days of daily drafts. The XP system is genuinely addictive.",
    name: "Amara Okafor",
    role: "Novelist",
    location: "Lagos",
    avatar: "AO",
    stars: 5,
    tag: "Writing",
    grad: "linear-gradient(135deg, #a78bfa, #818cf8)",
  },
  {
    quote:
      "Climbing the weekly leaderboard with my brothers is the most fun I've had being responsible. 10/10.",
    name: "Kenji Watanabe",
    role: "Product manager",
    location: "Tokyo",
    avatar: "KW",
    stars: 5,
    tag: "Productivity",
    grad: "linear-gradient(135deg, #22d3ee, #4ade80)",
  },
  {
    quote:
      "I dropped 18kg in 6 months because losing my streak in front of my crew was scarier than any gym session.",
    name: "Olivia Becker",
    role: "Software engineer",
    location: "Amsterdam",
    avatar: "OB",
    stars: 5,
    tag: "Health",
    grad: "linear-gradient(135deg, #4ade80, #22d3ee)",
  },
  {
    quote:
      "Best onboarding tool we've added for new hires. Daily learning challenges with public proof — it just works.",
    name: "Felipe Costa",
    role: "Eng manager",
    location: "São Paulo",
    avatar: "FC",
    stars: 5,
    tag: "Teams",
    grad: "linear-gradient(135deg, #fbbf24, #818cf8)",
  },
];

const tagColors: Record<string, string> = {
  Fitness: "badge-neon",
  Study: "badge-green",
  Building: "badge-green",
  Running: "badge-amber",
  Design: "badge-neon",
  Startup: "badge-amber",
  Writing: "badge-neon",
  Productivity: "badge-neon",
  Health: "badge-green",
  Teams: "badge-amber",
};

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="group relative mx-3 w-[340px] shrink-0 overflow-hidden rounded-3xl glass border border-white/5 p-7 transition-all duration-500 hover:border-white/10 hover:scale-[1.02] sm:w-[380px]">
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at top left, rgba(129,140,248,0.08), transparent 60%)" }}
      />

      {/* Quote icon */}
      <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/15 transition-colors group-hover:text-primary/25" />

      {/* Stars */}
      <div className="relative flex items-center gap-0.5 mb-4">
        {[...Array(t.stars)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-[var(--neon-amber)] text-[var(--neon-amber)]" />
        ))}
        <span className={`ml-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${tagColors[t.tag] || "badge-neon"}`}>
          {t.tag}
        </span>
      </div>

      {/* Quote text */}
      <blockquote className="relative text-sm leading-relaxed text-foreground/90 sm:text-base">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <figcaption className="relative mt-5 flex items-center gap-3 border-t border-white/5 pt-5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ring-1 ring-white/10"
          style={{ background: t.grad }}
        >
          {t.avatar}
        </span>
        <div>
          <div className="text-sm font-semibold text-foreground">{t.name}</div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <span>{t.role}</span>
            <span className="text-white/20">·</span>
            <span>{t.location}</span>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        {loop.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export function Testimonials() {
  const rowA = testimonials.slice(0, 5);
  const rowB = testimonials.slice(5);

  return (
    <section id="testimonials" className="relative py-28 sm:py-36">
      {/* Header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 reveal-on-scroll">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full badge-neon px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
        >
          <Star className="h-3 w-3 fill-[var(--neon-amber)] text-[var(--neon-amber)]" />
          Social Proof
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl"
        >
          Loved by people who{" "}
          <span className="text-gradient">finish things.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-base text-muted-foreground"
        >
          Real streaks. Real receipts. Hover to pause.
        </motion.p>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[var(--neon-amber)] text-[var(--neon-amber)]" />
              ))}
            </div>
            <span><span className="font-semibold text-foreground">4.9</span>/5</span>
          </div>
          <span className="h-4 w-px bg-border" />
          <span><span className="font-semibold text-foreground">1,200+</span> reviews</span>
          <span className="h-4 w-px bg-border" />
          <span><span className="font-semibold text-foreground">10+</span> countries</span>
        </motion.div>
      </div>

      {/* Scrolling rows */}
      <div className="mt-16 space-y-5">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
