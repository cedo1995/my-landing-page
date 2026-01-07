<template>
  <div>
    <!-- Header -->
    <header>
      <nav class="container">
        <a href="#" class="logo">{{ t('nav.logo') }}</a>

        <ul class="nav-links">
          <li><a href="#about">{{ t('nav.about') }}</a></li>
          <li><a href="#consultations">{{ t('nav.consultations') }}</a></li>
          <li><a href="#contact">{{ t('nav.contact') }}</a></li>
        </ul>

        <LanguageSwitcher />
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>{{ t('hero.title') }}</h1>
        <p class="subtitle">{{ t('hero.subtitle') }}</p>
        <p style="white-space: pre-line;">
          {{ t('hero.description') }}
        </p>
        <a href="#consultations" class="cta-button">{{ t('hero.cta') }}</a>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <h2>{{ t('about.title') }}</h2>

        <div class="about-content">
          <div class="about-text">
            <p>{{ t('about.text') }}</p>
            <p>{{ t('about.content') }}</p>
            <p>{{ t('about.you') }}</p>

            <div class="skills">
              <span class="skill-tag">{{ t('about.skills.softwareDevelopment') }}</span>
              <span class="skill-tag">{{ t('about.skills.bitcoinEducation') }}</span>
              <span class="skill-tag">{{ t('about.skills.contentCreation') }}</span>
              <span class="skill-tag">{{ t('about.skills.technicalEducation') }}</span>
              <span class="skill-tag">{{ t('about.skills.bitcoinFundamentals') }}</span>
              <span class="skill-tag">{{ t('about.skills.blockchainTechnology') }}</span>
              <span class="skill-tag">{{ t('about.skills.financialTechnology') }}</span>
            </div>
          </div>

          <div class="about-image">
            <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="180" fill="#f7931a" opacity="0.1" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="#f7931a" stroke-width="3" />
              <text x="200" y="210" font-size="120" fill="#f7931a" text-anchor="middle" font-weight="bold">₿</text>
            </svg>
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
          <!-- 30 Minutes Consultation -->
          <div class="pricing-card">
            <h3>{{ t('consultations.cards.quick.title') }}</h3>
            <div class="price">{{ t('consultations.cards.quick.price') }}</div>
            <div class="duration">{{ t('consultations.cards.quick.duration') }}</div>

            <ul class="features">
              <li>✓ {{ t('consultations.cards.quick.features.f1') }}</li>
              <li>✓ {{ t('consultations.cards.quick.features.f2') }}</li>
              <li>✓ {{ t('consultations.cards.quick.features.f3') }}</li>
              <li>✓ {{ t('consultations.cards.quick.features.f4') }}</li>
            </ul>

            <button class="book-button" @click="bookConsultation('30min')" :disabled="isProcessing">
              {{ isProcessing ? t('consultations.cards.quick.button.processing') : t('consultations.cards.quick.button.default') }}
            </button>
          </div>

          <!-- 60 Minutes Consultation -->
          <div class="pricing-card featured" hidden="true">
            <h3>{{ t('consultations.cards.deep.title') }}</h3>
            <div class="price">{{ t('consultations.cards.deep.price') }}</div>
            <div class="duration">{{ t('consultations.cards.deep.duration') }}</div>

            <ul class="features">
              <li>✓ {{ t('consultations.cards.deep.features.f1') }}</li>
              <li>✓ {{ t('consultations.cards.deep.features.f2') }}</li>
              <li>✓ {{ t('consultations.cards.deep.features.f3') }}</li>
              <li>✓ {{ t('consultations.cards.deep.features.f4') }}</li>
              <li>✓ {{ t('consultations.cards.deep.features.f5') }}</li>
            </ul>

            <button class="book-button" @click="bookConsultation('60min')" :disabled="isProcessing">
              {{ isProcessing ? t('consultations.cards.deep.button.processing') : t('consultations.cards.deep.button.default') }}
              <span v-if="isProcessing" class="spinner"></span>
            </button>
          </div>
        </div>

        <div style="margin-top: 3rem; text-align: center; color: #666;">
          <p><strong>{{ t('consultations.whatToExpect.title') }}</strong></p>
          <p style="margin-top: 1rem;">
            {{ t('consultations.whatToExpect.text') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contact">
      <div class="container">
        <div class="footer-content">
          <div>
            <p>{{ t('footer.rights') }}</p>
          </div>
          <div class="social-links">
            <a href="https://x.com/CedolinRoberto" target="_blank" :title="t('footer.social.x')">𝕏</a>
            <a href="https://www.linkedin.com/in/roberto-cedolin/" target="_blank" :title="t('footer.social.linkedin')">
              {{ t('footer.social.linkedin') }}
            </a>
            <a href="https://www.youtube.com/@robertocedolin" target="_blank" :title="t('footer.social.youtube')">
              {{ t('footer.social.youtube') }}
            </a>
            <a href="https://www.instagram.com/roberto_cedolin/" target="_blank" :title="t('footer.social.instagram')">
              {{ t('footer.social.instagram') }}
            </a>
            <a href="https://www.tiktok.com/@roberto_cedolin" target="_blank" :title="t('footer.social.tiktok')">
              {{ t('footer.social.tiktok') }}
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { t } = useI18n()
const isProcessing = ref(false)

// Stripe payment links
const STRIPE_PAYMENT_LINKS = {
  '30min': 'https://buy.stripe.com/test_eVqaEX7B070O1Pe1lO7Vm00',
  '60min': 'https://buy.stripe.com/test_7sY28r3kK0Cq51qd4w7Vm01'
} as const

type ConsultationKey = keyof typeof STRIPE_PAYMENT_LINKS

const bookConsultation = async (duration: ConsultationKey) => {
  if (isProcessing.value) return
  isProcessing.value = true

  try {
    const paymentLink = STRIPE_PAYMENT_LINKS[duration]
    if (!paymentLink) {
      alert(t('errors.invalidConsultation'))
      isProcessing.value = false
      return
    }
    window.location.href = paymentLink
  } catch (error) {
    console.error('Booking error:', error)
    alert(t('errors.generic'))
    isProcessing.value = false
  }
}

// Smooth scroll for anchor links
if (process.client) {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault()
      const id = target.getAttribute('href')?.slice(1)
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  })
}
</script>
