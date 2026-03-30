<script setup lang="ts">
const { t, locale } = useI18n()

const siteUrl = 'https://robertocedolin.com'

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
  ]
})
</script>

<template>
  <NuxtPage />
</template>
