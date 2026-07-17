"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const originalText = titleRef.current.textContent || "Hungry Yet?";
        const words = originalText
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0);

        if (words.length > 0 && titleRef.current) {
          titleRef.current.innerHTML = words
            .map((word) => `<span class="inline-block">${word}</span>`)
            .join(" ");

          const wordSpans = Array.from(
            titleRef.current.children,
          ) as HTMLElement[];

          if (wordSpans.length > 0) {
            gsap.set(wordSpans, { opacity: 0, y: 50, scale: 0.8 });
            gsap.fromTo(
              wordSpans,
              { opacity: 0, y: 50, scale: 0.8 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: titleRef.current,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          }
        }
      }

      if (buttonsRef.current) {
        const buttons = Array.from(
          buttonsRef.current.children,
        ) as HTMLElement[];
        gsap.set(buttons, { opacity: 0, scale: 0.8 });
        gsap.fromTo(
          buttons,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: buttonsRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      // Animated gradient background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          backgroundPosition: "200% 200%",
          duration: 10,
          repeat: -1,
          ease: "linear",
        });
      }

      // Ensure ScrollTrigger recalculates positions after layout settles
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(45deg, #0e0e0e, #ff1e1e, #ff6b35, #0e0e0e)",
          backgroundSize: "400% 400%",
          willChange: "background-position",
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          ref={titleRef}
          className="text-6xl md:text-9xl font-bold mb-12 text-wrappy-cream font-display"
        >
          Hungry Yet?
        </h2>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a
            href="https://shop.wrapznfryz.co.in/"
            className="bg-wrappy-cream text-wrappy-black px-10 py-4 rounded-full text-xl font-bold hover:bg-wrappy-lime transition-colors transform hover:scale-105 text-center inline-block"
          >
            Order Now
          </a>
          <a
            href="https://www.google.com/maps?s=web&lqi=CgZ3cmFwcHlaCCIGd3JhcHB5kgEEY2FmZQ&phdesc=OYnrx5lF4O4&vet=12ahUKEwihucWnmuWRAxXlZWwGHVzVKvgQ1YkKegQIKxAB..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KU-izR80kcs7Md0cm5ix8g4Y&daddr=Shop+5A,+Plot+192,+Addagutta+Society+-+Jal+Vayu+Vihar+Raod,+near+JNTU,+Addagutta+Society,+Jal+Vayu+Vihar,+Kukatpally,+Hyderabad,+Telangana+500085"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-wrappy-cream text-wrappy-cream px-10 py-4 rounded-full text-xl font-bold hover:bg-wrappy-cream hover:text-wrappy-black transition-colors transform hover:scale-105 inline-block"
          >
            Visit Our Store
          </a>
        </div>
      </div>
    </section>
  );
}
