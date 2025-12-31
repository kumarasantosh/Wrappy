import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Wrappy - Wrap It. Bite It. Love It. | Fresh Wraps & Fries in Hyderabad',
    template: '%s | Wrappy'
  },
  description: 'Fresh wraps, crispy fries, thick shakes & chill drinks in Hyderabad. Wrappy - where street food meets bold flavour. Visit us at Shop 5A, Plot 192, Addagutta Society, Kukatpally, Hyderabad. Call 7799602222 to order now!',
  keywords: ['wrappy', 'wraps', 'fresh wraps', 'fries', 'hyderabad food', 'street food', 'kukatpally', 'food delivery', 'restaurant hyderabad', 'wraps hyderabad', 'fries hyderabad', 'wrappy restaurant', 'thickshakes', 'mojitos', 'desserts', 'ufo wraps', 'wrappy kukatpally', 'best wraps hyderabad', 'chicken wraps', 'veg wraps'],
  authors: [{ name: 'Wrappy' }],
  creator: 'Wrappy',
  publisher: 'Wrappy',
  metadataBase: new URL('https://wrappy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://wrappy.com',
    siteName: 'Wrappy',
    title: 'Wrappy - Wrap It. Bite It. Love It. | Fresh Wraps & Fries in Hyderabad',
    description: 'Fresh wraps, crispy fries, thick shakes & chill drinks. Wrappy - where street food meets bold flavour. Located in Kukatpally, Hyderabad.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Wrappy - Fresh Wraps & Fries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wrappy - Wrap It. Bite It. Love It.',
    description: 'Fresh wraps, crispy fries, thick shakes & chill drinks. Wrappy - where street food meets bold flavour.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Wrappy",
    "description": "Fresh wraps, crispy fries, thick shakes & chill drinks. Wrappy - where street food meets bold flavour.",
    "url": "https://wrappy.com",
    "telephone": "+917799602222",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop 5A, Plot 192, Addagutta Society, Jal Vayu Vihar Road",
      "addressLocality": "Kukatpally",
      "addressRegion": "Telangana",
      "postalCode": "500085",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3850",
      "longitude": "78.4867"
    },
    "servesCuisine": "Street Food, Wraps, Fast Food",
    "priceRange": "$$",
    "image": "https://wrappy.com/images/logo.png",
    "sameAs": [
      "https://instagram.com/heywrappy"
    ],
    "menu": "https://wrappy.com/#wraps",
    "acceptsReservations": false,
    "servesCuisine": "Street Food, Wraps, Fast Food, Thickshakes, Mojitos, Desserts"
  }

  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.variable} font-body`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  )
}
