import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers
export const db = {
  // Profile operations
  profiles: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      return { data, error };
    },

    create: async (profile: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single();
      return { data, error };
    },

    update: async (userId: string, updates: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      return { data, error };
    }
  },

  // Notes operations
  notes: {
    getAll: async (userId: string, filters?: any) => {
      let query = supabase
        .from('notes')
        .select(`
          *,
          note_tags(tag),
          ai_summaries(summary_text, summary_type, created_at)
        `)
        .eq('user_id', userId)
        .eq('is_archived', false)
        .order('updated_at', { ascending: false });

      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters?.starred) {
        query = query.eq('is_starred', true);
      }

      if (filters?.search) {
        query = query.textSearch('search_vector', filters.search);
      }

      const { data, error } = await query;
      return { data, error };
    },

    get: async (noteId: string) => {
      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          note_tags(tag),
          note_attachments(*),
          ai_summaries(*)
        `)
        .eq('id', noteId)
        .single();
      return { data, error };
    },

    create: async (note: any) => {
      const { data, error } = await supabase
        .from('notes')
        .insert(note)
        .select()
        .single();
      return { data, error };
    },

    update: async (noteId: string, updates: any) => {
      const { data, error } = await supabase
        .from('notes')
        .update(updates)
        .eq('id', noteId)
        .select()
        .single();
      return { data, error };
    },

    delete: async (noteId: string) => {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);
      return { error };
    },

    search: async (userId: string, query: string) => {
      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          note_tags(tag)
        `)
        .eq('user_id', userId)
        .textSearch('search_vector', query)
        .limit(20);
      return { data, error };
    }
  },

  // Tags operations
  tags: {
    getAll: async (userId: string) => {
      const { data, error } = await supabase
        .from('note_tags')
        .select('tag')
        .eq('user_id', userId)
        .order('tag');
      return { data, error };
    },

    add: async (noteId: string, userId: string, tag: string) => {
      const { data, error } = await supabase
        .from('note_tags')
        .insert({ note_id: noteId, user_id: userId, tag })
        .select()
        .single();
      return { data, error };
    },

    remove: async (noteId: string, tag: string) => {
      const { error } = await supabase
        .from('note_tags')
        .delete()
        .eq('note_id', noteId)
        .eq('tag', tag);
      return { error };
    }
  },

  // Chat operations
  chat: {
    getSessions: async (userId: string) => {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('updated_at', { ascending: false });
      return { data, error };
    },

    createSession: async (session: any) => {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert(session)
        .select()
        .single();
      return { data, error };
    },

    getMessages: async (sessionId: string) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
      return { data, error };
    },

    addMessage: async (message: any) => {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert(message)
        .select()
        .single();
      return { data, error };
    }
  },

  // Settings operations
  settings: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();
      return { data, error };
    },

    upsert: async (settings: any) => {
      const { data, error } = await supabase
        .from('user_settings')
        .upsert(settings)
        .select()
        .single();
      return { data, error };
    }
  },

  // File operations
  files: {
    upload: async (file: File, path: string) => {
      const { data, error } = await supabase.storage
        .from('notes-attachments')
        .upload(path, file);
      return { data, error };
    },

    getUrl: async (path: string) => {
      const { data } = supabase.storage
        .from('notes-attachments')
        .getPublicUrl(path);
      return data.publicUrl;
    },

    delete: async (path: string) => {
      const { error } = await supabase.storage
        .from('notes-attachments')
        .remove([path]);
      return { error };
    }
  }
};

// Real-time subscriptions
export const realtime = {
  subscribeToNotes: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('notes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notes',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  },

  subscribeToChatMessages: (sessionId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`
        },
        callback
      )
      .subscribe();
  }
};