/*
  # Initial Schema Setup for SmaRta AI Notes

  1. New Tables
    - `profiles` - User profile information
    - `notes` - Main notes table with AI features
    - `note_tags` - Tags for notes
    - `note_attachments` - File attachments for notes
    - `ai_summaries` - AI-generated summaries
    - `chat_sessions` - AI chat sessions
    - `chat_messages` - Individual chat messages
    - `user_settings` - User preferences and settings
    - `sync_logs` - Cloud sync tracking
    - `integrations` - External service integrations

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Secure file upload policies

  3. Features
    - Full-text search capabilities
    - AI processing tracking
    - Real-time collaboration support
    - Comprehensive audit logging
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  subscription_tier text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  subscription_expires_at timestamptz,
  storage_used bigint DEFAULT 0,
  storage_limit bigint DEFAULT 5368709120, -- 5GB default
  ai_credits_used integer DEFAULT 0,
  ai_credits_limit integer DEFAULT 1000,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text,
  content_type text DEFAULT 'text' CHECK (content_type IN ('text', 'markdown', 'rich_text')),
  note_type text DEFAULT 'text' CHECK (note_type IN ('text', 'audio', 'video', 'image', 'document', 'meeting')),
  category text DEFAULT 'personal',
  is_starred boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  is_encrypted boolean DEFAULT false,
  encryption_key_id text,
  file_url text,
  file_size bigint,
  file_type text,
  transcription text,
  ai_summary text,
  ai_tags text[],
  search_vector tsvector,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Note tags table
CREATE TABLE IF NOT EXISTS note_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  note_id uuid REFERENCES notes(id) ON DELETE CASCADE NOT NULL,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(note_id, tag)
);

-- Note attachments table
CREATE TABLE IF NOT EXISTS note_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id uuid REFERENCES notes(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size bigint NOT NULL,
  file_type text NOT NULL,
  is_processed boolean DEFAULT false,
  processing_status text DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- AI summaries table
CREATE TABLE IF NOT EXISTS ai_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id uuid REFERENCES notes(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  summary_type text DEFAULT 'auto' CHECK (summary_type IN ('auto', 'manual', 'meeting', 'key_points')),
  summary_text text NOT NULL,
  confidence_score float,
  ai_model text DEFAULT 'gpt-4',
  processing_time_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Chat sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text DEFAULT 'New Chat',
  context_notes uuid[],
  ai_model text DEFAULT 'gpt-4',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message_type text NOT NULL CHECK (message_type IN ('user', 'assistant')),
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  theme text DEFAULT 'dark' CHECK (theme IN ('light', 'dark', 'system')),
  language text DEFAULT 'en',
  font_size text DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large')),
  font_style text DEFAULT 'inter',
  default_view text DEFAULT 'grid' CHECK (default_view IN ('list', 'grid', 'timeline')),
  startup_page text DEFAULT 'dashboard',
  auto_save_interval integer DEFAULT 30,
  enable_ai_suggestions boolean DEFAULT true,
  auto_tag_detection boolean DEFAULT true,
  markdown_mode boolean DEFAULT false,
  spell_check boolean DEFAULT true,
  export_format text DEFAULT 'pdf',
  biometric_lock boolean DEFAULT false,
  pin_lock boolean DEFAULT false,
  end_to_end_encryption boolean DEFAULT true,
  session_timeout integer DEFAULT 60,
  cloud_sync boolean DEFAULT true,
  cloud_provider text DEFAULT 'internal',
  offline_mode boolean DEFAULT false,
  backup_frequency text DEFAULT 'daily',
  ai_chat_enabled boolean DEFAULT true,
  auto_summarization boolean DEFAULT true,
  meeting_transcription boolean DEFAULT true,
  follow_up_suggestions boolean DEFAULT true,
  ai_model text DEFAULT 'gpt-4',
  settings_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sync logs table
CREATE TABLE IF NOT EXISTS sync_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  sync_type text NOT NULL CHECK (sync_type IN ('upload', 'download', 'conflict_resolution')),
  provider text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  items_synced integer DEFAULT 0,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_name text NOT NULL,
  service_type text NOT NULL CHECK (service_type IN ('storage', 'calendar', 'productivity', 'automation')),
  is_connected boolean DEFAULT false,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  configuration jsonb DEFAULT '{}',
  last_sync_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, service_name)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_search_vector ON notes USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_notes_category ON notes(category);
CREATE INDEX IF NOT EXISTS idx_notes_is_starred ON notes(is_starred);
CREATE INDEX IF NOT EXISTS idx_notes_is_archived ON notes(is_archived);

CREATE INDEX IF NOT EXISTS idx_note_tags_user_id ON note_tags(user_id);
CREATE INDEX IF NOT EXISTS idx_note_tags_note_id ON note_tags(note_id);
CREATE INDEX IF NOT EXISTS idx_note_tags_tag ON note_tags(tag);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);

CREATE INDEX IF NOT EXISTS idx_sync_logs_user_id ON sync_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_logs_created_at ON sync_logs(created_at DESC);

-- Create full-text search function
CREATE OR REPLACE FUNCTION update_notes_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.content, '') || ' ' || 
    COALESCE(NEW.transcription, '') || ' ' ||
    COALESCE(array_to_string(NEW.ai_tags, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for search vector updates
DROP TRIGGER IF EXISTS update_notes_search_vector_trigger ON notes;
CREATE TRIGGER update_notes_search_vector_trigger
  BEFORE INSERT OR UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_notes_search_vector();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE note_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE note_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Notes policies
CREATE POLICY "Users can view own notes"
  ON notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Note tags policies
CREATE POLICY "Users can manage own note tags"
  ON note_tags FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Note attachments policies
CREATE POLICY "Users can manage own note attachments"
  ON note_attachments FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- AI summaries policies
CREATE POLICY "Users can view own AI summaries"
  ON ai_summaries FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Chat sessions policies
CREATE POLICY "Users can manage own chat sessions"
  ON chat_sessions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can manage own chat messages"
  ON chat_messages FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- User settings policies
CREATE POLICY "Users can manage own settings"
  ON user_settings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Sync logs policies
CREATE POLICY "Users can view own sync logs"
  ON sync_logs FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Integrations policies
CREATE POLICY "Users can manage own integrations"
  ON integrations FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('notes-attachments', 'notes-attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload their own files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'notes-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'notes-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'notes-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'notes-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);