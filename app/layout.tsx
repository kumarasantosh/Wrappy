import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://wrapznfryz.com";

const SITE_DESCRIPTION =
  "Wrapznfryz (Wrapz N Fryz) — fresh hand-rolled wraps, crispy loaded fries, thick shakes, mojitos and desserts. Order wraps and fries online or call 91775 99393.";

export const metadata: Metadata = {
  title: {
    default:
      "Wrapznfryz | Wrapz N Fryz — Wraps & Fries in Hyderabad | Wrap It. Bite It. Love It.",
    template: "%s | Wrapznfryz (Wrapz N Fryz)",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Wrapznfryz",
  category: "Restaurant",
  keywords: [
    // brand + every spelling people actually type
    "wrapznfryz",
    "wrapz n fryz",
    "wrapzandfryz",
    "wrapz and fryz",
    "wraps n fries",
    "wraps and fries",
    "wrapsnfries",
    "wrapznfryz hyderabad",
    "wrapznfryz kukatpally",
    "wrapz n fryz restaurant",
    "wrapznfryz menu",
    "wrapznfryz order online",
    "heywrappy",
    // category
    "wraps",
    "fresh wraps",
    "wrap near me",
    "wraps near me",
    "fries",
    "french fries",
    "loaded fries",
    "peri peri fries",
    "cheesy loaded fries",
    "fries near me",
    "ufo wraps",
    "chicken wraps",
    "veg wraps",
    "paneer wrap",
    "shawarma wrap",
    "thickshakes",
    "mojitos",
    "desserts",
    // local
    "wraps hyderabad",
    "fries hyderabad",
    "best wraps hyderabad",
    "best fries hyderabad",
    "wraps kukatpally",
    "fast food kukatpally",
    "street food hyderabad",
    "hyderabad food",
    "food delivery hyderabad",
    "restaurant hyderabad",
    "banjara hills wraps",
  ],
  authors: [{ name: "Wrapz N Fryz" }],
  creator: "Wrapz N Fryz",
  publisher: "Wrapz N Fryz",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Wrapznfryz (Wrapz N Fryz)",
    title:
      "Wrapznfryz | Wrapz N Fryz — Fresh Wraps & Crispy Fries in Hyderabad",
    description: SITE_DESCRIPTION,
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
    site: "@heywrappy",
    creator: "@heywrappy",
    title: "Wrapznfryz | Wrapz N Fryz — Wraps & Fries in Hyderabad",
    description: SITE_DESCRIPTION,
    images: ["/images/logoa.jpg"],
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
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Kukatpally, Hyderabad",
    "geo.position": "17.4849;78.4138",
    ICBM: "17.4849, 78.4138",
  },
  verification: {
    // Paste the code from Google Search Console -> Settings -> Ownership
    // verification -> HTML tag, e.g. google: "abc123..."
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Restaurant", "FastFoodRestaurant"],
        "@id": `${SITE_URL}/#restaurant`,
        name: "Wrapz N Fryz",
        // every spelling people search for — this is what lets a query like
        // "wrapznfryz" (no spaces) match the brand
        alternateName: [
          "Wrapznfryz",
          "wrapznfryz",
          "Wrapz n Fryz",
          "Wrapz and Fryz",
          "Wraps N Fries",
          "Wraps and Fries",
          "Wrapznfryz Hyderabad",
          "Wrapz N Fryz Kukatpally",
        ],
        description: SITE_DESCRIPTION,
        slogan: "Wrap It. Bite It. Love It.",
        url: SITE_URL,
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
          latitude: "17.4849",
          longitude: "78.4138",
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "Place", name: "Kukatpally" },
          { "@type": "Place", name: "Banjara Hills" },
        ],
        servesCuisine: [
          "Wraps",
          "Fries",
          "Street Food",
          "Fast Food",
          "Thickshakes",
          "Mojitos",
          "Desserts",
        ],
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        image: [
          `${SITE_URL}/images/logoa.jpg`,
          `${SITE_URL}/Wraps/Crispy Chicken_wrap.png`,
          `${SITE_URL}/Fries/Cheesy Loaded Fries.png`,
        ],
        logo: `${SITE_URL}/wrappy-logo.png`,
        sameAs: [
          "https://instagram.com/heywrappy",
          "https://shop.wrapznfryz.com/",
        ],
        hasMenu: {
          "@type": "Menu",
          name: "Wrapz N Fryz Menu",
          url: `${SITE_URL}/#wraps`,
          hasMenuSection: [
            {
              "@type": "MenuSection",
              name: "Wraps",
              description:
                "UFO wraps and classic rolls — marinated fillings, fresh veg, wrapped tight and grilled to order.",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Crispy Chicken Wrap" },
                { "@type": "MenuItem", name: "Smoky Tandoori Chicken Wrap" },
                { "@type": "MenuItem", name: "Cheesy Paneer Wrap" },
              ],
            },
            {
              "@type": "MenuSection",
              name: "Fries",
              description:
                "Crispy, salted, loaded or plain — the fries that give the place its name.",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Peri Peri Fries" },
                { "@type": "MenuItem", name: "Cheesy Loaded Fries" },
              ],
            },
            {
              "@type": "MenuSection",
              name: "Thickshakes & Mojitos",
              hasMenuItem: [{ "@type": "MenuItem", name: "Nutella Thickshake" }],
            },
            { "@type": "MenuSection", name: "Desserts" },
          ],
        },
        menu: `${SITE_URL}/#wraps`,
        potentialAction: {
          "@type": "OrderAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://shop.wrapznfryz.com/",
            inLanguage: "en-IN",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          deliveryMethod: [
            "http://purl.org/goodrelations/v1#DeliveryModePickUp",
          ],
        },
        acceptsReservations: false,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Wrapz N Fryz",
        alternateName: ["Wrapznfryz", "Wrapz n Fryz", "Wraps N Fries"],
        url: SITE_URL,
        logo: `${SITE_URL}/wrappy-logo.png`,
        sameAs: ["https://instagram.com/heywrappy"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+919177599393",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi", "te"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Wrapznfryz (Wrapz N Fryz)",
        alternateName: ["Wrapznfryz", "Wrapz N Fryz"],
        url: SITE_URL,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Wrapznfryz?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Wrapznfryz (written Wrapz N Fryz) is a Hyderabad street-food brand serving hand-rolled wraps, crispy loaded fries, thick shakes, mojitos and desserts, made fresh to order.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Wrapz N Fryz located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shop 5A, Plot 192, Addagutta Society, Jal Vayu Vihar Road, Kukatpally, Hyderabad 500085. Call 91775 99393.",
            },
          },
          {
            "@type": "Question",
            name: "Can I order wraps and fries online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes — order online at shop.wrapznfryz.com or call 91775 99393.",
            },
          },
          {
            "@type": "Question",
            name: "What kinds of wraps and fries do you serve?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Chicken and veg wraps including Crispy Chicken, Smoky Tandoori Chicken and Cheesy Paneer, plus Peri Peri Fries and Cheesy Loaded Fries, thick shakes, mojitos and desserts.",
            },
          },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "Menu",
            url: `${SITE_URL}/#wraps`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "Our Stores",
            url: `${SITE_URL}/stores`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "Franchise",
            url: `${SITE_URL}/franchise`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 4,
            name: "Order Now",
            url: "https://shop.wrapznfryz.com/",
          },
        ],
      },
    ],
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
