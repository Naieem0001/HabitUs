import { motion } from "framer-motion";

const versions = [
  {
    label: "V1",
    status: "Shipping now",
    items: ["Real-time sync", "Mobile PWA", "Daily reminders", "Personal analytics"],
  },
  {
    label: "V2",
    status: "Next quarter",
    items: ["AI proof verification", "Public challenge rooms", "Achievement badges", "Smart recommendations"],
  },
  {
    label: "V3",
    status: "On the horizon",
    items: ["Teacher dashboards", "College communities", "Organization leaderboards", "Team productivity analytics"],
  },
];

export function Roadmap() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-border bg-surface/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Roadmap
          </span>
          <h2 className="mt-6 text-3xl font-bold sm:text-5xl">
            Where we&apos;re <span className="text-gradient-amber">headed next</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {versions.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl glass p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gradient-amber">{v.label}</span>
                <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {v.status}
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {v.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full gradient-amber" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
