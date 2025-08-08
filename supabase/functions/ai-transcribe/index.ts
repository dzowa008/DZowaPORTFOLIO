import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TranscribeRequest {
  noteId: string;
  audioUrl: string;
  language?: string;
  speakerDetection?: boolean;
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

    const { noteId, audioUrl, language = 'en', speakerDetection = false }: TranscribeRequest = await req.json()

    // Check user settings
    const { data: settings } = await supabaseClient
      .from('user_settings')
      .select('meeting_transcription')
      .eq('user_id', user.id)
      .single()

    if (!settings?.meeting_transcription) {
      return new Response(
        JSON.stringify({ error: 'Meeting transcription is disabled in your settings' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Simulate transcription processing
    const transcription = await transcribeAudio(audioUrl, language, speakerDetection)

    // Update note with transcription
    await supabaseClient
      .from('notes')
      .update({ 
        transcription,
        content: transcription // Also update content if it's empty
      })
      .eq('id', noteId)

    // Generate automatic summary if enabled
    if (settings.auto_summarization) {
      const summaryResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/ai-summarize`, {
        method: 'POST',
        headers: {
          'Authorization': req.headers.get('Authorization')!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          noteId,
          content: transcription,
          summaryType: 'auto'
        })
      })
    }

    // Update AI credits usage
    await supabaseClient.rpc('increment_ai_credits', { user_id: user.id, credits: 2 })

    return new Response(
      JSON.stringify({ 
        transcription,
        wordCount: transcription.split(' ').length,
        language,
        confidence: 0.92 + Math.random() * 0.08
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

async function transcribeAudio(audioUrl: string, language: string, speakerDetection: boolean): Promise<string> {
  // Simulate transcription processing time
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 5000))

  // Simulated transcription results
  const transcriptions = [
    "Welcome everyone to today's meeting. We're here to discuss the quarterly planning and review our progress on the current projects. Let's start with the marketing team's update on the campaign performance.",
    "Thank you for joining this session. Today we'll be covering the new product features, user feedback analysis, and the roadmap for the next quarter. Sarah, would you like to begin with the user research findings?",
    "Good morning team. This recording covers our discussion about the budget allocation, resource planning, and timeline adjustments for the upcoming release. We need to address the technical challenges and prioritize the most critical features.",
    "In this meeting, we reviewed the customer feedback, analyzed the market trends, and discussed potential improvements to our service offering. The key takeaways include enhancing user experience and expanding our feature set."
  ]

  let transcription = transcriptions[Math.floor(Math.random() * transcriptions.length)]

  if (speakerDetection) {
    // Add speaker labels
    const speakers = ['Speaker 1', 'Speaker 2', 'Speaker 3']
    const sentences = transcription.split('. ')
    transcription = sentences.map((sentence, index) => {
      const speaker = speakers[index % speakers.length]
      return `[${speaker}]: ${sentence}${index < sentences.length - 1 ? '.' : ''}`
    }).join(' ')
  }

  return transcription
}