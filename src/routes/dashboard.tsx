import { createFileRoute, redirect } from '@tanstack/react-router';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import {
  Zap, Search, Bell, LogOut, Plus, X, Send, Upload,
  Flame, Trophy, CheckCircle, BarChart2, Crown, Calendar,
  Users, Award, ChevronRight, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import React from 'react';
// Removed direct import to use React.lazy below
import ReminderForm from '../components/habitus/ReminderForm';
import { toast } from 'sonner';
import { CalendarPage }       from '../components/dashboard/CalendarPage';
import { BadgesPage }         from '../components/dashboard/BadgesPage';
import { CollaborationsPage } from '../components/dashboard/CollaborationsPage';
import { useInactivityReminder } from '../hooks/useInactivityReminder';

const ReminderBell = React.lazy(() => import('../components/habitus/ReminderBell'));

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session && !window.location.hash.includes('access_token')) {
      throw redirect({ to: '/login' });
    }
  },
  component: Dashboard,
});

interface Task {
  id: string; user_id: string; title: string; description?: string;
  priority: 'high' | 'medium' | 'low'; is_completed: boolean;
  category?: string; due_date?: string; created_at: string;
}

const WEEK      = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const WEEK_DATA = [4, 6, 3, 7, 5, 2, 6];
const MAX_TASKS = 8;

const DUMMY_LB = [
  { id:'1', display_name:'Alex K.',  score:28400, streak_days:128 },
  { id:'2', display_name:'Sarah M.', score:24200, streak_days: 85 },
  { id:'3', display_name:'David K.', score:19800, streak_days: 64 },
  { id:'4', display_name:'Emma W.',  score:16500, streak_days: 42 },
  { id:'5', display_name:'James T.', score:12800, streak_days: 21 },
];

const NAV = [
  { icon: CheckCircle, label: "Today's Tasks", id: 'tasks'    },
  { icon: Calendar,    label: 'Calendar',       id: 'calendar' },
  { icon: Users,       label: 'Collaborations', id: 'collab'   },
  { icon: Award,       label: 'Badges',         id: 'badges'   },
];

const PRIORITY_COLOR: Record<string, string> = {
  high:   'text-red-400 bg-red-400/10 border-red-400/30',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  low:    'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

function Dashboard() {
  const [user,        setUser]    = useState<any>(null);
  const [stats,       setStats]   = useState({ xp:0, streak:0, tasks_completed:0, level:0 });
  const [tasks,       setTasks]   = useState<Task[]>([]);
  const [leaderboard, setLb]      = useState<any[]>(DUMMY_LB);
  const [activeNav,   setActiveNav] = useState('tasks');
  const [tab,         setTab]     = useState<'active'|'completed'>('active');
  const [search,      setSearch]  = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* task modal */
  const [showModal,    setShowModal]    = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [taskTitle,    setTaskTitle]    = useState('');
  const [taskDesc,     setTaskDesc]     = useState('');
  const [taskPriority, setTaskPriority] = useState<'high'|'medium'|'low'>('medium');
  const [taskCategory, setTaskCategory] = useState('coding');
  const [taskDeadline, setTaskDeadline] = useState('');

  /* proof modal */
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [proofText, setProofText] = useState('');
  const [proofImage, setProofImage] = useState<File | null>(null);

  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const u = session?.user ?? null;
      setUser(u);
      if (u && session?.access_token) {
        try {
          const r = await fetch(`${backendUrl}/api/me`, { headers: { Authorization: `Bearer ${session.access_token}` } });
          const p = await r.json();
          if (p && !p.error) setStats({ xp: p.xp||0, streak: p.streak_days||0, tasks_completed: p.tasks_completed||0, level: p.level||0 });
        } catch {}
        try {
          const r = await fetch(`${backendUrl}/api/tasks`, { headers: { Authorization: `Bearer ${session.access_token}` } });
          const d = await r.json();
          if (Array.isArray(d)) setTasks(d);
        } catch {}
      }
      try {
        const r = await fetch(`${backendUrl}/api/leaderboard`);
        const d = await r.json();
        if (Array.isArray(d) && d.length) setLb(d);
      } catch {}
    })();
  }, []);

  // inactivity reminder hook (fires toast after 30m of no new completions)
  useInactivityReminder({ userId: user?.id ?? null, name: displayName, tasksCompleted: stats.tasks_completed });

  const signOut = async () => { await supabase.auth.signOut(); window.location.href = '/login'; };

  const createTask = async () => {
    if (!taskTitle.trim()) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;
      const r = await fetch(`${backendUrl}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ title: taskTitle, description: taskDesc, priority: taskPriority, category: taskCategory, due_date: taskDeadline }),
      });
      const t = await r.json();
      if (t && !t.error) { setTasks([t, ...tasks]); toast.success('Challenge added! 🚀'); }
    } catch { toast.error('Failed'); }
    setShowModal(false); setTaskTitle(''); setTaskDesc(''); setTaskCategory('coding'); setTaskPriority('medium'); setTaskDeadline('');
  };

  const completeTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setSelectedTask(task);
      setShowProofModal(true);
    }
  };

  const submitProof = async () => {
    if (!selectedTask || !proofText.trim()) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      // Submit proof and complete task
      await fetch(`${backendUrl}/api/tasks/${selectedTask.id}/complete`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, is_completed: true } : t));
      toast.success('Quest Complete! +10 XP 🎉');

      setShowProofModal(false);
      setSelectedTask(null);
      setProofText('');
      setProofImage(null);
    } catch {
      toast.error('Failed to submit proof');
    }
  };

  const email       = user?.email || 'user@email.com';
  const avatar      = user?.user_metadata?.avatar_url;

  const filtered = tasks.filter(t =>
    (tab === 'active' ? !t.is_completed : t.is_completed) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#080b14] text-foreground overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside
        className="flex shrink-0 flex-col border-r border-white/5 bg-[#0a0d1a] transition-all duration-300 overflow-hidden"
        style={{ width: sidebarOpen ? '13rem' : '3.5rem' }}
      >
        {/* Logo + collapse */}
        <div className="flex h-16 shrink-0 items-center border-b border-white/5 px-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-brand shadow-brand">
            <Zap className="h-4 w-4 text-white" fill="white" strokeWidth={2.5} />
          </span>
          {sidebarOpen && (
            <span className="ml-2 font-display text-lg font-bold tracking-tight whitespace-nowrap overflow-hidden">
              Habit<span className="text-gradient">Us</span>
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/8 hover:text-foreground transition-colors"
          >
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4 overflow-hidden">
          {NAV.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              title={!sidebarOpen ? label : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                activeNav === id
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/5 px-2 py-4">
          <button
            onClick={signOut}
            title={!sidebarOpen ? 'Log Out' : undefined}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span className="truncate">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-white/5 bg-[#0a0d1a]/80 px-6 backdrop-blur">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks…"
              className="w-full rounded-xl border border-white/8 bg-white/4 py-2 pl-9 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/40"
            />
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1.5 rounded-xl border border-primary/25 bg-primary/10 px-3 py-1.5">
            <Trophy className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">{stats.xp.toLocaleString()} XP</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-amber-400/25 bg-amber-400/10 px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400">Level {stats.level}</span>
          </div>

          {/* Reminders */}
          {/* ReminderBell shows pending count and a dropdown */}
          <div className="mr-1">
            {/* dynamically loaded to avoid large imports in this bundle */}
            <React.Suspense fallback={<div className="h-9 w-9" />}>
              <ReminderBell />
            </React.Suspense>
          </div>

          <div className="flex items-center gap-2.5">
            {avatar ? (
              <img src={avatar} alt="" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/30 text-sm font-bold text-primary">
                {displayName.charAt(0)}
              </div>
            )}
            <div className="hidden md:block leading-tight">
              <div className="text-sm font-semibold text-foreground">{displayName}</div>
              <div className="text-[10px] text-muted-foreground">{email}</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {activeNav === 'calendar' && <CalendarPage />}
          {activeNav === 'badges' && <BadgesPage />}
          {activeNav === 'collab' && <CollaborationsPage />}

          {activeNav === 'tasks' && (
            <>
              <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h1 className="font-display text-3xl font-extrabold tracking-tight">
                      Welcome, <span className="text-gradient">{displayName}!</span>
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">Your squad is ranking high. Keep the streak alive! 🔥</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex items-center gap-2 rounded-2xl gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-brand hover:opacity-90 transition-opacity"
                    >
                      <Plus className="h-4 w-4" /> Add Task
                    </button>
                    <button
                      onClick={() => setShowReminderModal(true)}
                      className="flex items-center gap-2 rounded-2xl border border-white/8 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                    >
                      ⏰ Set Reminder
                    </button>
                  </div>
                </div>

                <div className="flex-1 rounded-2xl border border-white/6 bg-white/2 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                    <div className="flex gap-1 rounded-xl bg-white/5 p-1">
                      {(['active','completed'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className={`rounded-lg px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
                            tab === t ? 'bg-primary text-white shadow' : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{filtered.length} task{filtered.length !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="divide-y divide-white/4">
                    {filtered.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand shadow-brand">
                          <Zap className="h-7 w-7 text-white" fill="white" />
                        </div>
                        <p className="text-sm font-medium text-foreground">No {tab} tasks</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {tab === 'active' ? 'Create a challenge to get started! 🚀' : 'Complete tasks to see them here.'}
                        </p>
                      </div>
                    ) : filtered.map(task => (
                      <div key={task.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                        <input
                          type="checkbox"
                          checked={task.is_completed}
                          disabled={task.is_completed}
                          onChange={() => completeTask(task.id)}
                          className="h-4 w-4 shrink-0 rounded accent-primary cursor-pointer disabled:opacity-40"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${task.is_completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="mt-0.5 text-xs text-muted-foreground truncate">{task.description}</p>
                          )}
                        </div>
                        {task.priority && (
                          <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${PRIORITY_COLOR[task.priority]}`}>
                            {task.priority}
                          </span>
                        )}
                        {task.due_date && (
                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            📅 {new Date(task.due_date).toLocaleDateString('en-US', { month:'short', day:'numeric' })}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right sidebar */}
              <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-4 overflow-y-auto border-l border-white/5 px-4 py-6">

                {/* Streaks */}
                <div className="rounded-2xl border border-white/6 bg-white/2 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Streaks</span>
                    <Flame className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-4xl font-extrabold">{stats.streak}</span>
                    <span className="mb-1 text-sm text-muted-foreground">days</span>
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${i < (stats.streak % 7 || 7) ? 'bg-amber-400' : 'bg-white/8'}`} />
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">Keep going — don't break the chain! 🔥</p>
                </div>

                {/* Weekly Graph */}
                <div className="rounded-2xl border border-white/6 bg-white/2 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Weekly Graph</span>
                    <BarChart2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {WEEK_DATA.map((v, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full rounded-t-md"
                          style={{
                            height: `${(v / MAX_TASKS) * 100}%`,
                            background: i === new Date().getDay() - 1
                              ? 'linear-gradient(to top,#818cf8,#38bdf8)'
                              : 'rgba(129,140,248,0.25)',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-1.5 flex gap-1.5">
                    {WEEK.map(d => (
                      <div key={d} className="flex-1 text-center text-[9px] text-muted-foreground">{d}</div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="rounded-2xl border border-white/6 bg-white/2 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">LeaderBoard</span>
                    <Crown className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-2">
                    {leaderboard.slice(0, 5).map((m, i) => (
                      <div key={m.id} className={`flex items-center gap-2 rounded-xl px-2 py-2 ${i === 0 ? 'bg-primary/10' : 'hover:bg-white/4'}`}>
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${i === 0 ? 'gradient-brand text-white' : 'bg-white/8 text-muted-foreground'}`}>
                          {i + 1}
                        </span>
                        <span className="flex-1 min-w-0 text-xs font-semibold truncate">{m.display_name}</span>
                        <span className="shrink-0 text-[10px] font-bold text-primary">{m.score?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/8 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    View Full Leaderboard <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </aside>
            </>
          )}
        </div>
      </div>

      {/* ── ADD TASK MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e1325] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">New Challenge</h3>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-1.5 hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                value={taskTitle} onChange={e => setTaskTitle(e.target.value)}
                placeholder="Challenge title…"
                className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50"
              />
              <textarea
                value={taskDesc} onChange={e => setTaskDesc(e.target.value)}
                placeholder="Description (optional)…"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Priority</label>
                  <select
                    value={taskPriority} onChange={e => setTaskPriority(e.target.value as any)}
                    className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 appearance-none cursor-pointer"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category</label>
                  <select
                    value={taskCategory} onChange={e => setTaskCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 appearance-none cursor-pointer"
                  >
                    <option value="coding">Coding</option>
                    <option value="fitness">Fitness</option>
                    <option value="learning">Learning</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Deadline (optional)</label>
                <input type="date" value={taskDeadline} onChange={e => setTaskDeadline(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 cursor-pointer"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button onClick={createTask} className="flex-1 rounded-xl gradient-brand py-2.5 text-sm font-semibold text-white shadow-brand hover:opacity-90 transition-opacity">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          PROOF SUBMISSION MODAL
      ══════════════════════════════════ */}
      {showProofModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e1325] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">Submit Proof</h3>
              <button onClick={() => setShowProofModal(false)} className="rounded-lg p-1.5 hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              Challenge: <span className="font-semibold text-foreground">{selectedTask.title}</span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Add Image (optional)
                </label>
                <label className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-6 text-center cursor-pointer hover:border-primary/50 transition-colors group">
                  <Upload className="mx-auto text-muted-foreground group-hover:text-primary transition-colors mb-2 h-5 w-5" />
                  <p className="text-sm text-muted-foreground">
                    {proofImage ? proofImage.name : "Click to upload"}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProofImage(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Proof Notes
                </label>
                <textarea
                  value={proofText}
                  onChange={(e) => setProofText(e.target.value)}
                  placeholder="Describe what you've accomplished..."
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 resize-none"
                  rows={4}
                />
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
                <p className="text-sm text-primary font-medium">✓ +10 XP upon submission</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowProofModal(false)} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button onClick={submitProof} className="flex-1 rounded-xl gradient-brand py-2.5 text-sm font-semibold text-white shadow-brand hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" /> Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminders modal */}
      {showReminderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <ReminderForm
            userId={user?.id ?? null}
            tasks={tasks.map(t => ({ id: t.id, title: t.title }))}
            onSaved={() => {}}
            onClose={() => setShowReminderModal(false)}
          />
        </div>
      )}
    </div>
  );
}
