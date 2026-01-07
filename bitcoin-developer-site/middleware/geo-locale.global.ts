export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/') return

  // rispetta preferenza utente
  const pref = useCookie<string>('site_locale', { sameSite: 'lax' })
  if (pref.value === 'it' || pref.value === 'en') {
    return navigateTo(`/${pref.value}`, { redirectCode: 302 })
  }

  // header “country” (dipende dal provider)
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

  return navigateTo(`/${target}`, { redirectCode: 302 })
})
