import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';

export interface Reminder {
  id: string;
  user_id: string;
  task_id?: string | null;
  title: string;
  message: string;
  remind_at: string; // ISO
  is_sent: boolean;
  created_at: string;
}

export function useReminders(userId: string | null) {
  const [pendingCount, setPendingCount] = useState(0);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const pollingRef = useRef<number | null>(null);

  const fetchPending = useCallback(async () => {
    if (!userId) return;
    try {
      const { data } = await supabase
        .from<Reminder>('reminders')
        .select('*')
        .eq('user_id', userId)
        .eq('is_sent', false)
        .order('remind_at', { ascending: true });
      if (data) {
        setReminders(data);
        setPendingCount(data.length);
      }
    } catch (e) {
      // ignore
    }
  }, [userId]);

  useEffect(() => {
    fetchPending();
    // poll every 60s
    if (pollingRef.current) window.clearInterval(pollingRef.current);
    if (userId) pollingRef.current = window.setInterval(fetchPending, 60000);
    return () => { if (pollingRef.current) window.clearInterval(pollingRef.current); };
  }, [userId, fetchPending]);

  // check for due reminders and send toast/update is_sent
  useEffect(() => {
    if (!userId) return;
    let mounted = true;
    (async () => {
      try {
        const nowIso = new Date().toISOString();
        const { data } = await supabase
          .from<Reminder>('reminders')
          .select('*')
          .eq('user_id', userId)
          .eq('is_sent', false)
          .lte('remind_at', nowIso);
        if (!mounted || !data || data.length === 0) return;
        for (const r of data) {
          toast(
            `⏰ Reminder: ${r.message}`,
            { id: `reminder-${r.id}` }
          );
          // mark sent
          await supabase.from('reminders').update({ is_sent: true }).eq('id', r.id);
        }
        // refresh pending list
        fetchPending();
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, [userId, fetchPending]);

  const createReminder = async (payload: {
    user_id: string;
    task_id?: string | null;
    title: string;
    message: string;
    remind_at: string;
  }) => {
    const { data, error } = await supabase.from('reminders').insert(payload).select().single();
    if (error) throw error;
    await fetchPending();
    return data as Reminder;
  };

  const markAsSeen = async (id: string) => {
    await supabase.from('reminders').update({ is_sent: true }).eq('id', id);
    await fetchPending();
  };

  return { pendingCount, reminders, createReminder, markAsSeen, refresh: fetchPending };
}
