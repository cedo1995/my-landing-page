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
            <a href="#consultations" class="cta-button">{{ t('hero.cta') }}</a>
            <a href="#courses" class="cta-button cta-button--secondary">{{ t('hero.ctaSecondary') }}</a>
          </div>
        </div>
        <div class="hero__photo">
          <img src="/profile.jpg" alt="Roberto Cedolin" class="hero-profile-photo" />
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

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <h2>{{ t('about.title') }}</h2>

        <div class="about-body">
          <!-- Left column: text + why -->
          <div class="about-text">
            <p>{{ t('about.text') }}</p>
            <p>{{ t('about.content') }}</p>

            <!-- Why learn from me -->
            <h3 class="about-subheading">{{ t('about.whyTitle') }}</h3>
            <ul class="about-why">
              <li v-for="(item, i) in (tm('about.why') as any[])" :key="i">
                <span class="about-why__icon">✓</span>
                <span>{{ rt(item.text) }}</span>
              </li>
            </ul>
          </div>

          <!-- Right column: timeline + skills -->
          <div class="about-timeline">
            <h3 class="about-subheading">{{ t('about.timelineTitle') }}</h3>
            <div class="timeline">
              <div
                v-for="(item, i) in (tm('about.timeline') as any[])"
                :key="i"
                class="timeline__item"
              >
                <div class="timeline__dot"></div>
                <div class="timeline__content">
                  <div class="timeline__year">{{ rt(item.year) }}</div>
                  <div class="timeline__text">{{ rt(item.text) }}</div>
                </div>
              </div>
            </div>

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
               btcAddress="bc1qv0dpmn5ec4kkzsl458p0zmq25yyr55fjmhp3w8"
               lightningAddress="whitepatch439@walletofsatoshi.com"
               ownerEmail="roberto.cedo@gmail.com"
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
              btcAddress="bc1qv0dpmn5ec4kkzsl458p0zmq25yyr55fjmhp3w8"
              lightningAddress="whitepatch439@walletofsatoshi.com"
              ownerEmail="roberto.cedo@gmail.com"
            />
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

    <!-- Courses Section -->
    <section id="courses" class="courses-home">
      <div class="container">
        <h2>{{ t('courses.sectionTitle') }}</h2>
        <p class="courses-home__subtitle">{{ t('courses.sectionSubtitle') }}</p>

        <div class="courses-home__grid">
          <div
            v-for="course in courses"
            :key="course.slug"
            class="course-card-home"
          >
            <div class="course-card-home__badge">Bitcoin</div>
            <h3 class="course-card-home__title">{{ t(course.titleKey) }}</h3>
            <p class="course-card-home__description">{{ t(course.descriptionKey) }}</p>
            <div class="course-card-home__meta">
              <span class="course-card-home__modules">{{ course.moduleKeys.length }} {{ t('courses.modules') }}</span>
              <span class="course-card-home__price">{{ course.price }}</span>
            </div>
            <NuxtLink :to="localePath(`/courses/${course.slug}`)" class="book-button" style="display:block; text-align:center; text-decoration:none;">
              {{ t('courses.viewDetails') }}
            </NuxtLink>
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

    <!-- Donation Section -->
    <section id="donation" class="donation-section">
      <div class="container">
        <h2 class="donation-section__title">{{ t('donation.title') }}</h2>
        <p class="donation-section__subtitle">{{ t('donation.subtitle') }}</p>
        <DonationSection
          bolt12Offer="lno1pgqppmsrse80qf0aara4slvcjxrvu6j2rp5ftmjy4yntlsmsutpkvkt6878s8yk758zckejhqdky37cvwjzn6j42erhgtgrqudx20peerqlkmxhdqgpq8nh5f6t86vc8yc6yl4stfptx90fw968ak2x9vtumnhtkku0rxqcqx0c890tx2csnhamqp94vc5jldythzdka66v6g950l3lhvaj5xy7wufckahvjn0wr2kqgsz9snpz6qedeatqs8y0dcscl6svgdlsqpwqxjgu9yucrrv0jqad7vd8375j628fcj3jzqqeqk88qrtlqhu3uq9fnc67hrnzp5h45we5vmu3ll3aalxz0q06eudxvt0fsu49av2xma3c76uvwwhvcxvkq"
          btcAddress="bc1qv0dpmn5ec4kkzsl458p0zmq25yyr55fjmhp3w8"
          lightningAddress="whitepatch439@walletofsatoshi.com"
          paypalHandle="@familycedolin"
          revolutHandle="@cedhousedj"
        />
      </div>
    </section>

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
              <!-- honeypot anti-spam -->
              <input type="checkbox" name="botcheck" style="display:none" />
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
import { useCourses } from '~/composables/useCourses'

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()
const { courses } = useCourses()

const testimonials = computed(() => tm('testimonials') as Array<{text: string, author: string, context: string}>)

// Contact form
const contactSubject = ref('')
const contactEmail = ref('')
const contactMessage = ref('')
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
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: '76d98037-a194-47bc-ab8d-8cdd58af9d0a',
        subject: subjectLabel,
        email: contactEmail.value,
        message: contactMessage.value,
        from_name: contactEmail.value,
      }),
    })
    const data = await res.json()
    if (data.success) {
      contactSuccess.value = true
      contactSubject.value = ''
      contactEmail.value = ''
      contactMessage.value = ''
    } else {
      contactError.value = true
    }
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

/* Hide about-image on desktop since photo is already in hero */
@media (min-width: 900px) {
  :deep(.about-image) {
    display: none;
  }
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

/* ── About: two-column layout ── */
.about-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* ── About: subheading ── */
.about-subheading {
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-bold, 700);
  color: var(--text-dark);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* ── About: why list ── */
.about-why {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.about-why li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 1rem;
  line-height: 1.6;
}

.about-why__icon {
  color: var(--bitcoin-orange);
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

/* ── About: timeline (vertical, right column) ── */
.about-timeline {
  padding-left: 1rem;
  border-left: 2px solid rgba(247, 147, 26, 0.2);
}

.about-timeline .about-subheading {
  margin-top: 0;
}

.about-timeline .skills {
  margin-top: 1.75rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline__item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  padding-bottom: 1.75rem;
}

.timeline__item:last-child {
  padding-bottom: 0;
}

.timeline__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bitcoin-orange);
  border: 2px solid white;
  box-shadow: 0 0 0 2px var(--bitcoin-orange);
  flex-shrink: 0;
  margin-top: 0.25rem;
  margin-left: -1.45rem;
}

.timeline__content {
  flex: 1;
}

.timeline__year {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--bitcoin-orange);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}

.timeline__text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-dark);
}

/* Mobile: stack columns */
@media (max-width: 768px) {
  .about-body {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-timeline {
    border-left: none;
    border-top: 2px solid rgba(247, 147, 26, 0.2);
    padding-left: 0;
    padding-top: 1.5rem;
  }

  .about-timeline .about-subheading {
    margin-top: 1rem;
  }

  .timeline {
    padding-left: 1.5rem;
    border-left: 2px solid rgba(247, 147, 26, 0.2);
  }

  .timeline__dot {
    margin-left: -1.6rem;
  }
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

/* ── Courses section on homepage ── */
.courses-home {
  padding: 5rem 0;
  background-color: var(--light-bg);
}

.courses-home h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.courses-home__subtitle {
  text-align: center;
  color: var(--gray);
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.courses-home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.course-card-home {
  background: var(--light-bg);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid var(--border-color);
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.course-card-home:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  border-color: var(--bitcoin-orange);
}

.course-card-home__badge {
  display: inline-block;
  background: rgba(247, 147, 26, 0.12);
  color: var(--bitcoin-orange);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  width: fit-content;
}

.course-card-home__title {
  font-size: 1.5rem;
  color: var(--text-dark);
  margin: 0;
}

.course-card-home__description {
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
}

.course-card-home__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.course-card-home__modules {
  font-size: 0.9rem;
  color: var(--gray);
}

.course-card-home__price {
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--bitcoin-orange);
}

@media (max-width: 768px) {
  .courses-home__grid {
    grid-template-columns: 1fr;
  }
}

/* ── Donation Section ── */
.donation-section {
  padding: 5rem 0;
  background: var(--light-bg);
}

.donation-section__title {
  font-size: 2.5rem;
  text-align: center;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.donation-section__subtitle {
  text-align: center;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto 3rem;
  font-size: 1.05rem;
  line-height: 1.6;
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
