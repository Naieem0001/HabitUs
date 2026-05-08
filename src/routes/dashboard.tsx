import { createFileRoute, redirect } from '@tanstack/react-router';
import { Trophy, Flame, CheckCircle, LogOut, User as UserIcon } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';

// Use TanStack's beforeLoad for route protection
export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    // If no session, check if we are currently in the middle of an auth redirect
    // (Supabase puts the token in the # hash)
    const hasHashToken = window.location.hash.includes('access_token');

    if (!session && !hasHashToken) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#0F1117] font-sans text-[#F5F5F5]">
      {/* Dashboard Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#1A1F2E] border-b border-white/5 w-full">
        <div className="flex items-center gap-2">
          <a href="/dashboard" className="text-xl font-bold flex items-center gap-1 text-white tracking-wide">
            Habit<span className="text-[#FF6B35]">Us</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm font-medium text-[#F5F5F5]">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full border border-white/10"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#232838] flex items-center justify-center border border-white/10">
                  <UserIcon size={16} className="text-[#888888]" />
                </div>
              )}
              <button 
                onClick={handleSignOut}
                className="p-2 text-[#888888] hover:text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-lg transition-colors ml-2 cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-wide mb-2">
            Welcome back, <span className="text-[#FF6B35]">{user?.user_metadata?.full_name?.split(' ')[0] || 'Challenger'}</span>.
          </h1>
          <p className="text-[#888888]">Your squad is currently ranking #4. Keep the streak alive!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1A1F2E] border border-white/5 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center border border-[#FF6B35]/30">
                <Flame size={24} className="text-[#FF6B35]" />
              </div>
              <div>
                <div className="text-sm text-[#888888] font-medium uppercase tracking-wider">Current Streak</div>
                <div className="text-2xl font-bold font-mono">0 Days</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1F2E] border border-white/5 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFD166]/20 flex items-center justify-center border border-[#FFD166]/30">
                <Trophy size={24} className="text-[#FFD166]" />
              </div>
              <div>
                <div className="text-sm text-[#888888] font-medium uppercase tracking-wider">Total XP</div>
                <div className="text-2xl font-bold font-mono">0 XP</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1F2E] border border-white/5 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#34D399]/20 flex items-center justify-center border border-[#34D399]/30">
                <CheckCircle size={24} className="text-[#34D399]" />
              </div>
              <div>
                <div className="text-sm text-[#888888] font-medium uppercase tracking-wider">Tasks Done</div>
                <div className="text-2xl font-bold font-mono">0</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1F2E] border border-white/5 rounded-2xl p-8 shadow-lg text-center border-dashed">
          <p className="text-[#888888] mb-4">Leaderboard and challenges coming soon...</p>
        </div>
      </main>
    </div>
  );
}
