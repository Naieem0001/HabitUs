import { ChevronLeft, ChevronRight, Flame, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* Generate statuses dynamically — only for days BEFORE today */
function buildStatus(year: number, month: number): Record<number, 'completed'|'missed'> {
  const today    = new Date();
  const todayDay = today.getDate();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // how many past days to fill (all if past month, up to yesterday if current)
  const fillUpTo = isCurrentMonth ? todayDay - 1 : daysInMonth;

  // fixed missed days pattern (sparse): roughly every 5th–7th day
  const missedPattern = new Set([3, 7, 10, 14, 18, 22]);

  const out: Record<number, 'completed'|'missed'> = {};
  for (let d = 1; d <= fillUpTo; d++) {
    out[d] = missedPattern.has(d) ? 'missed' : 'completed';
  }
  return out;
}


export function CalendarPage() {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = current.getFullYear();
  const month = current.getMonth();
  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const isToday = (d: number) =>
    today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;

  const STATUS   = buildStatus(year, month);
  const statVals  = Object.values(STATUS);
  const completed = statVals.filter(s => s === 'completed').length;
  const missed    = statVals.filter(s => s === 'missed').length;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <h2 className="font-display text-2xl font-extrabold mb-1">Calendar</h2>
      <p className="text-sm text-muted-foreground mb-6">Track your daily habit consistency.</p>

      {/* Stats strip */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { icon: <CheckCircle className="h-4 w-4 text-[var(--neon-green)]" />, label: "Completed", val: completed, color: "text-[var(--neon-green)]" },
          { icon: <XCircle    className="h-4 w-4 text-red-400" />,             label: "Missed",    val: missed,    color: "text-red-400" },
          { icon: <Flame      className="h-4 w-4 text-[var(--neon-amber)]" />, label: "Best Streak", val: "14 days", color: "text-[var(--neon-amber)]" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-white/6 bg-white/2 px-5 py-4 flex items-center gap-3">
            {s.icon}
            <div>
              <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
              <div className="text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar card */}
      <div className="rounded-2xl border border-white/6 bg-white/2 p-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <button onClick={prev} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-display text-lg font-bold">{MONTHS[month]} {year}</span>
          <button onClick={next} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="mb-2 grid grid-cols-7 text-center">
          {DAYS.map(d => (
            <div key={d} className="py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{d}</div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty leading cells */}
          {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}

          {/* Day cells */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day    = i + 1;
            const status    = STATUS[day];
            const todayCell = isToday(day);

            let cellStyle = 'bg-white/3 text-muted-foreground/40';
            if (todayCell)                  cellStyle = 'bg-primary text-white ring-2 ring-primary/50 shadow-lg';
            else if (status === 'completed') cellStyle = 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
            else if (status === 'missed')    cellStyle = 'bg-red-500/10 text-red-400 border border-red-500/25';

            return (
              <div
                key={day}
                className={`flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${cellStyle}`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 flex items-center gap-5 border-t border-white/5 pt-4">
          {[
            { color: "bg-[rgba(74,222,128,0.3)]", label: "Completed" },
            { color: "bg-red-500/30",             label: "Missed" },
            { color: "bg-primary",                label: "Today" },
            { color: "bg-white/8",                label: "Upcoming" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-sm ${l.color}`} />
              <span className="text-[11px] text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
