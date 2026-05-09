import { Logo } from "./Logo";
import { Twitter, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: ["Features", "Leaderboard", "Challenges", "Changelog", "Roadmap"],
  },
  {
    title: "Resources",
    links: ["Docs", "API Reference", "Templates", "Blog", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact", "Legal"],
  },
];

const socials = [
  { Icon: Twitter, label: "Twitter / X", href: "#" },
  { Icon: Github, label: "GitHub", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background">
      {/* Subtle gradient fade-in */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The accountability platform built for builders, students, and
              achievers. Turn private goals into public streaks. Build the habit.
              Win the season.
            </p>

            {/* Social links */}
            <div className="mt-7 flex gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/2 text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/8 px-3 py-1.5 text-[11px] font-medium text-[var(--neon-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-green)] animate-pulse" />
              All systems operational
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                  {c.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground"
                      >
                        {l}
                        <ExternalLink className="h-2.5 w-2.5 opacity-0 -translate-y-0.5 transition-all group-hover:opacity-60" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HabitUs, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5 text-xs text-muted-foreground">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  {l}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
