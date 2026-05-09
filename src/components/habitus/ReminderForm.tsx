import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';

type TaskOption = { id: string; title: string };

export default function ReminderForm({
  userId,
  tasks = [],
  onSaved = () => {},
  onClose = () => {},
}: {
  userId: string | null;
  tasks?: TaskOption[];
  onSaved?: (id: string) => void;
  onClose?: () => void;
}) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [when, setWhen] = useState('');
  const [taskId, setTaskId] = useState<string | 'none'>('none');
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!userId) return toast.error('Not signed in');
    if (!message.trim() || !when) return toast.error('Please set message and time');
    setSaving(true);
    try {
      const payload = {
        user_id: userId,
        task_id: taskId === 'none' ? null : taskId,
        title: title || message.slice(0, 40),
        message,
        remind_at: new Date(when).toISOString(),
      };
      const { data, error } = await supabase.from('reminders').insert(payload).select().single();
      if (error) throw error;
      toast.success('Reminder saved');
      onSaved(data.id);
      onClose();
    } catch (e) {
      console.error(e);
      toast.error('Failed to save reminder');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e1325] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">Set Reminder</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">Close</button>
      </div>

      <div className="space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title (optional)" className="w-full rounded-lg bg-white/4 px-3 py-2 text-sm outline-none" />
        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Reminder message" className="w-full rounded-lg bg-white/4 px-3 py-2 text-sm outline-none" rows={3} />
        <input type="datetime-local" value={when} onChange={e=>setWhen(e.target.value)} className="w-full rounded-lg bg-white/4 px-3 py-2 text-sm outline-none" />
        <select value={taskId} onChange={e=>setTaskId(e.target.value)} className="w-full rounded-lg bg-white/4 px-3 py-2 text-sm outline-none">
          <option value="none">Link to task (optional)</option>
          {tasks.map(t=> <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
        <div className="flex justify-end">
          <button onClick={save} disabled={saving} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold">{saving? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}
