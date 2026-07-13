import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Wrapz N Fryz - Wrap It. Bite It. Love It. | Fresh Wraps & Fries in Hyderabad",
    template: "%s | Wrapz N Fryz",
  },
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
    "wrappy restaurant",
    "thickshakes",
    "mojitos",
    "desserts",
    "ufo wraps",
    "wrappy kukatpally",
    "best wraps hyderabad",
    "chicken wraps",
    "veg wraps",
  ],
  authors: [{ name: "wrappy" }],
  creator: "wrappy",
  publisher: "wrappy",
  metadataBase: new URL("https://WrapzNFryz.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://WrapzNFryz.com",
    siteName: "wrappy",
    title:
      "wrappy - Wrap It. Bite It. Love It. | Fresh Wraps & Fries in Hyderabad",
    description:
      "Fresh wraps, crispy fries, thick shakes & chill drinks. Wrapz N Fryz - where street food meets bold flavour. Located in Kukatpally, Hyderabad.",
    images: [
      {
        url: "/images/logoa.jpg",
        width: 1200,
        height: 630,
        alt: "wrappy - Fresh Wraps & Fries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wrappy - Wrap It. Bite It. Love It.",
    description:
      "Fresh wraps, crispy fries, thick shakes & chill drinks. Wrapz N Fryz - where street food meets bold flavour.",
    images: ["/images/logo.png"],
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
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "wrappy",
    description:
      "Fresh wraps, crispy fries, thick shakes & chill drinks. Wrapz N Fryz - where street food meets bold flavour.",
    url: "https://wrappy.com",
    telephone: "+919177599393",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Shop 5A, Plot 192, Addagutta Society, Jal Vayu Vihar Road",
      addressLocality: "Kukatpally",
      addressRegion: "Telangana",
      postalCode: "500085",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.3850",
      longitude: "78.4867",
    },
    servesCuisine:
      "Street Food, Wraps, Fast Food, Thickshakes, Mojitos, Desserts",
    priceRange: "$$",
    image: "https://wrappy.com/images/logo.png",
    sameAs: ["https://instagram.com/heywrappy"],
    menu: "https://wrappy.com/#wraps",
    acceptsReservations: false,
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1017167960826389');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1017167960826389&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${inter.variable} font-body`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
