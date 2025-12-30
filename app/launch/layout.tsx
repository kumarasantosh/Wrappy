import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grand Opening - Wrappy is Now Open',
  description: 'Wrappy is officially open! Join us for our grand opening celebration. Fresh wraps, crispy fries, and bold flavours await you at Shop 5A, Plot 192, Addagutta Society, Kukatpally, Hyderabad.',
  keywords: ['wrappy opening', 'wrappy launch', 'grand opening', 'wrappy hyderabad opening', 'new restaurant hyderabad'],
  openGraph: {
    title: 'Grand Opening - Wrappy is Now Open',
    description: 'Wrappy is officially open! Join us for our grand opening celebration. Fresh wraps, crispy fries, and bold flavours await you.',
    url: 'https://wrappy.com/launch',
  },
}

export default function LaunchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

