/**
 * Immersive background with:
 * - Animated aurora/nebula gradient blobs
 * - Grid + dot pattern overlay
 * - Slow-rotating orbital rings
 * - Floating geometric accents
 * Tuned for the dark-first cosmic design system.
 */
export function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Primary aurora blob — violet */}
      <div
        className="absolute -top-64 -left-48 h-[700px] w-[700px] rounded-full opacity-50 blur-[160px] animate-blob"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99, 102, 241, 0.55), transparent 70%)",
        }}
      />

      {/* Secondary blob — cyan bottom-right */}
      <div
        className="absolute -bottom-48 -right-48 h-[650px] w-[650px] rounded-full opacity-40 blur-[150px] animate-blob"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56, 189, 248, 0.45), transparent 70%)",
          animationDelay: "-8s",
        }}
      />

      {/* Tertiary blob — violet-pink, center */}
      <div
        className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[180px] animate-blob"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139, 92, 246, 0.4), transparent 70%)",
          animationDelay: "-15s",
        }}
      />

      {/* Accent blob — neon green, top-right */}
      <div
        className="absolute -top-16 right-1/4 h-[300px] w-[300px] rounded-full opacity-20 blur-[120px] animate-blob"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74, 222, 128, 0.5), transparent 70%)",
          animationDelay: "-4s",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Dot overlay — subtle */}
      <div className="absolute inset-0 dot-bg opacity-30" />

      {/* Large orbital ring — top right */}
      <svg
        className="absolute -right-48 -top-24 h-[600px] w-[600px] animate-spin-slow opacity-25"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle
          cx="150"
          cy="150"
          r="148"
          stroke="url(#ringGrad1)"
          strokeWidth="0.5"
          strokeDasharray="3 8"
        />
        <circle
          cx="150"
          cy="150"
          r="110"
          stroke="url(#ringGrad1)"
          strokeWidth="0.4"
          strokeDasharray="2 6"
        />
        <circle
          cx="150"
          cy="150"
          r="72"
          stroke="url(#ringGrad1)"
          strokeWidth="0.3"
          strokeDasharray="1 5"
        />
        <defs>
          <linearGradient id="ringGrad1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Smaller counter-rotating ring — bottom left */}
      <svg
        className="absolute -left-32 bottom-0 h-[400px] w-[400px] animate-spin-slower opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle
          cx="100"
          cy="100"
          r="98"
          stroke="url(#ringGrad2)"
          strokeWidth="0.5"
          strokeDasharray="3 7"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          stroke="url(#ringGrad2)"
          strokeWidth="0.3"
          strokeDasharray="2 5"
        />
        <defs>
          <linearGradient id="ringGrad2" x1="1" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating diamond accent — mid-right */}
      <div
        className="absolute right-[15%] top-[40%] h-4 w-4 rotate-45 opacity-40 animate-float-sm"
        style={{ background: "linear-gradient(135deg, #818cf8, #38bdf8)", boxShadow: "0 0 16px rgba(129,140,248,0.6)" }}
      />
      {/* Floating square — left */}
      <div
        className="absolute left-[8%] top-[30%] h-3 w-3 rotate-12 opacity-30 animate-float"
        style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)", boxShadow: "0 0 12px rgba(74,222,128,0.5)", animationDelay: "-2s" }}
      />
      {/* Small dot cluster */}
      <div className="absolute right-[30%] bottom-[20%] h-2 w-2 rounded-full opacity-50 animate-pulse-glow"
        style={{ background: "#a78bfa", boxShadow: "0 0 10px rgba(167,139,250,0.6)" }}
      />

      {/* Noise texture for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
