/**
 * POST /api/ln-invoice
 *
 * Genera una BOLT11 invoice tramite il flusso LNURL-pay (LUD-16):
 *   1. Recupera il prezzo BTC/EUR da CoinGecko
 *   2. Converte l'importo EUR in millisatoshi
 *   3. Fetch metadata LNURL-pay dalla Lightning Address
 *   4. Richiede la invoice al callback con l'importo esatto
 *
 * Body: { lightningAddress: string, amountEur: number }
 * Response: { pr: string, msats: number, btcRate: number }
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { lightningAddress, amountEur } = body as {
    lightningAddress: string
    amountEur: number
  }

  if (!lightningAddress || !amountEur) {
    throw createError({ statusCode: 400, message: 'Missing lightningAddress or amountEur' })
  }

  // ── 1. Prezzo BTC/EUR ──────────────────────────────────────────────────────
  const priceRes = await $fetch<{ bitcoin: { eur: number } }>(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
    { headers: { 'Cache-Control': 'no-store' } }
  ).catch(() => null)

  if (!priceRes?.bitcoin?.eur) {
    throw createError({ statusCode: 502, message: 'Could not fetch BTC price' })
  }

  const btcRate = priceRes.bitcoin.eur
  const sats = Math.round((amountEur / btcRate) * 1e8)
  const msats = sats * 1000

  // ── 2. Parse Lightning Address ─────────────────────────────────────────────
  const parts = lightningAddress.split('@')
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw createError({ statusCode: 400, message: 'Invalid Lightning Address format' })
  }
  const [username, domain] = parts

  // ── 3. LNURL-pay metadata ──────────────────────────────────────────────────
  const metaUrl = `https://${domain}/.well-known/lnurlp/${username}`
  const meta = await $fetch<{
    callback: string
    minSendable: number
    maxSendable: number
    tag: string
    status?: string
    reason?: string
  }>(metaUrl).catch((err) => {
    throw createError({ statusCode: 502, message: `LNURL metadata fetch failed: ${err?.message ?? err}` })
  })

  if (meta.status === 'ERROR') {
    throw createError({ statusCode: 502, message: meta.reason ?? 'LNURL error' })
  }

  if (meta.tag !== 'payRequest') {
    throw createError({ statusCode: 502, message: 'Not a LNURL-pay endpoint' })
  }

  if (msats < meta.minSendable || msats > meta.maxSendable) {
    throw createError({
      statusCode: 400,
      message: `Amount ${msats} msat out of range [${meta.minSendable}, ${meta.maxSendable}]`,
    })
  }

  // ── 4. Richiedi la invoice ─────────────────────────────────────────────────
  const sep = meta.callback.includes('?') ? '&' : '?'
  const callbackUrl = `${meta.callback}${sep}amount=${msats}`

  const invoiceData = await $fetch<{
    pr?: string
    status?: string
    reason?: string
  }>(callbackUrl).catch((err) => {
    throw createError({ statusCode: 502, message: `Invoice callback failed: ${err?.message ?? err}` })
  })

  if (invoiceData.status === 'ERROR') {
    throw createError({ statusCode: 502, message: invoiceData.reason ?? 'Invoice error' })
  }

  if (!invoiceData.pr) {
    throw createError({ statusCode: 502, message: 'No payment request in response' })
  }

  return {
    pr: invoiceData.pr,
    msats,
    btcRate,
  }
})
