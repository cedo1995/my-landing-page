<template>
  <div class="legal-page">
    <SiteHeader />

    <main class="container legal-content">
      <h1>{{ $t('terms.title') }}</h1>
      <p class="legal-date">{{ $t('legal.lastUpdated') }}: 29/03/2026</p>

      <section>
        <h2>{{ $t('terms.services.title') }}</h2>
        <p>{{ $t('terms.services.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('terms.payments.title') }}</h2>
        <p>{{ $t('terms.payments.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('terms.refunds.title') }}</h2>
        <p>{{ $t('terms.refunds.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('terms.delivery.title') }}</h2>
        <p>{{ $t('terms.delivery.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('terms.intellectual.title') }}</h2>
        <p>{{ $t('terms.intellectual.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('terms.liability.title') }}</h2>
        <p>{{ $t('terms.liability.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('terms.law.title') }}</h2>
        <p>{{ $t('terms.law.text') }}</p>
      </section>

      <section>
        <h2>{{ $t('terms.contact.title') }}</h2>
        <p>{{ $t('terms.contact.text') }}</p>
      </section>

      <NuxtLink :to="localePath('/')" class="back-link">← {{ $t('legal.backHome') }}</NuxtLink>
    </main>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

useHead(() => ({
  title: `${t('terms.title')} | ${t('seo.title')}`,
  meta: [{ name: 'robots', content: 'noindex' }],
}))
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
