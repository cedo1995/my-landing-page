<template>
  <div>
    <SiteHeader />

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

            <StripePayment type="consultation" :price="40" duration="30min" />

            <BitcoinPayment
              type="consultation"
              amountEur="40"
              btcAddress="bc1qv0dpmn5ec4kkzsl458p0zmq25yyr55fjmhp3w8"
              lightningAddress="whitepatch439@walletofsatoshi.com"
              bolt12Offer="lno1pgqppmsrse80qf0aara4slvcjxrvu6j2rp5ftmjy4yntlsmsutpkvkt6878s8yk758zckejhqdky37cvwjzn6j42erhgtgrqudx20peerqlkmxhdqgpq8nh5f6t86vc8yc6yl4stfptx90fw968ak2x9vtumnhtkku0rxqcqx0c890tx2csnhamqp94vc5jldythzdka66v6g950l3lhvaj5xy7wufckahvjn0wr2kqgsz9snpz6qedeatqs8y0dcscl6svgdlsqpwqxjgu9yucrrv0jqad7vd8375j628fcj3jzqqeqk88qrtlqhu3uq9fnc67hrnzp5h45we5vmu3ll3aalxz0q06eudxvt0fsu49av2xma3c76uvwwhvcxvkq"
              ownerEmail="roberto.cedo@gmail.com"
            />
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

            <StripePayment type="consultation" :price="80" duration="60min" />
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

    <!-- Footer -->
    <footer id="contact">
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

const { t } = useI18n()
const localePath = useLocalePath()
const { courses } = useCourses()

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
/* Courses section on homepage */
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
</style>
