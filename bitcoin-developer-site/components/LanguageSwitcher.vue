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
