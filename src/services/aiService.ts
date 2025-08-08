import { supabase } from '../lib/supabase';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  contextNotes?: string[];
}

class AIService {
  async chatWithNotes(
    message: string, 
    sessionId?: string, 
    contextNotes: string[] = []
  ): Promise<{ response: string; sessionId: string }> {
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: {
        message,
        sessionId,
        contextNotes
      }
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async summarizeNote(
    noteId: string, 
    content: string, 
    summaryType: 'auto' | 'manual' | 'meeting' | 'key_points' = 'auto'
  ): Promise<{ summary: string; confidence: number }> {
    const { data, error } = await supabase.functions.invoke('ai-summarize', {
      body: {
        noteId,
        content,
        summaryType
      }
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async transcribeAudio(
    noteId: string, 
    audioUrl: string, 
    options: {
      language?: string;
      speakerDetection?: boolean;
    } = {}
  ): Promise<{ transcription: string; confidence: number }> {
    const { data, error } = await supabase.functions.invoke('ai-transcribe', {
      body: {
        noteId,
        audioUrl,
        language: options.language || 'en',
        speakerDetection: options.speakerDetection || false
      }
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async generateTags(content: string): Promise<string[]> {
    // Simulate AI tag generation
    const words = content.toLowerCase().split(/\s+/);
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    const potentialTags = words
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .filter(word => /^[a-zA-Z]+$/.test(word))
      .slice(0, 5);

    return [...new Set(potentialTags)];
  }

  async detectLanguage(text: string): Promise<string> {
    // Simple language detection simulation
    const patterns = {
      es: /\b(el|la|los|las|un|una|de|en|y|que|es|se|no|te|lo|le|da|su|por|son|con|para|al|del|está|todo|pero|más|hacer|muy|puede|tiempo|si|ver|mis|sin|sobre|me|hasta|donde|quien|antes|tanto|estos|ese|otro|después|mismo|cada|gran|bien|año|trabajo|vida|día|agua|parte|hombre|lugar|estado|caso|mano|grupo|momento|manera|derecho|medio|gobierno|mundo|país|según|menos|problema|hecho|durante|nuevo|debe|bajo|mientras|poco|nombre|mucho|sistema|programa|cuestión|medida|nada|tipo|algún|nivel|forma|cambio|proceso|desarrollo|política|resultado|niño|producto|actividad|empresa|realidad|información|mes|presidente|mayor|futuro|acción|mercado|conocimiento|agua|historia|área|libro|presentar|permitir|sociedad|cultura|general|precio|relación|centro|personal|capacidad|crear|tecnología|proyecto|producir|modelo|esperar|situación|tratamiento|aplicación|papel|función|seguir|servicio|clase|control|factor|guerra|dado|valor|motivo|internacional|realizar|superficie|escuela|comprende|primera|política|local|tarde|lengua|seguridad|campo|material|plan|decidir|negro|población|economía|condición|cuenta|poner|atención|objeto|claro|comunidad|relación|frente|considerar|presente|estudiar|universidad|ocasión|cuerpo|punto|vista|hijo|semana|varios|sentir|generar|buen|libre|recibir|causa|base|público|principal|cada|estructura|cierto|lado|así|tomar|red|primero|fecha|tanto|terminar|condición|llevar|físico|profesor|final|actividad|acuerdo|recordar|pasado|natural|privado|internacional|libro|cámara|tratamiento|venir|sol|trabajar|conocer|agua|movimiento|derecho|actuar|masa|militar|llegar|entrar|grande|necesario|único|producir|existe|hospital|iglesia|continuar|educación|salud|calle|mesa|necesidad|especial|miembro|resto|utilizar|ciudad|electricidad|social|incluir|conseguir|económico|sitio|comunidad|familiar|nacional|propio|último|equipo|cultural|total|materia|médico|anterior|recurso|limitado|físico|decidir|relación|recordar|construir|crecimiento|buscar|encontrar|pensamiento|establecer|hablar|llevar|camino|funcionar|política|método|mantener|desarrollar|organización|uso|importante|interés|gobierno|obtener|sistema|grupo|desarrollo|empresa|caso|ojo|conseguir|nivel|realizar|comprender|lograr|crecimiento|recurso|producir|considerar|población|económico|social|político|cultural|educativo|tecnológico|científico|ambiental|humano|natural|internacional|nacional|regional|local|personal|profesional|laboral|familiar|social|económico|político|cultural|educativo|tecnológico|científico|ambiental|humano|natural|internacional|nacional|regional|local|personal|profesional|laboral|familiar)/gi,
      fr: /\b(le|de|et|à|un|il|être|et|en|avoir|que|pour|dans|ce|son|une|sur|avec|ne|se|pas|tout|plus|par|grand|en|même|et|où|comme|temps|pas|savoir|devoir|année|son|que|très|à|ce|grand|le|pouvoir|autre|donner|fait|sous|vieux|demander|bien|jour|prendre|compte|mot|mais|connaître|même|lieu|comprendre|demander|grand|nombre|partie|prendre|faire|bien|nouveau|grand|cas|homme|vie|enfant|temps|main|lieu|gouvernement|entreprise|groupe|partie|cas|problème|service|question|chose|état|personne|résultat|moment|façon|époque|action|moyen|fin|mesure|politique|programme|système|siècle|société|conseil|effet|condition|place|suite|cause|matière|type|attention|situation|cours|suite|rapport|force|rôle|début|terme|niveau|sens|vie|mort|terre|guerre|loi|voix|ville|mer|prix|certain|aucun|seulement|rester|devenir|retourner|aller|entendre|montrer|demander|donner|passer|mettre|dire|devoir|faire|aller|voir|savoir|pouvoir|falloir|vouloir|venir|dire|prendre|aller|voir|savoir|pouvoir|falloir|vouloir|venir|dire|prendre|porter|parler|aimer|laisser|écouter|permettre|attendre|entendre|rendre|descendre|répondre|entendre|comprendre|apprendre|surprendre|reprendre|entreprendre|défendre|vendre|perdre|mordre|fondre|pondre|répondre|correspondre|confondre|répandre|suspendre|dépendre|étendre|prétendre|entendre|attendre|descendre|rendre|vendre|défendre|fendre|pendre|tendre|cendre|genre|membre|nombre|sombre|chambre|décembre|septembre|octobre|novembre|ensemble|semble|tremble|rassemble|ressemble|dissemble)/gi,
      de: /\b(der|die|und|in|den|von|zu|das|mit|sich|des|auf|für|ist|im|dem|nicht|ein|eine|als|auch|es|an|werden|aus|er|hat|dass|sie|nach|wird|bei|einer|um|am|sind|noch|wie|einem|über|einen|so|zum|war|haben|nur|oder|aber|vor|zur|bis|unter|während|des)/gi
    };

    for (const [lang, pattern] of Object.entries(patterns)) {
      const matches = text.match(pattern);
      if (matches && matches.length > 10) {
        return lang;
      }
    }

    return 'en'; // Default to English
  }

  async generateFollowUpSuggestions(content: string): Promise<string[]> {
    // Generate contextual follow-up suggestions
    const suggestions = [
      "What are the key takeaways from this?",
      "How can I implement these ideas?",
      "What are the next steps?",
      "Are there any related topics I should explore?",
      "Can you summarize the main points?",
      "What questions should I ask about this?",
      "How does this relate to my other notes?",
      "What are the potential challenges here?"
    ];

    // Return 3-4 random suggestions
    const shuffled = suggestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3 + Math.floor(Math.random() * 2));
  }

  async analyzeContent(content: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    topics: string[];
    complexity: 'low' | 'medium' | 'high';
    readingTime: number;
  }> {
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed

    // Simple sentiment analysis
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 'brilliant', 'outstanding', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'disappointing', 'frustrating', 'difficult', 'challenging', 'problematic', 'concerning'];
    
    const lowerContent = content.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
    
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';

    // Extract topics (simplified)
    const topics = await this.generateTags(content);

    // Determine complexity based on sentence length and vocabulary
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
    
    let complexity: 'low' | 'medium' | 'high' = 'medium';
    if (avgSentenceLength < 15) complexity = 'low';
    else if (avgSentenceLength > 25) complexity = 'high';

    return {
      sentiment,
      topics,
      complexity,
      readingTime
    };
  }
}

export const aiService = new AIService();