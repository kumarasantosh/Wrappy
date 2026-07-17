import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Home - Fresh Wraps & Fries in Hyderabad | Wrapz N Fryz",
  description:
    "Fresh wraps, crispy fries, thick shakes & chill drinks in Hyderabad. Wrapz N Fryz - where street food meets bold flavour. Visit us at Shop 5A, Plot 192, Addagutta Society, Kukatpally, Hyderabad. Call 9177599393 to order now!",
  keywords: [
    "wrappy",
    "wraps",
    "fresh wraps",
    "fries",
    "hyderabad food",
    "street food",
    "kukatpally",
    "food delivery",
    "restaurant hyderabad",
    "wraps hyderabad",
    "fries hyderabad",
    "wrapz n fryz restaurant",
    "thickshakes",
    "mojitos",
    "desserts",
    "ufo wraps",
    "wrappy kukatpally",
    "best wraps hyderabad",
  ],
  openGraph: {
    title: "Wrapz N Fryz - Fresh Wraps & Fries in Hyderabad",
    description:
      "Fresh wraps, crispy fries, thick shakes & chill drinks. Wrapz N Fryz - where street food meets bold flavour. Located in Kukatpally, Hyderabad.",
    url: "https://wrapznfryz.com",
    type: "website",
    locale: "en_IN",
    siteName: "Wrapz N Fryz",
    images: [
      {
        url: "/images/logoa.png",
        width: 1200,
        height: 630,
        alt: "Wrapz N Fryz - Fresh Wraps & Fries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wrappy - Fresh Wraps & Fries in Hyderabad",
    description:
      "Fresh wraps, crispy fries, thick shakes & chill drinks. Wrapz N Fryz - where street food meets bold flavour.",
    images: ["/images/logo.png"],
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
