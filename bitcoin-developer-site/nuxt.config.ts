export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  app: {
    head: {
      title: 'Roberto Cedolin - Software Developer & Bitcoin Educator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Passionate software developer and Bitcoin enthusiast. Educational content and consultations to help you understand Bitcoin technology.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Preconnect a servizi di terze parti per ridurre latenza
        { rel: 'preconnect', href: 'https://api.coingecko.com' },
        { rel: 'preconnect', href: 'https://api.web3forms.com' },
        { rel: 'preconnect', href: 'https://js.stripe.com' },
        { rel: 'preconnect', href: 'https://assets.calendly.com' },
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap'],

  site: {
    url: 'https://robertocedolin.com',
    name: 'Roberto Cedolin'
  },

  // ── Security headers su tutte le route ──────────────────────────────────────
  // @ts-ignore routeRules è supportato a runtime ma i tipi potrebbero non essere aggiornati
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://js.stripe.com https://assets.calendly.com",
          "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
          "img-src 'self' data: https:",
          "connect-src 'self' https://api.stripe.com https://api.coingecko.com https://api.web3forms.com https://calendly.com",
          "frame-src https://js.stripe.com https://calendly.com",
          "font-src 'self'",
        ].join('; '),
      }
    },
    // Checkout e success: noindex
    '/checkout/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/*/checkout/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/success': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/*/success': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  },

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'it',
    baseUrl: 'https://robertocedolin.com',
    langDir: 'locales/',
    locales: [
      { code: 'it', name: 'Italiano', language: 'it-IT', file: 'it.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' }
    ],
    detectBrowserLanguage: false
  },

  // ── Sitemap automatica tramite @nuxtjs/sitemap ───────────────────────────────
  sitemap: {
    strictNuxtContentPaths: false,
    exclude: [
      '/checkout/**',
      '/success',
      '/*/checkout/**',
      '/*/success',
    ],
  },

  runtimeConfig: {
    // Chiavi private — solo server-side
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    web3formsAccessKey: process.env.WEB3FORMS_ACCESS_KEY || '',
    public: {
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL || '',
      calendly60minUrl: process.env.NUXT_PUBLIC_CALENDLY_60MIN_URL || '',
      calendly3hUrl: process.env.NUXT_PUBLIC_CALENDLY_3H_URL || '',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'https://robertocedolin.com',
    }
  }
})
