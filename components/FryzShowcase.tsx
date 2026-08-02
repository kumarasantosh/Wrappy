"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FryzShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [
          kickerRef.current,
          headlineRef.current,
          subtextRef.current,
          ctaRef.current,
        ],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.92, x: 40 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          },
        );
      }

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: -60,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fryz"
      ref={sectionRef}
      className="relative bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div
        className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] py-8 md:py-12 lg:py-6"
        style={{
          background:
            "linear-gradient(135deg, #e0ab3c 0%, #d49b30 60%, #ca9028 100%)",
        }}
      >
        {/* Oversized FRYZ watermark */}
        <div
          ref={watermarkRef}
          className="pointer-events-none absolute bottom-0 left-0 right-0 select-none text-center font-extrabold font-display leading-none text-wrappy-black/10 z-0"
          style={{ fontSize: "clamp(8rem, 28vw, 24rem)" }}
          aria-hidden="true"
        >
          FRYZ
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <span
                ref={kickerRef}
                className="block text-wrappy-black/60 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4"
              >
                The Other Half of the Name
              </span>
              <h2
                ref={headlineRef}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[0.95] tracking-tight text-wrappy-black mb-6"
              >
                Fryz So Good
                <br />
                They Steal the
                <br />
                Show.
              </h2>
              <p
                ref={subtextRef}
                className="text-lg md:text-xl text-wrappy-black/70 font-light leading-relaxed max-w-md mb-8"
              >
                Hand-cut, double-fried &amp; loaded with bold toppings. Crispy
                on the outside, fluffy within — every single time.
              </p>
              <a
                ref={ctaRef}
                href="https://shop.wrapznfryz.com/"
                className="group inline-flex items-center gap-3 bg-wrappy-cream text-wrappy-black px-8 py-4 rounded-full text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Build Your Fryz
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>

            {/* Right: hero shot */}
            <div ref={imageRef} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-wrappy-black/10 aspect-square bg-wrappy-black/5">
                <img
                  src="/Fries/Cheesy Loaded Fries.png"
                  alt="Loaded fries hero shot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
