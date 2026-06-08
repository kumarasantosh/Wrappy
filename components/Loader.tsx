"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const texts = ["Rolling Fresh", "Wrapping Flavours", "Welcome to wrappy"];
    let currentIndex = 0;

    const showText = (index: number) => {
      if (!textRef.current) return;

      const text = texts[index];
      textRef.current.textContent = text;

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        },
      );

      if (index < texts.length - 1) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.8,
          duration: 0.4,
          delay: 0.8,
          ease: "power3.in",
          onComplete: () => showText(index + 1),
        });
      } else {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.8,
          duration: 0.4,
          delay: 0.8,
          ease: "power3.in",
          onComplete: () => {
            // Exit animation with vertical mask reveal
            if (maskRef.current) {
              gsap.to(maskRef.current, {
                scaleY: 0,
                duration: 1,
                ease: "power3.inOut",
                transformOrigin: "top",
              });
            }
            if (loaderRef.current) {
              gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.5,
                delay: 0.3,
                onComplete: () => {
                  onComplete();
                },
              });
            } else {
              onComplete();
            }
          },
        });
      }
    };

    showText(0);
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-wrappy-black flex items-center justify-center"
    >
      <div ref={maskRef} className="absolute inset-0 bg-wrappy-black z-10" />
      <div className="relative z-20 px-4 w-full max-w-5xl mx-auto text-center">
        <div
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-wrappy-cream font-display leading-tight break-words"
        >
          Rolling Fresh
        </div>
      </div>
    </div>
  );
}
