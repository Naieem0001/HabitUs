import { motion } from "framer-motion";

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block rounded-full border border-border bg-surface/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
        >
          The Problem
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-6 max-w-4xl text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          Most productivity apps fail because{" "}
          <span className="text-muted-foreground">nobody notices</span> when you{" "}
          <span className="text-gradient-amber">quit</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Streaks reset silently. Goals disappear into private journals. Without
          witnesses, motivation evaporates by week two — and the app gets deleted.
        </motion.p>
      </div>
    </section>
  );
}
