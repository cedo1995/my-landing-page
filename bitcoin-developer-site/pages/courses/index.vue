<template>
  <div>
    <SiteHeader />

    <main>
      <section class="courses-hero">
        <div class="container">
          <h1>{{ $t('courses.listingTitle') }}</h1>
          <p class="courses-hero__subtitle">{{ $t('courses.listingSubtitle') }}</p>
        </div>
      </section>

      <section class="courses-listing">
        <div class="container">
          <div class="courses-grid">
            <NuxtLink
              v-for="course in courses"
              :key="course.slug"
              :to="localePath(`/courses/${course.slug}`)"
              class="course-card"
            >
              <div class="course-card__badge">Bitcoin</div>
              <h2 class="course-card__title">{{ $t(course.titleKey) }}</h2>
              <p class="course-card__description">{{ $t(course.descriptionKey) }}</p>
              <div class="course-card__meta">
                <span class="course-card__modules">{{ course.moduleKeys.length }} {{ $t('courses.modules') }}</span>
                <span class="course-card__price">{{ course.price }}</span>
              </div>
              <span class="course-card__cta">{{ $t('courses.viewDetails') }} →</span>
            </NuxtLink>
          </div>
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
            <a href="https://www.youtube.com/@robertocedolin" target="_blank" rel="noopener noreferrer">{{ $t('footer.social.youtube') }}</a>
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
const { courses } = useCourses()
const { t } = useI18n()

useHead({
  title: () => `${t('courses.listingTitle')} | ${t('seo.title')}`,
  meta: [
    { name: 'description', content: () => t('courses.listingSubtitle') },
    { property: 'og:title', content: () => `${t('courses.listingTitle')} | ${t('seo.title')}` },
    { property: 'og:description', content: () => t('courses.listingSubtitle') },
    { property: 'og:url', content: 'https://robertocedolin.com/courses' },
  ],
})
</script>

<style scoped>
.courses-hero {
  background: linear-gradient(135deg, var(--dark-bg) 0%, #2d2d2d 100%);
  color: var(--text-light);
  padding: 5rem 0 3rem;
  text-align: center;
}

.courses-hero h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.courses-hero__subtitle {
  font-size: 1.1rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
}

.courses-listing {
  padding: 4rem 0;
  background: var(--light-gray);
  min-height: 60vh;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.course-card {
  background: var(--light-bg);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 2px solid transparent;
}

.course-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--bitcoin-orange);
}

.course-card__badge {
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

.course-card__title {
  font-size: 1.5rem;
  color: var(--text-dark);
  margin: 0;
}

.course-card__description {
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
}

.course-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.course-card__modules {
  font-size: 0.9rem;
  color: var(--gray);
}

.course-card__price {
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--bitcoin-orange);
}

.course-card__cta {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--bitcoin-orange);
}

@media (max-width: 768px) {
  .courses-hero h1 {
    font-size: 2rem;
  }

  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>
