<template>
  <div class="stripe-payment">
    <button
      class="stripe-payment__button"
      :disabled="loading"
      @click="checkout"
    >
      <span v-if="loading" class="stripe-payment__spinner" />
      <span v-else class="stripe-payment__icon">💳</span>
      {{ loading ? $t('stripePayment.processing') : $t('stripePayment.button') }}
    </button>
    <p v-if="error" class="stripe-payment__error">{{ $t('stripePayment.error') }}</p>
    <p class="stripe-payment__note">{{ $t('stripePayment.note') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  type: 'consultation' | 'course'
  price: number
  duration?: string   // solo per consulenze: '30min' | '60min'
  slug?: string       // solo per corsi: es. 'introduzione-bitcoin'
}>()

const { t } = useI18n()
const loading = ref(false)
const error = ref(false)

const PAYMENT_LINKS: Record<string, string> = {
  'consultation-30min': 'https://buy.stripe.com/cNiaEX5usbAveKC0oN9EI00',
  'consultation-60min': 'https://buy.stripe.com/aFa3cv6ywcEz7iab3r9EI03',
  'consultation-3h': 'https://buy.stripe.com/14AcN5cWUgUPdGyc7v9EI02',
  'course-introduzione-bitcoin': 'https://buy.stripe.com/3cI9AT5us1ZV6e6gnL9EI01',
  'course-approfondimento-bitcoin': 'https://buy.stripe.com/dRmaEX5us0VRcCudbz9EI04',
}

const paymentLink = computed(() => {
  const key = props.type === 'course'
    ? `course-${props.slug}`
    : `consultation-${props.duration}`
  return PAYMENT_LINKS[key] ?? null
})

function checkout() {
  if (!paymentLink.value || loading.value) return
  if (!paymentLink.value) {
    error.value = true
    return
  }
  loading.value = true
  error.value = false
  window.location.href = paymentLink.value
}
</script>

<style scoped>
.stripe-payment {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stripe-payment__label {
  font-size: 0.85rem;
  color: var(--gray);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.stripe-payment__button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem 1.5rem;
  background: #635bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}
.stripe-payment__button:hover:not(:disabled) {
  background: #4f46e5;
}
.stripe-payment__button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.stripe-payment__icon {
  font-size: 1.1rem;
}

.stripe-payment__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.stripe-payment__error {
  font-size: 0.85rem;
  color: #e53e3e;
  margin: 0;
}

.stripe-payment__note {
  font-size: 0.78rem;
  color: var(--gray);
  margin: 0;
}
</style>
