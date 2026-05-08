import { createFileRoute } from '@tanstack/react-router';
import { Flame, Github } from 'lucide-react';
import '../Login.css';
import { supabase } from '../lib/supabaseClient';
import { Home } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-background text-foreground font-sans">
        <a
          href="/"
          aria-label="Go home"
          className="absolute left-6 top-6 z-50 inline-flex items-center gap-4 text-foreground transition hover:opacity-80"
          >
          <Home className="h-5 w-5" />
          <span className="text-sm font-bold">Habit<span className="text-accent">Us</span></span>
        </a>
      {/* Left Side - Branding & Visuals */}
      <div className="flex-1 relative overflow-hidden flex flex-col justify-center p-12 lg:p-24 min-h-[50vh] md:min-h-screen border-b md:border-b-0 md:border-r border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>

        <div className="relative z-10 fade-in">
          <a href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-16 hover:opacity-80 transition-opacity">
            Habit<span className="text-[#FF6B35]">Us</span>
          </a>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6">
            Don't break<br/>
            <span className="text-[#FF6B35]">the streak.</span>
          </h1>
          
          <p className="text-xl text-[#888888] mb-12 max-w-md">
            Your squad is watching. Your streak is waiting.
          </p>

          <div className="inline-flex items-center gap-3 bg-[#1A1F2E]/80 backdrop-blur border border-white/10 rounded-2xl p-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-[#FF6B35]/20 flex items-center justify-center border border-[#FF6B35]/30">
              <Flame size={24} className="text-[#FF6B35]" />
            </div>
            <div>
              <div className="text-white font-mono font-bold text-lg">47,291</div>
              <div className="text-[#888888] text-xs uppercase tracking-wider font-semibold">streaks active right now</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 lg:left-24 text-[#888888] text-sm">
          New here? <span className="text-white font-medium">It's free.</span>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full md:w-[480px] lg:w-[560px] bg-[#0F1117] flex flex-col justify-center items-center p-8 lg:p-16 relative">
        <div className="w-full max-w-sm fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#1A1F2E] rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg border border-white/5">
              <Flame size={32} className="text-[#FF6B35]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Sign in to your squad</h2>
            <p className="text-[#888888]">Choose a provider to continue</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-[#1A1F2E] hover:bg-[#232838] border border-white/10 hover:border-[#FFD166]/50 text-white font-medium py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-3 group shadow-md cursor-pointer"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-[#888888] text-sm font-medium">— or —</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <button 
              onClick={handleGithubLogin}
              className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-white font-medium py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-3 group cursor-pointer"
            >
              <Github size={20} className="group-hover:scale-110 transition-transform" />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
