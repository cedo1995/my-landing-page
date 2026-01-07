# Bitcoin Developer & Educator Website

A professional website for a software developer specializing in Bitcoin technology, built with Nuxt.js 3 and Vue 3.

## Features

- 🎨 Modern, responsive design with Bitcoin-themed styling
- 📅 Integrated consultation booking system
- 💳 Payment processing setup (Stripe integration ready)
- 🗓️ Calendly integration for appointment scheduling
- ⚡ Built with Nuxt 3 and Vue 3
- 🎯 SEO optimized
- 📱 Mobile-friendly responsive layout

## Project Structure

```
bitcoin-developer-site/
├── assets/
│   └── css/
│       └── main.css          # Global styles
├── pages/
│   ├── index.vue             # Homepage with all sections
│   └── success.vue           # Payment success page
├── server/
│   └── api/
│       └── create-checkout.post.ts  # Stripe checkout API endpoint
├── nuxt.config.ts            # Nuxt configuration
├── .env.example              # Environment variables example
└── package.json              # Dependencies
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd bitcoin-developer-site
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials:

```env
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
NUXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
```

### 3. Set Up Stripe (Payment Processing)

1. Create a Stripe account at https://stripe.com
2. Get your API keys from https://dashboard.stripe.com/apikeys
3. Add your **Publishable Key** to `.env` as `NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. For production, you'll also need to add the **Secret Key** to your server environment

#### Implementing Stripe Checkout:

To enable actual payment processing, you need to:

1. Install Stripe SDK:
```bash
npm install stripe
```

2. Add your Stripe Secret Key to your environment (server-side only):
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

3. Uncomment the Stripe integration code in `server/api/create-checkout.post.ts`

4. Update the `bookConsultation` function in `pages/index.vue` to call your API:

```javascript
const response = await $fetch('/api/create-checkout', {
  method: 'POST',
  body: { duration, price }
})

if (response.url) {
  window.location.href = response.url
}
```

### 4. Set Up Calendly (Appointment Scheduling)

1. Create a Calendly account at https://calendly.com
2. Set up your event types:
   - Create a "30min Consultation" event
   - Create a "60min Consultation" event
3. Get your scheduling links
4. Add your Calendly URL to `.env` as `NUXT_PUBLIC_CALENDLY_URL`

For advanced integration, consider using the Calendly API or embed widget.

### 5. Run Development Server

```bash
npm run dev
```

The site will be available at http://localhost:3000

### 6. Build for Production

```bash
npm run build
npm run preview
```

## Consultation Packages

The website offers two consultation packages:

- **Quick Session** (30 minutes) - €40
  - Bitcoin fundamentals
  - Quick technical questions
  - Project consultation
  - Learning path guidance

- **Deep Dive** (60 minutes) - €70
  - In-depth technical review
  - Architecture consultation
  - Code review & guidance
  - Bitcoin integration strategy
  - Best practices & security

## Customization

### Update Your Information

Edit `pages/index.vue` to update:
- Your name and title
- About section content
- Skills and expertise
- Social media links
- Contact information

### Modify Styling

Edit `assets/css/main.css` to customize:
- Colors (Bitcoin orange is `#f7931a`)
- Typography
- Layout
- Animations
- Responsive breakpoints

### Change Pricing

Update the pricing in `pages/index.vue`:
- Modify the `price` values in the pricing cards
- Update the `duration` and `price` parameters in the `bookConsultation` function

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `.output/public`
5. Add environment variables in Netlify dashboard

### Deploy to Your Own Server

```bash
npm run build
```

The `.output` directory contains your production-ready application.

## Payment Flow

1. User selects a consultation package (30min or 60min)
2. User clicks "Book" button
3. System creates a Stripe Checkout session
4. User is redirected to Stripe payment page
5. After successful payment, user is redirected to success page
6. Success page provides link to schedule via Calendly
7. User selects appointment time
8. Confirmation emails are sent

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for all sensitive data
- Implement proper webhook verification for Stripe
- Use HTTPS in production
- Validate all user input
- Implement rate limiting on API endpoints

## Support

For questions or issues, please open an issue on GitHub or contact the developer.

## License

ISC License - see package.json

---

Built with ❤️ and ₿ using Nuxt 3 and Vue 3