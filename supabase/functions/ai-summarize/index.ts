import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SummarizeRequest {
  noteId: string;
  content: string;
  summaryType?: 'auto' | 'manual' | 'meeting' | 'key_points';
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

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders })
    }

    const { noteId, content, summaryType = 'auto', aiModel = 'gpt-4' }: SummarizeRequest = await req.json()

    // Check user settings
    const { data: settings } = await supabaseClient
      .from('user_settings')
      .select('auto_summarization, ai_model')
      .eq('user_id', user.id)
      .single()

    if (!settings?.auto_summarization) {
      return new Response(
        JSON.stringify({ error: 'Auto-summarization is disabled in your settings' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate summary
    const startTime = Date.now()
    const summary = await generateSummary(content, summaryType, settings.ai_model || aiModel)
    const processingTime = Date.now() - startTime

    // Save summary to database
    const { data: summaryData, error } = await supabaseClient
      .from('ai_summaries')
      .insert({
        note_id: noteId,
        user_id: user.id,
        summary_type: summaryType,
        summary_text: summary,
        confidence_score: 0.85 + Math.random() * 0.15, // Simulated confidence
        ai_model: settings.ai_model || aiModel,
        processing_time_ms: processingTime
      })
      .select()
      .single()

    // Update note with summary
    await supabaseClient
      .from('notes')
      .update({ ai_summary: summary })
      .eq('id', noteId)

    // Update AI credits usage
    await supabaseClient.rpc('increment_ai_credits', { user_id: user.id })

    return new Response(
      JSON.stringify({ 
        summary,
        summaryId: summaryData?.id,
        processingTime,
        confidence: summaryData?.confidence_score
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

async function generateSummary(content: string, type: string, model: string): Promise<string> {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500))

  const contentLength = content.length
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  if (contentLength < 100) {
    return "This note is quite brief and doesn't require summarization."
  }

  switch (type) {
    case 'meeting':
      return generateMeetingSummary(sentences)
    case 'key_points':
      return generateKeyPoints(sentences)
    case 'manual':
    case 'auto':
    default:
      return generateAutoSummary(sentences, contentLength)
  }
}

function generateAutoSummary(sentences: string[], contentLength: number): string {
  const summaryLength = Math.max(1, Math.min(3, Math.floor(sentences.length / 3)))
  const selectedSentences = sentences
    .filter(s => s.length > 20) // Filter out very short sentences
    .slice(0, summaryLength)
    .map(s => s.trim())

  return `Summary: ${selectedSentences.join('. ')}.`
}

function generateMeetingSummary(sentences: string[]): string {
  return `Meeting Summary:
• Key Discussion Points: ${sentences.slice(0, 2).join('. ')}.
• Action Items: Follow up on discussed topics
• Next Steps: Review and implement suggestions
• Participants: Multiple stakeholders involved`
}

function generateKeyPoints(sentences: string[]): string {
  const points = sentences
    .filter(s => s.length > 15)
    .slice(0, 4)
    .map((s, i) => `${i + 1}. ${s.trim()}`)

  return `Key Points:\n${points.join('\n')}`
}