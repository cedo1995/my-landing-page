<template>
  <header>
    <nav class="container">
      <NuxtLink :to="localePath('/')" class="logo">{{ $t('nav.logo') }}</NuxtLink>

      <ul id="nav-links" class="nav-links" :class="{ 'nav-links--open': menuOpen }">
        <li><NuxtLink :to="localePath('/') + '#about'" @click="closeMenu">{{ $t('nav.about') }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/') + '#consultations'" @click="closeMenu">{{ $t('nav.consultations') }}</NuxtLink></li>
        <li>
          <NuxtLink
            :to="localePath('/courses')"
            :class="{ 'nav-active': isCoursesActive }"
            @click="closeMenu"
          >{{ $t('courses.nav') }}</NuxtLink>
        </li>
        <li><NuxtLink :to="localePath('/') + '#contact'" @click="closeMenu">{{ $t('nav.contact') }}</NuxtLink></li>
      </ul>

      <div class="nav-right">
        <LanguageSwitcher />
        <button
          class="hamburger"
          :class="{ 'hamburger--open': menuOpen }"
          :aria-label="menuOpen ? 'Chiudi menu' : 'Apri menu'"
          aria-controls="nav-links"
          :aria-expanded="menuOpen"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <div v-if="menuOpen" class="nav-overlay" @click="closeMenu" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const localePath = useLocalePath()
const route = useRoute()
const menuOpen = ref(false)

const isCoursesActive = computed(() => route.path.includes('/courses'))

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<style scoped>
header {
  background-color: var(--dark-bg);
  color: var(--text-light);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-links a:hover,
.nav-links a.nav-active {
  color: var(--bitcoin-orange);
}

/* Hamburger — nascosto su desktop */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-light);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger--open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger--open span:nth-child(2) {
  opacity: 0;
}
.hamburger--open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: min(280px, 80vw);
    height: 100dvh;
    background: var(--dark-bg);
    flex-direction: column;
    gap: 0;
    padding: 5rem 2rem 2rem;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
    transition: right 0.3s ease;
    z-index: 200;
    overflow-y: auto;
  }

  .nav-links--open {
    right: 0;
  }

  .nav-links li {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-links a {
    display: block;
    padding: 1rem 0;
    font-size: 1.1rem;
  }
}
</style>
