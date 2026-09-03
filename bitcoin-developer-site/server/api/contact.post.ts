/**
 * POST /api/contact
 *
 * Proxy sicuro verso Web3Forms. La access_key rimane lato server
 * e non viene mai esposta nel bundle client.
 *
 * Body: { subject: string, email: string, message: string, from_name?: string, honeypot?: string }
 */

// Semplice rate limiting in-memory: max 5 richieste per IP ogni 60 secondi
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export default defineEventHandler(async (event) => {
  // Rate limiting
  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0].trim()
    ?? getRequestHeader(event, 'x-real-ip')
    ?? 'unknown'
  if (!checkRateLimit(ip)) {
    throw createError({ statusCode: 429, message: 'Too many requests. Try again later.' })
  }

  const body = await readBody(event)
  const { subject, email, message, from_name, honeypot } = body as {
    subject: string
    email: string
    message: string
    from_name?: string
    honeypot?: string
  }

  // Honeypot anti-spam: se il campo è valorizzato è un bot
  if (honeypot) {
    // Risposta silenziosamente positiva per non rivelare al bot che è stato rilevato
    return { success: true }
  }

  // Validazione input
  if (!subject || !email || !message) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw createError({ statusCode: 400, message: 'Invalid email address' })
  }
  if (message.trim().length < 5) {
    throw createError({ statusCode: 400, message: 'Message too short' })
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    throw createError({ statusCode: 500, message: 'Email service not configured' })
  }

  const res = await $fetch<{ success: boolean; message?: string }>(
    'https://api.web3forms.com/submit',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: subject.trim(),
        email: email.trim(),
        message: message.trim(),
        from_name: from_name?.trim() || email.trim(),
      }),
    }
  ).catch(() => null)

  if (!res?.success) {
    throw createError({ statusCode: 502, message: 'Failed to send message' })
  }

  return { success: true }
})
