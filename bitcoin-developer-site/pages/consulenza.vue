<template>
  <div>
    <SiteHeader />

    <!-- Hero -->
    <section class="consulenza-hero">
      <div class="container consulenza-hero__inner">
        <h1 class="consulenza-hero__headline">{{ t('consulenza.hero.headline') }}</h1>
        <p class="consulenza-hero__subheadline">{{ t('consulenza.hero.subheadline') }}</p>
        <a href="#pricing-consulenza" class="cta-button consulenza-hero__cta">{{ t('consulenza.hero.cta') }}</a>
      </div>
    </section>

    <!-- Problem / Solution a 2 colonne -->
    <section class="consulenza-section">
      <div class="container">
        <div class="consulenza-two-col">
          <div class="consulenza-col consulenza-col--problem">
            <h2 class="consulenza-col__title">{{ t('consulenza.painPoints.title') }}</h2>
            <ul class="consulenza-list consulenza-list--pain">
              <li v-for="(item, i) in (tm('consulenza.painPoints.items') as any[])" :key="i">
                <span class="consulenza-list__icon consulenza-list__icon--pain">✗</span>
                <span>{{ rt(item.text) }}</span>
              </li>
            </ul>
          </div>
          <div class="consulenza-col consulenza-col--solution">
            <h2 class="consulenza-col__title">{{ t('consulenza.whatYouGet.title') }}</h2>
            <ul class="consulenza-list consulenza-list--get">
              <li v-for="(item, i) in (tm('consulenza.whatYouGet.items') as any[])" :key="i">
                <span class="consulenza-list__icon consulenza-list__icon--get">✓</span>
                <span>{{ rt(item.text) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing-consulenza" class="consulenza-section">
      <div class="container">
        <h2 class="consulenza-section__title">{{ t('consultations.title') }}</h2>
        <p class="consulenza-section__subtitle">{{ t('consultations.subtitle') }}</p>

        <!-- Garanzia -->
        <div class="consulenza-guarantee">
          <span class="consulenza-guarantee__icon">🛡</span>
          <span>{{ t('urgency.guarantee') }}</span>
        </div>

        <div class="pricing-cards">
          <!-- 60 min -->
          <div class="pricing-card featured">
            <h3>{{ t('consultations.cards.deep.title') }}</h3>
            <div class="price">
              {{ t('consultations.cards.deep.price') }}
              <s class="price-original">{{ t('consultations.cards.deep.originalPrice') }}</s>
            </div>
            <ul class="features">
              <li>✓ {{ t('consultations.cards.deep.features.f1') }}</li>
              <li>✓ {{ t('consultations.cards.deep.features.f2') }}</li>
              <li>✓ {{ t('consultations.cards.deep.features.f3') }}</li>
              <li>✓ {{ t('consultations.cards.deep.features.f4') }}</li>
            </ul>
            <PaymentSelector
              type="consultation"
              :price="70"
              duration="60min"
              amountEur="70"
              :btcAddress="PAYMENT_CONFIG.btcAddress"
              :lightningAddress="PAYMENT_CONFIG.lightningAddress"
            />
          </div>
          <!-- 3 ore -->
          <div class="pricing-card">
            <h3>{{ t('consultations.cards.extended.title') }}</h3>
            <div class="price">
              {{ t('consultations.cards.extended.price') }}
              <s class="price-original">{{ t('consultations.cards.extended.originalPrice') }}</s>
            </div>
            <ul class="features">
              <li>✓ {{ t('consultations.cards.extended.features.f1') }}</li>
              <li>✓ {{ t('consultations.cards.extended.features.f2') }}</li>
              <li>✓ {{ t('consultations.cards.extended.features.f3') }}</li>
              <li>✓ {{ t('consultations.cards.extended.features.f4') }}</li>
            </ul>
            <PaymentSelector
              type="consultation"
              :price="180"
              duration="3h"
              amountEur="180"
              :btcAddress="PAYMENT_CONFIG.btcAddress"
              :lightningAddress="PAYMENT_CONFIG.lightningAddress"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Credibility -->
    <section class="consulenza-section consulenza-section--alt">
      <div class="container consulenza-credibility">
        <h2 class="consulenza-section__title">{{ t('consulenza.credibility.title') }}</h2>
        <div class="consulenza-bio">
          <img src="/profile.jpg" alt="Roberto Cedolin" class="consulenza-bio__photo" loading="lazy" width="120" height="120" />
          <div class="consulenza-bio__content">
            <p class="consulenza-credibility__text">{{ t('consulenza.credibility.text') }}</p>
              <div class="consulenza-bio__stats">
              <div class="consulenza-bio__stat">
                <span class="consulenza-bio__stat-value">5+</span>
                <span class="consulenza-bio__stat-label">{{ t('consulenza.credibility.stats.years') }}</span>
              </div>
              <div class="consulenza-bio__stat">
                <span class="consulenza-bio__stat-value">20+</span>
                <span class="consulenza-bio__stat-label">{{ t('consulenza.credibility.stats.students') }}</span>
              </div>
              <div class="consulenza-bio__stat">
                <span class="consulenza-bio__stat-value">100%</span>
                <span class="consulenza-bio__stat-label">{{ t('consulenza.credibility.stats.satisfaction') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="consulenza-section">
      <div class="container">
        <h2 class="consulenza-section__title">{{ t('faq.title') }}</h2>
        <div class="consulenza-faq">
          <details
            v-for="(item, i) in (tm('consulenza.faq') as any[])"
            :key="i"
            class="consulenza-faq__item"
          >
            <summary class="consulenza-faq__question">{{ rt(item.q) }}</summary>
            <p class="consulenza-faq__answer">{{ rt(item.a) }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <FinalCTA
      :headline="t('consulenza.finalCta.headline')"
      :subheadline="t('consulenza.finalCta.subheadline')"
      :cta-label="t('consulenza.finalCta.ctaLabel')"
      cta-href="#pricing-consulenza"
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
  title: t('consulenza.seo.title'),
  meta: [
    { name: 'description', content: t('consulenza.seo.description') },
    { property: 'og:title', content: t('consulenza.seo.title') },
    { property: 'og:description', content: t('consulenza.seo.description') },
    { property: 'og:url', content: `${config.public.baseUrl || 'https://robertocedolin.com'}${route.path}` },
  ],
}))

// Smooth scroll for anchor links
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
.consulenza-hero {
  background: var(--dark-bg);
  padding: 6rem 0 5rem;
  text-align: center;
}

.consulenza-hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
}

.consulenza-hero__headline {
  font-size: 2.8rem;
  font-weight: var(--font-bold);
  color: var(--text-light);
  line-height: 1.2;
  margin: 0;
}

.consulenza-hero__subheadline {
  font-size: 1.15rem;
  color: #ccc;
  margin: 0;
  line-height: 1.7;
}

.consulenza-hero__cta {
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .consulenza-hero__headline {
    font-size: 2rem;
  }
}

/* ── Sections ── */
.consulenza-section {
  padding: 4rem 0;
}

.consulenza-section--alt {
  background: var(--light-bg);
}

.consulenza-section__title {
  font-size: 1.9rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.consulenza-section__subtitle {
  text-align: center;
  color: var(--gray);
  margin-bottom: 2.5rem;
  font-size: 1.05rem;
}

/* ── Two-column problem/solution ── */
.consulenza-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.consulenza-col__title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--text-dark);
}

.consulenza-col--problem .consulenza-col__title {
  color: #dc2626;
}

.consulenza-col--solution .consulenza-col__title {
  color: var(--bitcoin-orange);
}

@media (max-width: 768px) {
  .consulenza-two-col {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* ── Lists ── */
.consulenza-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.consulenza-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-dark);
  background: white;
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.consulenza-list--pain li {
  border-left: 4px solid #ef4444;
}

.consulenza-list--get li {
  border-left: 4px solid var(--bitcoin-orange);
}

.consulenza-list__icon {
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.consulenza-list__icon--pain { color: #ef4444; }
.consulenza-list__icon--get { color: var(--bitcoin-orange); }

/* ── Garanzia ── */
.consulenza-guarantee {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(247, 147, 26, 0.07);
  border: 1px solid rgba(247, 147, 26, 0.3);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-dark);
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.consulenza-guarantee__icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

/* ── Bio compatta ── */
.consulenza-bio {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  max-width: 760px;
  margin: 0 auto;
}

.consulenza-bio__photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 3px solid var(--bitcoin-orange);
  flex-shrink: 0;
}

.consulenza-bio__content {
  flex: 1;
}

.consulenza-bio__stats {
  display: flex;
  gap: 2rem;
  margin-top: 1.25rem;
}

.consulenza-bio__stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.consulenza-bio__stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--bitcoin-orange);
  line-height: 1;
}

.consulenza-bio__stat-label {
  font-size: 0.8rem;
  color: var(--gray);
}

@media (max-width: 640px) {
  .consulenza-bio {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
  }

  .consulenza-bio__stats {
    justify-content: center;
  }
}

/* ── FAQ ── */
.consulenza-faq {
  max-width: 680px;
  margin: 0 auto;
}

.consulenza-faq__item {
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.consulenza-faq__item:first-of-type {
  border-top: 1px solid var(--border-color);
}

.consulenza-faq__question {
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

.consulenza-faq__question::-webkit-details-marker { display: none; }

.consulenza-faq__question::after {
  content: '+';
  color: var(--bitcoin-orange);
  font-size: 1.4rem;
  font-weight: 700;
  flex-shrink: 0;
}

.consulenza-faq__item[open] .consulenza-faq__question::after {
  content: '−';
}

.consulenza-faq__answer {
  margin-top: 0.75rem;
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.7;
  padding-right: 2rem;
}

/* ── Credibility ── */
.consulenza-credibility {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
}

.consulenza-credibility__text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.consulenza-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
  border-left: 3px solid var(--bitcoin-orange);
  padding-left: 1.5rem;
}

.consulenza-timeline__item {
  display: flex;
  gap: 1rem;
  align-items: baseline;
}

.consulenza-timeline__year {
  font-weight: 700;
  color: var(--bitcoin-orange);
  font-size: 0.85rem;
  min-width: 40px;
}

.consulenza-timeline__text {
  font-size: 0.95rem;
  color: var(--text-dark);
}
</style>
