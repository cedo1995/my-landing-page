import Stripe from 'stripe'

const PRODUCTS: Record<string, { name: string; description: string; price: number }> = {
  'consultation-30min': {
    name: 'Consulenza Bitcoin - 30 minuti',
    description: 'Sessione esperta su Bitcoin: wallet, nodi, privacy. Durata: 30 minuti.',
    price: 40,
  },
  'consultation-60min': {
    name: 'Consulenza Bitcoin - 60 minuti',
    description: 'Sessione esperta su Bitcoin: wallet, nodi, privacy. Durata: 60 minuti.',
    price: 70,
  },
  'consultation-3h': {
    name: 'Consulenza Bitcoin - 3 ore',
    description: 'Sessione intensiva su Bitcoin: percorso completo, approfondimento tecnico, wallet, nodi, privacy e strategia. Durata: 3 ore.',
    price: 180,
  },
  'course-introduzione-bitcoin': {
    name: 'Corso: Introduzione a Bitcoin',
    description: 'Percorso completo su Bitcoin: storia, blockchain, mining, wallet, uso pratico. 5 moduli.',
    price: 400,
  },
  'course-approfondimento-bitcoin': {
    name: 'Corso: Approfondimento Bitcoin',
    description: 'Percorso avanzato su Bitcoin: Lightning Network, nodi, privacy, sicurezza. 10 moduli.',
    price: 800,
  },
}

// Semplice rate limiting in-memory: max 10 richieste per IP ogni 60 secondi
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
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

  // CORS: accetta solo richieste dal dominio autorizzato
  const allowedOrigin = process.env.NUXT_PUBLIC_BASE_URL || ''
  const origin = getRequestHeader(event, 'origin') || ''
  if (allowedOrigin && origin && !origin.startsWith(allowedOrigin)) {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  const body = await readBody(event)
  const { type, slug, duration } = body as {
    type: 'consultation' | 'course'
    slug?: string
    duration?: string
  }

  if (!type) {
    throw createError({ statusCode: 400, message: 'Missing type' })
  }

  // Determina la chiave prodotto
  const productKey = type === 'course'
    ? `course-${slug}`
    : `consultation-${duration}`

  const product = PRODUCTS[productKey]
  if (!product) {
    throw createError({ statusCode: 400, message: `Unknown product: ${productKey}` })
  }

  // ⚠️ Il prezzo viene SEMPRE dal server — mai dal client
  const canonicalPrice = product.price

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  // success_url diversa per corso vs consulenza
  const successPath = type === 'course'
    ? `/success?type=course&slug=${slug}&session_id={CHECKOUT_SESSION_ID}`
    : `/success?type=consultation&duration=${duration}&session_id={CHECKOUT_SESSION_ID}`

  const cancelPath = type === 'course'
    ? `/courses/${slug}`
    : `/#consultations`

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: Math.round(canonicalPrice * 100), // EUR → centesimi
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NUXT_PUBLIC_BASE_URL}${successPath}`,
    cancel_url: `${process.env.NUXT_PUBLIC_BASE_URL}${cancelPath}`,
    metadata: {
      type,
      slug: slug ?? '',
      duration: duration ?? '',
      price: String(canonicalPrice),
    },
  })

  return { url: session.url }
})
