<template>
  <div>
    <!-- Header -->
    <header>
      <nav class="container">
        <a href="#" class="logo">₿ Roberto Cedolin</a>
        <ul class="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#consultations">Consultations</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Software Development & Bitcoin Education</h1>
        <p class="subtitle">Software Engineer | Bitcoin Enthusiast | Content Creator</p>
        <p>
          Passionate software developer with a deep interest in Bitcoin technology.
          I create content and provide education to help people understand Bitcoin and its potential.
        </p>
        <a href="#consultations" class="cta-button">Book a Consultation</a>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <h2>About Me</h2>
        <div class="about-content">
          <div class="about-text">
            <p>
              I'm a passionate software developer with a strong interest in Bitcoin technology.
              Through my experience in software engineering, I've developed a deep appreciation
              for Bitcoin's innovative approach to money and decentralization.
            </p>
            <p>
              As a content creator and educator, my mission is to demystify Bitcoin and make it
              accessible to everyone. I create educational content across multiple platforms to
              help people understand Bitcoin's fundamentals, its technology, and its potential
              to transform the financial system.
            </p>
            <p>
              Whether you're a beginner looking to understand Bitcoin basics, someone curious
              about the technology behind it, or exploring how Bitcoin fits into the broader
              financial landscape, I'm here to help you on your Bitcoin learning journey.
            </p>
            
            <div class="skills">
              <span class="skill-tag">Software Development</span>
              <span class="skill-tag">Bitcoin Education</span>
              <span class="skill-tag">Content Creation</span>
              <span class="skill-tag">Technical Education</span>
              <span class="skill-tag">Bitcoin Fundamentals</span>
              <span class="skill-tag">Blockchain Technology</span>
              <span class="skill-tag">Financial Technology</span>
            </div>
          </div>
          <div class="about-image">
            <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="180" fill="#f7931a" opacity="0.1"/>
              <circle cx="200" cy="200" r="150" fill="none" stroke="#f7931a" stroke-width="3"/>
              <text x="200" y="210" font-size="120" fill="#f7931a" text-anchor="middle" font-weight="bold">₿</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultations Section -->
    <section id="consultations" class="consultations">
      <div class="container">
        <h2>Book a Consultation</h2>
        <p class="consultations-subtitle">
          Get personalized guidance on Bitcoin education, learning paths, and understanding the technology
        </p>
        
        <div class="pricing-cards">
          <!-- 30 Minutes Consultation -->
          <div class="pricing-card">
            <h3>Quick Session</h3>
            <div class="price">€40</div>
            <div class="duration">30 minutes</div>
            <ul class="features">
              <li>✓ Bitcoin fundamentals</li>
              <li>✓ Quick questions</li>
              <li>✓ Learning guidance</li>
              <li>✓ Educational resources</li>
            </ul>
            <button 
              class="book-button" 
              @click="bookConsultation('30min', 40)"
              :disabled="isProcessing"
            >
              {{ isProcessing ? 'Processing...' : 'Book 30min Session' }}
            </button>
          </div>

          <!-- 60 Minutes Consultation -->
          <div class="pricing-card featured">
            <h3>Deep Dive</h3>
            <div class="price">€70</div>
            <div class="duration">60 minutes</div>
            <ul class="features">
              <li>✓ In-depth Bitcoin education</li>
              <li>✓ Comprehensive learning plan</li>
              <li>✓ Technology deep dive</li>
              <li>✓ Bitcoin use cases & strategy</li>
              <li>✓ Best practices & security basics</li>
            </ul>
            <button 
              class="book-button" 
              @click="bookConsultation('60min', 70)"
              :disabled="isProcessing"
            >
              {{ isProcessing ? 'Processing...' : 'Book 60min Session' }}
              <span v-if="isProcessing" class="spinner"></span>
            </button>
          </div>
        </div>

        <div style="margin-top: 3rem; text-align: center; color: #666;">
          <p><strong>What to expect:</strong></p>
          <p style="margin-top: 1rem;">
            After payment, you'll be redirected to schedule your consultation via Calendly. 
            Sessions are conducted via video call, and you'll receive a confirmation email with all the details.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contact">
      <div class="container">
        <div class="footer-content">
          <div>
            <p>&copy; 2026 Roberto Cedolin - Software Developer & Bitcoin Educator. All rights reserved.</p>
          </div>
          <div class="social-links">
            <a href="https://x.com/CedolinRoberto" target="_blank" title="X (Twitter)">𝕏</a>
            <a href="https://www.linkedin.com/in/roberto-cedolin/" target="_blank" title="LinkedIn">LinkedIn</a>
            <a href="https://www.youtube.com/@robertocedolin" target="_blank" title="YouTube">YouTube</a>
            <a href="https://www.instagram.com/roberto_cedolin/" target="_blank" title="Instagram">Instagram</a>
            <a href="https://www.tiktok.com/@roberto_cedolin" target="_blank" title="TikTok">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isProcessing = ref(false)

const config = useRuntimeConfig()

// Stripe payment links
const STRIPE_PAYMENT_LINKS = {
  '30min': 'https://buy.stripe.com/test_eVqaEX7B070O1Pe1lO7Vm00',
  '60min': 'https://buy.stripe.com/test_7sY28r3kK0Cq51qd4w7Vm01'
}

const bookConsultation = async (duration: string, price: number) => {
  if (isProcessing.value) return
  
  isProcessing.value = true

  try {
    // Get the Stripe payment link for the selected duration
    const paymentLink = STRIPE_PAYMENT_LINKS[duration as keyof typeof STRIPE_PAYMENT_LINKS]
    
    if (!paymentLink) {
      alert('Invalid consultation type. Please try again.')
      return
    }
    
    // Redirect directly to Stripe payment page
    window.location.href = paymentLink
    
  } catch (error) {
    console.error('Booking error:', error)
    alert('An error occurred. Please try again or contact support.')
    isProcessing.value = false
  }
}

// Smooth scroll for anchor links
if (process.client) {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault()
      const id = target.getAttribute('href')?.slice(1)
      if (id) {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  })
}
</script>