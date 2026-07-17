import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Stores - Find a wrappy Near You",
  description:
    "Visit wrappy at JNTU, KPHB, or Banjara Hills in Hyderabad. Fresh wraps, crispy fries, thick shakes & chill drinks. Call 9177599393.",
  keywords: [
    "wrappy stores",
    "wrappy locations",
    "wrappy jntu",
    "wrappy kphb",
    "wrappy banjara hills",
    "wraps hyderabad",
    "wrappy near me",
  ],
  openGraph: {
    title: "Our Stores - Find a wrappy Near You",
    description:
      "Visit wrappy at JNTU, KPHB, or Banjara Hills in Hyderabad. Fresh wraps, crispy fries & bold flavours near you.",
    url: "https://wrapznfryz.com/stores",
    type: "website",
    images: [
      {
        url: "/images/logoa.jpg",
        width: 1200,
        height: 630,
        alt: "wrappy Store Locations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Stores - Find a wrappy Near You",
    description:
      "Visit wrappy at JNTU, KPHB, or Banjara Hills in Hyderabad.",
    images: ["/images/logoa.jpg"],
  },
  alternates: {
    canonical: "/stores",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
