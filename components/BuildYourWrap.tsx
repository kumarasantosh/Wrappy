"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bases = [
  { name: "Crispy Veg", emoji: "🥬" },
  { name: "Paneer / Mushroom", emoji: "🍄" },
  { name: "Chicken", emoji: "🍗" },
];

const styles = [
  { name: "Cheese Burst", emoji: "🧀" },
  { name: "Fully Loaded", emoji: "🌯" },
];

export default function BuildYourWrap() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState<"base" | "style" | "complete">("base");
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      let progress = 0;
      if (step === "style") progress = 50;
      if (step === "complete") progress = 100;

      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [step]);

  const handleBaseSelect = (base: string) => {
    setSelectedBase(base);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setStep("style");
      },
    });

    timelineRef.current.to(".base-card", {
      opacity: 0.5,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.1,
    });

    timelineRef.current.to(
      ".selected-base",
      {
        scale: 1.1,
        duration: 0.3,
      },
      "-=0.2",
    );
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setStep("complete");
      },
    });

    timelineRef.current.to(".style-card", {
      opacity: 0.5,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.1,
    });

    timelineRef.current.to(
      ".selected-style",
      {
        scale: 1.1,
        duration: 0.3,
      },
      "-=0.2",
    );

    timelineRef.current.to(
      ".complete-message",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.1",
    );
  };

  const reset = () => {
    setStep("base");
    setSelectedBase(null);
    setSelectedStyle(null);
    gsap.set(".base-card, .style-card", { opacity: 1, scale: 1 });
    gsap.set(".complete-message", { opacity: 0, y: 50 });
  };

  return (
    <section
      id="build"
      ref={sectionRef}
      className="relative bg-wrappy-cream py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-16 text-center text-wrappy-black font-display"
        >
          Build Your Wrap
        </h2>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="h-2 bg-wrappy-black/20 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-wrappy-red rounded-full transition-all duration-500"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Step 1: Choose Base */}
        {step === "base" && (
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8 text-wrappy-black font-display">
              Choose Your Base
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {bases.map((base, index) => (
                <div
                  key={index}
                  className={`base-card bg-wrappy-black text-wrappy-cream rounded-2xl p-8 cursor-pointer transform-gpu ${selectedBase === base.name
                    ? "selected-base ring-4 ring-wrappy-red"
                    : ""
                    }`}
                  onClick={() => handleBaseSelect(base.name)}
                  style={{ willChange: "transform" }}
                >
                  <div className="text-6xl mb-4">{base.emoji}</div>
                  <h4 className="text-2xl font-bold font-display">
                    {base.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Style */}
        {step === "style" && (
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8 text-wrappy-black font-display">
              Choose Your Style
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {styles.map((style, index) => (
                <div
                  key={index}
                  className={`style-card bg-wrappy-black text-wrappy-cream rounded-2xl p-8 cursor-pointer transform-gpu ${selectedStyle === style.name
                    ? "selected-style ring-4 ring-wrappy-red"
                    : ""
                    }`}
                  onClick={() => handleStyleSelect(style.name)}
                  style={{ willChange: "transform" }}
                >
                  <div className="text-6xl mb-4">{style.emoji}</div>
                  <h4 className="text-2xl font-bold font-display">
                    {style.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === "complete" && (
          <div className="text-center">
            <div className="complete-message opacity-0 translate-y-12">
              <h3 className="text-5xl font-bold mb-4 text-wrappy-red font-display">
                Wrapped to Perfection!
              </h3>
              <p className="text-xl text-wrappy-black/70 mb-8">
                Your {selectedBase} wrap with {selectedStyle} style is ready.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={reset}
                  className="bg-wrappy-black text-wrappy-cream px-8 py-3 rounded-full font-bold hover:bg-wrappy-red transition-colors"
                >
                  Build Another
                </button>
                <a
                  href="https://shop.wrapznfryz.com/"
                  className="bg-wrappy-red text-wrappy-cream px-8 py-3 rounded-full font-bold hover:bg-wrappy-orange transition-colors text-center inline-block"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
