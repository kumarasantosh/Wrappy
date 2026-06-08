"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll("p");

        gsap.fromTo(
          lines,
          {
            opacity: 0,
            y: 50,
            letterSpacing: "0.2em",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.05em",
            duration: 1.5,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // Background zoom effect
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.1,
          duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-wrappy-black"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-wrappy-black via-wrappy-black to-wrappy-red/20"
        style={{ willChange: "transform" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={textRef} className="text-wrappy-cream">
          <p className="text-3xl md:text-5xl font-bold mb-8 font-display">
            wrappy is where street food meets bold flavour.
          </p>
          <p className="text-2xl md:text-4xl font-light">
            Freshly wrapped. Loudly loved.
          </p>
        </div>
      </div>
    </section>
  );
}
