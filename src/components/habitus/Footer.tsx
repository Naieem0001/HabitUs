import { Logo } from "./Logo";
import { Twitter, Github, Linkedin, Instagram } from "lucide-react";

const cols = [
  { title: "Product", links: ["Features", "Leaderboard", "Challenges", "Pricing", "Changelog"] },
  { title: "Resources", links: ["Docs", "Guides", "Templates", "Brand", "Status"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Press", "Contact"] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The accountability platform that turns private goals into public streaks.
              Build the habit. Win the season.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {c.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HabitUs. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
