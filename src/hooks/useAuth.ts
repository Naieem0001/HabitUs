import { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        upsertUser(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        upsertUser(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const upsertUser = async (user: User) => {
    try {
      // We upsert into our public.users table to track game stats
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'New User',
          avatar_url: user.user_metadata?.avatar_url,
          // Other defaults (xp, level, etc.) are handled by the database schema
        }, { onConflict: 'id' });

      if (error) {
        console.error('Error upserting user:', error);
      }
    } catch (err) {
      console.error('Unexpected error during user upsert:', err);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, session, signOut, loading };
}
