import { supabase, db } from '../lib/supabase';
import { aiService } from './aiService';

export interface FileUploadResult {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
}

class FileService {
  async uploadFile(file: File, userId: string, noteId?: string): Promise<FileUploadResult> {
    try {
      // Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await db.files.upload(file, filePath);
      if (uploadError) throw uploadError;

      // Get public URL
      const publicUrl = await db.files.getUrl(filePath);

      // Create attachment record if noteId provided
      if (noteId) {
        await supabase.from('note_attachments').insert({
          note_id: noteId,
          user_id: userId,
          file_name: file.name,
          file_url: publicUrl,
          file_size: file.size,
          file_type: file.type,
          processing_status: 'pending'
        });

        // Process file based on type
        this.processFile(file, publicUrl, noteId, userId);
      }

      return {
        id: uploadData.path,
        url: publicUrl,
        name: file.name,
        size: file.size,
        type: file.type
      };
    } catch (error: any) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  private async processFile(file: File, fileUrl: string, noteId: string, userId: string) {
    try {
      // Update processing status
      await supabase
        .from('note_attachments')
        .update({ processing_status: 'processing' })
        .eq('file_url', fileUrl);

      if (file.type.startsWith('audio/')) {
        // Process audio file
        await this.processAudioFile(fileUrl, noteId);
      } else if (file.type.startsWith('video/')) {
        // Process video file (extract audio for transcription)
        await this.processVideoFile(fileUrl, noteId);
      } else if (file.type.startsWith('image/')) {
        // Process image file (OCR)
        await this.processImageFile(fileUrl, noteId);
      } else if (file.type === 'application/pdf' || file.type.includes('document')) {
        // Process document file
        await this.processDocumentFile(fileUrl, noteId);
      }

      // Update processing status to completed
      await supabase
        .from('note_attachments')
        .update({ 
          processing_status: 'completed',
          is_processed: true 
        })
        .eq('file_url', fileUrl);

    } catch (error) {
      console.error('File processing error:', error);
      
      // Update processing status to failed
      await supabase
        .from('note_attachments')
        .update({ processing_status: 'failed' })
        .eq('file_url', fileUrl);
    }
  }

  private async processAudioFile(audioUrl: string, noteId: string) {
    try {
      // Transcribe audio
      const { transcription } = await aiService.transcribeAudio(noteId, audioUrl);
      
      // Update note with transcription
      await db.notes.update(noteId, {
        transcription,
        content: transcription
      });

      // Generate summary if transcription is long enough
      if (transcription.length > 100) {
        await aiService.summarizeNote(noteId, transcription, 'auto');
      }
    } catch (error) {
      console.error('Audio processing error:', error);
    }
  }

  private async processVideoFile(videoUrl: string, noteId: string) {
    try {
      // In a real implementation, you would extract audio from video
      // For now, we'll simulate this process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate transcription
      const simulatedTranscription = "This is a simulated transcription of the video content. In a real implementation, you would extract audio from the video and then transcribe it using speech-to-text services.";
      
      await db.notes.update(noteId, {
        transcription: simulatedTranscription,
        content: simulatedTranscription
      });

      await aiService.summarizeNote(noteId, simulatedTranscription, 'auto');
    } catch (error) {
      console.error('Video processing error:', error);
    }
  }

  private async processImageFile(imageUrl: string, noteId: string) {
    try {
      // In a real implementation, you would use OCR services like Google Vision API
      // For now, we'll simulate OCR
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const simulatedOCR = "This is simulated OCR text extracted from the image. In a real implementation, you would use services like Google Vision API, AWS Textract, or Azure Computer Vision to extract text from images.";
      
      await db.notes.update(noteId, {
        content: simulatedOCR
      });

      if (simulatedOCR.length > 50) {
        await aiService.summarizeNote(noteId, simulatedOCR, 'auto');
      }
    } catch (error) {
      console.error('Image processing error:', error);
    }
  }

  private async processDocumentFile(documentUrl: string, noteId: string) {
    try {
      // In a real implementation, you would parse PDF/DOC files
      // For now, we'll simulate document parsing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const simulatedContent = "This is simulated content extracted from the document. In a real implementation, you would use libraries like PDF.js, pdf-parse, or services like AWS Textract to extract text from PDF and document files.";
      
      await db.notes.update(noteId, {
        content: simulatedContent
      });

      await aiService.summarizeNote(noteId, simulatedContent, 'auto');
    } catch (error) {
      console.error('Document processing error:', error);
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const { error } = await db.files.delete(filePath);
      if (error) throw error;
    } catch (error: any) {
      throw new Error(`File deletion failed: ${error.message}`);
    }
  }

  async getFileInfo(filePath: string): Promise<any> {
    try {
      // Get file metadata from storage
      const { data, error } = await supabase.storage
        .from('notes-attachments')
        .list(filePath.split('/')[0], {
          search: filePath.split('/')[1]
        });

      if (error) throw error;
      return data?.[0] || null;
    } catch (error: any) {
      throw new Error(`Failed to get file info: ${error.message}`);
    }
  }

  getFileType(fileName: string): 'audio' | 'video' | 'image' | 'document' | 'other' {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    if (['mp3', 'wav', 'ogg', 'm4a', 'aac'].includes(ext || '')) return 'audio';
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext || '')) return 'video';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext || '')) return 'image';
    if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(ext || '')) return 'document';
    
    return 'other';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const fileService = new FileService();