export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: string
          subscription_expires_at: string | null
          storage_used: number
          storage_limit: number
          ai_credits_used: number
          ai_credits_limit: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: string
          subscription_expires_at?: string | null
          storage_used?: number
          storage_limit?: number
          ai_credits_used?: number
          ai_credits_limit?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: string
          subscription_expires_at?: string | null
          storage_used?: number
          storage_limit?: number
          ai_credits_used?: number
          ai_credits_limit?: number
          created_at?: string
          updated_at?: string
        }
      }
      notes: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string | null
          content_type: string
          note_type: string
          category: string
          is_starred: boolean
          is_archived: boolean
          is_encrypted: boolean
          encryption_key_id: string | null
          file_url: string | null
          file_size: number | null
          file_type: string | null
          transcription: string | null
          ai_summary: string | null
          ai_tags: string[] | null
          search_vector: unknown | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content?: string | null
          content_type?: string
          note_type?: string
          category?: string
          is_starred?: boolean
          is_archived?: boolean
          is_encrypted?: boolean
          encryption_key_id?: string | null
          file_url?: string | null
          file_size?: number | null
          file_type?: string | null
          transcription?: string | null
          ai_summary?: string | null
          ai_tags?: string[] | null
          search_vector?: unknown | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string | null
          content_type?: string
          note_type?: string
          category?: string
          is_starred?: boolean
          is_archived?: boolean
          is_encrypted?: boolean
          encryption_key_id?: string | null
          file_url?: string | null
          file_size?: number | null
          file_type?: string | null
          transcription?: string | null
          ai_summary?: string | null
          ai_tags?: string[] | null
          search_vector?: unknown | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      note_tags: {
        Row: {
          id: string
          user_id: string
          note_id: string
          tag: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          note_id: string
          tag: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          note_id?: string
          tag?: string
          created_at?: string
        }
      }
      note_attachments: {
        Row: {
          id: string
          note_id: string
          user_id: string
          file_name: string
          file_url: string
          file_size: number
          file_type: string
          is_processed: boolean
          processing_status: string
          created_at: string
        }
        Insert: {
          id?: string
          note_id: string
          user_id: string
          file_name: string
          file_url: string
          file_size: number
          file_type: string
          is_processed?: boolean
          processing_status?: string
          created_at?: string
        }
        Update: {
          id?: string
          note_id?: string
          user_id?: string
          file_name?: string
          file_url?: string
          file_size?: number
          file_type?: string
          is_processed?: boolean
          processing_status?: string
          created_at?: string
        }
      }
      ai_summaries: {
        Row: {
          id: string
          note_id: string
          user_id: string
          summary_type: string
          summary_text: string
          confidence_score: number | null
          ai_model: string
          processing_time_ms: number | null
          created_at: string
        }
        Insert: {
          id?: string
          note_id: string
          user_id: string
          summary_type?: string
          summary_text: string
          confidence_score?: number | null
          ai_model?: string
          processing_time_ms?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          note_id?: string
          user_id?: string
          summary_type?: string
          summary_text?: string
          confidence_score?: number | null
          ai_model?: string
          processing_time_ms?: number | null
          created_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          title: string
          context_notes: string[] | null
          ai_model: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string
          context_notes?: string[] | null
          ai_model?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          context_notes?: string[] | null
          ai_model?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          user_id: string
          message_type: string
          content: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          message_type: string
          content: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          message_type?: string
          content?: string
          metadata?: Json
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          theme: string
          language: string
          font_size: string
          font_style: string
          default_view: string
          startup_page: string
          auto_save_interval: number
          enable_ai_suggestions: boolean
          auto_tag_detection: boolean
          markdown_mode: boolean
          spell_check: boolean
          export_format: string
          biometric_lock: boolean
          pin_lock: boolean
          end_to_end_encryption: boolean
          session_timeout: number
          cloud_sync: boolean
          cloud_provider: string
          offline_mode: boolean
          backup_frequency: string
          ai_chat_enabled: boolean
          auto_summarization: boolean
          meeting_transcription: boolean
          follow_up_suggestions: boolean
          ai_model: string
          settings_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: string
          language?: string
          font_size?: string
          font_style?: string
          default_view?: string
          startup_page?: string
          auto_save_interval?: number
          enable_ai_suggestions?: boolean
          auto_tag_detection?: boolean
          markdown_mode?: boolean
          spell_check?: boolean
          export_format?: string
          biometric_lock?: boolean
          pin_lock?: boolean
          end_to_end_encryption?: boolean
          session_timeout?: number
          cloud_sync?: boolean
          cloud_provider?: string
          offline_mode?: boolean
          backup_frequency?: string
          ai_chat_enabled?: boolean
          auto_summarization?: boolean
          meeting_transcription?: boolean
          follow_up_suggestions?: boolean
          ai_model?: string
          settings_data?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: string
          language?: string
          font_size?: string
          font_style?: string
          default_view?: string
          startup_page?: string
          auto_save_interval?: number
          enable_ai_suggestions?: boolean
          auto_tag_detection?: boolean
          markdown_mode?: boolean
          spell_check?: boolean
          export_format?: string
          biometric_lock?: boolean
          pin_lock?: boolean
          end_to_end_encryption?: boolean
          session_timeout?: number
          cloud_sync?: boolean
          cloud_provider?: string
          offline_mode?: boolean
          backup_frequency?: string
          ai_chat_enabled?: boolean
          auto_summarization?: boolean
          meeting_transcription?: boolean
          follow_up_suggestions?: boolean
          ai_model?: string
          settings_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      sync_logs: {
        Row: {
          id: string
          user_id: string
          sync_type: string
          provider: string
          status: string
          items_synced: number
          error_message: string | null
          metadata: Json
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          sync_type: string
          provider: string
          status: string
          items_synced?: number
          error_message?: string | null
          metadata?: Json
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          sync_type?: string
          provider?: string
          status?: string
          items_synced?: number
          error_message?: string | null
          metadata?: Json
          created_at?: string
          completed_at?: string | null
        }
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          service_name: string
          service_type: string
          is_connected: boolean
          access_token: string | null
          refresh_token: string | null
          token_expires_at: string | null
          configuration: Json
          last_sync_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service_name: string
          service_type: string
          is_connected?: boolean
          access_token?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          configuration?: Json
          last_sync_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          service_name?: string
          service_type?: string
          is_connected?: boolean
          access_token?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          configuration?: Json
          last_sync_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}