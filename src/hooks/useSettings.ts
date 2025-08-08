import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { useAuth } from './useAuth';

interface UserSettings {
  theme: string;
  language: string;
  font_size: string;
  font_style: string;
  default_view: string;
  startup_page: string;
  auto_save_interval: number;
  enable_ai_suggestions: boolean;
  auto_tag_detection: boolean;
  markdown_mode: boolean;
  spell_check: boolean;
  export_format: string;
  biometric_lock: boolean;
  pin_lock: boolean;
  end_to_end_encryption: boolean;
  session_timeout: number;
  cloud_sync: boolean;
  cloud_provider: string;
  offline_mode: boolean;
  backup_frequency: string;
  ai_chat_enabled: boolean;
  auto_summarization: boolean;
  meeting_transcription: boolean;
  follow_up_suggestions: boolean;
  ai_model: string;
  settings_data: any;
}

const defaultSettings: UserSettings = {
  theme: 'dark',
  language: 'en',
  font_size: 'medium',
  font_style: 'inter',
  default_view: 'grid',
  startup_page: 'dashboard',
  auto_save_interval: 30,
  enable_ai_suggestions: true,
  auto_tag_detection: true,
  markdown_mode: false,
  spell_check: true,
  export_format: 'pdf',
  biometric_lock: false,
  pin_lock: false,
  end_to_end_encryption: true,
  session_timeout: 60,
  cloud_sync: true,
  cloud_provider: 'internal',
  offline_mode: false,
  backup_frequency: 'daily',
  ai_chat_enabled: true,
  auto_summarization: true,
  meeting_transcription: true,
  follow_up_suggestions: true,
  ai_model: 'gpt-4',
  settings_data: {}
};

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await db.settings.get(user.id);
      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettings({ ...defaultSettings, ...data });
      } else {
        // Create default settings for new user
        const { data: newSettings, error: createError } = await db.settings.upsert({
          user_id: user.id,
          ...defaultSettings
        });
        if (createError) throw createError;
        setSettings({ ...defaultSettings, ...newSettings });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, [user]);

  const updateSetting = async <K extends keyof UserSettings>(
    key: K, 
    value: UserSettings[K]
  ) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const updatedSettings = { ...settings, [key]: value };
      
      const { data, error } = await db.settings.upsert({
        user_id: user.id,
        ...updatedSettings
      });
      
      if (error) throw error;

      setSettings(updatedSettings);
      
      // Apply settings immediately
      applySettings(key, value);
      
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  const updateMultipleSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const updatedSettings = { ...settings, ...updates };
      
      const { data, error } = await db.settings.upsert({
        user_id: user.id,
        ...updatedSettings
      });
      
      if (error) throw error;

      setSettings(updatedSettings);
      
      // Apply all settings
      Object.entries(updates).forEach(([key, value]) => {
        applySettings(key as keyof UserSettings, value);
      });
      
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  };

  const applySettings = (key: keyof UserSettings, value: any) => {
    switch (key) {
      case 'theme':
        applyTheme(value);
        break;
      case 'font_size':
      case 'font_style':
        applyFontSettings();
        break;
      case 'auto_save_interval':
        setupAutoSave(value);
        break;
      case 'session_timeout':
        setupSessionTimeout(value);
        break;
    }
  };

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
      root.classList.toggle('light', !prefersDark);
    }
  };

  const applyFontSettings = () => {
    const root = document.documentElement;
    
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    
    const fontFamilyMap = {
      inter: 'Inter, sans-serif',
      roboto: 'Roboto, sans-serif',
      opensans: 'Open Sans, sans-serif',
      poppins: 'Poppins, sans-serif'
    };
    
    root.style.fontSize = fontSizeMap[settings.font_size as keyof typeof fontSizeMap];
    root.style.fontFamily = fontFamilyMap[settings.font_style as keyof typeof fontFamilyMap];
  };

  const setupAutoSave = (interval: number) => {
    // Clear existing interval
    const existingInterval = localStorage.getItem('autoSaveInterval');
    if (existingInterval) {
      clearInterval(parseInt(existingInterval));
    }
    
    // Set new interval
    const newInterval = setInterval(() => {
      // Trigger auto-save event
      window.dispatchEvent(new CustomEvent('autoSave'));
    }, interval * 1000);
    
    localStorage.setItem('autoSaveInterval', newInterval.toString());
  };

  const setupSessionTimeout = (timeout: number) => {
    // Clear existing timeout
    const existingTimeout = localStorage.getItem('sessionTimeout');
    if (existingTimeout) {
      clearTimeout(parseInt(existingTimeout));
    }
    
    if (timeout > 0) {
      // Set new timeout
      const newTimeout = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('sessionExpired'));
      }, timeout * 60 * 1000);
      
      localStorage.setItem('sessionTimeout', newTimeout.toString());
    }
  };

  // Apply settings on load
  useEffect(() => {
    if (!loading) {
      applyTheme(settings.theme);
      applyFontSettings();
      setupAutoSave(settings.auto_save_interval);
      setupSessionTimeout(settings.session_timeout);
    }
  }, [loading, settings]);

  return {
    settings,
    loading,
    error,
    updateSetting,
    updateMultipleSettings,
    refreshSettings: loadSettings
  };
}