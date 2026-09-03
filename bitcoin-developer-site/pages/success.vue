<template>
  <div class="success-page">
    <header>
      <nav class="container">
        <NuxtLink :to="localePath('/')" class="logo">{{ t('success.nav.logo') }}</NuxtLink>
      </nav>
    </header>

    <div class="container success-content">
      <!-- Payment not verified -->
      <div v-if="paymentInvalid" class="success-card success-card--error">
        <div class="success-icon success-icon--error">✗</div>
        <h1>{{ t('success.invalidTitle') }}</h1>
        <p class="success-message">{{ t('success.invalidMessage') }}</p>
        <div class="button-group">
          <NuxtLink :to="localePath('/')" class="secondary-button">
            {{ t('success.buttons.backHome') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Payment confirmed -->
      <div v-else class="success-card">
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
          <a v-if="!isCourse && calendlyUrl" :href="calendlyUrl" target="_blank" class="cta-button">
            {{ t('success.buttons.schedule') }}
          </a>
          <NuxtLink :to="localePath('/')" class="secondary-button">
            {{ t('success.buttons.backHome') }}
          </NuxtLink>
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
const localePath = useLocalePath()

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

// ── Verify payment session ────────────────────────────────────────────────────
const sessionId = route.query.session_id as string | undefined
const paymentInvalid = ref(false)

if (sessionId) {
  try {
    const result = await $fetch<{ paid: boolean }>(`/api/verify-session?session_id=${sessionId}`)
    if (!result.paid) paymentInvalid.value = true
  } catch {
    paymentInvalid.value = true
  }
}

// ── Page state ────────────────────────────────────────────────────────────────
const isCourse = computed(() => route.query.type === 'course')

const calendlyUrl = computed(() => {
  const duration = route.query.duration
  if (duration === '60min') return config.public.calendly60minUrl || config.public.calendlyUrl
  if (duration === '3h') return config.public.calendly3hUrl || config.public.calendlyUrl
  return config.public.calendlyUrl || null
})

// tm() returns raw array/object, t() always returns string
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

.success-card--error {
  border: 2px solid #e53e3e;
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

.success-icon--error {
  background: #e53e3e;
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

header {
  background: #1a1a1a;
  padding: 1rem 0;
}

header nav {
  display: flex;
  align-items: center;
}

.logo {
  color: #f7931a;
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: none;
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
