/**
 * Subtle decorative background graphics.
 * - Soft animated gradient blobs
 * - Faint dot pattern overlay
 * - Slow rotating ring
 * Tuned to feel premium in both light and dark themes.
 */
export function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft brand blobs */}
      <div
        className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full opacity-60 blur-[140px] animate-blob"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--brand-shadow) / 0.35), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-50 blur-[160px] animate-blob"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.7 0.18 285 / 0.30), transparent 70%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute bottom-[-200px] left-1/4 h-[500px] w-[500px] rounded-full opacity-40 blur-[140px] animate-blob"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.16 200 / 0.30), transparent 70%)",
          animationDelay: "-12s",
        }}
      />

      {/* Dot pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dots)"
          className="text-foreground"
        />
      </svg>

      {/* Slow rotating ring (top right) */}
      <svg
        className="absolute -right-32 top-10 h-[420px] w-[420px] animate-spin-slow opacity-30"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle
          cx="100"
          cy="100"
          r="98"
          stroke="url(#ringGrad)"
          strokeWidth="0.6"
          strokeDasharray="2 6"
        />
        <circle
          cx="100"
          cy="100"
          r="74"
          stroke="url(#ringGrad)"
          strokeWidth="0.4"
          strokeDasharray="1 5"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-from)" />
            <stop offset="100%" stopColor="var(--brand-to)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
