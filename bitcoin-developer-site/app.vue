<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()

const siteUrl = 'https://robertocedolin.com'

// Hreflang: sostituisce il prefisso lingua nell'URL corrente
function hrefForLocale(lang: string) {
  // route.path è tipo /it/courses → sostituiamo il prefisso
  const withoutLocale = route.path.replace(/^\/(it|en)(\/|$)/, '/')
  const path = withoutLocale === '/' ? '' : withoutLocale
  return `${siteUrl}/${lang}${path}`
}

useHead({
  title: () => t('seo.title'),
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: () => t('seo.description') },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Roberto Cedolin' },
    { property: 'og:title', content: () => t('seo.title') },
    { property: 'og:description', content: () => t('seo.description') },
    { property: 'og:image', content: `${siteUrl}/og-image.png` },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@CedolinRoberto' },
    { name: 'twitter:creator', content: '@CedolinRoberto' },
    { name: 'twitter:title', content: () => t('seo.title') },
    { name: 'twitter:description', content: () => t('seo.description') },
    { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
  ],
  link: computed(() => [
    { rel: 'alternate', hreflang: 'it', href: hrefForLocale('it') },
    { rel: 'alternate', hreflang: 'en', href: hrefForLocale('en') },
    { rel: 'alternate', hreflang: 'x-default', href: hrefForLocale('it') },
  ])
})
</script>

<template>
  <NuxtPage />
</template>
