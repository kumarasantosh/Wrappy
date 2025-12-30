import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Franchise Opportunities - Own a Wrappy Franchise',
  description: 'Join the Wrappy family! Own a franchise and bring fresh wraps, crispy fries, and bold flavours to your community. Get comprehensive support, training, and marketing assistance.',
  keywords: ['wrappy franchise', 'franchise opportunities', 'food franchise', 'restaurant franchise', 'hyderabad franchise', 'wrap franchise'],
  openGraph: {
    title: 'Franchise Opportunities - Own a Wrappy Franchise',
    description: 'Join the Wrappy family! Own a franchise and bring fresh wraps, crispy fries, and bold flavours to your community.',
    url: 'https://wrappy.com/franchise',
  },
}

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

