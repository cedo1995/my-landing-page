<template>
  <div>
    <SiteHeader />

    <!-- Hero -->
    <section class="corso-hero">
      <div class="container corso-hero__inner">
        <div class="corso-hero__badge">Bitcoin</div>
        <h1 class="corso-hero__headline">{{ t('corsoBitcoin.hero.headline') }}</h1>
        <p class="corso-hero__subheadline">{{ t('corsoBitcoin.hero.subheadline') }}</p>
        <a href="#enrollment" class="cta-button corso-hero__cta">{{ t('corsoBitcoin.hero.cta') }}</a>
      </div>
    </section>

    <!-- For Whom + Outcomes affiancati -->
    <section class="corso-section">
      <div class="container corso-two-col">
        <div>
          <h2 class="corso-section__title corso-section__title--left">{{ t('corsoBitcoin.forWhom.title') }}</h2>
          <ul class="corso-list">
            <li v-for="(item, i) in (tm('corsoBitcoin.forWhom.items') as any[])" :key="i">
              <span class="corso-list__icon">→</span>
              <span>{{ rt(item.text) }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="corso-section__title corso-section__title--left">{{ t('corsoBitcoin.outcomes.title') }}</h2>
          <ul class="corso-list corso-list--outcomes">
            <li v-for="(item, i) in (tm('corsoBitcoin.outcomes.items') as any[])" :key="i">
              <span class="corso-list__icon corso-list__icon--check">✓</span>
              <span>{{ rt(item.text) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Enrollment -->
    <section id="enrollment" class="corso-section corso-section--alt">
      <div class="container">
        <h2 class="corso-section__title">{{ t('corsoBitcoin.enrollment.title') }}</h2>
        <p class="corso-section__subtitle">{{ t('corsoBitcoin.enrollment.subtitle') }}</p>
        <div class="pricing-cards" style="justify-content: center; display: flex;">
          <div class="pricing-card featured" style="max-width: 640px; width: 100%;">
            <h3>{{ t('courses.corsoBase.title') }}</h3>
            <div class="price">{{ t('corsoBitcoin.details.price') }}</div>
            <ul class="features">
              <li v-for="(item, i) in (tm('corsoBitcoin.outcomes.items') as any[])" :key="i">
                ✓ {{ rt(item.text) }}
              </li>
            </ul>
            <PaymentSelector
              type="course"
              :price="400"
              duration="corso-base"
              amountEur="400"
              :btcAddress="PAYMENT_CONFIG.btcAddress"
              :lightningAddress="PAYMENT_CONFIG.lightningAddress"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="corso-section">
      <div class="container">
        <h2 class="corso-section__title">{{ t('faq.title') }}</h2>
        <div class="corso-faq">
          <details
            v-for="(item, i) in (tm('corsoBitcoin.faq') as any[])"
            :key="i"
            class="corso-faq__item"
          >
            <summary class="corso-faq__question">{{ rt(item.q) }}</summary>
            <p class="corso-faq__answer">{{ rt(item.a) }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <FinalCTA
      :headline="t('corsoBitcoin.finalCta.headline')"
      :subheadline="t('corsoBitcoin.finalCta.subheadline')"
      :cta-label="t('corsoBitcoin.finalCta.ctaLabel')"
      :cta-href="localePath('/consulenza')"
    />

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div>
            <p>{{ t('footer.rights') }}</p>
            <div class="footer-legal">
              <NuxtLink :to="localePath('/privacy')">{{ t('footer.legal.privacy') }}</NuxtLink>
              <span>·</span>
              <NuxtLink :to="localePath('/terms')">{{ t('footer.legal.terms') }}</NuxtLink>
            </div>
          </div>
          <div class="social-links">
            <a href="https://x.com/CedolinRoberto" target="_blank" rel="noopener noreferrer">𝕏</a>
            <a href="https://www.instagram.com/roberto_cedolin/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@roberto_cedolin" target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { PAYMENT_CONFIG } from '~/config/payment'

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const config = useRuntimeConfig()

useHead(() => ({
  title: t('corsoBitcoin.seo.title'),
  meta: [
    { name: 'description', content: t('corsoBitcoin.seo.description') },
    { property: 'og:title', content: t('corsoBitcoin.seo.title') },
    { property: 'og:description', content: t('corsoBitcoin.seo.description') },
    { property: 'og:url', content: `${config.public.baseUrl || 'https://robertocedolin.com'}${route.path}` },
  ],
}))

onMounted(() => {
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault()
      const id = target.getAttribute('href')?.slice(1)
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  document.addEventListener('click', handler)
  onUnmounted(() => document.removeEventListener('click', handler))
})
</script>

<style scoped>
/* ── Hero ── */
.corso-hero {
  background: var(--dark-bg);
  padding: 6rem 0 5rem;
  text-align: center;
}

.corso-hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 720px;
  margin: 0 auto;
}

.corso-hero__badge {
  display: inline-block;
  background: rgba(247, 147, 26, 0.15);
  color: var(--bitcoin-orange);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(247, 147, 26, 0.4);
}

.corso-hero__headline {
  font-size: 2.8rem;
  font-weight: var(--font-bold);
  color: var(--text-light);
  line-height: 1.2;
  margin: 0;
}

.corso-hero__subheadline {
  font-size: 1.15rem;
  color: #ccc;
  margin: 0;
  line-height: 1.7;
}

.corso-hero__cta {
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .corso-hero__headline {
    font-size: 2rem;
  }
}

/* ── Sections ── */
.corso-section {
  padding: 4.5rem 0;
}

.corso-section--alt {
  background: var(--light-bg);
}

.corso-section__title {
  font-size: 1.9rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.corso-section__subtitle {
  text-align: center;
  color: var(--gray);
  margin-bottom: 2.5rem;
  font-size: 1.05rem;
}

/* ── Two-column layout ── */
.corso-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.corso-section__title--left {
  text-align: left;
}

@media (max-width: 768px) {
  .corso-two-col {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .corso-section__title--left {
    text-align: center;
  }
}

/* ── For Whom list ── */
.corso-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.corso-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-dark);
  background: white;
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border-left: 4px solid var(--bitcoin-orange);
}

.corso-list--outcomes li {
  border-left-color: #16a34a;
}

.corso-list__icon {
  font-weight: 700;
  color: var(--bitcoin-orange);
  flex-shrink: 0;
  font-size: 1.1rem;
}

.corso-list__icon--check {
  color: #16a34a;
}

/* ── FAQ ── */
.corso-faq {
  max-width: 680px;
  margin: 0 auto;
}

.corso-faq__item {
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.corso-faq__item:first-of-type {
  border-top: 1px solid var(--border-color);
}

.corso-faq__question {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-dark);
  font-size: 1rem;
  line-height: 1.5;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  user-select: none;
}

.corso-faq__question::-webkit-details-marker { display: none; }

.corso-faq__question::after {
  content: '+';
  color: var(--bitcoin-orange);
  font-size: 1.4rem;
  font-weight: 700;
  flex-shrink: 0;
}

.corso-faq__item[open] .corso-faq__question::after {
  content: '−';
}

.corso-faq__answer {
  margin-top: 0.75rem;
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.7;
  padding-right: 2rem;
}
</style>
