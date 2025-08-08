import { useState, useEffect } from 'react';
import { auth, db } from '../lib/supabase';
import type { User } from '../supabase/supabase-js';

interface AuthState {
  user: User | null;
  profile: any | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { user, error } = await auth.getCurrentUser();
        if (error) throw error;

        if (user) {
          // Get user profile
          const { data: profile, error: profileError } = await db.profiles.get(user.id);
          if (profileError && profileError.code !== 'PGRST116') { // Not found error
            throw profileError;
          }

          // Create profile if it doesn't exist
          if (!profile) {
            const { data: newProfile, error: createError } = await db.profiles.create({
              id: user.id,
              email: user.email!,
              full_name: user.user_metadata?.full_name || '',
              avatar_url: user.user_metadata?.avatar_url || null
            });
            if (createError) throw createError;
            
            setAuthState({
              user,
              profile: newProfile,
              loading: false,
              error: null
            });
          } else {
            setAuthState({
              user,
              profile,
              loading: false,
              error: null
            });
          }
        } else {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null
          });
        }
      } catch (error: any) {
        setAuthState({
          user: null,
          profile: null,
          loading: false,
          error: error.message
        });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const { data: profile, error } = await db.profiles.get(session.user.id);
          if (error && error.code !== 'PGRST116') throw error;

          setAuthState({
            user: session.user,
            profile: profile || null,
            loading: false,
            error: null
          });
        } catch (error: any) {
          setAuthState({
            user: session.user,
            profile: null,
            loading: false,
            error: error.message
          });
        }
      } else {
        setAuthState({
          user: null,
          profile: null,
          loading: false,
          error: null
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
      return { data: null, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await auth.signUp(email, password, userData);
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
      return { data: null, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { error } = await auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
    }
  };

  const updateProfile = async (updates: any) => {
    if (!authState.user) return { error: 'No user logged in' };

    try {
      const { data, error } = await db.profiles.update(authState.user.id, updates);
      if (error) throw error;

      setAuthState(prev => ({
        ...prev,
        profile: { ...prev.profile, ...updates }
      }));

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!authState.user
  };
}