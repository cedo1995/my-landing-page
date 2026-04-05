<template>
  <div class="donation">

    <!-- Amount selector -->
    <div class="donation__amount-selector">
      <p class="donation__amount-label">{{ $t('donation.amountLabel') }}</p>
      <div class="donation__presets">
        <button
          v-for="p in presets"
          :key="p.value"
          type="button"
          :class="['donation__preset-btn', { active: selectedPreset === p.value }]"
          @click="selectPreset(p.value)"
        >
          {{ p.label }}
        </button>
        <button
          type="button"
          :class="['donation__preset-btn', { active: selectedPreset === 'custom' }]"
          @click="selectPreset('custom')"
        >
          {{ $t('donation.customLabel') }}
        </button>
      </div>
      <div v-if="selectedPreset === 'custom'" class="donation__custom-amount">
        <input
          v-model="customAmount"
          type="number"
          min="1"
          step="1"
          :placeholder="$t('donation.amountPlaceholder')"
          class="donation__custom-input"
          @input="onCustomAmountChange"
        />
        <span class="donation__custom-currency">EUR</span>
      </div>
    </div>

    <!-- Cards grid -->
    <div class="donation__grid">

      <!-- PayPal -->
      <div class="donation__card">
        <div class="donation__card-header">
          <span class="donation__card-icon">🅿️</span>
          <h3 class="donation__card-title">{{ $t('donation.paypal.title') }}</h3>
        </div>
        <p class="donation__card-label">{{ $t('donation.paypal.label') }}</p>
        <a
          :href="paypalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="donation__btn"
        >
          {{ $t('donation.paypal.btn') }}
        </a>
      </div>

      <!-- Revolut -->
      <div class="donation__card">
        <div class="donation__card-header">
          <span class="donation__card-icon">💳</span>
          <h3 class="donation__card-title">{{ $t('donation.revolut.title') }}</h3>
        </div>
        <p class="donation__card-label">{{ $t('donation.revolut.label') }}</p>
        <a
          :href="revolutUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="donation__btn"
        >
          {{ $t('donation.revolut.btn') }}
        </a>
      </div>

      <!-- Bitcoin on-chain -->
      <div class="donation__card">
        <div class="donation__card-header">
          <span class="donation__card-icon">₿</span>
          <h3 class="donation__card-title">{{ $t('donation.onchain.title') }}</h3>
        </div>
        <div class="donation__qr-wrap">
          <img
            v-if="onchainQrUrl"
            :src="onchainQrUrl"
            class="donation__qr-img"
            alt="Bitcoin on-chain QR"
          />
          <div v-else class="donation__qr-placeholder">
            <span class="donation__qr-icon">₿</span>
          </div>
        </div>
        <p class="donation__card-note">{{ $t('donation.onchain.qrNote') }}</p>
        <div
          class="donation__address"
          @click="copyText(btcAddress, 'onchain')"
        >
          <span class="donation__address-text">{{ btcAddress }}</span>
          <span class="donation__copy-icon" :class="{ 'donation__copy-icon--done': copied.onchain }">
            <svg v-if="!copied.onchain" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
        </div>
      </div>

      <!-- Lightning -->
      <div class="donation__card">
        <div class="donation__card-header">
          <span class="donation__card-icon">⚡</span>
          <h3 class="donation__card-title">{{ $t('donation.lightning.title') }}</h3>
        </div>

        <!-- Lightning sub-tabs -->
        <div class="donation__subtabs">
          <button
            v-for="tab in lnTabs"
            :key="tab.key"
            type="button"
            :class="['donation__subtab', { active: lnTab === tab.key }]"
            @click="lnTab = tab.key"
          >
            {{ $t(tab.labelKey) }}
          </button>
        </div>

        <!-- Lightning Address -->
        <div v-if="lnTab === 'address'" class="donation__ln-panel">
          <div class="donation__qr-wrap">
            <img
              v-if="lnAddressQrUrl"
              :src="lnAddressQrUrl"
              class="donation__qr-img"
              alt="Lightning Address QR"
            />
            <div v-else-if="lnInvoiceLoading" class="donation__qr-placeholder">
              <span class="donation__qr-icon">⚡</span>
              <span class="donation__qr-text">{{ $t('donation.lightning.invoiceGenerating') }}</span>
            </div>
            <div v-else class="donation__qr-placeholder">
              <span class="donation__qr-icon">⚡</span>
            </div>
          </div>
          <p class="donation__card-label">{{ $t('donation.lightning.addressLabel') }}</p>
          <!-- When an invoice is shown, display invoice; otherwise display address -->
          <div
            class="donation__address"
            @click="copyText(lnInvoiceStr || lightningAddress, 'lnAddress')"
          >
            <span class="donation__address-text">{{ lnInvoiceStr ? lnInvoiceStr.slice(0, 48) + '…' : lightningAddress }}</span>
            <span class="donation__copy-icon" :class="{ 'donation__copy-icon--done': copied.lnAddress }">
              <svg v-if="!copied.lnAddress" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
          <span v-if="lnInvoiceError" class="donation__error">{{ $t('donation.lightning.invoiceError') }}</span>
        </div>

        <!-- BOLT12 -->
        <div v-if="lnTab === 'bolt12'" class="donation__ln-panel">
          <div class="donation__qr-wrap">
            <img
              v-if="bolt12QrUrl"
              :src="bolt12QrUrl"
              class="donation__qr-img"
              alt="BOLT12 offer QR"
            />
            <div v-else class="donation__qr-placeholder">
              <span class="donation__qr-icon">⚡</span>
            </div>
          </div>
          <p class="donation__card-label">{{ $t('donation.lightning.bolt12Label') }}</p>
          <div
            class="donation__address donation__address--small"
            @click="copyText(bolt12Offer, 'bolt12')"
          >
            <span class="donation__address-text">{{ bolt12Offer.slice(0, 40) }}…</span>
            <span class="donation__copy-icon" :class="{ 'donation__copy-icon--done': copied.bolt12 }">
              <svg v-if="!copied.bolt12" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import QRCode from 'qrcode'

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps<{
  bolt12Offer: string
  btcAddress: string
  lightningAddress: string
  paypalHandle: string   // e.g. "@familycedolin"
  revolutHandle: string  // e.g. "@cedhousedj"
}>()

// ─── Amount selector ──────────────────────────────────────────────────────────
const PRESET_VALUES = [5, 10, 25, 50]

const presets = PRESET_VALUES.map(v => ({ label: `${v} €`, value: v }))

const selectedPreset = ref<number | 'custom' | null>(null)
const customAmount = ref('')

function selectPreset(val: number | 'custom') {
  selectedPreset.value = val
  if (val !== 'custom') {
    customAmount.value = ''
  }
}

function onCustomAmountChange() {
  // keep selectedPreset = 'custom' — QRs regenerate via watch(effectiveAmountEur)
}

/** The EUR amount to use for QR / invoice generation. null = no amount (free donation). */
const effectiveAmountEur = computed<number | null>(() => {
  if (selectedPreset.value === null) return null
  if (selectedPreset.value === 'custom') {
    const n = parseFloat(customAmount.value)
    return isNaN(n) || n <= 0 ? null : n
  }
  return selectedPreset.value
})

// ─── PayPal / Revolut URLs ────────────────────────────────────────────────────
const paypalUrl = computed(() => {
  const base = `https://www.paypal.com/paypalme/${props.paypalHandle.replace('@', '')}`
  return effectiveAmountEur.value ? `${base}/${effectiveAmountEur.value}` : base
})

const revolutUrl = computed(() => {
  const handle = props.revolutHandle.replace('@', '')
  return `https://revolut.me/${handle}`
})

// ─── QR helper ────────────────────────────────────────────────────────────────
async function makeQr(content: string): Promise<string> {
  return QRCode.toDataURL(content, {
    errorCorrectionLevel: 'M',
    width: 220,
    margin: 2,
    color: { dark: '#1a1a1a', light: '#ffffff' },
  })
}

// ─── BTC/EUR rate ─────────────────────────────────────────────────────────────
async function fetchBtcRate(): Promise<number | null> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
    )
    const data = await res.json()
    return data?.bitcoin?.eur ?? null
  } catch {
    return null
  }
}

// ─── On-chain QR ──────────────────────────────────────────────────────────────
const onchainQrUrl = ref<string | null>(null)
let onchainGenId = 0 // guard against stale async completions

async function generateOnchainQr() {
  const id = ++onchainGenId
  const eur = effectiveAmountEur.value
  let uri = `bitcoin:${props.btcAddress}`
  if (eur) {
    const rate = await fetchBtcRate()
    // Abort if a newer call has been issued while we were fetching
    if (id !== onchainGenId) return
    if (rate) {
      const btcAmount = (eur / rate).toFixed(8)
      uri = `bitcoin:${props.btcAddress}?amount=${btcAmount}`
    }
  }
  const qr = await makeQr(uri)
  if (id !== onchainGenId) return
  onchainQrUrl.value = qr
}

if (import.meta.client) generateOnchainQr()

watch(effectiveAmountEur, () => {
  if (import.meta.client) generateOnchainQr()
})

// ─── BOLT12 QR (static, generated once on mount) ─────────────────────────────
const bolt12QrUrl = ref<string | null>(null)

if (import.meta.client) {
  makeQr(`lightning:${props.bolt12Offer.toUpperCase()}`).then(url => {
    bolt12QrUrl.value = url
  })
}

// ─── Lightning Address / BOLT11 invoice ──────────────────────────────────────
const lnAddressQrUrl = ref<string | null>(null)
const lnInvoiceStr = ref<string | null>(null)
const lnInvoiceLoading = ref(false)
const lnInvoiceError = ref(false)
let lnGenId = 0 // guard against stale async completions

/**
 * Resolve LNURL-pay endpoint from a Lightning Address (user@domain).
 * Returns the callback URL to request an invoice from.
 */
async function lnurlPayCallback(lightningAddress: string): Promise<{ callback: string; minSendable: number; maxSendable: number } | null> {
  const [user, domain] = lightningAddress.split('@')
  if (!user || !domain) return null
  try {
    const res = await fetch(`https://${domain}/.well-known/lnurlp/${user}`)
    const data = await res.json()
    if (data.tag === 'payRequest' && data.callback) {
      return { callback: data.callback, minSendable: data.minSendable, maxSendable: data.maxSendable }
    }
    return null
  } catch {
    return null
  }
}

/** Fetch a BOLT11 invoice for the given millisatoshi amount. */
async function fetchBolt11Invoice(callback: string, msats: number): Promise<string | null> {
  try {
    const url = `${callback}${callback.includes('?') ? '&' : '?'}amount=${msats}`
    const res = await fetch(url)
    const data = await res.json()
    return data?.pr ?? null
  } catch {
    return null
  }
}

async function generateLnAddressQr() {
  const id = ++lnGenId
  lnInvoiceError.value = false
  const eur = effectiveAmountEur.value

  if (!eur) {
    // No amount selected — show plain Lightning Address QR
    lnInvoiceStr.value = null
    const qr = await makeQr(`lightning:${props.lightningAddress}`)
    if (id !== lnGenId) return
    lnAddressQrUrl.value = qr
    return
  }

  // Amount set — fetch BOLT11 invoice via LNURL-pay
  lnInvoiceLoading.value = true
  lnAddressQrUrl.value = null
  lnInvoiceStr.value = null
  try {
    const rate = await fetchBtcRate()
    if (id !== lnGenId) return
    if (!rate) throw new Error('no rate')
    const msats = Math.round((eur / rate) * 1e11) // EUR → sats → msats

    const lnpay = await lnurlPayCallback(props.lightningAddress)
    if (id !== lnGenId) return
    if (!lnpay) throw new Error('no lnurl')

    // Clamp to min/max sendable
    const clamped = Math.max(lnpay.minSendable, Math.min(lnpay.maxSendable, msats))
    const invoice = await fetchBolt11Invoice(lnpay.callback, clamped)
    if (id !== lnGenId) return
    if (!invoice) throw new Error('no invoice')

    lnInvoiceStr.value = invoice
    const qr = await makeQr(`lightning:${invoice.toUpperCase()}`)
    if (id !== lnGenId) return
    lnAddressQrUrl.value = qr
  } catch {
    if (id !== lnGenId) return
    lnInvoiceError.value = true
    // Fallback: plain lightning address QR
    lnAddressQrUrl.value = await makeQr(`lightning:${props.lightningAddress}`)
  } finally {
    if (id === lnGenId) lnInvoiceLoading.value = false
  }
}

if (import.meta.client) generateLnAddressQr()

watch(effectiveAmountEur, () => {
  if (import.meta.client) generateLnAddressQr()
})

// ─── Lightning sub-tabs ───────────────────────────────────────────────────────
type LnTab = 'address' | 'bolt12'
const lnTab = ref<LnTab>('address')

const lnTabs: { key: LnTab; labelKey: string }[] = [
  { key: 'address', labelKey: 'donation.lightning.tabAddress' },
  { key: 'bolt12',  labelKey: 'donation.lightning.tabBolt12' },
]

// ─── Copy helper ──────────────────────────────────────────────────────────────
const copied = reactive<Record<string, boolean>>({
  onchain: false,
  bolt12: false,
  lnAddress: false,
})

async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied[key] = true
    setTimeout(() => (copied[key] = false), 2500)
  } catch {}
}
</script>

<style scoped>
.donation {
  max-width: 960px;
  margin: 0 auto;
}

/* ── Amount selector ── */
.donation__amount-selector {
  margin-bottom: 2.5rem;
  text-align: center;
}

.donation__amount-label {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  margin-bottom: 0.75rem;
}

.donation__presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.donation__preset-btn {
  padding: 0.5rem 1.2rem;
  border: 2px solid var(--border-color);
  border-radius: 25px;
  background: var(--light-bg);
  color: var(--text-dark);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
  font-family: inherit;
}

.donation__preset-btn:hover {
  border-color: var(--bitcoin-orange);
  color: var(--bitcoin-orange);
}

.donation__preset-btn.active {
  border-color: var(--bitcoin-orange);
  background: var(--bitcoin-orange);
  color: #fff;
}

.donation__custom-amount {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.donation__custom-input {
  width: 100px;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--bitcoin-orange);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  color: var(--text-dark);
  background: var(--light-bg);
  text-align: right;
}

.donation__custom-input:focus {
  outline: none;
  border-color: var(--bitcoin-orange);
  box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.2);
}

.donation__custom-currency {
  font-weight: 700;
  color: var(--gray);
}

/* ── Grid ── */
.donation__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* ── Cards ── */
.donation__card {
  background: var(--light-bg);
  border: 2px solid var(--border-color);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s;
}

.donation__card:hover {
  border-color: var(--bitcoin-orange);
}

.donation__card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.donation__card-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.donation__card-title {
  font-size: 1.1rem;
  color: var(--text-dark);
  margin: 0;
}

.donation__card-label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  margin: 0;
}

.donation__card-note {
  font-size: 0.85rem;
  color: var(--gray);
  margin: 0;
}

/* ── Button ── */
.donation__btn {
  display: inline-block;
  padding: 0.65rem 1.4rem;
  background: var(--bitcoin-orange);
  color: #fff;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.2s;
  margin-top: auto;
}

.donation__btn:hover {
  opacity: 0.85;
}

/* ── QR ── */
.donation__qr-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.donation__qr-img {
  width: 160px;
  height: 160px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  display: block;
  image-rendering: pixelated;
}

.donation__qr-placeholder {
  width: 160px;
  height: 160px;
  border: 2px dashed var(--bitcoin-orange);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: var(--light-gray);
}

.donation__qr-icon {
  font-size: 2.5rem;
  color: var(--bitcoin-orange);
}

.donation__qr-text {
  font-size: 0.75rem;
  color: var(--gray);
  text-align: center;
}

/* ── Address ── */
.donation__address {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.82rem;
  word-break: break-all;
  background: var(--light-gray);
  padding: 0.65rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--text-dark);
  cursor: pointer;
  transition: border-color 0.2s;
  margin: 0;
  line-height: 1.4;
}

.donation__address:hover {
  border-color: var(--bitcoin-orange);
}

.donation__address--small {
  font-size: 0.72rem;
}

.donation__address-text {
  flex: 1;
  min-width: 0;
}

.donation__copy-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 0.5rem;
  color: var(--gray);
  transition: color 0.2s;
}

.donation__address:hover .donation__copy-icon {
  color: var(--bitcoin-orange);
}

.donation__copy-icon--done {
  color: #38a169 !important;
}

.donation__copied {
  font-size: 0.8rem;
  color: #38a169;
  font-weight: 600;
}

/* ── Lightning sub-tabs ── */
.donation__subtabs {
  display: flex;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.donation__subtab {
  flex: 1;
  padding: 0.45rem 0.5rem;
  background: var(--light-gray);
  border: none;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--gray);
  transition: background 0.2s, color 0.2s;
  font-family: inherit;
}

.donation__subtab:not(:last-child) {
  border-right: 1px solid var(--border-color);
}

.donation__subtab.active {
  background: rgba(247, 147, 26, 0.15);
  color: var(--bitcoin-orange);
}

.donation__subtab:not(.active):hover {
  background: var(--border-color);
  color: var(--text-dark);
}

/* ── Lightning panel ── */
.donation__ln-panel {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .donation__grid {
    grid-template-columns: 1fr;
  }
}
</style>
