import { createFileRoute, redirect } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { 
  Trophy, Flame, CheckCircle, LogOut, User as UserIcon, 
  Plus, Copy, Share2, X, Upload, Send, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/habitus/ThemeToggle';
import { Logo } from '@/components/habitus/Logo';

// Use TanStack's beforeLoad for route protection
export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const hasHashToken = window.location.hash.includes("access_token");

    if (!session && !hasHashToken) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Dashboard,
});

interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  is_completed: boolean;
  due_date?: string;
  created_at: string;
}

interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  streak: number;
  tasks_completed: number;
}

function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [userStats, setUserStats] = useState({ xp: 0, streak: 0, tasks_completed: 0, level: 0 });

  // Task management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskCategory, setTaskCategory] = useState("coding");
  const [taskPriority, setTaskPriority] = useState<"high" | "medium" | "low">("medium");

  // Proof submission
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [proofText, setProofText] = useState("");
  const [proofImage, setProofImage] = useState<File | null>(null);

  // Group management
  const [groupCode, setGroupCode] = useState("HABITUS");
  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    const initializeDashboard = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser && session?.access_token) {
        // Update streak first
        try {
          await fetch(`${backendUrl}/api/streak/update`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });
        } catch (error) {
          console.error("Failed to update streak:", error);
        }

        // Fetch personal stats
        try {
          const response = await fetch(`${backendUrl}/api/me`, {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });
          const profile = await response.json();
          if (profile && !profile.error) {
            setUserStats({
              xp: profile.xp || 0,
              streak: profile.streak_days || 0,
              tasks_completed: profile.tasks_completed || 0,
              level: profile.level || 0,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    // Fetch leaderboard
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/leaderboard`);
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard in dashboard:", error);
      }
    };
    
    const fetchTasks = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        try {
          const response = await fetch(`${backendUrl}/api/tasks`, {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          });
          const data = await response.json();
          if (Array.isArray(data)) {
            setTasks(data);
          }
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      }
    };
    
    initializeDashboard();
    fetchLeaderboard();
    fetchTasks();
    
    const interval = setInterval(() => {
      fetchLeaderboard();
      fetchTasks();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleCreateTask = async () => {
    if (!taskTitle.trim()) return;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const response = await fetch(`${backendUrl}/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            title: taskTitle,
            description: taskDesc,
            priority: taskPriority,
            due_date: taskDeadline
          })
        });
        
        const newTask = await response.json();
        if (newTask && !newTask.error) {
          setTasks([newTask, ...tasks]);
          setTaskTitle('');
          setTaskDesc('');
          setTaskDeadline('');
          setTaskCategory('coding');
          setTaskPriority('medium');
          setShowTaskModal(false);
          toast.success("New Challenge Accepted! 🚀");
        }
      }
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create challenge");
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const response = await fetch(`${backendUrl}/api/tasks/${taskId}/complete`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });
        
        const result = await response.json();
        if (result.user) {
          // Update local tasks state
          setTasks(tasks.map(t => 
            t.id === taskId ? { ...t, is_completed: true } : t
          ));

          // Update user stats
          setUserStats({
            xp: result.user.xp,
            level: result.user.level,
            tasks_completed: result.user.tasks_completed,
            streak: userStats.streak
          });

          toast.success("Quest Complete! +10 XP 🎉");

          if (result.leveled_up) {
            toast.success(`LEVEL UP! You are now Level ${result.user.level} 🏆`, {
              duration: 5000,
              style: { background: '#FFD700', color: '#000' }
            });
          }
        }
      }
    } catch (error) {
      console.error("Failed to complete task:", error);
      toast.error("Failed to update challenge");
    }
  };

  const handleSubmitProof = async () => {
    if (!selectedTask || !proofText.trim()) return;

    const completionDate = new Date().toISOString().split("T")[0];

    // Persist to backend
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const response = await fetch(`${backendUrl}/api/xp/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            amount: 15,
            reason: `Completed task: ${selectedTask.title}`,
          }),
        });

        const result = await response.json();
        if (result.user) {
          setUserStats({
            xp: result.user.xp,
            level: result.user.level,
            tasks_completed: result.user.tasks_completed,
            streak: userStats.streak, // Streak is handled by separate endpoint
          });
        }
      }
    } catch (error) {
      console.error("Failed to add XP to backend:", error);
    }

    setTasks(
      tasks.map((t) =>
        t.id === selectedTask.id ? { ...t, proof_submitted: true, completionDate } : t,
      ),
    );

    setShowProofModal(false);
    setSelectedTask(null);
    setProofText("");
    setProofImage(null);
  };

  const copyGroupCode = () => {
    navigator.clipboard.writeText(groupCode);
    alert("Group code copied!");
  };

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      coding: { bg: "bg-blue-500/10", text: "text-blue-500" },
      fitness: { bg: "bg-green-500/10", text: "text-green-500" },
      learning: { bg: "bg-purple-500/10", text: "text-purple-500" },
      work: { bg: "bg-orange-500/10", text: "text-orange-500" },
      personal: { bg: "bg-pink-500/10", text: "text-pink-500" },
    };
    return colors[category || "coding"] || colors.coding;
  };

  const getPriorityColor = (priority?: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      high: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30" },
      medium: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/30" },
      low: { bg: "bg-gray-500/10", text: "text-gray-500", border: "border-gray-500/30" },
    };
    return colors[priority || "medium"] || colors.medium;
  };

  const formatDeadline = (date?: string, isCompleted?: boolean) => {
    if (isCompleted) {
      return `✓ Done`;
    }

    if (!date) return "";
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d.toDateString() === today.toDateString()) return "📅 Today";
    if (d.toDateString() === tomorrow.toDateString()) return "📅 Tomorrow";
    return `📅 ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.is_completed && !b.is_completed) return 1;
    if (!a.is_completed && b.is_completed) return -1;
    
    // Sort by priority (high > medium > low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority || "medium"];
    const bPriority = priorityOrder[b.priority || "medium"];

    if (aPriority !== bPriority) return bPriority - aPriority;

    // Then by deadline (earlier first)
    if (a.due_date && b.due_date) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }

    return 0;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full hero-glow-1 blur-[140px]" />

      {/* Dashboard Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/70">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <ThemeToggle />

          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Lv.{userStats.level}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.user_metadata?.full_name?.split(" ")[0] || "Challenger"}
                  </p>
                </div>
              </div>
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full border border-border"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-surface flex items-center justify-center border border-border">
                  <UserIcon size={16} className="text-muted-foreground" />
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-surface rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-2">
            Welcome back,{" "}
            <span className="text-gradient-amber">
              {user?.user_metadata?.full_name?.split(" ")[0] || "Challenger"}
            </span>
            .
          </h1>
          <p className="text-muted-foreground text-lg">
            Your squad is ranking high. Keep the streak alive! 🔥
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Flame, label: 'Streak', value: userStats.streak, color: 'text-primary' },
            { icon: Trophy, label: 'XP', value: userStats.xp, subtext: `Level ${userStats.level}`, color: 'text-primary' },
            { icon: CheckCircle, label: 'Tasks', value: userStats.tasks_completed, subtext: `${tasks.filter(t => t.is_completed).length} today`, color: 'text-primary' },
            { icon: Share2, label: 'Group Code', value: groupCode, color: 'text-primary', mono: true },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-2xl glass p-6 border border-border hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg glass-strong flex items-center justify-center border border-border group-hover:border-primary/50 transition-all">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    {stat.label}
                  </span>
                </div>
                <div className={`text-3xl font-bold ${stat.mono ? "font-mono" : ""}`}>
                  {stat.value}
                </div>
                {stat.subtext && (
                  <p className="text-xs text-muted-foreground mt-2">{stat.subtext}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Tasks Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Today's Challenges</h2>
              <button
                onClick={() => setShowTaskModal(true)}
                className="inline-flex items-center gap-2 rounded-full gradient-amber px-5 py-2.5 text-sm font-semibold shadow-brand transition-transform hover:scale-[1.03] text-white"
              >
                <Plus size={18} /> New
              </button>
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="rounded-2xl glass border border-border p-8 text-center">
                  <p className="text-muted-foreground">
                    No challenges yet. Create one to get started! 🚀
                  </p>
                </div>
              ) : (
                sortedTasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-xl glass border border-border p-4 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={task.is_completed}
                        disabled={task.is_completed}
                        onChange={() => handleCompleteTask(task.id)}
                        className="mt-1 w-5 h-5 rounded accent-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className={`font-semibold ${task.is_completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {task.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {task.priority && (
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap border ${getPriorityColor(task.priority).bg} ${getPriorityColor(task.priority).text} ${getPriorityColor(task.priority).border}`}
                              >
                                {task.priority.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        )}
                        {task.due_date && (
                          <p className="text-xs text-muted-foreground mt-2">{formatDeadline(task.due_date, task.is_completed)}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Right Column - Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">🏆 Leaderboard</h2>
            <div className="rounded-2xl glass-strong border border-border p-6 ring-gradient shadow-2xl">
              <div className="space-y-2">
                {leaderboard.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Loading leaderboard...</p>
                ) : (
                  leaderboard.slice(0, 5).map((member, idx) => {
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.08 }}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          idx === 0
                            ? "bg-primary/10 border-primary/40 glow-amber"
                            : "bg-surface/30 border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold flex-shrink-0 ${
                              idx === 0
                                ? "gradient-amber text-white"
                                : "bg-surface-2 text-foreground"
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">{member.display_name}</p>
                            <p className="text-xs text-muted-foreground">
                              🔥 {member.streak_days} day streak
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="font-bold text-primary text-sm">{member.score}</p>
                          <p className="text-xs text-muted-foreground">pts</p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <button className="w-full rounded-lg glass px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
                  View Full Leaderboard
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Task Creation Modal */}
      {showTaskModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Create Challenge</h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Challenge Title
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g., Complete coding interview"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  placeholder="Add details..."
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary outline-none resize-none transition-colors"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as "high" | "medium" | "low")}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary outline-none transition-colors"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary outline-none transition-colors"
                  >
                    <option value="coding">Coding</option>
                    <option value="fitness">Fitness</option>
                    <option value="learning">Learning</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="flex-1 px-4 py-2.5 bg-surface hover:bg-surface-2 text-foreground rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  className="flex-1 px-4 py-2.5 gradient-amber text-white rounded-lg font-medium transition-transform hover:scale-[1.02]"
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Proof Submission Modal */}
      {showProofModal && selectedTask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Submit Proof</h3>
              <button
                onClick={() => setShowProofModal(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Challenge: <span className="font-semibold text-foreground">{selectedTask.title}</span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Add Image (optional)
                </label>
                <label className="w-full bg-surface border border-dashed border-border rounded-lg px-4 py-6 text-center cursor-pointer hover:border-primary/50 transition-colors group">
                  <Upload
                    size={24}
                    className="mx-auto text-muted-foreground group-hover:text-primary transition-colors mb-2"
                  />
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
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary outline-none resize-none transition-colors"
                  rows={4}
                />
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                <p className="text-sm text-primary font-medium">✓ +15 XP upon submission</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowProofModal(false)}
                  className="flex-1 px-4 py-2.5 bg-surface hover:bg-surface-2 text-foreground rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitProof}
                  className="flex-1 px-4 py-2.5 gradient-amber text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <Send size={16} /> Submit
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
