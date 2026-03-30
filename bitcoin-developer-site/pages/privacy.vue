<template>
  <div class="legal-page">
    <SiteHeader />

    <main class="container legal-content">
      <h1>Privacy Policy</h1>
      <p class="legal-date">{{ $t('legal.lastUpdated') }}: 29/03/2026</p>

      <section>
        <h2>{{ $t('privacy.owner.title') }}</h2>
        <p>{{ $t('privacy.owner.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('privacy.dataCollected.title') }}</h2>
        <p>{{ $t('privacy.dataCollected.text') }}</p>
        <ul>
          <li v-for="item in dataCollectedItems" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section>
        <h2>{{ $t('privacy.purpose.title') }}</h2>
        <p>{{ $t('privacy.purpose.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('privacy.thirdParties.title') }}</h2>
        <p>{{ $t('privacy.thirdParties.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('privacy.retention.title') }}</h2>
        <p>{{ $t('privacy.retention.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('privacy.rights.title') }}</h2>
        <p>{{ $t('privacy.rights.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('privacy.contact.title') }}</h2>
        <p>{{ $t('privacy.contact.text') }}</p>
      </section>

      <NuxtLink :to="localePath('/')" class="back-link">← {{ $t('legal.backHome') }}</NuxtLink>
    </main>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t, tm } = useI18n()

useHead(() => ({
  title: `Privacy Policy | ${t('seo.title')}`,
  meta: [{ name: 'robots', content: 'noindex' }],
}))

const dataCollectedItems = computed(() => {
  const val = tm('privacy.dataCollected.items')
  return Array.isArray(val) ? val.map(String) : []
})
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  background: var(--light-bg);
}

.legal-content {
  padding: 4rem 20px;
  max-width: 800px;
}

.legal-content h1 {
  font-size: 2.5rem;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.legal-date {
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 3rem;
}

.legal-content section {
  margin-bottom: 2.5rem;
}

.legal-content h2 {
  font-size: 1.3rem;
  color: var(--text-dark);
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--border-color);
}

.legal-content p {
  color: var(--gray);
  line-height: 1.8;
  margin-bottom: 0.5rem;
}

.legal-content ul {
  padding-left: 1.5rem;
  color: var(--gray);
  line-height: 1.8;
}

.legal-content li {
  margin-bottom: 0.25rem;
}

.back-link {
  display: inline-block;
  color: var(--bitcoin-orange);
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}
</style>
