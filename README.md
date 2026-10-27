# Tanners Photography — Next.js Starter

A responsive, minimalist editorial photography portfolio built with Next.js App Router, TypeScript, and Tailwind CSS v4.

## What's included
- Responsive homepage and navigation
- Seven portfolio categories with client-side filtering
- About section
- Three editable sample photography packages
- Booking modal with required contact fields and service/package selectors
- Booking form prepares an email using `mailto:` (does not store bookings yet)
- Sample imagery from Unsplash

## Run locally
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Before publishing
1. Replace sample images with your own photographs (prefer optimized WebP/AVIF files in `public/images`).
2. Replace the sample package names/prices/inclusions with your real offers.
3. In `components/portfolio.tsx`, replace `hello@tannersphotography.com` with your actual booking email.
4. Replace the generic Instagram link with your actual profile.
5. Replace the About section's draft story with your real bio.
6. Add a privacy notice if collecting personal information.
7. For reliable booking submissions, connect Supabase or a booking/email service and save inquiries server-side. The current form opens the visitor's email app and is a prototype, not a server-backed booking system.
8. Check licenses and image usage before production; replace demo images with photographs you own or have permission to use.

## Deploy to Vercel
Push this folder to a Git repository, import the repository into Vercel, and deploy. No environment variables are required for the current prototype.
