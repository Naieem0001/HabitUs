import { Users, Flame, Trophy, Plus, Globe } from "lucide-react";
import { useState } from "react";

const PUBLIC_GROUPS = [
  {
    id:"1", name:"Morning Warriors",  emoji:"🌅", category:"Fitness",
    members:142, streak:21, challenge:"Wake up at 5AM every day",
    leader:"Alex K.", xpReward:200, joined:false,
  },
  {
    id:"2", name:"Code Every Day",     emoji:"💻", category:"Coding",
    members:89,  streak:14, challenge:"Ship at least 1 commit daily",
    leader:"Sarah M.", xpReward:150, joined:true,
  },
  {
    id:"3", name:"Read 30 Min",        emoji:"📚", category:"Learning",
    members:214, streak:30, challenge:"Read for 30 minutes every day",
    leader:"David K.", xpReward:100, joined:false,
  },
  {
    id:"4", name:"No Junk Food",       emoji:"🥗", category:"Health",
    members:67,  streak:7,  challenge:"No junk food for 30 days",
    leader:"Emma W.", xpReward:180, joined:false,
  },
  {
    id:"5", name:"Meditation Circle",  emoji:"🧘", category:"Wellness",
    members:55,  streak:10, challenge:"Meditate 10 mins every morning",
    leader:"James T.", xpReward:120, joined:false,
  },
  {
    id:"6", name:"Side Project Builders", emoji:"🚀", category:"Coding",
    members:38,  streak:5,  challenge:"Work on side project 1hr/day",
    leader:"Maya R.", xpReward:250, joined:false,
  },
];

const CATS = ["All","Fitness","Coding","Learning","Health","Wellness"];
const catColor: Record<string,string> = {
  Fitness:  "text-green-400  bg-green-400/10  border-green-400/25",
  Coding:   "text-blue-400   bg-blue-400/10   border-blue-400/25",
  Learning: "text-purple-400 bg-purple-400/10 border-purple-400/25",
  Health:   "text-rose-400   bg-rose-400/10   border-rose-400/25",
  Wellness: "text-cyan-400   bg-cyan-400/10   border-cyan-400/25",
};

export function CollaborationsPage({
  searchTerm,
  searchResults,
  isSearching,
}: {
  searchTerm: string;
  searchResults: Array<{
    id: string;
    display_name: string;
    avatar_url?: string;
    xp: number;
    level: number;
    streak_days: number;
    tasks_completed: number;
  }>;
  isSearching: boolean;
}) {
  const [filter, setFilter]   = useState("All");
  const [groups, setGroups]   = useState(PUBLIC_GROUPS);

  const toggle = (id: string) =>
    setGroups(g => g.map(x => x.id === id ? { ...x, joined: !x.joined } : x));

  const shown = filter === "All" ? groups : groups.filter(g => g.category === filter);
  const hasSearch = searchTerm.trim().length > 0;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold mb-1">Collaborations</h2>
          <p className="text-sm text-muted-foreground">
            {hasSearch
              ? `Search results for “${searchTerm}”` 
              : 'Join public groups and take on shared challenges.'
            }
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-brand hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Create Group
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { icon:<Globe className="h-4 w-4 text-primary" />,              label:"Public Groups",  val: groups.length },
          { icon:<Users className="h-4 w-4 text-[var(--neon-green)]" />,  label:"Joined",         val: groups.filter(g=>g.joined).length },
          { icon:<Trophy className="h-4 w-4 text-[var(--neon-amber)]" />, label:"Total Members",  val: groups.reduce((s,g)=>s+g.members,0) },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-white/6 bg-white/2 px-5 py-4 flex items-center gap-3">
            {s.icon}
            <div>
              <div className="text-xl font-bold text-foreground">{s.val}</div>
              <div className="text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {hasSearch ? (
        <div className="space-y-4">
          {isSearching ? (
            <div className="rounded-2xl border border-white/6 bg-white/2 p-6 text-center text-sm text-muted-foreground">
              Searching users...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="rounded-2xl border border-white/6 bg-white/2 p-6 text-center text-sm text-muted-foreground">
              No users found matching your search.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {searchResults.map(user => (
                <div key={user.id} className="rounded-2xl border border-white/6 bg-white/2 p-5 hover:border-primary/30 hover:bg-white/4 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg text-primary">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt={user.display_name} className="h-12 w-12 rounded-2xl object-cover" />
                      ) : (
                        <span>{user.display_name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{user.display_name}</div>
                      <div className="text-[11px] text-muted-foreground">{user.xp.toLocaleString()} XP • {user.streak_days}-day streak</div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                    <span className="rounded-full border border-white/10 px-2.5 py-1">Level {user.level}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1">{user.tasks_completed} completed</span>
                  </div>
                  <button className="mt-5 w-full rounded-xl gradient-brand py-2 text-sm font-semibold text-white shadow-brand hover:opacity-90 transition-opacity">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Category filter */}
          <div className="mb-5 flex gap-2 flex-wrap">
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                  filter === c
                    ? "gradient-brand text-white border-transparent shadow-brand"
                    : "border-white/10 bg-white/3 text-muted-foreground hover:text-foreground hover:bg-white/6"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Group cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {shown.map(g => (
              <div
                key={g.id}
                className="rounded-2xl border border-white/6 bg-white/2 p-5 hover:border-primary/30 hover:bg-white/4 transition-all"
              >
                {/* Top row */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-2xl border border-white/6">
                      {g.emoji}
                    </span>
                    <div>
                      <div className="font-bold text-foreground text-sm">{g.name}</div>
                      <div className="text-[10px] text-muted-foreground">by {g.leader}</div>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${catColor[g.category] || ""}`}>
                    {g.category}
                  </span>
                </div>

                {/* Challenge */}
                <p className="mb-4 text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-3">
                  {g.challenge}
                </p>

                {/* Stats row */}
                <div className="mb-4 flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{g.members} members</span>
                  <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-[var(--neon-amber)]" />{g.streak}-day streak</span>
                  <span className="flex items-center gap-1 text-primary font-bold"><Trophy className="h-3 w-3" />+{g.xpReward} XP</span>
                </div>

                {/* Join / Leave */}
                <button
                  onClick={() => toggle(g.id)}
                  className={`w-full rounded-xl py-2 text-sm font-semibold transition-all ${
                    g.joined
                      ? "border border-white/10 bg-white/4 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                      : "gradient-brand text-white shadow-brand hover:opacity-90"
                  }`}
                >
                  {g.joined ? "Leave Group" : "Join Challenge"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
