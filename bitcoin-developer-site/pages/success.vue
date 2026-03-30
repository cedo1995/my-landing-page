<template>
  <div class="success-page">
    <header>
      <nav class="container">
        <a href="/" class="logo">{{ t('success.nav.logo') }}</a>
      </nav>
    </header>

    <div class="container success-content">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h1>{{ t('success.title') }}</h1>
        <p class="success-message">
          {{ isCourse ? t('success.messageCourse') : t('success.message') }}
        </p>

        <div class="next-steps">
          <h2>{{ t('success.nextSteps.title') }}</h2>
          <ol>
            <li v-for="(item, idx) in nextSteps" :key="idx">
              {{ item }}
            </li>
          </ol>
        </div>

        <div class="button-group">
          <a v-if="!isCourse" :href="calendlyUrl" target="_blank" class="cta-button">
            {{ t('success.buttons.schedule') }}
          </a>
          <a href="/" class="secondary-button">
            {{ t('success.buttons.backHome') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { t, tm } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()

const isCourse = computed(() => route.query.type === 'course')

const calendlyUrl = computed(() => {
  const baseUrl = config.public.calendlyUrl || 'https://calendly.com'
  const duration = route.query.duration

  if (duration === '30min') {
    return `${baseUrl}/30min-consultation`
  } else if (duration === '60min') {
    return `${baseUrl}/60min-consultation`
  }

  return baseUrl
})

// tm() restituisce il valore raw (array/oggetto), t() restituisce sempre una stringa
const nextSteps = computed(() => {
  const key = isCourse.value ? 'success.nextSteps.itemsCourse' : 'success.nextSteps.items'
  const value = tm(key)
  return Array.isArray(value) ? value.map(String) : []
})
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.success-content {
  padding: 4rem 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
}

.success-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 2rem;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.success-card h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.success-message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.next-steps {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: left;
}

.next-steps h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.next-steps ol {
  padding-left: 1.5rem;
}

.next-steps li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #666;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.cta-button,
.secondary-button {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button {
  background-color: #f7931a;
  color: white;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(247, 147, 26, 0.3);
}

.secondary-button {
  background-color: #e0e0e0;
  color: #333;
}

.secondary-button:hover {
  background-color: #d0d0d0;
}

@media (max-width: 768px) {
  .success-card {
    padding: 2rem;
  }

  .success-card h1 {
    font-size: 2rem;
  }
}
</style>
