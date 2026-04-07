export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/') return

  const isProd = process.env.NODE_ENV === 'production'
  const redirectCode = isProd ? 301 : 302

  // rispetta preferenza utente
  const pref = useCookie<string>('site_locale', { sameSite: 'lax' })
  if (pref.value === 'it' || pref.value === 'en') {
    // On server side use h3 sendRedirect to ensure correct HTTP status code
    if (import.meta.server) {
      const event = useRequestEvent()
      if (event) {
        return sendRedirect(event, `/${pref.value}`, redirectCode)
      }
    }
    return navigateTo(`/${pref.value}`, { redirectCode })
  }

  // header "country" (dipende dal provider)
  const h = useRequestHeaders([
    'cf-ipcountry',          // Cloudflare
    'x-vercel-ip-country',   // Vercel
    'x-nf-country'           // Netlify
  ])

  const country = (
    h['cf-ipcountry'] ||
    h['x-vercel-ip-country'] ||
    h['x-nf-country'] ||
    ''
  ).toUpperCase()

  const target = country === 'IT' ? 'it' : 'en'
  pref.value = target

  // On server side use h3 sendRedirect to ensure correct HTTP status code
  if (import.meta.server) {
    const event = useRequestEvent()
    if (event) {
      return sendRedirect(event, `/${target}`, redirectCode)
    }
  }
  return navigateTo(`/${target}`, { redirectCode })
})
