
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const allowedOrigins = [
  'https://ozen-connect-hazel.vercel.app',
  'http://localhost:5173',
]

function getCorsHeaders(origin: string | null) {
  const allowedOrigin =
    origin && allowedOrigins.includes(origin) ? origin : ''

  return {
    ...(allowedOrigin
      ? { 'Access-Control-Allow-Origin': allowedOrigin }
      : {}),
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}

Deno.serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'))

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }

  // Reject browser requests from origins not on the allowlist.
  const origin = req.headers.get('origin')
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response(
      JSON.stringify({ error: 'Origin not allowed.' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          Vary: 'Origin',
        },
      },
    )
  }

  try {
    const supabaseUrl =
      Deno.env.get('PROJECT_URL') ??
      Deno.env.get('SUPABASE_URL')

    const serviceKey =
      Deno.env.get('PROJECT_SERVICE_KEY') ??
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !serviceKey) {
      throw new Error('Server configuration is incomplete')
    }

    const body = await req.json()

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body.' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const full_name = String(body.full_name ?? '').trim()
    const email = String(body.email ?? '').trim().toLowerCase()
    const phone = String(body.phone ?? '').trim()
    const country = String(body.country ?? '').trim()
    const interest_area = String(body.interest_area ?? '').trim()
    const message = String(body.message ?? '').trim()
    const privacy_consent = body.privacy_consent

    const allowedInterests = [
      'Business Partnership',
      'Investment',
      'Distribution',
      'Other',
    ]

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      full_name.length < 2 ||
      full_name.length > 120 ||
      !emailPattern.test(email) ||
      email.length > 254 ||
      phone.length > 30 ||
      country.length < 2 ||
      country.length > 100 ||
      !allowedInterests.includes(interest_area) ||
      message.length < 5 ||
      message.length > 3000 ||
      privacy_consent !== true
    ) {
      return new Response(
        JSON.stringify({
          error: 'Please check the submitted information.',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    // Rate limiting: maximum 5 inquiries per IP per hour.
    // The gateway must provide a trusted client IP header.
    const clientIp =
  req.headers.get('cf-connecting-ip')?.trim() || ''

if (!clientIp) {
  console.error('Trusted client IP header is missing.')

  return new Response(
    JSON.stringify({
      error: 'Unable to verify request source.',
    }),
    {
      status: 400,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    },
  )
}

    if (!clientIp) {
      console.error('Client IP header is missing.')

      return new Response(
        JSON.stringify({
          error: 'Unable to verify request source.',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const ipHashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(clientIp),
    )

    const ipHash = Array.from(new Uint8Array(ipHashBuffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')

    const supabase = createClient(supabaseUrl, serviceKey)

    const { data: allowed, error: rateLimitError } =
      await supabase.rpc('consume_business_inquiry_rate_limit', {
        p_ip_hash: ipHash,
        p_max_requests: 5,
      })

    if (rateLimitError) {
      console.error('Rate limit error:', rateLimitError.message)

      return new Response(
        JSON.stringify({
          error: 'Unable to process inquiry right now.',
        }),
        {
          status: 503,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    if (allowed !== true) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const { error: insertError } = await supabase
      .from('business_partner_inquiries')
      .insert({
        full_name,
        email,
        phone,
        country,
        interest_area,
        message,
        privacy_consent,
      })

    if (insertError) {
      console.error(
        'Inquiry database error:',
        insertError.message,
      )

      return new Response(
        JSON.stringify({
          error: 'Unable to submit inquiry.',
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Inquiry function error:', error)

    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred.',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})
