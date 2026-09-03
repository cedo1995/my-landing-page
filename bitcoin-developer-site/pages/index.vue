<template>
  <div>
    <SiteHeader />

    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__text">
          <h1>{{ t('hero.titleLine1') }}<br><span class="hero__title-line2">{{ t('hero.titleLine2') }}</span></h1>
          <p class="subtitle">{{ t('hero.subtitle') }}</p>
          <p class="hero__description" style="white-space: pre-line;">
            {{ t('hero.description') }}
          </p>
          <span class="hero__badge">{{ t('hero.credentialBadge') }}</span>
          <div class="hero__ctas">
            <NuxtLink :to="localePath('/consulenza')" class="cta-button">{{ t('hero.cta') }}</NuxtLink>
            <NuxtLink :to="localePath('/corso-bitcoin')" class="cta-button cta-button--secondary">{{ t('hero.ctaSecondary') }}</NuxtLink>
          </div>
        </div>
        <div class="hero__photo">
          <img src="/profile.jpg" alt="Roberto Cedolin" class="hero-profile-photo" fetchpriority="high" width="280" height="280" />
        </div>
      </div>
    </section>

    <!-- Social Proof Bar -->
    <section class="social-proof-bar">
      <div class="container">
        <div class="social-proof-bar__grid">
          <div
            v-for="(metric, index) in (tm('socialProof.metrics') as any[])"
            :key="index"
            class="social-proof-bar__item"
          >
            <span class="social-proof-bar__value">{{ rt(metric.value) }}</span>
            <span class="social-proof-bar__label">{{ rt(metric.label) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem / Solution -->
    <section class="problem-solution">
      <div class="container">
        <h2 class="problem-solution__title">{{ t('problemSolution.title') }}</h2>
        <div class="problem-solution__grid">
          <div class="problem-solution__col problem-solution__col--problem">
            <h3 class="problem-solution__col-title">{{ t('problemSolution.problemTitle') }}</h3>
            <ul class="problem-solution__list">
              <li v-for="(item, i) in (tm('problemSolution.problems') as any[])" :key="i">
                <span class="problem-solution__icon problem-solution__icon--problem">✗</span>
                <span>{{ rt(item.text) }}</span>
              </li>
            </ul>
          </div>
          <div class="problem-solution__col problem-solution__col--solution">
            <h3 class="problem-solution__col-title">{{ t('problemSolution.solutionTitle') }}</h3>
            <ul class="problem-solution__list">
              <li v-for="(item, i) in (tm('problemSolution.solutions') as any[])" :key="i">
                <span class="problem-solution__icon problem-solution__icon--solution">✓</span>
                <span>{{ rt(item.text) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultations Section -->
    <section id="consultations" class="consultations">
      <div class="container">
        <h2>{{ t('consultations.title') }}</h2>
        <p class="consultations-subtitle">{{ t('consultations.subtitle') }}</p>

        <div class="pricing-cards">
          <!-- 60 Minutes Consultation -->
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

          <!-- 3 Hours Consultation -->
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
        <div class="consultations-more">
          <p class="urgency-note">{{ t('urgency.consultationsNote') }}</p>
          <p class="urgency-guarantee">{{ t('urgency.guarantee') }}</p>
          <NuxtLink :to="localePath('/consulenza')" class="consultations-more__link">
            {{ t('courses.viewDetails') }} →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Courses teaser -->
    <section class="courses-teaser">
      <div class="container courses-teaser__inner">
        <div class="courses-teaser__text">
          <div class="courses-teaser__badge">{{ t('courses.teaser.badge') }}</div>
          <h2 class="courses-teaser__title">{{ t('courses.corsoBase.title') }}</h2>
          <p class="courses-teaser__desc">{{ t('courses.corsoBase.description') }}</p>
          <div class="courses-teaser__meta">
            <span class="courses-teaser__price">{{ t('courses.detail.price') }}</span>
            <span class="courses-teaser__modules">5 {{ t('courses.modules') }}</span>
          </div>
          <NuxtLink :to="localePath('/corso-bitcoin')" class="cta-button courses-teaser__cta">
            {{ t('courses.viewDetails') }}
          </NuxtLink>
        </div>
        <div class="courses-teaser__card">
          <div class="courses-teaser__card-header">
            <span class="courses-teaser__card-label">{{ t('courses.teaser.whatYouLearn') }}</span>
          </div>
          <ul class="courses-teaser__list">
            <li v-for="(item, i) in (tm('corsoBitcoin.outcomes.items') as any[])" :key="i">
              <span class="courses-teaser__icon">✓</span>
              <span>{{ rt(item.text) }}</span>
            </li>
          </ul>
          <div class="courses-teaser__card-details">
            <div class="courses-teaser__card-detail">
              <span class="courses-teaser__card-detail-label">{{ t('courses.teaser.format') }}</span>
              <span class="courses-teaser__card-detail-value">{{ t('courses.teaser.formatValue') }}</span>
            </div>
            <div class="courses-teaser__card-detail">
              <span class="courses-teaser__card-detail-label">{{ t('courses.teaser.duration') }}</span>
              <span class="courses-teaser__card-detail-value">{{ t('courses.teaser.durationValue') }}</span>
            </div>
            <div class="courses-teaser__card-detail">
              <span class="courses-teaser__card-detail-label">{{ t('courses.teaser.price') }}</span>
              <span class="courses-teaser__card-detail-value courses-teaser__card-price">{{ t('courses.detail.price') }}</span>
            </div>
          </div>
          <div class="courses-teaser__card-guarantee">
            &#x1F6E1; {{ t('courses.teaser.guarantee') }}
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section v-if="testimonials.length > 0" class="testimonials">
      <div class="container">
        <h2 class="testimonials__title">{{ t('testimonials.title') }}</h2>
        <div class="testimonials__grid">
          <div
            v-for="(item, index) in testimonials"
            :key="index"
            class="testimonial-card"
          >
            <blockquote class="testimonial-card__quote">{{ item.text }}</blockquote>
            <div class="testimonial-card__author">{{ item.author }}</div>
            <div class="testimonial-card__context">{{ item.context }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <FinalCTA
      :headline="t('finalCta.headline')"
      :subheadline="t('finalCta.subheadline')"
      :cta-label="t('finalCta.ctaLabel')"
      :cta-href="localePath('/consulenza')"
    />

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <h2 class="contact-section__title">{{ t('contact.title') }}</h2>
        <p class="contact-section__subtitle">{{ t('contact.subtitle') }}</p>

        <div class="contact-section__layout">
          <!-- Social links -->
          <div class="contact-section__social">
            <h3 class="contact-section__social-title">{{ t('contact.socialTitle') }}</h3>
            <div class="contact-social-links">
              <a href="https://x.com/CedolinRoberto" target="_blank" rel="noopener noreferrer" class="contact-social-link">
                <span class="contact-social-link__icon">𝕏</span>
                <span>@CedolinRoberto</span>
              </a>
              <a href="https://www.linkedin.com/in/roberto-cedolin/" target="_blank" rel="noopener noreferrer" class="contact-social-link">
                <span class="contact-social-link__icon">in</span>
                <span>roberto-cedolin</span>
              </a>
              <a href="https://www.youtube.com/@roberto_cedolin" target="_blank" rel="noopener noreferrer" class="contact-social-link">
                <span class="contact-social-link__icon">▶</span>
                <span>@robertocedolin</span>
              </a>
              <a href="https://www.instagram.com/roberto_cedolin/" target="_blank" rel="noopener noreferrer" class="contact-social-link">
                <span class="contact-social-link__icon">◉</span>
                <span>@roberto_cedolin</span>
              </a>
              <a href="https://www.tiktok.com/@roberto_cedolin" target="_blank" rel="noopener noreferrer" class="contact-social-link">
                <span class="contact-social-link__icon">♪</span>
                <span>@roberto_cedolin</span>
              </a>
            </div>
          </div>

          <!-- Contact form -->
          <div class="contact-section__form-wrap">
            <h3 class="contact-section__form-title">{{ t('contact.formTitle') }}</h3>

            <div v-if="contactSuccess" class="contact-form__success">
              {{ t('contact.successMessage') }}
            </div>

            <form v-else class="contact-form" @submit.prevent="sendContactForm">
              <div class="contact-form__field">
                <label class="contact-form__label" for="contact-subject">{{ t('contact.subjectLabel') }}</label>
                <select id="contact-subject" v-model="contactSubject" class="contact-form__select">
                  <option value="" disabled>{{ t('contact.subjectPlaceholder') }}</option>
                  <option value="sponsorship">{{ t('contact.subjects.sponsorship') }}</option>
                  <option value="consultation">{{ t('contact.subjects.consultation') }}</option>
                  <option value="courses">{{ t('contact.subjects.courses') }}</option>
                  <option value="other">{{ t('contact.subjects.other') }}</option>
                </select>
              </div>
              <div class="contact-form__field">
                <label class="contact-form__label" for="contact-email">{{ t('contact.emailLabel') }}</label>
                <input
                  id="contact-email"
                  v-model="contactEmail"
                  type="email"
                  class="contact-form__input"
                  :placeholder="t('contact.emailPlaceholder')"
                  required
                />
              </div>
              <div class="contact-form__field">
                <label class="contact-form__label" for="contact-message">{{ t('contact.messageLabel') }}</label>
                <textarea
                  id="contact-message"
                  v-model="contactMessage"
                  class="contact-form__textarea"
                  rows="5"
                  :placeholder="t('contact.messagePlaceholder')"
                  required
                />
              </div>
              <p v-if="contactError" class="contact-form__error">{{ t('contact.sendError') }}</p>
              <!-- honeypot anti-spam: visually hidden text field; bots fill it, humans don't -->
              <input
                v-model="contactHoneypot"
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
                style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;"
              />
              <button type="submit" class="cta-button contact-form__submit" :disabled="!contactFormValid || contactLoading">
                {{ contactLoading ? t('contact.sending') : t('contact.sendButton') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

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
            <a href="https://x.com/CedolinRoberto" target="_blank" rel="noopener noreferrer" :title="t('footer.social.x')">𝕏</a>
            <a href="https://www.linkedin.com/in/roberto-cedolin/" target="_blank" rel="noopener noreferrer">{{ t('footer.social.linkedin') }}</a>
            <a href="https://www.youtube.com/@robertocedolin" target="_blank" rel="noopener noreferrer">{{ t('footer.social.youtube') }}</a>
            <a href="https://www.instagram.com/roberto_cedolin/" target="_blank" rel="noopener noreferrer">{{ t('footer.social.instagram') }}</a>
            <a href="https://www.tiktok.com/@roberto_cedolin" target="_blank" rel="noopener noreferrer">{{ t('footer.social.tiktok') }}</a>
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

const testimonials = computed(() => tm('testimonials') as Array<{text: string, author: string, context: string}>)

// Contact form
const contactSubject = ref('')
const contactEmail = ref('')
const contactMessage = ref('')
const contactHoneypot = ref('')
const contactLoading = ref(false)
const contactError = ref(false)
const contactSuccess = ref(false)

const contactFormValid = computed(() =>
  contactSubject.value !== '' &&
  contactEmail.value.trim() !== '' &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.value) &&
  contactMessage.value.trim() !== ''
)

async function sendContactForm() {
  contactError.value = false
  contactLoading.value = true

  const subjectLabel = contactSubject.value
    ? t(`contact.subjects.${contactSubject.value}`)
    : t('contact.subjectPlaceholder')

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        subject: subjectLabel,
        email: contactEmail.value,
        message: contactMessage.value,
        honeypot: contactHoneypot.value,
      },
    })
    contactSuccess.value = true
    contactSubject.value = ''
    contactEmail.value = ''
    contactMessage.value = ''
    contactHoneypot.value = ''
  } catch {
    contactError.value = true
  } finally {
    contactLoading.value = false
  }
}

const siteUrl = 'https://robertocedolin.com'

useHead(() => ({
  meta: [
    { property: 'og:url', content: siteUrl },
    { property: 'og:title', content: t('seo.title') },
    { property: 'og:description', content: t('seo.description') },
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
/* ── Hero two-column layout ── */
.hero__inner {
  display: flex;
  align-items: center;
  gap: 4rem;
  text-align: left;
}

.hero__text {
  flex: 1;
  min-width: 0;
}

.hero__text h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  animation: fadeInUp 0.8s ease-out;
}

.hero__title-line2 {
  color: var(--bitcoin-orange);
}

.hero__text .subtitle {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.hero__description {
  font-size: 1.05rem;
  margin-bottom: 1.25rem;
  line-height: 1.8;
  animation: fadeInUp 0.8s ease-out 0.35s backwards;
}

.hero__badge {
  display: inline-block;
  background: rgba(247, 147, 26, 0.15);
  color: var(--bitcoin-orange);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  border: 1px solid rgba(247, 147, 26, 0.4);
  margin-bottom: 1.75rem;
  animation: fadeInUp 0.8s ease-out 0.45s backwards;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.hero__photo {
  flex-shrink: 0;
}

.hero-profile-photo {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 4px solid var(--bitcoin-orange);
  box-shadow: 0 8px 32px rgba(247, 147, 26, 0.3);
  display: block;
}

/* Tablet: shrink photo */
@media (max-width: 1024px) and (min-width: 900px) {
  .hero-profile-photo {
    width: 200px;
    height: 200px;
  }

  .hero__inner {
    gap: 2.5rem;
  }
}

/* Mobile: single column, photo centered above text */
@media (max-width: 900px) {
  .hero__inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 2rem;
  }

  .hero__text h1 {
    font-size: 2.2rem;
  }

  .hero__ctas {
    justify-content: center;
  }

  .hero-profile-photo {
    width: 200px;
    height: 200px;
  }
}

/* ── Problem / Solution ── */
.problem-solution {
  padding: 5rem 0;
  background: var(--light-bg);
}

.problem-solution__title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-dark);
}

.problem-solution__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.problem-solution__col {
  border-radius: 16px;
  padding: 2rem;
}

.problem-solution__col--problem {
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.problem-solution__col--solution {
  background: rgba(247, 147, 26, 0.06);
  border: 1px solid rgba(247, 147, 26, 0.25);
}

.problem-solution__col-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--text-dark);
}

.problem-solution__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.problem-solution__list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.97rem;
  line-height: 1.6;
  color: var(--text-dark);
}

.problem-solution__icon {
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.problem-solution__icon--problem {
  color: #ef4444;
}

.problem-solution__icon--solution {
  color: var(--bitcoin-orange);
}

@media (max-width: 768px) {
  .problem-solution__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* ── Consultations more link ── */
.consultations-more {
  text-align: center;
  margin-top: 2rem;
}

.consultations-more__link {
  color: var(--bitcoin-orange);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.consultations-more__link:hover {
  border-bottom-color: var(--bitcoin-orange);
}

/* ── Social Proof Bar ── */
.social-proof-bar__grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.social-proof-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 2.5rem;
  flex: 1;
  max-width: 220px;
}

.social-proof-bar__item + .social-proof-bar__item {
  border-left: 1px solid var(--border-color);
}

.social-proof-bar__value {
  font-size: 1.8rem;
  font-weight: var(--font-bold);
  color: var(--bitcoin-orange);
  line-height: 1.1;
}

.social-proof-bar__label {
  font-size: var(--text-sm);
  color: var(--gray);
  margin-top: 0.3rem;
  text-align: center;
}

@media (max-width: 768px) {
  .social-proof-bar__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .social-proof-bar__item {
    padding: 0.75rem 1rem;
    max-width: unset;
    border-left: none !important;
  }
}

/* ── Testimonials ── */
.testimonials__title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--text-dark);
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonial-card {
  background: var(--light-bg);
  border-left: 4px solid var(--bitcoin-orange);
  border-radius: 0 12px 12px 0;
  padding: 1.5rem;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.07);
}

.testimonial-card__quote {
  font-style: italic;
  color: var(--text-dark);
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0 0 1rem;
}

.testimonial-card__author {
  font-weight: var(--font-bold);
  font-size: var(--text-sm);
  color: var(--text-dark);
}

.testimonial-card__context {
  font-size: var(--text-sm);
  color: var(--gray);
  margin-top: 0.2rem;
}

@media (max-width: 768px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
}

/* ── Urgency notes ── */
.urgency-note {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--bitcoin-orange);
  margin: 0 0 0.25rem;
}

.urgency-guarantee {
  font-size: 0.9rem;
  color: var(--gray);
  margin: 0 0 1rem;
}

/* ── Courses teaser ── */
.courses-teaser {
  padding: 5rem 0;
  background: var(--dark-bg);
  color: var(--text-light);
}

.courses-teaser__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.courses-teaser__badge {
  display: inline-block;
  background: rgba(247, 147, 26, 0.15);
  color: var(--bitcoin-orange);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  border: 1px solid rgba(247, 147, 26, 0.4);
  margin-bottom: 1rem;
}

.courses-teaser__title {
  font-size: 2rem;
  color: var(--text-light);
  margin: 0 0 1rem;
}

.courses-teaser__desc {
  font-size: 1rem;
  color: #ccc;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}

.courses-teaser__meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
}

.courses-teaser__price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--bitcoin-orange);
}

.courses-teaser__modules {
  font-size: 0.95rem;
  color: #aaa;
}

.courses-teaser__cta {
  display: inline-block;
}

.courses-teaser__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.courses-teaser__list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #ddd;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
}

.courses-teaser__icon {
  color: var(--bitcoin-orange);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.05rem;
}

.courses-teaser__card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.courses-teaser__card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.courses-teaser__card-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--bitcoin-orange);
}

.courses-teaser__card-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1.1rem;
}

.courses-teaser__card-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.courses-teaser__card-detail-label {
  font-size: 0.85rem;
  color: #888;
  flex-shrink: 0;
}

.courses-teaser__card-detail-value {
  font-size: 0.9rem;
  color: #ddd;
  text-align: right;
}

.courses-teaser__card-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--bitcoin-orange);
}

.courses-teaser__card-guarantee {
  font-size: 0.82rem;
  color: #aaa;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 1rem;
}

@media (max-width: 900px) {
  .courses-teaser__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

/* ── Contact Section ── */
.contact-section {
  padding: 5rem 0;
  background: var(--dark-bg);
  color: var(--text-light);
}

.contact-section__title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.75rem;
  color: var(--text-light);
}

.contact-section__subtitle {
  text-align: center;
  color: #aaa;
  margin-bottom: 3.5rem;
  font-size: 1.05rem;
}

.contact-section__layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: start;
}

/* Social links column */
.contact-section__social-title,
.contact-section__form-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--bitcoin-orange);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-light);
  text-decoration: none;
  padding: 0.85rem 1.25rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  transition: border-color 0.2s, background 0.2s;
  font-size: 0.95rem;
}

.contact-social-link:hover {
  border-color: var(--bitcoin-orange);
  background: rgba(247, 147, 26, 0.08);
}

.contact-social-link__icon {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--bitcoin-orange);
  width: 1.5rem;
  text-align: center;
  flex-shrink: 0;
}

/* Form column */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact-form__label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #ccc;
}

.contact-form__select,
.contact-form__textarea,
.contact-form__input {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: var(--text-light);
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.contact-form__select:focus,
.contact-form__textarea:focus,
.contact-form__input:focus {
  outline: none;
  border-color: var(--bitcoin-orange);
}

.contact-form__select option {
  background: #1a1a1a;
  color: var(--text-light);
}

.contact-form__textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form__error {
  font-size: 0.82rem;
  color: #f87171;
  margin: 0;
}

.contact-form__success {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #4ade80;
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.contact-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact-form__submit {
  align-self: flex-start;
}

.contact-form__note {
  font-size: 0.8rem;
  color: #888;
  margin: 0;
}

@media (max-width: 900px) {
  .contact-section__layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
