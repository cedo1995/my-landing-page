<template>
  <div>
    <SiteHeader />

    <main>
      <section class="course-detail-hero">
        <div class="container">
          <NuxtLink :to="localePath('/courses')" class="back-link">{{ $t('courses.backToList') }}</NuxtLink>
          <div class="course-detail-hero__badge">Bitcoin</div>
          <h1>{{ $t('courses.approfondimentoBitcoin.title') }}</h1>
          <p class="course-detail-hero__desc">{{ $t('courses.approfondimentoBitcoin.description') }}</p>
          <div class="course-detail-hero__price">€800</div>
        </div>
      </section>

      <section class="course-detail-content">
        <div class="container course-detail-layout">

          <div class="course-main">
            <!-- Meta badges row -->
            <div class="course-meta-row">
              <span class="course-meta-badge">
                <strong>{{ $t('courses.detail.level') }}:</strong> {{ $t('courses.detail.levelValue') }}
              </span>
              <span class="course-meta-badge">
                <strong>{{ $t('courses.detail.format') }}:</strong> {{ $t('courses.detail.formatValue') }}
              </span>
              <span class="course-meta-badge">
                <strong>{{ $t('courses.detail.durationAdvanced') }}</strong>
              </span>
            </div>

            <h2>{{ $t('courses.detail.whatYouLearn') }}</h2>
            <ol class="modules-list">
              <li
                v-for="(mod, index) in moduleList"
                :key="mod.key"
                class="module-item"
              >
                <div class="module-number">{{ $t('courses.detail.module') }} {{ index + 1 }}</div>
                <div class="module-body">
                  <h3 class="module-title">{{ $t(`${mod.key}.title`) }}</h3>
                  <p class="module-description">{{ $t(`${mod.key}.description`) }}</p>
                </div>
              </li>
            </ol>

            <!-- What's included -->
            <div class="course-includes">
              <h2>{{ $t('courses.detail.includes') }}</h2>
              <ul>
                <li v-for="(item, i) in includesList" :key="i">{{ item }}</li>
              </ul>
            </div>

            <!-- For who -->
            <div class="course-for-who">
              <h2>{{ $t('courses.detail.forWho') }}</h2>
              <ul>
                <li v-for="(item, i) in forWhoList" :key="i">{{ item }}</li>
              </ul>
            </div>

            <!-- FAQ -->
            <div class="course-faq">
              <h2>FAQ</h2>
              <details
                v-for="(item, i) in (tm('courses.approfondimentoBitcoin.faq') as any[])"
                :key="i"
              >
                <summary>{{ rt(item.q) }}</summary>
                <p>{{ rt(item.a) }}</p>
              </details>
            </div>
          </div>

          <aside class="course-sidebar">
            <div class="course-sidebar__card">
              <div class="course-sidebar__price">€800</div>
              <p class="course-sidebar__modules-count">{{ moduleList.length }} {{ $t('courses.modules') }}</p>
              <NuxtLink :to="localePath('/checkout/approfondimento-bitcoin')" class="book-button" style="display:block; text-align:center; text-decoration:none;">
                {{ $t('courses.buyButton') }}
              </NuxtLink>
            </div>
          </aside>

        </div>
      </section>

      <section class="course-detail-cta">
        <div class="container" style="text-align:center; padding: 3rem 0;">
          <NuxtLink :to="localePath('/checkout/approfondimento-bitcoin')" class="book-button" style="display:inline-block; text-decoration:none; font-size:1.1rem; padding: 1rem 2.5rem;">
            {{ $t('courses.buyButton') }}
          </NuxtLink>
        </div>
      </section>
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
import { useLocalePath } from '#i18n'
import { useCourses } from '~/composables/useCourses'

const localePath = useLocalePath()
const { t, tm, rt } = useI18n()
const { courses } = useCourses()

const course = courses.find(c => c.slug === 'approfondimento-bitcoin')!
const moduleList = course.moduleKeys

const includesList = computed<string[]>(() => [
  t('courses.detail.includesListAdvanced.0'),
  t('courses.detail.includesListAdvanced.1'),
  t('courses.detail.includesListAdvanced.2'),
  t('courses.detail.includesListAdvanced.3'),
  t('courses.detail.includesListAdvanced.4'),
])

const forWhoList = computed<string[]>(() => [
  t('courses.detail.forWhoList.0'),
  t('courses.detail.forWhoList.1'),
  t('courses.detail.forWhoList.2'),
  t('courses.detail.forWhoList.3'),
])

useHead({
  title: () => `${t('courses.approfondimentoBitcoin.title')} | ${t('seo.title')}`,
  meta: [
    { name: 'description', content: () => t('courses.approfondimentoBitcoin.description') },
    { property: 'og:title', content: () => `${t('courses.approfondimentoBitcoin.title')} | ${t('seo.title')}` },
    { property: 'og:description', content: () => t('courses.approfondimentoBitcoin.description') },
    { property: 'og:url', content: 'https://robertocedolin.com/courses/approfondimento-bitcoin' },
  ],
})
</script>

<style scoped>
.course-detail-hero {
  background: linear-gradient(135deg, var(--dark-bg) 0%, #2d2d2d 100%);
  color: var(--text-light);
  padding: 4rem 0 3rem;
}

.back-link {
  display: inline-block;
  color: var(--bitcoin-orange);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.course-detail-hero__badge {
  display: inline-block;
  background: rgba(247, 147, 26, 0.2);
  color: var(--bitcoin-orange);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1rem;
}

.course-detail-hero h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.course-detail-hero__desc {
  font-size: 1.1rem;
  color: #ccc;
  max-width: 700px;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.course-detail-hero__price {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--bitcoin-orange);
}

.course-detail-content {
  padding: 4rem 0;
  background: var(--light-bg);
}

.course-detail-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
  align-items: start;
}

.course-main h2 {
  font-size: 2rem;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.course-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.course-meta-badge {
  background: rgba(247, 147, 26, 0.1);
  border: 1px solid rgba(247, 147, 26, 0.3);
  color: var(--text-dark);
  font-size: 0.85rem;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  line-height: 1.4;
}

.course-includes,
.course-for-who {
  margin-top: 3rem;
}

.course-includes h2,
.course-for-who h2 {
  font-size: 1.6rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.course-includes ul,
.course-for-who ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.course-includes ul li,
.course-for-who ul li {
  padding-left: 1.5rem;
  position: relative;
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.5;
}

.course-includes ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--bitcoin-orange);
  font-weight: 700;
}

.course-for-who ul li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--bitcoin-orange);
  font-weight: 700;
}

.modules-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.module-item {
  display: flex;
  gap: 1.5rem;
  background: var(--light-gray);
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid var(--bitcoin-orange);
}

.module-number {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--bitcoin-orange);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  padding-top: 0.15rem;
}

.module-body {
  flex: 1;
}

.module-title {
  font-size: 1.15rem;
  color: var(--text-dark);
  margin-bottom: 0.4rem;
}

.module-description {
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.5;
}

.course-sidebar__card {
  background: var(--light-bg);
  border: 2px solid var(--bitcoin-orange);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  position: sticky;
  top: 90px;
}

.course-sidebar__price {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--bitcoin-orange);
  margin-bottom: 0.5rem;
}

.course-sidebar__modules-count {
  color: var(--gray);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .course-detail-layout {
    grid-template-columns: 1fr;
  }

  .course-sidebar__card {
    position: static;
  }

  .course-detail-hero h1 {
    font-size: 2rem;
  }
}

/* ── Course FAQ ── */
.course-faq {
  margin-top: 3rem;
}

.course-faq h2 {
  font-size: 1.6rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.course-faq details {
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.course-faq details:first-of-type {
  border-top: 1px solid var(--border-color);
}

.course-faq summary {
  cursor: pointer;
  font-weight: 500;
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

.course-faq summary::-webkit-details-marker {
  display: none;
}

.course-faq summary::after {
  content: '+';
  color: var(--bitcoin-orange);
  font-size: 1.4rem;
  font-weight: 700;
  flex-shrink: 0;
}

.course-faq details[open] summary::after {
  content: '−';
}

.course-faq details p {
  margin-top: 0.75rem;
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.7;
  padding-right: 2rem;
}
</style>
