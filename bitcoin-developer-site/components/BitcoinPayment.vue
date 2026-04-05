<template>
  <div class="bitcoin-payment">
    <h3 class="bitcoin-payment__title">{{ $t('bitcoinPayment.title') }}</h3>
    <p class="bitcoin-payment__subtitle">
      {{ activeTab === 'onchain' ? $t('bitcoinPayment.subtitle') : $t('bitcoinPayment.lightning.instructions.title') }}
    </p>

    <!-- Amount row -->
    <div class="bitcoin-payment__amount">
      <span class="bitcoin-payment__amount-label">{{ $t('bitcoinPayment.amount') }}:</span>
      <span class="bitcoin-payment__amount-value">€{{ amountEur }}</span>
      <template v-if="activeTab === 'onchain'">
        <span v-if="btcAmount" class="bitcoin-payment__amount-btc">
          ≈ {{ btcAmount }} BTC
          <span class="bitcoin-payment__amount-sats">({{ satsAmount }} sat)</span>
        </span>
        <span v-else-if="priceLoading" class="bitcoin-payment__price-loading">{{ $t('bitcoinPayment.priceLoading') }}</span>
        <span v-else-if="priceError" class="bitcoin-payment__price-error">{{ $t('bitcoinPayment.priceError') }}</span>
      </template>
      <template v-else>
        <span v-if="satsAmount" class="bitcoin-payment__amount-btc">
          ≈ <span class="bitcoin-payment__amount-sats">{{ satsAmount }} sat</span>
        </span>
        <span v-else-if="priceLoading" class="bitcoin-payment__price-loading">{{ $t('bitcoinPayment.priceLoading') }}</span>
      </template>
    </div>

    <!-- Main Tabs -->
    <div class="bitcoin-payment__tabs" role="tablist">
      <button
        role="tab"
        :aria-selected="activeTab === 'onchain'"
        :class="['bitcoin-payment__tab', { active: activeTab === 'onchain' }]"
        @click="setTab('onchain')"
      >
        ⛓ {{ $t('bitcoinPayment.tabOnchain') }}
      </button>
      <button
        role="tab"
        :aria-selected="activeTab === 'lightning'"
        :class="['bitcoin-payment__tab', { active: activeTab === 'lightning' }]"
        @click="setTab('lightning')"
      >
        ⚡ {{ $t('bitcoinPayment.tabLightning') }}
      </button>
    </div>

    <!-- ─── ON-CHAIN TAB ─────────────────────────────────────────────────── -->
    <div v-show="activeTab === 'onchain'" class="bitcoin-payment__panel">
      <div class="bitcoin-payment__qr-address">
        <!-- QR: BIP-21 URI with amount when available, else plain address -->
        <div class="bitcoin-payment__qr-wrap">
          <img
            v-if="onchainQrDataUrl"
            :src="onchainQrDataUrl"
            class="bitcoin-payment__qr-img"
            alt="Bitcoin on-chain QR code"
          />
          <div v-else class="bitcoin-payment__qr-placeholder">
            <div class="bitcoin-payment__qr-inner">
              <span class="bitcoin-payment__qr-icon">₿</span>
              <span class="bitcoin-payment__qr-text">
                {{ priceLoading ? $t('bitcoinPayment.qrGenerating') : $t('bitcoinPayment.qrPlaceholderText') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Address (copyable) + rate info -->
        <div class="bitcoin-payment__address-block">
          <p class="bitcoin-payment__address-label">{{ $t('bitcoinPayment.addressLabel') }}</p>
          <div
            class="bitcoin-payment__address-value"
            @click="copyText(btcAddress, 'onchainCopied')"
          >
            <span class="bitcoin-payment__address-text">{{ btcAddress }}</span>
            <span class="bitcoin-payment__copy-icon" :class="{ 'bitcoin-payment__copy-icon--done': copied.onchainCopied }">
              <svg v-if="!copied.onchainCopied" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>

          <div v-if="btcRate" class="bitcoin-payment__rate">
            1 BTC = {{ formatEur(btcRate) }} · <span class="bitcoin-payment__rate-time">{{ $t('bitcoinPayment.rateUpdated') }} {{ rateTime }}</span>
          </div>
        </div>
      </div>

      <div class="bitcoin-payment__instructions">
        <p class="bitcoin-payment__instructions-title">{{ $t('bitcoinPayment.instructions.title') }}</p>
        <ol class="bitcoin-payment__steps">
          <li>{{ $t('bitcoinPayment.instructions.step1') }}</li>
          <li>{{ $t('bitcoinPayment.instructions.step2') }}</li>
          <li>{{ $t('bitcoinPayment.instructions.step3') }}</li>
          <li>{{ $t('bitcoinPayment.instructions.step4') }}</li>
        </ol>
      </div>
    </div>

    <!-- ─── LIGHTNING TAB ─────────────────────────────────────────────────── -->
    <div v-show="activeTab === 'lightning'" class="bitcoin-payment__panel">

      <!-- ── LNAddress panel ── -->
      <div class="bitcoin-payment__subpanel">
        <div class="bitcoin-payment__qr-address">
          <div class="bitcoin-payment__qr-wrap">
            <img
              v-if="lnAddressQrUrl && !lnInvoiceLoading"
              :src="lnAddressQrUrl"
              class="bitcoin-payment__qr-img"
              alt="Lightning invoice QR code"
            />
            <div v-else class="bitcoin-payment__qr-placeholder">
              <div class="bitcoin-payment__qr-inner">
                <span class="bitcoin-payment__qr-icon">⚡</span>
                <span class="bitcoin-payment__qr-text">
                  {{ lnInvoiceLoading ? $t('bitcoinPayment.lightning.invoiceGenerating') : $t('bitcoinPayment.qrPlaceholderText') }}
                </span>
              </div>
            </div>
            <!-- Countdown under QR -->
            <div
              v-if="lnInvoicePr && !lnInvoiceLoading && lnCountdown > 0"
              :class="['bitcoin-payment__ln-countdown', { warning: lnCountdown < 120 }]"
            >
              {{ $t('bitcoinPayment.lightning.invoiceExpires') }} {{ lnCountdownFormatted }}
            </div>
            <!-- Refresh button -->
            <button
              class="bitcoin-payment__refresh"
              type="button"
              :disabled="lnInvoiceLoading"
              @click="fetchLnInvoice()"
            >
              {{ $t('bitcoinPayment.lightning.invoiceRefresh') }}
            </button>
            <!-- Error message -->
            <p v-if="lnInvoiceError" class="bitcoin-payment__ln-error">
              {{ $t('bitcoinPayment.lightning.invoiceError') }}
            </p>
          </div>
          <div class="bitcoin-payment__address-block">
            <p class="bitcoin-payment__address-label">{{ $t('bitcoinPayment.lightning.addressLabel') }}</p>
            <div
              class="bitcoin-payment__address-value"
              @click="copyText(lightningAddress, 'lnAddressCopied')"
            >
              <span class="bitcoin-payment__address-text">{{ lightningAddress }}</span>
              <span class="bitcoin-payment__copy-icon" :class="{ 'bitcoin-payment__copy-icon--done': copied.lnAddressCopied }">
                <svg v-if="!copied.lnAddressCopied" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
            </div>
            <div v-if="btcRate" class="bitcoin-payment__rate">
              1 BTC = {{ formatEur(btcRate) }} · <span class="bitcoin-payment__rate-time">{{ $t('bitcoinPayment.rateUpdated') }} {{ rateTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bitcoin-payment__instructions">
        <p class="bitcoin-payment__instructions-title">{{ $t('bitcoinPayment.lightning.instructions.title') }}</p>
        <ol class="bitcoin-payment__steps">
          <li>{{ $t('bitcoinPayment.lightning.instructions.step1') }}</li>
          <li>{{ $t('bitcoinPayment.lightning.instructions.step2') }}</li>
          <li>{{ $t('bitcoinPayment.lightning.instructions.step3') }}</li>
          <li>{{ $t('bitcoinPayment.lightning.instructions.step4') }}</li>
        </ol>
      </div>
    </div>

    <!-- ─── CONTACT FORM (shared) ────────────────────────────────────────── -->

    <!-- Toggle button (hidden after submit) -->
    <button
      v-if="!submitted"
      type="button"
      class="bitcoin-payment__form-toggle"
      @click="showForm = !showForm"
    >
      <span>{{ $t('bitcoinPayment.form.toggle') }}</span>
      <svg
        :class="['bitcoin-payment__form-toggle-chevron', { 'bitcoin-payment__form-toggle-chevron--open': showForm }]"
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
      ><polyline points="6 9 12 15 18 9"/></svg>
    </button>

    <!-- Success message (shown after submit) -->
    <p v-if="submitted" class="bitcoin-payment__form-success">
      {{ $t('bitcoinPayment.form.submitted') }}
    </p>

    <form v-show="showForm" class="bitcoin-payment__form" @submit.prevent="submitForm" novalidate>
      <p class="bitcoin-payment__form-title">{{ $t('bitcoinPayment.form.title') }}</p>

      <div class="bitcoin-payment__field">
        <label for="btc-name">{{ $t('bitcoinPayment.form.name') }}</label>
        <input
          id="btc-name"
          v-model="form.name"
          type="text"
          :placeholder="$t('bitcoinPayment.form.namePlaceholder')"
        />
      </div>

      <div class="bitcoin-payment__field">
        <label for="btc-email">{{ $t('bitcoinPayment.form.email') }} *</label>
        <input
          id="btc-email"
          v-model="form.email"
          type="email"
          :placeholder="$t('bitcoinPayment.form.emailPlaceholder')"
          required
          :class="{ 'input-error': emailTouched && !isEmailValid }"
          @blur="emailTouched = true"
        />
        <span v-if="emailTouched && !isEmailValid" class="field-error">
          {{ form.email.trim() ? $t('bitcoinPayment.form.emailInvalid') : $t('bitcoinPayment.form.emailRequired') }}
        </span>
      </div>

      <div class="bitcoin-payment__field">
        <label for="btc-note">{{ $t('bitcoinPayment.form.note') }}</label>
        <textarea
          id="btc-note"
          v-model="form.note"
          rows="3"
          :placeholder="$t('bitcoinPayment.form.notePlaceholder')"
        />
      </div>

      <p class="bitcoin-payment__contact-note">{{ $t('bitcoinPayment.form.contactNote') }}</p>

      <button type="submit" class="book-button" :disabled="!isEmailValid">{{ $t('bitcoinPayment.form.submit') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import QRCode from 'qrcode'

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps<{
  type: 'course' | 'consultation'
  amountEur: string
  btcAddress: string
  lightningAddress: string
  ownerEmail: string
}>()

const { t } = useI18n()

// ─── Main tab state ───────────────────────────────────────────────────────────
const activeTab = ref<'onchain' | 'lightning'>('onchain')

function setTab(tab: 'onchain' | 'lightning') {
  activeTab.value = tab
}

// ─── Price / on-chain state ───────────────────────────────────────────────────
const btcRate = ref<number | null>(null)
const priceLoading = ref(false)
const priceError = ref(false)
const rateTime = ref('')
const onchainQrDataUrl = ref<string | null>(null)
const lnAddressQrUrl = ref<string | null>(null)

// ─── LN invoice state (BOLT11 dinamica via LNURL-pay) ────────────────────────
const lnInvoicePr = ref<string | null>(null)
const lnInvoiceLoading = ref(false)
const lnInvoiceError = ref(false)
const lnCountdown = ref(0)
let lnCountdownTimer: ReturnType<typeof setInterval> | null = null

const eurValue = computed(() => parseFloat(props.amountEur))

const btcAmount = computed(() => {
  if (!btcRate.value || !eurValue.value) return null
  return (eurValue.value / btcRate.value).toFixed(8)
})

const satsAmount = computed(() => {
  if (!btcAmount.value) return null
  return Math.round(parseFloat(btcAmount.value) * 1e8).toLocaleString('it-IT')
})

/** BIP-21 URI — amount in BTC as required by the spec */
const bip21Uri = computed(() =>
  btcAmount.value
    ? `bitcoin:${props.btcAddress}?amount=${btcAmount.value}`
    : `bitcoin:${props.btcAddress}`
)

async function loadPrice() {
  priceLoading.value = true
  priceError.value = false
  onchainQrDataUrl.value = null

  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    btcRate.value = data?.bitcoin?.eur ?? null
    if (!btcRate.value) throw new Error('No price in response')
    rateTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    // On-chain QR: BIP-21 URI with amount pre-filled
    onchainQrDataUrl.value = await makeQr(bip21Uri.value)
    // LN Address QR: fallback plain address (no amount — BOLT11 invoice handles that)
    lnAddressQrUrl.value = await makeQr(`lightning:${props.lightningAddress}`)
  } catch (e) {
    console.error('[BitcoinPayment] price fetch error:', e)
    priceError.value = true
    // Fall back to address-only QR (no amount available)
    onchainQrDataUrl.value = await makeQr(`bitcoin:${props.btcAddress}`)
    lnAddressQrUrl.value = await makeQr(`lightning:${props.lightningAddress}`)
  } finally {
    priceLoading.value = false
  }
}

// ─── LNURL-pay / BOLT11 invoice (client-side) ────────────────────────────────
function clearLnCountdown() {
  if (lnCountdownTimer !== null) {
    clearInterval(lnCountdownTimer)
    lnCountdownTimer = null
  }
}

function startLnCountdown() {
  clearLnCountdown()
  lnCountdown.value = 600 // 10 minutes
  lnCountdownTimer = setInterval(() => {
    lnCountdown.value--
    if (lnCountdown.value <= 0) {
      clearLnCountdown()
      fetchLnInvoice() // auto-refresh when expired
    }
  }, 1000)
}

const lnCountdownFormatted = computed(() => {
  const m = Math.floor(lnCountdown.value / 60).toString().padStart(2, '0')
  const s = (lnCountdown.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

async function fetchLnInvoice() {
  // Wait for price if not yet available
  if (!btcRate.value) {
    if (!priceLoading.value) await loadPrice()
    if (!btcRate.value) {
      lnInvoiceError.value = true
      return
    }
  }

  lnInvoiceLoading.value = true
  lnInvoiceError.value = false
  lnInvoicePr.value = null
  clearLnCountdown()

  try {
    const msats = Math.round((eurValue.value / btcRate.value!) * 1e8) * 1000

    // 1. LNURL-pay metadata
    const parts = props.lightningAddress.split('@')
    if (parts.length !== 2) throw new Error('Invalid Lightning Address')
    const [username, domain] = parts
    const meta = await $fetch<{
      callback: string
      minSendable: number
      maxSendable: number
      tag: string
      status?: string
      reason?: string
    }>(`https://${domain}/.well-known/lnurlp/${username}`)

    if (meta.status === 'ERROR') throw new Error(meta.reason ?? 'LNURL error')
    if (meta.tag !== 'payRequest') throw new Error('Not a LNURL-pay endpoint')
    if (msats < meta.minSendable || msats > meta.maxSendable) {
      throw new Error(`Amount ${msats} msat out of range [${meta.minSendable}, ${meta.maxSendable}]`)
    }

    // 2. Request invoice
    const sep = meta.callback.includes('?') ? '&' : '?'
    const invoiceData = await $fetch<{ pr?: string; status?: string; reason?: string }>(
      `${meta.callback}${sep}amount=${msats}`
    )
    if (invoiceData.status === 'ERROR') throw new Error(invoiceData.reason ?? 'Invoice error')
    if (!invoiceData.pr) throw new Error('No payment request in response')

    lnInvoicePr.value = invoiceData.pr
    // Generate QR from the BOLT11 payment request
    lnAddressQrUrl.value = await makeQr(invoiceData.pr)
    startLnCountdown()
  } catch (e) {
    console.error('[BitcoinPayment] LNURL-pay error:', e)
    lnInvoiceError.value = true
    // Keep the fallback plain-address QR
  } finally {
    lnInvoiceLoading.value = false
  }
}

// Trigger invoice fetch when user navigates to the Lightning tab
watch(
  activeTab,
  (tab) => {
    if (tab === 'lightning' && !lnInvoicePr.value && !lnInvoiceLoading.value) {
      if (import.meta.client) fetchLnInvoice()
    }
  }
)

// ─── QR helper ───────────────────────────────────────────────────────────────
async function makeQr(content: string): Promise<string> {
  return QRCode.toDataURL(content, {
    errorCorrectionLevel: 'M',
    width: 256,
    margin: 2,
    color: { dark: '#1a1a1a', light: '#ffffff' },
  })
}

// ─── Copy helper ─────────────────────────────────────────────────────────────
const copied = reactive<Record<string, boolean>>({
  onchainCopied: false,
  lnAddressCopied: false,
})

async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied[key] = true
    setTimeout(() => (copied[key] = false), 2500)
  } catch {}
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatEur(n: number) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

// ─── Contact form ─────────────────────────────────────────────────────────────
const showForm = ref(false)
const submitted = ref(false)
const form = reactive({ name: '', email: '', note: '' })
const emailTouched = ref(false)

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))

function submitForm() {
  emailTouched.value = true
  if (!isEmailValid.value) return

  const payMethod = activeTab.value === 'lightning'
    ? 'Lightning (BOLT11)'
    : 'On-chain'
  const subject = encodeURIComponent(
    props.type === 'course'
      ? `[Corso Bitcoin] Conferma pagamento ${payMethod} - ${form.email}`
      : `[Consulenza Bitcoin] Conferma pagamento ${payMethod} - ${form.email}`
  )
  const body = encodeURIComponent(
    (form.name.trim() ? `Nome: ${form.name}\n` : '') +
    `Email: ${form.email}\nImporto EUR: €${props.amountEur}` +
    (btcAmount.value ? `\nImporto BTC: ${btcAmount.value} BTC (${satsAmount.value} sat)` : '') +
    `\nMetodo: ${payMethod}` +
    (activeTab.value === 'onchain'
      ? `\nIndirizzo: ${props.btcAddress}`
      : `\nLightning Address: ${props.lightningAddress}`) +
    (form.note ? `\n\nNote:\n${form.note}` : '')
  )
  window.location.href = `mailto:${props.ownerEmail}?subject=${subject}&body=${body}`
  submitted.value = true
  showForm.value = false
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  if (import.meta.client) loadPrice()
})

onUnmounted(() => {
  clearLnCountdown()
})

watch(() => props.btcAddress, () => {
  if (import.meta.client) loadPrice()
})
</script>

<style scoped>
.bitcoin-payment {
  background: var(--light-bg);
  border: 2px solid var(--bitcoin-orange);
  border-radius: 15px;
  padding: 2rem;
  margin-top: 2rem;
}

.bitcoin-payment__title {
  font-size: 1.6rem;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.bitcoin-payment__subtitle {
  color: var(--gray);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* Amount row */
.bitcoin-payment__amount {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  padding: 0.75rem 1rem;
  background: var(--light-gray);
  border-radius: 8px;
}
.bitcoin-payment__amount-label { color: var(--gray); font-size: 1rem; }
.bitcoin-payment__amount-value { font-size: 2rem; font-weight: bold; color: var(--bitcoin-orange); }
.bitcoin-payment__amount-btc   { font-size: 1rem; color: var(--text-dark); }
.bitcoin-payment__amount-sats  { color: var(--gray); font-size: 0.9rem; }
.bitcoin-payment__price-loading,
.bitcoin-payment__price-error  { font-size: 0.85rem; color: var(--gray); font-style: italic; }
.bitcoin-payment__price-error  { color: #e53e3e; }

/* Main Tabs */
.bitcoin-payment__tabs {
  display: flex;
  gap: 0;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}
.bitcoin-payment__tab {
  flex: 1;
  padding: 0.75rem 1rem;
  background: var(--light-gray);
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--gray);
  transition: background 0.2s, color 0.2s;
}
.bitcoin-payment__tab:first-child { border-right: 1px solid var(--border-color); }
.bitcoin-payment__tab.active {
  background: var(--bitcoin-orange);
  color: #fff;
}
.bitcoin-payment__tab:not(.active):hover {
  background: var(--border-color);
  color: var(--text-dark);
}

/* Info banners */
.bitcoin-payment__ln-info {
  font-size: 0.85rem;
  color: var(--gray);
  background: var(--light-gray);
  border-radius: 8px;
  padding: 0.6rem 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}
.bitcoin-payment__ln-info--warn {
  color: #b45309;
  background: #fef3c7;
  border: 1px solid #fde68a;
}

/* QR + address layout */
.bitcoin-payment__qr-address {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.bitcoin-payment__qr-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.bitcoin-payment__qr-img {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  display: block;
  image-rendering: pixelated;
}
.bitcoin-payment__qr-placeholder {
  width: 200px;
  height: 200px;
  border: 2px dashed var(--bitcoin-orange);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light-gray);
}
.bitcoin-payment__qr-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray);
  text-align: center;
  padding: 0.5rem;
}
.bitcoin-payment__qr-icon { font-size: 2.5rem; color: var(--bitcoin-orange); }
.bitcoin-payment__qr-text { font-size: 0.8rem; line-height: 1.3; }

/* Lightning countdown */
.bitcoin-payment__ln-countdown {
  font-size: 0.8rem;
  color: var(--gray);
  text-align: center;
}
.bitcoin-payment__ln-countdown.warning { color: #e53e3e; font-weight: 600; }

.bitcoin-payment__ln-error {
  font-size: 0.8rem;
  color: #e53e3e;
  margin-top: 0.5rem;
}

.bitcoin-payment__refresh {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  color: var(--gray);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  width: 100%;
}
.bitcoin-payment__refresh:hover:not(:disabled) { color: var(--bitcoin-orange); border-color: var(--bitcoin-orange); }
.bitcoin-payment__refresh:disabled { opacity: 0.5; cursor: not-allowed; }

.bitcoin-payment__copy-btn {
  margin-top: 0.5rem;
  background: none;
  border: 1px solid var(--bitcoin-orange);
  border-radius: 20px;
  padding: 0.35rem 0.9rem;
  font-size: 0.82rem;
  color: var(--bitcoin-orange);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.bitcoin-payment__copy-btn:hover { background: var(--bitcoin-orange); color: #fff; }

/* Address block */
.bitcoin-payment__address-block {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.bitcoin-payment__address-label {
  font-size: 0.8rem;
  color: var(--gray);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}
.bitcoin-payment__address-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.9rem;
  word-break: break-all;
  background: var(--light-gray);
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  color: var(--text-dark);
  cursor: pointer;
  transition: border-color 0.2s;
  margin: 0;
}
.bitcoin-payment__address-value:hover { border-color: var(--bitcoin-orange); }
.bitcoin-payment__address-value--small { font-size: 0.75rem; }
.bitcoin-payment__address-value--muted { color: var(--gray); cursor: default; font-size: 0.85rem; }
.bitcoin-payment__address-value--muted:hover { border-color: var(--border-color); }

.bitcoin-payment__address-text {
  flex: 1;
  min-width: 0;
}

.bitcoin-payment__copy-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 0.5rem;
  color: var(--gray);
  transition: color 0.2s;
}
.bitcoin-payment__address-value:hover .bitcoin-payment__copy-icon {
  color: var(--bitcoin-orange);
}
.bitcoin-payment__copy-icon--done {
  color: #38a169 !important;
}

.bitcoin-payment__copied { font-size: 0.8rem; color: #38a169; font-weight: 600; }
.bitcoin-payment__rate { font-size: 0.8rem; color: var(--gray); margin-top: 0.25rem; }
.bitcoin-payment__rate-time { font-style: italic; }

/* Instructions */
.bitcoin-payment__instructions { margin-bottom: 1.5rem; }
.bitcoin-payment__instructions-title { font-weight: 600; margin-bottom: 0.5rem; color: var(--text-dark); }
.bitcoin-payment__steps { padding-left: 1.5rem; color: var(--gray); font-size: 0.95rem; }
.bitcoin-payment__steps li { padding: 0.3rem 0; }

/* Form */
.bitcoin-payment__form { padding-top: 1.5rem; margin-top: 0.5rem; }

/* Toggle button */
.bitcoin-payment__form-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: none;
  border: 1.5px solid var(--bitcoin-orange);
  border-radius: 8px;
  color: var(--bitcoin-orange);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: inherit;
}
.bitcoin-payment__form-toggle:hover {
  background: var(--bitcoin-orange);
  color: #fff;
}
.bitcoin-payment__form-toggle-chevron {
  flex-shrink: 0;
  transition: transform 0.25s ease;
}
.bitcoin-payment__form-toggle-chevron--open {
  transform: rotate(180deg);
}

/* Success message */
.bitcoin-payment__form-success {
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: #f0fff4;
  border: 1.5px solid #38a169;
  border-radius: 8px;
  color: #276749;
  font-size: 0.92rem;
  font-weight: 600;
}
.bitcoin-payment__form-title { font-size: 1.1rem; font-weight: 600; color: var(--text-dark); margin-bottom: 1rem; }
.bitcoin-payment__field { margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.3rem; }
.bitcoin-payment__field label { font-size: 0.9rem; font-weight: 600; color: var(--text-dark); }
.bitcoin-payment__field input,
.bitcoin-payment__field textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  color: var(--text-dark);
  background: var(--light-bg);
  transition: border-color 0.2s;
}
.bitcoin-payment__field input:focus,
.bitcoin-payment__field textarea:focus { outline: none; border-color: var(--bitcoin-orange); }
.bitcoin-payment__field input.input-error { border-color: #e53e3e; }
.field-error { font-size: 0.8rem; color: #e53e3e; }

.bitcoin-payment__contact-note {
  font-size: 0.85rem;
  color: var(--gray);
  background: var(--light-gray);
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  border-left: 3px solid var(--bitcoin-orange);
}

.book-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .bitcoin-payment__qr-address { flex-direction: column; align-items: center; }
  .bitcoin-payment__address-block { width: 100%; }
}
</style>
