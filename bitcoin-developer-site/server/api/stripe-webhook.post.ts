/**
 * POST /api/stripe-webhook
 *
 * Riceve gli eventi da Stripe e verifica la firma prima di processarli.
 * Richiede la variabile d'ambiente STRIPE_WEBHOOK_SECRET.
 *
 * Configura il webhook su https://dashboard.stripe.com/webhooks
 * con event type: checkout.session.completed
 */
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const sig = getRequestHeader(event, 'stripe-signature')
  if (!sig) {
    throw createError({ statusCode: 400, message: 'Missing stripe-signature header' })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw createError({ statusCode: 500, message: 'Webhook secret not configured' })
  }

  // Legge il body grezzo (necessario per la verifica della firma)
  const rawBody = await readRawBody(event)
  if (!rawBody) {
    throw createError({ statusCode: 400, message: 'Empty request body' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid signature'
    throw createError({ statusCode: 400, message: `Webhook signature verification failed: ${message}` })
  }

  // Gestisci i tipi di evento rilevanti
  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object as Stripe.Checkout.Session
      // Qui puoi aggiungere logica post-pagamento:
      // - inviare email di conferma
      // - registrare l'acquisto nel database
      // - sbloccare accesso al corso
      if (import.meta.dev) {
        console.log('[Stripe Webhook] checkout.session.completed:', session.id, 'amount:', session.amount_total)
      }
      break
    }
    case 'payment_intent.payment_failed': {
      const intent = stripeEvent.data.object as Stripe.PaymentIntent
      if (import.meta.dev) {
        console.log('[Stripe Webhook] payment_intent.payment_failed:', intent.id)
      }
      break
    }
    default:
      // Ignora altri eventi
      break
  }

  return { received: true }
})
