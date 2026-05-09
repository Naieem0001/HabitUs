import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-2.5 ${className}`} aria-label="HabitUs home">
      <motion.span
        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-brand"
      >
        <Zap className="h-4 w-4 text-white" strokeWidth={2.5} fill="white" />
        {/* Inner glow ring */}
        <span className="absolute inset-0 rounded-xl animate-neon-pulse opacity-60" />
      </motion.span>
      <span className="font-display text-xl font-bold tracking-tight text-foreground">
        Habit<span className="text-gradient">Us</span>
      </span>
    </a>
  );
}
