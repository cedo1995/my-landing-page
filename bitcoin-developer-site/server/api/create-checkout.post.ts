import Stripe from 'stripe'

const PRODUCTS: Record<string, { name: string; description: string }> = {
  'consultation-30min': {
    name: 'Consulenza Bitcoin - 30 minuti',
    description: 'Sessione esperta su Bitcoin: wallet, nodi, privacy. Durata: 30 minuti.',
  },
  'consultation-60min': {
    name: 'Consulenza Bitcoin - 60 minuti',
    description: 'Sessione esperta su Bitcoin: wallet, nodi, privacy. Durata: 60 minuti.',
  },
  'course-introduzione-bitcoin': {
    name: 'Corso: Introduzione a Bitcoin',
    description: 'Percorso completo su Bitcoin: storia, blockchain, mining, wallet, uso pratico. 5 moduli.',
  },
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { type, slug, duration, price } = body as {
    type: 'consultation' | 'course'
    slug?: string       // per i corsi: es. 'introduzione-bitcoin'
    duration?: string   // per le consulenze: es. '30min'
    price: number       // importo in EUR
  }

  if (!type || !price) {
    throw createError({ statusCode: 400, message: 'Missing type or price' })
  }

  // Determina la chiave prodotto
  const productKey = type === 'course'
    ? `course-${slug}`
    : `consultation-${duration}`

  const product = PRODUCTS[productKey]
  if (!product) {
    throw createError({ statusCode: 400, message: `Unknown product: ${productKey}` })
  }

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
          unit_amount: Math.round(price * 100), // EUR → centesimi
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
      price: String(price),
    },
  })

  return { url: session.url }
})
