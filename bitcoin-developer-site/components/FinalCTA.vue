<template>
  <section class="final-cta">
    <div class="container final-cta__inner">
      <h2 class="final-cta__headline">{{ headline }}</h2>
      <p class="final-cta__subheadline">{{ subheadline }}</p>
      <a :href="ctaHref" class="cta-button final-cta__btn">{{ ctaLabel }}</a>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  headline: string
  subheadline: string
  ctaLabel: string
  ctaHref: string
}>()
</script>

<style scoped>
.final-cta {
  background: var(--dark-bg);
  padding: 5rem 0;
  text-align: center;
}

.final-cta__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.final-cta__headline {
  font-size: 2.5rem;
  font-weight: var(--font-bold);
  color: var(--text-light);
  margin: 0;
  line-height: 1.2;
}

.final-cta__subheadline {
  font-size: 1.1rem;
  color: #aaa;
  margin: 0;
  max-width: 540px;
  line-height: 1.6;
}

.final-cta__btn {
  margin-top: 0.5rem;
  font-size: 1.05rem;
  padding: 0.85rem 2.25rem;
}

@media (max-width: 768px) {
  .final-cta__headline {
    font-size: 1.8rem;
  }

  .final-cta__subheadline {
    font-size: 1rem;
  }
}
</style>
