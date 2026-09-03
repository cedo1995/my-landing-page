<template>
  <div class="error-page">
    <header>
      <nav class="container">
        <NuxtLink :to="localePath('/')" class="logo">₿ Bitcoin Developer</NuxtLink>
      </nav>
    </header>

    <div class="container error-content">
      <div class="error-card">
        <div class="error-icon">{{ error?.statusCode === 404 ? '404' : '!' }}</div>
        <h1>{{ title }}</h1>
        <p class="error-message">{{ message }}</p>
        <div class="button-group">
          <NuxtLink :to="localePath('/')" class="cta-button">
            {{ $t('error.backHome') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const title = computed(() =>
  props.error?.statusCode === 404 ? t('error.notFoundTitle') : t('error.genericTitle')
)
const message = computed(() =>
  props.error?.statusCode === 404 ? t('error.notFoundMessage') : t('error.genericMessage')
)

useHead({
  title: () => `${title.value} | Roberto Cedolin`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

header {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem 0;
}

.logo {
  color: #f7931a;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 700;
}

.error-content {
  padding: 4rem 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
}

.error-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.error-icon {
  width: 80px;
  height: 80px;
  background: #f7931a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 auto 2rem;
}

.error-card h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  justify-content: center;
}

.cta-button {
  display: inline-block;
  padding: 0.9rem 2rem;
  background-color: #f7931a;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(247, 147, 26, 0.3);
}

@media (max-width: 768px) {
  .error-card {
    padding: 2rem;
  }
  .error-card h1 {
    font-size: 1.6rem;
  }
}
</style>
