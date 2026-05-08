import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl glass-strong ring-gradient p-10 text-center sm:p-16"
        >
          <div className="absolute -top-32 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full hero-glow-1 blur-[140px]" />
          <div className="absolute -bottom-32 left-1/2 -z-10 h-[400px] w-[500px] -translate-x-1/2 rounded-full hero-glow-2 blur-[120px]" />

          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Your goals become real when{" "}
            <span className="text-gradient-amber">someone else can see them</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Join 12,000+ goal-getters turning private intentions into public wins.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full gradient-amber px-7 py-3.5 text-sm font-semibold shadow-brand transition-transform hover:scale-[1.03]"
            >
              Start a Challenge
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-2/40"
            >
              Join a Demo Group
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
