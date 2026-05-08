import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I went from skipping leg day every other week to a 60-day streak. The group chat keeps me honest in a way no app ever has.",
    name: "Hana Yusuf",
    role: "Bootcamp grad · Berlin",
  },
  {
    quote:
      "We run our entire med-school study cohort on HabitUs. Submitting flashcard proof every night completely changed our exam results.",
    name: "Daniel Park",
    role: "Med student · Toronto",
  },
  {
    quote:
      "I built more in 30 days using HabitUs than in the previous six months. Public XP is a wildly underrated motivator.",
    name: "Ruby Alvarez",
    role: "Indie hacker · Mexico City",
  },
  {
    quote:
      "The leaderboard turned our running club into something between a sport and a soap opera. Attendance has never been higher.",
    name: "Marcus Bell",
    role: "Run club captain · London",
  },
  {
    quote:
      "Proof submissions killed my excuses. There's nowhere to hide when your friends can see whether you actually showed up.",
    name: "Priya Nair",
    role: "Designer · Bangalore",
  },
  {
    quote:
      "I've tried every habit tracker. HabitUs is the first one I didn't quit by week two — the streak pressure is just *chef's kiss*.",
    name: "Theo Laurent",
    role: "Founder · Paris",
  },
  {
    quote:
      "Our writing group went from sporadic Discord posts to 90 days of daily drafts. The XP system is genuinely addictive.",
    name: "Amara Okafor",
    role: "Novelist · Lagos",
  },
  {
    quote:
      "Climbing the weekly leaderboard with my brothers is the most fun I've had being responsible. 10/10.",
    name: "Kenji Watanabe",
    role: "Product manager · Tokyo",
  },
  {
    quote:
      "I dropped 18kg in 6 months because losing my streak in front of my crew was scarier than any gym session.",
    name: "Olivia Becker",
    role: "Software eng · Amsterdam",
  },
  {
    quote:
      "Best onboarding tool we've added for new hires. Daily learning challenges with public proof — it just works.",
    name: "Felipe Costa",
    role: "Eng manager · São Paulo",
  },
];

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="relative w-[340px] sm:w-[400px] shrink-0 rounded-3xl glass-strong p-7 mx-3">
      <Quote className="absolute right-5 top-5 h-7 w-7 text-primary/30" />
      <blockquote className="text-sm leading-relaxed text-foreground sm:text-base">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-amber text-xs font-bold text-[#1C1F2E]">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div>
          <div className="text-sm font-semibold">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
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
  // duplicate for seamless loop
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
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export function Testimonials() {
  const rowA = testimonials.slice(0, 5);
  const rowB = testimonials.slice(5);
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold sm:text-5xl">
          Loved by people who{" "}
          <span className="text-gradient-amber">finish what they start</span>.
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Real streaks. Real receipts. Hover to pause.
        </p>
      </div>

      <div className="mt-14 space-y-6">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
