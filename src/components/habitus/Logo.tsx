import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-2 ${className}`} aria-label="HabitUs home">
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-amber"
      >
        <Flame className="h-4 w-4 animate-flame" strokeWidth={2.5} />
      </motion.span>
      <span className="font-display text-xl font-bold tracking-tight text-foreground">
        HabitUs
      </span>
    </a>
  );
}
