<template>
  <div class="payment-selector">
    <!-- Selection boxes -->
    <div class="payment-selector__options">
      <button
        :class="['payment-selector__box', { active: selected === 'card', inactive: selected === 'bitcoin' }]"
        @click="select('card')"
        type="button"
      >
        <span class="payment-selector__icon">💳</span>
        <span class="payment-selector__label">{{ $t('stripePayment.label') }}</span>
      </button>
      <button
        :class="['payment-selector__box', { active: selected === 'bitcoin', inactive: selected === 'card' }]"
        @click="select('bitcoin')"
        type="button"
      >
        <span class="payment-selector__icon">₿</span>
        <span class="payment-selector__label">{{ $t('bitcoinPayment.title') }}</span>
      </button>
    </div>

    <!-- Expandable payment panels -->
    <Transition name="payment-expand">
      <div v-if="selected === 'card'" class="payment-selector__panel">
        <StripePayment v-bind="stripeProps" />
      </div>
    </Transition>

    <Transition name="payment-expand">
      <div v-if="selected === 'bitcoin'" class="payment-selector__panel">
        <BitcoinPayment v-bind="bitcoinProps" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  // StripePayment props
  type: 'consultation' | 'course'
  price: number
  duration?: string
  slug?: string
  // BitcoinPayment props
  amountEur: string
  btcAddress: string
  lightningAddress: string
  ownerEmail: string
}>()

const selected = ref<'card' | 'bitcoin' | null>(null)

function select(method: 'card' | 'bitcoin') {
  // toggle off if already selected
  selected.value = selected.value === method ? null : method
}

const stripeProps = computed(() => ({
  type: props.type,
  price: props.price,
  duration: props.duration,
  slug: props.slug,
}))

const bitcoinProps = computed(() => ({
  type: props.type,
  amountEur: props.amountEur,
  btcAddress: props.btcAddress,
  lightningAddress: props.lightningAddress,
  ownerEmail: props.ownerEmail,
}))
</script>

<style scoped>
.payment-selector {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.payment-selector__options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.payment-selector__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.9rem 0.5rem;
  background: var(--light-gray);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, opacity 0.2s, transform 0.15s;
  font-family: inherit;
}

.payment-selector__box:hover {
  border-color: var(--bitcoin-orange);
  background: var(--light-bg);
}

.payment-selector__box.active {
  border-color: var(--bitcoin-orange);
  background: rgba(247, 147, 26, 0.07);
}

.payment-selector__box.inactive {
  opacity: 0.45;
}

.payment-selector__icon {
  font-size: 1.5rem;
  line-height: 1;
}

.payment-selector__label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-dark);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.2;
  text-align: center;
}

/* Expand/collapse animation */
.payment-expand-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.payment-expand-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.payment-expand-enter-from,
.payment-expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
