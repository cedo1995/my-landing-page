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
          <p
            class="bitcoin-payment__address-value"
            @click="copyText(btcAddress, 'onchainCopied')"
            :title="$t('bitcoinPayment.copyAddress')"
          >
            {{ btcAddress }}
          </p>
          <span v-if="copied.onchainCopied" class="bitcoin-payment__copied">✓ {{ $t('bitcoinPayment.copied') }}</span>

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

      <!-- Lightning sub-tabs -->
      <div class="bitcoin-payment__subtabs" role="tablist">
        <button
          role="tab"
          :aria-selected="lnSubTab === 'lnaddress'"
          :class="['bitcoin-payment__subtab', { active: lnSubTab === 'lnaddress' }]"
          @click="setLnSubTab('lnaddress')"
        >
          ⚡ {{ $t('bitcoinPayment.lightning.subTabLnAddress') }}
        </button>
        <button
          role="tab"
          :aria-selected="lnSubTab === 'bolt11'"
          :class="['bitcoin-payment__subtab', { active: lnSubTab === 'bolt11' }]"
          @click="setLnSubTab('bolt11')"
        >
          {{ $t('bitcoinPayment.lightning.subTabBolt11') }}
        </button>
        <button
          role="tab"
          :aria-selected="lnSubTab === 'bolt12'"
          :class="['bitcoin-payment__subtab', { active: lnSubTab === 'bolt12' }]"
          @click="setLnSubTab('bolt12')"
        >
          {{ $t('bitcoinPayment.lightning.subTabBolt12') }}
        </button>
      </div>

      <!-- ── LNAddress sub-panel ── -->
      <div v-show="lnSubTab === 'lnaddress'" class="bitcoin-payment__subpanel">
        <div class="bitcoin-payment__qr-address">
          <div class="bitcoin-payment__qr-wrap">
            <img
              v-if="lnAddressQrUrl"
              :src="lnAddressQrUrl"
              class="bitcoin-payment__qr-img"
              alt="Lightning Address QR code"
            />
            <div v-else class="bitcoin-payment__qr-placeholder">
              <div class="bitcoin-payment__qr-inner">
                <span class="bitcoin-payment__qr-icon">⚡</span>
                <span class="bitcoin-payment__qr-text">{{ priceLoading ? $t('bitcoinPayment.qrGenerating') : $t('bitcoinPayment.qrPlaceholderText') }}</span>
              </div>
            </div>
          </div>
          <div class="bitcoin-payment__address-block">
            <p class="bitcoin-payment__address-label">{{ $t('bitcoinPayment.lightning.addressLabel') }}</p>
            <p
              class="bitcoin-payment__address-value"
              @click="copyText(lightningAddress, 'lnAddressCopied')"
              :title="$t('bitcoinPayment.copyAddress')"
            >
              {{ lightningAddress }}
            </p>
            <span v-if="copied.lnAddressCopied" class="bitcoin-payment__copied">✓ {{ $t('bitcoinPayment.lightning.copied') }}</span>
            <div v-if="btcRate" class="bitcoin-payment__rate">
              1 BTC = {{ formatEur(btcRate) }} · <span class="bitcoin-payment__rate-time">{{ $t('bitcoinPayment.rateUpdated') }} {{ rateTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BOLT11 sub-panel ── -->
      <div v-show="lnSubTab === 'bolt11'" class="bitcoin-payment__subpanel">
        <p class="bitcoin-payment__ln-info bitcoin-payment__ln-info--warn">{{ $t('bitcoinPayment.lightning.bolt11Warning') }}</p>
        <div class="bitcoin-payment__qr-address">
          <div class="bitcoin-payment__qr-wrap">
            <img
              v-if="lnInvoiceQrUrl && !lnExpired"
              :src="lnInvoiceQrUrl"
              class="bitcoin-payment__qr-img"
              alt="Lightning BOLT11 invoice QR code"
            />
            <div v-else-if="lnLoading" class="bitcoin-payment__qr-placeholder">
              <div class="bitcoin-payment__qr-inner">
                <span class="bitcoin-payment__qr-icon">⚡</span>
                <span class="bitcoin-payment__qr-text">{{ $t('bitcoinPayment.lightning.fetchingInvoice') }}</span>
              </div>
            </div>
            <div v-else class="bitcoin-payment__qr-placeholder bitcoin-payment__qr-placeholder--error">
              <div class="bitcoin-payment__qr-inner">
                <span class="bitcoin-payment__qr-icon">⚠️</span>
                <span class="bitcoin-payment__qr-text">{{ lnExpired ? $t('bitcoinPayment.lightning.expired') : $t('bitcoinPayment.lightning.invoiceError') }}</span>
              </div>
            </div>
            <!-- Countdown -->
            <div v-if="lnInvoiceQrUrl && !lnExpired && lnSecondsLeft !== null" class="bitcoin-payment__ln-countdown" :class="{ warning: lnSecondsLeft < 60 }">
              {{ $t('bitcoinPayment.lightning.expires') }} {{ lnSecondsLeft }}s
            </div>
            <button class="bitcoin-payment__refresh" type="button" :disabled="lnLoading" @click="fetchLnInvoice">
              ↻ {{ $t('bitcoinPayment.lightning.retryInvoice') }}
            </button>
          </div>
          <div class="bitcoin-payment__address-block">
            <p class="bitcoin-payment__address-label">{{ $t('bitcoinPayment.lightning.invoiceLabel') }}</p>
            <p
              v-if="lnInvoice && !lnExpired"
              class="bitcoin-payment__address-value bitcoin-payment__address-value--small"
              @click="copyText(lnInvoice, 'invoiceCopied')"
              :title="$t('bitcoinPayment.lightning.copyInvoice')"
            >
              {{ lnInvoice.slice(0, 40) }}…
            </p>
            <p v-else-if="lnLoading" class="bitcoin-payment__address-value bitcoin-payment__address-value--muted">
              {{ $t('bitcoinPayment.lightning.fetchingInvoice') }}
            </p>
            <p v-else class="bitcoin-payment__address-value bitcoin-payment__address-value--muted">
              {{ lnExpired ? $t('bitcoinPayment.lightning.expired') : $t('bitcoinPayment.lightning.invoiceError') }}
            </p>
            <span v-if="copied.invoiceCopied" class="bitcoin-payment__copied">✓ {{ $t('bitcoinPayment.lightning.invoiceCopied') }}</span>
            <button
              v-if="lnInvoice && !lnExpired"
              class="bitcoin-payment__copy-btn"
              type="button"
              @click="copyText(lnInvoice, 'invoiceCopied')"
            >
              {{ $t('bitcoinPayment.lightning.copyInvoice') }}
            </button>
            <div v-if="lnError" class="bitcoin-payment__ln-error">
              {{ $t('bitcoinPayment.lightning.invoiceErrorDetail') }}
            </div>
            <div v-if="btcRate" class="bitcoin-payment__rate">
              1 BTC = {{ formatEur(btcRate) }} · <span class="bitcoin-payment__rate-time">{{ $t('bitcoinPayment.rateUpdated') }} {{ rateTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BOLT12 sub-panel ── -->
      <div v-show="lnSubTab === 'bolt12'" class="bitcoin-payment__subpanel">
        <p class="bitcoin-payment__ln-info">{{ $t('bitcoinPayment.lightning.bolt12Info') }}</p>
        <div class="bitcoin-payment__qr-address">
          <div class="bitcoin-payment__qr-wrap">
            <img
              v-if="bolt12QrUrl"
              :src="bolt12QrUrl"
              class="bitcoin-payment__qr-img"
              alt="BOLT12 offer QR code"
            />
            <div v-else class="bitcoin-payment__qr-placeholder bitcoin-payment__qr-placeholder--error">
              <div class="bitcoin-payment__qr-inner">
                <span class="bitcoin-payment__qr-icon">⚠️</span>
                <span class="bitcoin-payment__qr-text">{{ $t('bitcoinPayment.lightning.bolt12Unavailable') }}</span>
              </div>
            </div>
          </div>
          <div v-if="bolt12Offer" class="bitcoin-payment__address-block">
            <p class="bitcoin-payment__address-label">{{ $t('bitcoinPayment.lightning.bolt12Label') }}</p>
            <p
              class="bitcoin-payment__address-value bitcoin-payment__address-value--small"
              @click="copyText(bolt12Offer, 'bolt12Copied')"
              :title="$t('bitcoinPayment.copyAddress')"
            >
              {{ bolt12Offer.slice(0, 40) }}…
            </p>
            <span v-if="copied.bolt12Copied" class="bitcoin-payment__copied">✓ {{ $t('bitcoinPayment.lightning.copied') }}</span>
            <button class="bitcoin-payment__copy-btn" type="button" @click="copyText(bolt12Offer, 'bolt12Copied')">
              {{ $t('bitcoinPayment.lightning.copyValue') }}
            </button>
          </div>
          <div v-else class="bitcoin-payment__address-block">
            <p class="bitcoin-payment__address-value bitcoin-payment__address-value--muted">{{ $t('bitcoinPayment.lightning.bolt12Unavailable') }}</p>
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
    <form class="bitcoin-payment__form" @submit.prevent="submitForm" novalidate>
      <p class="bitcoin-payment__form-title">{{ $t('bitcoinPayment.form.title') }}</p>

      <div class="bitcoin-payment__field">
        <label for="btc-name">{{ $t('bitcoinPayment.form.name') }} *</label>
        <input
          id="btc-name"
          v-model="form.name"
          type="text"
          :placeholder="$t('bitcoinPayment.form.namePlaceholder')"
          required
          :class="{ 'input-error': errors.name }"
        />
        <span v-if="errors.name" class="field-error">{{ $t('bitcoinPayment.form.nameRequired') }}</span>
      </div>

      <div class="bitcoin-payment__field">
        <label for="btc-email">{{ $t('bitcoinPayment.form.email') }} *</label>
        <input
          id="btc-email"
          v-model="form.email"
          type="email"
          :placeholder="$t('bitcoinPayment.form.emailPlaceholder')"
          required
          :class="{ 'input-error': errors.email }"
        />
        <span v-if="errors.email" class="field-error">{{ $t('bitcoinPayment.form.emailRequired') }}</span>
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

      <button type="submit" class="book-button">{{ $t('bitcoinPayment.form.submit') }}</button>
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
  bolt12Offer?: string
  ownerEmail: string
}>()

const { t } = useI18n()

// ─── Main tab state ───────────────────────────────────────────────────────────
const activeTab = ref<'onchain' | 'lightning'>('onchain')

function setTab(tab: 'onchain' | 'lightning') {
  activeTab.value = tab
  if (tab === 'lightning' && lnSubTab.value === 'bolt11' && !lnInvoice.value && !lnLoading.value) {
    fetchLnInvoice()
  }
}

// ─── Lightning sub-tab state ──────────────────────────────────────────────────
const lnSubTab = ref<'lnaddress' | 'bolt11' | 'bolt12'>('lnaddress')

function setLnSubTab(sub: 'lnaddress' | 'bolt11' | 'bolt12') {
  lnSubTab.value = sub
  if (sub === 'bolt11' && !lnInvoice.value && !lnLoading.value) {
    fetchLnInvoice()
  }
}

// ─── Price / on-chain state ───────────────────────────────────────────────────
const btcRate = ref<number | null>(null)
const priceLoading = ref(false)
const priceError = ref(false)
const rateTime = ref('')
const onchainQrDataUrl = ref<string | null>(null)
const lnAddressQrUrl = ref<string | null>(null)
const bolt12QrUrl = ref<string | null>(null)

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
    // LN Address QR: encode the lightning address URI so wallets open it directly
    lnAddressQrUrl.value = await makeQr(`lightning:${props.lightningAddress}`)
    // BOLT12 QR
    if (props.bolt12Offer) {
      bolt12QrUrl.value = await makeQr(`lightning:${props.bolt12Offer.toUpperCase()}`)
    }
  } catch (e) {
    console.error('[BitcoinPayment] price fetch error:', e)
    priceError.value = true
    // Fall back to address-only QR
    onchainQrDataUrl.value = await makeQr(`bitcoin:${props.btcAddress}`)
    lnAddressQrUrl.value = await makeQr(`lightning:${props.lightningAddress}`)
  } finally {
    priceLoading.value = false
  }
}

// ─── Lightning / BOLT11 invoice state ────────────────────────────────────────
const lnInvoice = ref<string | null>(null)
const lnInvoiceQrUrl = ref<string | null>(null)
const lnLoading = ref(false)
const lnError = ref(false)
const lnExpired = ref(false)
const lnSecondsLeft = ref<number | null>(null)
let lnCountdownTimer: ReturnType<typeof setInterval> | null = null

/**
 * Chiama il backend (/api/ln-invoice) che esegue il flusso LNURL-pay (LUD-16)
 * server-side e restituisce la BOLT11 invoice già impostata con l'importo corretto.
 */
async function fetchLnInvoice() {
  lnLoading.value = true
  lnError.value = false
  lnExpired.value = false
  lnInvoice.value = null
  lnInvoiceQrUrl.value = null
  lnSecondsLeft.value = null
  if (lnCountdownTimer) clearInterval(lnCountdownTimer)

  try {
    const data = await $fetch<{ pr: string; msats: number; btcRate: number }>(
      '/api/ln-invoice',
      {
        method: 'POST',
        body: {
          lightningAddress: props.lightningAddress,
          amountEur: parseFloat(props.amountEur),
        },
      }
    )

    // Aggiorna il rate anche nel componente se non era ancora disponibile
    if (!btcRate.value) {
      btcRate.value = data.btcRate
      rateTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    lnInvoice.value = data.pr
    lnInvoiceQrUrl.value = await makeQr(`lightning:${data.pr.toUpperCase()}`)

    lnSecondsLeft.value = 600
    startCountdown()
  } catch (e) {
    console.error('[BitcoinPayment] Lightning invoice error:', e)
    lnError.value = true
  } finally {
    lnLoading.value = false
  }
}

function startCountdown() {
  lnCountdownTimer = setInterval(() => {
    if (lnSecondsLeft.value === null) return
    lnSecondsLeft.value--
    if (lnSecondsLeft.value <= 0) {
      lnExpired.value = true
      lnSecondsLeft.value = null
      if (lnCountdownTimer) clearInterval(lnCountdownTimer)
    }
  }, 1000)
}

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
  invoiceCopied: false,
  lnAddressCopied: false,
  bolt12Copied: false,
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
const form = reactive({ name: '', email: '', note: '' })
const errors = reactive({ name: false, email: false })

function submitForm() {
  errors.name = !form.name.trim()
  errors.email = !form.email.trim()
  if (errors.name || errors.email) return

  const payMethod = activeTab.value === 'lightning'
    ? `Lightning (${lnSubTab.value.toUpperCase()})`
    : 'On-chain'
  const subject = encodeURIComponent(
    props.type === 'course'
      ? `[Corso Bitcoin] Conferma pagamento ${payMethod} - ${form.name}`
      : `[Consulenza Bitcoin] Conferma pagamento ${payMethod} - ${form.name}`
  )
  const body = encodeURIComponent(
    `Nome: ${form.name}\nEmail: ${form.email}\nImporto EUR: €${props.amountEur}` +
    (btcAmount.value ? `\nImporto BTC: ${btcAmount.value} BTC (${satsAmount.value} sat)` : '') +
    `\nMetodo: ${payMethod}` +
    (activeTab.value === 'onchain'
      ? `\nIndirizzo: ${props.btcAddress}`
      : lnSubTab.value === 'bolt11' && lnInvoice.value
        ? `\nInvoice: ${lnInvoice.value}`
        : `\nLightning Address: ${props.lightningAddress}`) +
    (form.note ? `\n\nNote:\n${form.note}` : '')
  )
  window.location.href = `mailto:${props.ownerEmail}?subject=${subject}&body=${body}`
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  if (import.meta.client) loadPrice()
})

onUnmounted(() => {
  if (lnCountdownTimer) clearInterval(lnCountdownTimer)
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

/* Lightning sub-tabs */
.bitcoin-payment__subtabs {
  display: flex;
  gap: 0;
  margin-bottom: 1.25rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}
.bitcoin-payment__subtab {
  flex: 1;
  padding: 0.55rem 0.75rem;
  background: var(--light-gray);
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gray);
  transition: background 0.2s, color 0.2s;
}
.bitcoin-payment__subtab:not(:last-child) { border-right: 1px solid var(--border-color); }
.bitcoin-payment__subtab.active {
  background: #f7931a33;
  color: var(--bitcoin-orange);
}
.bitcoin-payment__subtab:not(.active):hover {
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
.bitcoin-payment__qr-placeholder--error {
  border-color: #e53e3e;
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

.bitcoin-payment__copied { font-size: 0.8rem; color: #38a169; font-weight: 600; }
.bitcoin-payment__rate { font-size: 0.8rem; color: var(--gray); margin-top: 0.25rem; }
.bitcoin-payment__rate-time { font-style: italic; }

/* Instructions */
.bitcoin-payment__instructions { margin-bottom: 1.5rem; }
.bitcoin-payment__instructions-title { font-weight: 600; margin-bottom: 0.5rem; color: var(--text-dark); }
.bitcoin-payment__steps { padding-left: 1.5rem; color: var(--gray); font-size: 0.95rem; }
.bitcoin-payment__steps li { padding: 0.3rem 0; }

/* Form */
.bitcoin-payment__form { border-top: 1px solid var(--border-color); padding-top: 1.5rem; margin-top: 0.5rem; }
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

@media (max-width: 600px) {
  .bitcoin-payment__qr-address { flex-direction: column; align-items: center; }
  .bitcoin-payment__address-block { width: 100%; }
}
</style>
