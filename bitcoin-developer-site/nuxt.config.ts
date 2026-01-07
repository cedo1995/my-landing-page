// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  app: {
    head: {
      title: 'Roberto Cedolin - Software Developer & Bitcoin Educator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Passionate software developer and Bitcoin enthusiast. Educational content and consultations to help you understand Bitcoin technology.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [],

  runtimeConfig: {
    public: {
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      calendlyUrl: process.env.NUXT_PUBLIC_CALENDLY_URL || ''
    }
  }
})