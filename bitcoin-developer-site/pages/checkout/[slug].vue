<template>
  <div>
    <SiteHeader />

    <main class="checkout-page">
      <div class="container checkout-layout">

        <!-- LEFT COLUMN: order summary + form -->
        <div class="checkout-left">

          <!-- Back link -->
          <NuxtLink :to="localePath('/courses')" class="back-link">
            {{ $t('courses.backToList') }}
          </NuxtLink>

          <!-- Order summary -->
          <div class="checkout-summary">
            <h2 class="checkout-summary__heading">{{ $t('checkout.orderSummary') }}</h2>
            <div class="checkout-summary__card">
              <div class="checkout-summary__badge">Bitcoin</div>
              <h3 class="checkout-summary__title">{{ $t(course.titleKey) }}</h3>
              <div class="checkout-summary__price">€{{ course.price }}</div>
              <p class="checkout-summary__includes-label">{{ $t('checkout.summary.includes') }}</p>
              <ul class="checkout-summary__includes">
                <li v-for="(item, i) in includesList" :key="i">{{ item }}</li>
              </ul>
            </div>
          </div>

          <!-- Form -->
          <div class="checkout-form-block">
            <div class="checkout-form__field">
              <label for="checkout-email">{{ $t('checkout.form.email') }} *</label>
              <input
                id="checkout-email"
                v-model="email"
                type="email"
                :placeholder="$t('checkout.form.emailPlaceholder')"
                :class="['checkout-form__input', { 'checkout-form__input--error': emailTouched && !isEmailValid }]"
                @blur="emailTouched = true"
              />
              <span v-if="emailTouched && !isEmailValid" class="checkout-form__error">
                {{ $t('checkout.form.emailError') }}
              </span>
            </div>

            <div class="checkout-form__field checkout-form__field--checkbox">
              <label class="checkout-form__checkbox-label">
                <input
                  v-model="privacyAccepted"
                  type="checkbox"
                  class="checkout-form__checkbox"
                />
                <span>
                  {{ $t('checkout.form.privacy') }}
                  <NuxtLink :to="localePath('/privacy')" class="checkout-privacy-link" target="_blank">{{ $t('checkout.form.privacyLink') }}</NuxtLink>
                </span>
              </label>
              <span v-if="privacyTouched && !privacyAccepted" class="checkout-form__error">
                {{ $t('checkout.form.privacyRequired') }}
              </span>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: payment methods -->
        <div class="checkout-right">
          <h2 class="checkout-right__heading">{{ $t('checkout.title') }}</h2>
          <p class="checkout-right__subtitle">{{ $t('checkout.subtitle') }}</p>

          <div :class="['checkout-payment-wrap', { 'checkout-payment-wrap--disabled': !isFormValid }]" @click.capture="handlePaymentClick">

            <!-- Stripe -->
            <div class="checkout-payment-section">
              <p class="checkout-payment-section__label">💳 {{ $t('checkout.payCard') }}</p>
              <StripePayment
                type="course"
                :price="course.price"
                :slug="course.stripeSlug"
              />
            </div>

            <!-- Divider -->
            <div class="checkout-payment-divider">
              <span>{{ $t('courses.detail.orPayWith') }}</span>
            </div>

            <!-- Bitcoin -->
            <div class="checkout-payment-section">
              <p class="checkout-payment-section__label">₿ {{ $t('checkout.payBitcoin') }}</p>
              <BitcoinPayment
                type="course"
                :amountEur="String(course.price)"
                btcAddress="bc1qv0dpmn5ec4kkzsl458p0zmq25yyr55fjmhp3w8"
                lightningAddress="whitepatch439@walletofsatoshi.com"
                ownerEmail="roberto.cedo@gmail.com"
              />
            </div>

          </div>

          <!-- Hint shown when form is incomplete -->
          <p v-if="!isFormValid" class="checkout-hint">
            {{ $t('checkout.form.privacyRequired') }}
          </p>
        </div>

      </div>
    </main>

    <footer id="contact">
      <div class="container">
        <div class="footer-content">
          <div>
            <p>{{ $t('footer.rights') }}</p>
            <div class="footer-legal">
              <NuxtLink :to="localePath('/privacy')">{{ $t('footer.legal.privacy') }}</NuxtLink>
              <span>·</span>
              <NuxtLink :to="localePath('/terms')">{{ $t('footer.legal.terms') }}</NuxtLink>
            </div>
          </div>
          <div class="social-links">
            <a href="https://x.com/CedolinRoberto" target="_blank" rel="noopener noreferrer">{{ $t('footer.social.x') }}</a>
            <a href="https://www.linkedin.com/in/roberto-cedolin/" target="_blank" rel="noopener noreferrer">{{ $t('footer.social.linkedin') }}</a>
            <a href="https://www.youtube.com/@roberto_cedolin" target="_blank" rel="noopener noreferrer">{{ $t('footer.social.youtube') }}</a>
            <a href="https://www.instagram.com/roberto_cedolin/" target="_blank" rel="noopener noreferrer">{{ $t('footer.social.instagram') }}</a>
            <a href="https://www.tiktok.com/@roberto_cedolin" target="_blank" rel="noopener noreferrer">{{ $t('footer.social.tiktok') }}</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

// ─── Course config ─────────────────────────────────────────────────────────────
interface CourseConfig {
  titleKey: string
  price: number
  stripeSlug: string
  includesKeys: string[]
}

const COURSES: Record<string, CourseConfig> = {
  'introduzione-bitcoin': {
    titleKey: 'courses.corsoBase.title',
    price: 400,
    stripeSlug: 'corso-base',
    includesKeys: [
      'courses.detail.includesList.0',
      'courses.detail.includesList.1',
      'courses.detail.includesList.2',
      'courses.detail.includesList.3',
      'courses.detail.includesList.4',
    ],
  },
  'approfondimento-bitcoin': {
    titleKey: 'courses.approfondimentoBitcoin.title',
    price: 800,
    stripeSlug: 'approfondimento-bitcoin',
    includesKeys: [
      'courses.detail.includesListAdvanced.0',
      'courses.detail.includesListAdvanced.1',
      'courses.detail.includesListAdvanced.2',
      'courses.detail.includesListAdvanced.3',
      'courses.detail.includesListAdvanced.4',
    ],
  },
}

// ─── Guard: redirect to 404 if slug not recognised ────────────────────────────
const slug = route.params.slug as string
if (!COURSES[slug]) {
  await navigateTo('/404')
}

const course = COURSES[slug]!

// ─── Includes list ─────────────────────────────────────────────────────────────
const includesList = computed<string[]>(() =>
  course.includesKeys.map(key => t(key))
)

// ─── Form state ────────────────────────────────────────────────────────────────
const email = ref('')
const privacyAccepted = ref(false)
const emailTouched = ref(false)
const privacyTouched = ref(false)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => EMAIL_REGEX.test(email.value.trim()))
const isFormValid = computed(() => isEmailValid.value && privacyAccepted.value)

// ─── Block interaction with payment methods until form is valid ───────────────
function handlePaymentClick(event: MouseEvent) {
  if (!isFormValid.value) {
    event.stopPropagation()
    event.preventDefault()
    // Touch both fields to show validation errors
    emailTouched.value = true
    privacyTouched.value = true
  }
}

// ─── SEO ──────────────────────────────────────────────────────────────────────
useHead({
  title: () => `${t('checkout.title')} — ${t(course.titleKey)} | ${t('seo.title')}`,
})
</script>

<style scoped>
.checkout-page {
  background: var(--light-bg);
  min-height: 80vh;
  padding: 3rem 0 5rem;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* ── Back link ── */
.back-link {
  display: inline-block;
  color: var(--bitcoin-orange);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: opacity 0.2s;
}
.back-link:hover { opacity: 0.8; }

/* ── Summary card ── */
.checkout-summary__heading {
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  margin-bottom: 1rem;
}

.checkout-summary__card {
  background: var(--light-bg);
  border: 2px solid var(--bitcoin-orange);
  border-radius: 15px;
  padding: 1.75rem;
  margin-bottom: 2rem;
}

.checkout-summary__badge {
  display: inline-block;
  background: rgba(247, 147, 26, 0.15);
  color: var(--bitcoin-orange);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
}

.checkout-summary__title {
  font-size: 1.35rem;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.checkout-summary__price {
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--bitcoin-orange);
  margin-bottom: 1.25rem;
}

.checkout-summary__includes-label {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  margin-bottom: 0.6rem;
}

.checkout-summary__includes {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.checkout-summary__includes li {
  padding-left: 1.4rem;
  position: relative;
  color: var(--gray);
  font-size: 0.9rem;
  line-height: 1.5;
}

.checkout-summary__includes li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--bitcoin-orange);
  font-weight: 700;
}

/* ── Form ── */
.checkout-form-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkout-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.checkout-form__field label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-dark);
}

.checkout-form__input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  color: var(--text-dark);
  background: var(--light-bg);
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.checkout-form__input:focus {
  outline: none;
  border-color: var(--bitcoin-orange);
}

.checkout-form__input--error {
  border-color: #e53e3e;
}

.checkout-form__field--checkbox {
  flex-direction: column;
  gap: 0.4rem;
}

.checkout-form__checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-dark);
  line-height: 1.5;
}

.checkout-form__checkbox {
  margin-top: 0.15rem;
  flex-shrink: 0;
  accent-color: var(--bitcoin-orange);
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkout-form__error {
  font-size: 0.8rem;
  color: #e53e3e;
}

/* ── Right column ── */
.checkout-right__heading {
  font-size: 1.5rem;
  color: var(--text-dark);
  margin-bottom: 0.4rem;
}

.checkout-right__subtitle {
  color: var(--gray);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* ── Payment wrap (disabled state) ── */
.checkout-payment-wrap {
  position: relative;
}

.checkout-payment-wrap--disabled {
  opacity: 0.45;
  pointer-events: none;
  user-select: none;
  filter: grayscale(0.3);
}

.checkout-payment-section__label {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  margin-bottom: 0.25rem;
}

/* ── Divider ── */
.checkout-payment-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.25rem 0;
  color: var(--gray);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.checkout-payment-divider::before,
.checkout-payment-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

/* ── Hint ── */
.checkout-hint {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--gray);
  font-style: italic;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
}
</style>
