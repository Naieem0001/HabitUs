import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useReminders } from '../../hooks/useReminders';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function ReminderBell() {
  const { user } = useAuth();
  const { pendingCount, reminders, markAsSeen } = useReminders(user?.id ?? null);
  const [open, setOpen] = useState(false);

  const handleDismiss = async (id: string) => {
    await markAsSeen(id);
    toast.success('Dismissed');
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} aria-label="Reminders" className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-muted-foreground hover:text-foreground transition-colors">
        <Bell className="h-4 w-4" />
        {pendingCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-black">{pendingCount}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg border border-white/6 bg-[#0b1220] p-2 shadow-lg">
          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Upcoming Reminders</div>
          <div className="max-h-64 overflow-auto">
            {reminders.length === 0 && <div className="p-3 text-sm text-muted-foreground">No reminders</div>}
            {reminders.map(r => (
              <div key={r.id} className="flex items-start gap-2 border-t border-white/4 px-3 py-2">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground truncate">{r.title || r.message}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.message}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{format(new Date(r.remind_at), 'PPpp')}</div>
                </div>
                <div className="flex items-start gap-2">
                  <button onClick={() => handleDismiss(r.id)} className="text-xs text-muted-foreground hover:text-foreground">Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
