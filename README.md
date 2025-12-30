<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:
=======
# Wrappy - Premium Food Brand Website

A modern, premium, Gen-Z friendly website for **Wrappy** - a food brand focused on wraps, fries, beverages, shakes, desserts, and snacks.

## Features

- 🔥 **Bold & Energetic Design** - Premium fast food aesthetic
- 🍔 **Food-First Visual Experience** - Instagram-worthy presentation
- ✨ **GSAP-Powered Animations** - Smooth, cinematic scroll effects
- 📱 **Mobile-First Responsive** - Optimized for all devices
- 🎯 **Conversion-Oriented** - Clear CTAs for ordering and store visits

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **GSAP** (ScrollTrigger, Timeline)
- **No UI Libraries** - Pure custom components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:
>>>>>>> 57c897d (Initial Wrappy website with GSAP animations)

```bash
npm run dev
# or
yarn dev
<<<<<<< HEAD
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Wrappy
=======
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/
│   ├── Loader.tsx       # Animated loader
│   ├── Navigation.tsx   # Sticky navbar
│   ├── Hero.tsx         # Hero section
│   ├── SignatureWraps.tsx    # Wraps showcase
│   ├── FriesAndSides.tsx     # Fries section
│   ├── ShakesAndDesserts.tsx # Shakes & desserts
│   ├── BuildYourWrap.tsx     # Interactive builder
│   ├── BrandStory.tsx        # Brand story
│   └── FinalCTA.tsx          # Final call-to-action
└── public/              # Static assets
```

## Brand Colors

- **Black/Charcoal**: `#0e0e0e`
- **Cream/Off-white**: `#f9f5ef`
- **Neon Red**: `#ff1e1e`
- **Electric Orange**: `#ff6b35`
- **Lime Green**: `#d4ff00`

## Animation Guidelines

All animations use GSAP for smooth, performant effects:

- **ScrollTrigger** for scroll-based animations
- **Timelines** for complex sequences
- **Respects `prefers-reduced-motion`** for accessibility
- **Mobile-optimized** animations with simplified effects

## Build for Production

```bash
npm run build
npm start
```

## License

Private project - All rights reserved

>>>>>>> 57c897d (Initial Wrappy website with GSAP animations)
