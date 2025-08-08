import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatRequest {
  message: string;
  sessionId?: string;
  contextNotes?: string[];
  aiModel?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders })
    }

    const { message, sessionId, contextNotes = [], aiModel = 'gpt-4' }: ChatRequest = await req.json()

    // Get user settings to check AI preferences
    const { data: settings } = await supabaseClient
      .from('user_settings')
      .select('ai_chat_enabled, ai_model')
      .eq('user_id', user.id)
      .single()

    if (!settings?.ai_chat_enabled) {
      return new Response(
        JSON.stringify({ error: 'AI chat is disabled in your settings' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create or get chat session
    let currentSessionId = sessionId
    if (!currentSessionId) {
      const { data: newSession } = await supabaseClient
        .from('chat_sessions')
        .insert({
          user_id: user.id,
          title: message.substring(0, 50) + '...',
          context_notes: contextNotes,
          ai_model: settings.ai_model || aiModel
        })
        .select()
        .single()
      
      currentSessionId = newSession?.id
    }

    // Save user message
    await supabaseClient
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        user_id: user.id,
        message_type: 'user',
        content: message
      })

    // Get context from notes if provided
    let context = ''
    if (contextNotes.length > 0) {
      const { data: notes } = await supabaseClient
        .from('notes')
        .select('title, content, ai_summary')
        .in('id', contextNotes)
        .eq('user_id', user.id)

      context = notes?.map(note => 
        `Title: ${note.title}\nContent: ${note.content}\nSummary: ${note.ai_summary || 'No summary'}`
      ).join('\n\n') || ''
    }

    // Simulate AI response (replace with actual AI API call)
    const aiResponse = await generateAIResponse(message, context, settings.ai_model || aiModel)

    // Save AI response
    await supabaseClient
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        user_id: user.id,
        message_type: 'assistant',
        content: aiResponse
      })

    // Update AI credits usage
    await supabaseClient
      .from('profiles')
      .update({ 
        ai_credits_used: user.ai_credits_used + 1 
      })
      .eq('id', user.id)

    return new Response(
      JSON.stringify({ 
        response: aiResponse, 
        sessionId: currentSessionId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generateAIResponse(message: string, context: string, model: string): Promise<string> {
  // This is a simplified AI response generator
  // In production, you would integrate with OpenAI, Anthropic, or other AI providers
  
  const responses = [
    `Based on your notes, I can help you with "${message}". Here's what I found relevant: ${context ? 'I see you have some related notes that might be helpful.' : 'Let me search through your knowledge base.'}`,
    `That's an interesting question about "${message}". ${context ? 'Looking at your notes, I can provide some insights.' : 'I can help you explore this topic further.'}`,
    `I understand you're asking about "${message}". ${context ? 'Your notes contain relevant information that I can help you analyze.' : 'Let me help you think through this systematically.'}`
  ]

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

  const baseResponse = responses[Math.floor(Math.random() * responses.length)]
  
  if (context) {
    return `${baseResponse}\n\nBased on your notes:\n${context.substring(0, 500)}${context.length > 500 ? '...' : ''}\n\nWould you like me to elaborate on any specific aspect?`
  }

  return `${baseResponse}\n\nI'm here to help you explore your ideas and find connections in your notes. What specific aspect would you like to dive deeper into?`
}