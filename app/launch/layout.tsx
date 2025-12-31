import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grand Opening - Wrappy is Now Open in Hyderabad',
  description: 'Wrappy is officially open! Join us for our grand opening celebration. Fresh wraps, crispy fries, and bold flavours await you at Shop 5A, Plot 192, Addagutta Society, Kukatpally, Hyderabad. Call us at 7799602222.',
  keywords: ['wrappy opening', 'wrappy launch', 'grand opening', 'wrappy hyderabad opening', 'new restaurant hyderabad', 'kukatpally restaurant', 'wrappy grand opening', 'restaurant opening hyderabad'],
  openGraph: {
    title: 'Grand Opening - Wrappy is Now Open',
    description: 'Wrappy is officially open! Join us for our grand opening celebration. Fresh wraps, crispy fries, and bold flavours await you.',
    url: 'https://wrappy.com/launch',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Wrappy Grand Opening',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grand Opening - Wrappy is Now Open',
    description: 'Wrappy is officially open! Join us for our grand opening celebration. Fresh wraps, crispy fries, and bold flavours await you.',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: '/launch',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LaunchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

