import { Lock } from "lucide-react";

const ALL_BADGES = [
  { id:"1", icon:"🔥", name:"Streak Starter",     desc:"Maintain a 3-day streak",         earned: true,  xp: 50  },
  { id:"2", icon:"⚡", name:"Quick Learner",       desc:"Complete 5 tasks in one day",     earned: true,  xp: 100 },
  { id:"3", icon:"🏆", name:"Top Performer",       desc:"Reach #1 on the leaderboard",     earned: false, xp: 500 },
  { id:"4", icon:"💎", name:"Diamond Habit",       desc:"30-day unbroken streak",          earned: false, xp: 300 },
  { id:"5", icon:"🚀", name:"Challenger",          desc:"Create 10 challenges",             earned: true,  xp: 150 },
  { id:"6", icon:"🌙", name:"Night Owl",           desc:"Complete a task after midnight",  earned: true,  xp: 75  },
  { id:"7", icon:"🤝", name:"Team Player",         desc:"Join a collaboration group",      earned: false, xp: 100 },
  { id:"8", icon:"🎯", name:"Precision Strike",    desc:"Complete all tasks in a day",     earned: false, xp: 200 },
  { id:"9", icon:"📚", name:"Knowledge Seeker",    desc:"Complete 20 learning tasks",      earned: true,  xp: 120 },
  { id:"10",icon:"💪", name:"Iron Will",           desc:"7-day streak — no exceptions",    earned: false, xp: 250 },
  { id:"11",icon:"🌟", name:"Rising Star",         desc:"Earn 500 total XP",               earned: true,  xp: 80  },
  { id:"12",icon:"👑", name:"Habit King",          desc:"Reach Level 10",                  earned: false, xp: 1000},
];

export function BadgesPage() {
  const earned = ALL_BADGES.filter(b => b.earned);
  const locked = ALL_BADGES.filter(b => !b.earned);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <h2 className="font-display text-2xl font-extrabold mb-1">Badges</h2>
      <p className="text-sm text-muted-foreground mb-6">Your achievements and milestones.</p>

      {/* Progress bar */}
      <div className="mb-6 rounded-2xl border border-white/6 bg-white/2 px-5 py-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">{earned.length} / {ALL_BADGES.length} badges earned</span>
          <span className="text-primary font-bold">{Math.round(earned.length / ALL_BADGES.length * 100)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full gradient-brand transition-all duration-700"
            style={{ width: `${(earned.length / ALL_BADGES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Earned */}
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Earned ({earned.length})</h3>
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {earned.map(b => (
          <div
            key={b.id}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/6 bg-white/3 p-4 text-center hover:border-primary/30 hover:bg-white/5 transition-all cursor-default"
          >
            <span className="text-3xl">{b.icon}</span>
            <div>
              <div className="text-sm font-bold text-foreground">{b.name}</div>
              <div className="mt-0.5 text-[10px] text-muted-foreground leading-tight">{b.desc}</div>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              +{b.xp} XP
            </span>
          </div>
        ))}
      </div>

      {/* Locked */}
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Locked ({locked.length})</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {locked.map(b => (
          <div
            key={b.id}
            className="relative flex flex-col items-center gap-2 rounded-2xl border border-white/4 bg-white/1 p-4 text-center opacity-50 cursor-default"
          >
            <span className="text-3xl grayscale">{b.icon}</span>
            <div>
              <div className="text-sm font-bold text-muted-foreground">{b.name}</div>
              <div className="mt-0.5 text-[10px] text-muted-foreground leading-tight">{b.desc}</div>
            </div>
            <Lock className="absolute top-3 right-3 h-3 w-3 text-muted-foreground" />
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              +{b.xp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
