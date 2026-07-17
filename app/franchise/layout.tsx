import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franchise Opportunities - Own a wrappy Franchise",
  description:
    "Join the wrappy family! Own a franchise and bring fresh wraps, crispy fries, and bold flavours to your community. Get comprehensive support, training, and marketing assistance. Contact us at 9177599393.",
  keywords: [
    "wrappy franchise",
    "franchise opportunities",
    "food franchise",
    "restaurant franchise",
    "hyderabad franchise",
    "wrap franchise",
    "franchise business",
    "food business opportunity",
  ],
  openGraph: {
    title: "Franchise Opportunities - Own a wrappy Franchise",
    description:
      "Join the wrappy family! Own a franchise and bring fresh wraps, crispy fries, and bold flavours to your community.",
    url: "https://wrapznfryz.com/franchise",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "wrappy Franchise Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Franchise Opportunities - Own a wrappy Franchise",
    description:
      "Join the wrappy family! Own a franchise and bring fresh wraps, crispy fries, and bold flavours to your community.",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "/franchise",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
