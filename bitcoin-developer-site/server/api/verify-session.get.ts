/**
 * GET /api/verify-session?session_id=xxx
 *
 * Verifica che una sessione Stripe sia stata effettivamente pagata.
 * Usato dalla success page per evitare accessi non autorizzati.
 */
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = query.session_id as string | undefined

  if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    throw createError({ statusCode: 400, message: 'Invalid or missing session_id' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    throw createError({ statusCode: 404, message: 'Session not found' })
  }

  const paid = session.payment_status === 'paid'

  return {
    paid,
    type: session.metadata?.type ?? null,
    slug: session.metadata?.slug ?? null,
    duration: session.metadata?.duration ?? null,
  }
})
