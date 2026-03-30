<script setup lang="ts">
const { locale, setLocale } = useI18n()
const pref = useCookie<string>('site_locale', { sameSite: 'lax' })

async function changeLang(code: 'it' | 'en') {
  pref.value = code
  await setLocale(code)
}
</script>

<template>
  <div class="lang-switch">
    <button :disabled="locale === 'it'" @click="changeLang('it')">IT</button>
    <button :disabled="locale === 'en'" @click="changeLang('en')">EN</button>
  </div>
</template>

<style scoped>
.lang-switch {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.lang-switch button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: var(--text-light, #fff);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  line-height: 1.5;
}

.lang-switch button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.6);
}

.lang-switch button:disabled {
  background: var(--bitcoin-orange, #f7931a);
  border-color: var(--bitcoin-orange, #f7931a);
  color: #fff;
  cursor: default;
  opacity: 1;
}
</style>
