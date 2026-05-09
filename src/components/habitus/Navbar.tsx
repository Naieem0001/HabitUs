import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "How It Works", href: "#how" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Features", href: "#features" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong border-b border-white/5 shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[70px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onMouseEnter={() => setActiveLink(l.label)}
                onMouseLeave={() => setActiveLink(null)}
                className="relative rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
              >
                {activeLink === l.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-white/5"
          >
            Sign In
          </Link>
          <Link
            to="/login"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold shadow-brand transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_-4px_rgba(129,140,248,0.6)]"
          >
            <span className="relative z-10">Get Started</span>
            <ChevronRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            {/* Shimmer overlay */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass border border-white/10 text-foreground transition-all hover:bg-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/5 glass-strong"
          >
            <ul className="space-y-1 px-4 py-5">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-white/5 transition-colors"
                  >
                    {l.label}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                </motion.li>
              ))}
              <li className="pt-3 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-foreground transition-all hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-1.5 rounded-full gradient-brand px-4 py-3 text-center text-sm font-semibold shadow-brand"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
