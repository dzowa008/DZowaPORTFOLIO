import { useState, useEffect } from 'react';
import { db, realtime } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Note {
  id: string;
  title: string;
  content: string;
  note_type: string;
  category: string;
  is_starred: boolean;
  is_archived: boolean;
  file_url?: string;
  transcription?: string;
  ai_summary?: string;
  ai_tags?: string[];
  created_at: string;
  updated_at: string;
  note_tags?: { tag: string }[];
  ai_summaries?: any[];
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

interface NotesFilters {
  category?: string;
  starred?: boolean;
  search?: string;
}

export function useNotes(filters: NotesFilters = {}) {
  const { user } = useAuth();
  const [notesState, setNotesState] = useState<NotesState>({
    notes: [],
    loading: true,
    error: null
  });

  const loadNotes = async () => {
    if (!user) return;

    try {
      setNotesState(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await db.notes.getAll(user.id, filters);
      if (error) throw error;

      setNotesState({
        notes: data || [],
        loading: false,
        error: null
      });
    } catch (error: any) {
      setNotesState({
        notes: [],
        loading: false,
        error: error.message
      });
    }
  };

  useEffect(() => {
    loadNotes();
  }, [user, filters.category, filters.starred, filters.search]);

  useEffect(() => {
    if (!user) return;

    // Subscribe to real-time changes
    const subscription = realtime.subscribeToNotes(user.id, (payload) => {
      const { eventType, new: newRecord, old: oldRecord } = payload;

      setNotesState(prev => {
        let updatedNotes = [...prev.notes];

        switch (eventType) {
          case 'INSERT':
            updatedNotes.unshift(newRecord);
            break;
          case 'UPDATE':
            updatedNotes = updatedNotes.map(note => 
              note.id === newRecord.id ? { ...note, ...newRecord } : note
            );
            break;
          case 'DELETE':
            updatedNotes = updatedNotes.filter(note => note.id !== oldRecord.id);
            break;
        }

        return { ...prev, notes: updatedNotes };
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const createNote = async (noteData: Partial<Note>) => {
    if (!user) return { data: null, error: 'No user logged in' };

    try {
      const { data, error } = await db.notes.create({
        ...noteData,
        user_id: user.id
      });
      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  const updateNote = async (noteId: string, updates: Partial<Note>) => {
    try {
      const { data, error } = await db.notes.update(noteId, updates);
      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const { error } = await db.notes.delete(noteId);
      if (error) throw error;

      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const searchNotes = async (query: string) => {
    if (!user) return { data: [], error: 'No user logged in' };

    try {
      const { data, error } = await db.notes.search(user.id, query);
      if (error) throw error;

      return { data: data || [], error: null };
    } catch (error: any) {
      return { data: [], error: error.message };
    }
  };

  const addTag = async (noteId: string, tag: string) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await db.tags.add(noteId, user.id, tag);
      if (error) throw error;

      // Refresh notes to get updated tags
      await loadNotes();
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const removeTag = async (noteId: string, tag: string) => {
    try {
      const { error } = await db.tags.remove(noteId, tag);
      if (error) throw error;

      // Refresh notes to get updated tags
      await loadNotes();
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  return {
    ...notesState,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    addTag,
    removeTag,
    refreshNotes: loadNotes
  };
}