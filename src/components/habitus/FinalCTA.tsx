import { ArrowRight, Sparkles, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const perks = [
  { icon: Users, text: "Join 12,000+ goal-getters" },
  { icon: Shield, text: "Free forever for groups under 10" },
  { icon: Sparkles, text: "No credit card required" },
];

export function FinalCTA() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.2) 40%, rgba(56,189,248,0.15) 100%)",
            }}
          />
          {/* Grid on top */}
          <div className="absolute inset-0 grid-bg opacity-40" />
          {/* Glass border */}
          <div className="absolute inset-0 rounded-3xl ring-gradient" />

          {/* Glow blobs */}
          <div
            className="absolute -top-40 left-1/2 -z-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[140px]"
            style={{ background: "rgba(99,102,241,0.3)" }}
          />
          <div
            className="absolute -bottom-40 right-0 -z-0 h-[400px] w-[500px] rounded-full blur-[130px]"
            style={{ background: "rgba(56,189,248,0.2)" }}
          />

          {/* Floating accent orb */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-12 h-20 w-20 rounded-full blur-xl opacity-40"
            style={{ background: "rgba(167,139,250,0.8)" }}
          />
          <motion.div
            animate={{ y: [0, 16, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-8 left-12 h-16 w-16 rounded-full blur-xl opacity-30"
            style={{ background: "rgba(56,189,248,0.8)" }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 text-center sm:px-16 sm:py-24">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Start today — it's free
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
            >
              Your goals become real when{" "}
              <span className="text-gradient">
                someone else can see them.
              </span>
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Join thousands of techies, students, and builders turning private
              intentions into public wins — one proof at a time.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="/login"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full gradient-brand px-8 py-4 text-base font-bold text-white shadow-brand transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_12px_48px_-4px_rgba(129,140,248,0.8)]"
              >
                <Sparkles className="h-4 w-4" />
                Start Your Challenge
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-white/12 hover:border-white/25"
              >
                Join a Demo Group
              </a>
            </motion.div>

            {/* Perks */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              {perks.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <p.icon className="h-3.5 w-3.5 text-primary" />
                  {p.text}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
