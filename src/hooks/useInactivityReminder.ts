import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

/**
 * If tasksCompleted doesn't change for `timeoutMs` while the user is active,
 * show a nudge toast.
 */
export function useInactivityReminder(opts: { userId: string | null; name?: string; tasksCompleted: number; timeoutMs?: number }) {
  const { userId, name = 'friend', tasksCompleted, timeoutMs = 30 * 60 * 1000 } = opts;
  const prevRef = useRef<number>(tasksCompleted);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // reset timer if tasksCompleted increased
    if (prevRef.current !== tasksCompleted) {
      prevRef.current = tasksCompleted;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      // start new timer
      timerRef.current = window.setTimeout(() => {
        toast(`Hey ${name}, your streak is at risk! 🔥 Complete a task!`);
      }, timeoutMs);
    }
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current); };
  }, [tasksCompleted, name, timeoutMs]);
}
