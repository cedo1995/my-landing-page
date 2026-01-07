export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { duration, price } = body

  // In production, you would:
  // 1. Import and initialize Stripe with your secret key
  // 2. Create a checkout session
  // 3. Return the session URL
  
  // Example implementation (uncomment and configure in production):
  /*
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Bitcoin Consultation - ${duration}`,
            description: `${duration === '30min' ? '30 minutes' : '60 minutes'} consultation session`,
          },
          unit_amount: price * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&duration=${duration}`,
    cancel_url: `${process.env.BASE_URL}/#consultations`,
    metadata: {
      duration,
    },
  })

  return {
    url: session.url
  }
  */

  // Mock response for development
  return {
    url: '/success?mock=true&duration=' + duration
  }
})