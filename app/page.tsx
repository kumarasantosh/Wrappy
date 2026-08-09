import type { Metadata } from "next";
import HomeClient from "./home-client";

const DESCRIPTION =
  "Wrapznfryz (Wrapz N Fryz) — fresh hand-rolled wraps, crispy loaded fries, thick shakes, mojitos and desserts in Kukatpally, Hyderabad. Order wraps and fries online or call 91775 99393.";

export const metadata: Metadata = {
  // absolute title so the brand — and the one-word spelling people type —
  // sits at the very front of the search result
  title: {
    absolute:
      "Wrapznfryz | Wrapz N Fryz — Fresh Wraps & Crispy Fries in Hyderabad",
  },
  description: DESCRIPTION,
  keywords: [
    "wrapznfryz",
    "wrapz n fryz",
    "wrapz and fryz",
    "wraps n fries",
    "wrapznfryz hyderabad",
    "wrapznfryz kukatpally",
    "wrapznfryz menu",
    "wraps",
    "fresh wraps",
    "wraps near me",
    "fries",
    "loaded fries",
    "peri peri fries",
    "fries near me",
    "ufo wraps",
    "chicken wraps",
    "veg wraps",
    "paneer wrap",
    "thickshakes",
    "mojitos",
    "desserts",
    "wraps hyderabad",
    "fries hyderabad",
    "best wraps hyderabad",
    "wraps kukatpally",
    "street food hyderabad",
    "food delivery hyderabad",
  ],
  openGraph: {
    title:
      "Wrapznfryz | Wrapz N Fryz — Fresh Wraps & Crispy Fries in Hyderabad",
    description: DESCRIPTION,
    url: "https://wrapznfryz.com",
    type: "website",
    locale: "en_IN",
    siteName: "Wrapznfryz (Wrapz N Fryz)",
    images: [
      {
        url: "/images/logoa.jpg",
        width: 1200,
        height: 630,
        alt: "Wrapznfryz - Wrapz N Fryz - Fresh Wraps & Fries, Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrapznfryz | Wrapz N Fryz — Wraps & Fries in Hyderabad",
    description: DESCRIPTION,
    images: ["/images/logoa.jpg"],
    creator: "@heywrappy",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return <HomeClient />;
}
