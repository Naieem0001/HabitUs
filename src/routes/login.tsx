import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Zap, ArrowLeft, Flame, Crown, TrendingUp, Star, Shield, Target, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export const Route = createFileRoute("/login")({
  component: Login,
});

const quotes = [
  { text: "Motivation gets you going, but habit gets you there.", author: "Jim Ryun" },
  { text: "We are what we repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
];

const typewriterLines = [
  "Build habits publicly. Earn XP.",
  "Climb the leaderboard.",
  "Your squad is watching.",
  "Show up. Every. Single. Day.",
];

/** Typewriter hook — types then erases each string in sequence */
function useTypewriter(lines: string[], typingSpeed = 55, erasingSpeed = 30, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [erasing, setErasing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = lines[lineIdx];
    if (!erasing) {
      if (charIdx < current.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, typingSpeed);
      } else {
        timerRef.current = setTimeout(() => setErasing(true), pauseMs);
      }
    } else {
      if (charIdx > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, erasingSpeed);
      } else {
        setErasing(false);
        setLineIdx((i) => (i + 1) % lines.length);
      }
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [charIdx, erasing, lineIdx, lines, typingSpeed, erasingSpeed, pauseMs]);

  return displayed;
}

function Login() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  // Rotating quote state
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIdx((i) => (i + 1) % quotes.length);
        setQuoteFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Typewriter
  const typewriterText = useTypewriter(typewriterLines);

  return (
    <div className="relative min-h-screen bg-[#080b14] text-foreground font-sans overflow-hidden flex flex-col md:flex-row">

      {/* ════════════════════════════════════════════════
          LEFT PANEL — Branding, graphics, quotes
      ════════════════════════════════════════════════ */}
      <div className="relative flex-1 min-h-[45vh] md:min-h-screen overflow-hidden flex flex-col justify-between p-8 md:p-12">

        {/* Background blobs for left panel */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Primary violet blob */}
          <div
            className="absolute -top-48 -left-32 h-[600px] w-[600px] rounded-full opacity-60 blur-[140px]"
            style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.55), transparent 70%)" }}
          />
          {/* Cyan blob bottom */}
          <div
            className="absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full opacity-40 blur-[130px]"
            style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.45), transparent 70%)" }}
          />
          {/* Green accent */}
          <div
            className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full opacity-25 blur-[100px]"
            style={{ background: "radial-gradient(closest-side, rgba(74,222,128,0.5), transparent 70%)" }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-100" />
          {/* Dot overlay */}
          <div className="absolute inset-0 dot-bg opacity-40" />

          {/* Orbital ring — top-right of left panel */}
          <svg
            className="absolute -right-24 -top-16 h-[420px] w-[420px] animate-spin-slow opacity-20"
            viewBox="0 0 300 300" fill="none"
          >
            <circle cx="150" cy="150" r="148" stroke="url(#lRing1)" strokeWidth="0.6" strokeDasharray="3 8" />
            <circle cx="150" cy="150" r="110" stroke="url(#lRing1)" strokeWidth="0.4" strokeDasharray="2 6" />
            <circle cx="150" cy="150" r="70"  stroke="url(#lRing1)" strokeWidth="0.3" strokeDasharray="1 5" />
            <defs>
              <linearGradient id="lRing1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%"   stopColor="#818cf8" />
                <stop offset="50%"  stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Noise */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
          />
        </div>

        {/* Floating geometry */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* Diamond top-right */}
          <div
            className="absolute right-[18%] top-[12%] h-5 w-5 rotate-45 opacity-50 animate-float-sm"
            style={{ background: "linear-gradient(135deg,#818cf8,#38bdf8)", boxShadow: "0 0 20px rgba(129,140,248,0.7)" }}
          />
          {/* Square left-center */}
          <div
            className="absolute left-[10%] top-[50%] h-4 w-4 rotate-12 opacity-35 animate-float"
            style={{ background: "linear-gradient(135deg,#4ade80,#22d3ee)", boxShadow: "0 0 14px rgba(74,222,128,0.6)", animationDelay: "-3s" }}
          />
          {/* Small neon dot */}
          <div
            className="absolute left-[30%] bottom-[25%] h-2.5 w-2.5 rounded-full opacity-60 animate-pulse-glow"
            style={{ background: "#f472b6", boxShadow: "0 0 12px rgba(244,114,182,0.7)" }}
          />
          {/* Triangle-ish accent */}
          <div
            className="absolute right-[12%] bottom-[30%] h-3 w-3 rotate-[30deg] opacity-40 animate-float-sm"
            style={{ background: "linear-gradient(135deg,#fbbf24,#f472b6)", boxShadow: "0 0 10px rgba(251,191,36,0.5)", animationDelay: "-1s" }}
          />
          {/* Horizontal neon line */}
          <div
            className="absolute left-[8%] bottom-[18%] h-px w-24 opacity-30"
            style={{ background: "linear-gradient(90deg, transparent, #818cf8, transparent)" }}
          />
          <div
            className="absolute right-[10%] top-[38%] h-px w-16 opacity-20"
            style={{ background: "linear-gradient(90deg, transparent, #38bdf8, transparent)" }}
          />
        </div>

        {/* ── Back arrow — top-left, standard auth page nav ── */}
        <Link
          to="/"
          aria-label="Back to home"
          className="fixed top-5 left-5 z-50 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
          style={{
            background: "rgba(14,19,37,0.7)",
            border: "1px solid rgba(129,140,248,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        {/* ── Central branding block ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-8">

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-4">
            Don't break<br />
            <span className="text-gradient">the streak.</span>
          </h1>

          <p className="text-base text-muted-foreground max-w-xs mb-10 leading-relaxed min-h-[1.75rem]">
            {typewriterText}<span className="animate-cursor border-r-2 border-primary ml-0.5 inline-block">&nbsp;</span>
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { icon: <Shield className="h-3 w-3" />, label: "Proof-based tracking" },
              { icon: <Crown className="h-3 w-3" />, label: "Live leaderboards" },
              { icon: <Target className="h-3 w-3" />, label: "Daily challenges" },
              { icon: <Sparkles className="h-3 w-3" />, label: "XP & levels" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-primary"
                style={{ background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.25)" }}
              >
                {chip.icon}
                {chip.label}
              </span>
            ))}
          </div>

          {/* Rotating quote card */}
          <div
            className="rounded-2xl p-5 max-w-sm"
            style={{
              background: "linear-gradient(160deg, rgba(14,19,37,0.7), rgba(20,25,41,0.5))",
              border: "1px solid rgba(129,140,248,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="mb-3 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 text-[var(--neon-amber)] fill-current" />
              ))}
            </div>
            <div
              style={{
                opacity: quoteFade ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <p className="text-sm leading-relaxed text-foreground/90 italic mb-3">
                &ldquo;{quotes[quoteIdx].text}&rdquo;
              </p>
              <p className="text-[11px] font-semibold text-primary">— {quotes[quoteIdx].author}</p>
            </div>
          </div>
        </div>

        {/* ── Stats row at bottom ── */}
        <div className="relative z-10 flex gap-6">
          {[
            { icon: <Flame className="h-4 w-4 text-[var(--neon-amber)]" />, val: "47k+", label: "Active streaks" },
            { icon: <Crown className="h-4 w-4 text-[var(--primary)]" />, val: "1,200+", label: "Groups" },
            { icon: <TrendingUp className="h-4 w-4 text-[var(--neon-green)]" />, val: "2M+", label: "Tasks done" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              {s.icon}
              <div>
                <div className="text-sm font-bold text-foreground">{s.val}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider line (desktop only) */}
      <div
        className="hidden md:block w-px self-stretch my-8"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(129,140,248,0.3), transparent)" }}
      />

      {/* ════════════════════════════════════════════════
          RIGHT PANEL — Auth form
      ════════════════════════════════════════════════ */}
      <div
        className="relative flex w-full md:w-[480px] lg:w-[520px] flex-col items-center justify-center p-8 md:p-12"
        style={{
          background: "linear-gradient(160deg, rgba(14,19,37,0.75), rgba(8,11,20,0.9))",
          backdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(129,140,248,0.08)",
        }}
      >
        {/* Subtle glow behind card */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.12), transparent 70%)" }}
        />

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl gradient-brand shadow-brand">
              <Zap className="h-8 w-8 text-white" fill="white" />
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Welcome to <span className="text-gradient">HabitUs</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to track habits, earn XP and climb the leaderboard.
            </p>
          </div>

          {/* Auth buttons */}
          <div className="space-y-3">
            {/* Google */}
            <button
              id="btn-google-login"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-foreground transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            {/* GitHub */}
            <button
              id="btn-github-login"
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-foreground transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            >
              <svg className="h-5 w-5 shrink-0 fill-current text-foreground" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-[11px] text-muted-foreground">secure OAuth login</span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {[
              { icon: <Shield className="h-3.5 w-3.5" />, label: "No password" },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Instant access" },
              { icon: <Star className="h-3.5 w-3.5 fill-current" />, label: "Free forever" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="text-primary">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="text-center text-[11px] text-muted-foreground">
            By continuing you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground">Terms</a>
            {" & "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
