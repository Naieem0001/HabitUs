import { Flame, Trophy, Users, Zap, Star, TrendingUp, Shield, Clock } from "lucide-react";

const items = [
  { icon: Users, label: "12,000+ Active Users", color: "#818cf8" },
  { icon: Flame, label: "2.4M Proofs Submitted", color: "#fbbf24" },
  { icon: Trophy, label: "800+ Challenge Groups", color: "#a78bfa" },
  { icon: Star, label: "4.9/5 Rating", color: "#fbbf24" },
  { icon: Zap, label: "94% Streak Survival Rate", color: "#4ade80" },
  { icon: TrendingUp, label: "60-Day Avg Streak", color: "#22d3ee" },
  { icon: Shield, label: "Proof-Verified XP Only", color: "#818cf8" },
  { icon: Clock, label: "2-Min Setup Time", color: "#f472b6" },
];

function TickerItem({ icon: Icon, label, color }: { icon: typeof Users; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap px-6">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{ background: `${color}18` }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color }} />
      </span>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="ml-4 h-1 w-1 rounded-full bg-white/15" />
    </div>
  );
}

export function SocialProofTicker() {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-4">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <TickerItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
