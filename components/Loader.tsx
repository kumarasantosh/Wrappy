"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phrases = ["Rolling Fresh", "Wrapping Flavours"];

    const finish = () => {
      // exit animation with vertical mask reveal
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
          onComplete,
        });
      } else {
        onComplete();
      }
    };

    // final screen: all three lines appear together as one block
    const showWelcome = () => {
      if (!welcomeRef.current) return finish();

      gsap.set(phraseRef.current, { display: "none" });
      gsap.set(welcomeRef.current, { display: "block" });

      gsap.fromTo(
        welcomeRef.current,
        { opacity: 0, y: 50, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      gsap.to(welcomeRef.current, {
        opacity: 0,
        y: -50,
        scale: 0.85,
        duration: 0.45,
        delay: 1.3,
        ease: "power3.in",
        onComplete: finish,
      });
    };

    const showPhrase = (index: number) => {
      if (!phraseRef.current) return;

      phraseRef.current.textContent = phrases[index];

      gsap.fromTo(
        phraseRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
      );

      gsap.to(phraseRef.current, {
        opacity: 0,
        y: -50,
        scale: 0.8,
        duration: 0.4,
        delay: 0.8,
        ease: "power3.in",
        onComplete:
          index < phrases.length - 1
            ? () => showPhrase(index + 1)
            : showWelcome,
      });
    };

    showPhrase(0);
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-wrappy-black flex items-center justify-center"
    >
      <div ref={maskRef} className="absolute inset-0 bg-wrappy-black z-10" />
      <div className="relative z-20 px-4 w-full max-w-5xl mx-auto text-center">
        {/* rotating phrases */}
        <div
          ref={phraseRef}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-wrappy-cream font-display leading-tight break-words"
        >
          Rolling Fresh
        </div>

        {/* final three-line welcome */}
        <div
          ref={welcomeRef}
          style={{ display: "none", opacity: 0 }}
          className="font-display font-extrabold uppercase text-wrappy-cream leading-[0.92] tracking-[-0.02em]"
        >
          <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
            Welcome
          </span>
          <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
            to
          </span>
          <span className="mt-1 block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
            Wrapz <span className="text-wrappy-red">N</span> Fryz
          </span>
        </div>
      </div>
    </div>
  );
}
