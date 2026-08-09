"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const stores = [
  {
    id: "jntu",
    name: "JNTU",
    tag: "The Original",
    area: "Plot 192, Addagutta Society - Jal Vayu Vihar Road, near JNTU",
    city: "jntu, Hyderabad, Telangana – 500085",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 91775 99393",
    mapsQuery: "wrappy JNTU Hyderabad",
    accent: "bg-wrappy-red",
  },
  {
    id: "kphb",
    name: "KPHB",
    tag: "Newest",
    area: "Kphb Road no #1 Opp Prasad Hospitals Next to idea store",
    city: "Kukatpally, Hyderabad – 500085",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 83284 37097",
    mapsQuery: "Wrapz N Fryz KPHB Kukatpally Hyderabad",
    accent: "bg-wrappy-orange",
  },
  {
    id: "banjara-hills",
    name: "Banjara Hills",
    tag: "Cozy Cafe",
    area: "Road No 3, Journalist colony Road,Banjara Hills",
    city: "Hyderabad, Telangana",
    hours: "11:00 AM – 11:00 PM",
    phone: "+91 75692 26081",
    mapsQuery: "Wrapz N Fryz Banjara Hills Hyderabad",
    accent: "bg-wrappy-lime",
  },
];

export default function StoresPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.children,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            delay: 0.3,
            ease: "power3.out",
          },
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.6,
            ease: "power3.out",
          },
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-wrappy-cream">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="max-w-7xl mx-auto text-center">
          <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-wrappy-red mb-4">
            Find Us In Hyderabad
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-wrappy-black uppercase leading-none tracking-tight">
            Our <span className="text-wrappy-red">Stores</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-wrappy-black/60 max-w-xl mx-auto">
            Three outlets. Same fresh wraps, loaded fryz & thick shakes.
            Walk in, wrap up.
          </p>
        </div>
      </section>

      {/* Store Cards */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div
          ref={cardsRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {stores.map((store, index) => (
            <div
              key={store.id}
              className="group relative bg-white border-2 border-black flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_#0e0e0e]"
            >
              {/* Accent bar */}
              <div className={`h-2 ${store.accent}`} />

              <div className="p-6 md:p-8 flex flex-col flex-1">
                {/* Number + Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-5xl font-black text-wrappy-black/10 group-hover:text-wrappy-red/20 transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase border-2 border-black px-3 py-1">
                    {store.tag}
                  </span>
                </div>

                {/* Name */}
                <h2 className="font-display text-3xl md:text-4xl font-black text-wrappy-black uppercase tracking-tight mb-4">
                  {store.name}
                </h2>

                {/* Details */}
                <div className="space-y-4 flex-1">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-wrappy-red flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-sm text-wrappy-black/70 leading-relaxed">
                      {store.area}
                      <br />
                      {store.city}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-wrappy-red flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-wrappy-black/70">
                      Open Daily · {store.hours}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-wrappy-red flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href={`tel:+91${store.phone}`}
                      className="text-sm text-wrappy-black/70 hover:text-wrappy-red transition-colors"
                    >
                      {store.phone}
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-wrappy-black text-wrappy-cream text-center text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-wrappy-red transition-colors"
                  >
                    Get Directions
                  </a>
                  <a
                    href="https://shop.wrapznfryz.com/"
                    className="w-full border-2 border-black text-wrappy-black text-center text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-wrappy-red hover:border-wrappy-red hover:text-wrappy-cream transition-colors"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div
          ref={ctaRef}
          className="max-w-7xl mx-auto bg-wrappy-black text-center py-12 md:py-16 px-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-48 h-48 bg-wrappy-red/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-wrappy-orange/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="relative font-display text-3xl md:text-5xl font-black text-wrappy-cream uppercase tracking-tight mb-4">
            Can&apos;t Make It To A Store?
          </h2>
          <p className="relative text-wrappy-cream/70 mb-8">
            Get your wraps delivered hot & fresh, wherever you are.
          </p>
          <a
            href="https://shop.wrapznfryz.com/"
            className="relative inline-block bg-wrappy-cream text-wrappy-black px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-wrappy-red hover:text-wrappy-cream transition-colors"
          >
            Order Online
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
