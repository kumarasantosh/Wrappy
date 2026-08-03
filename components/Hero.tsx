"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  src: string;
  name: string;
  tag: string;
};

const SLIDES: Slide[] = [
  {
    src: "/Wraps/Crispy Chicken_wrap.png",
    name: "Crispy Chicken Wrap",
    tag: "Signature",
  },
  {
    src: "/Fries/Peri Peri Fries.png",
    name: "Peri Peri Fries",
    tag: "Loaded Fryz",
  },
  {
    src: "/Thickshakes/Nutella_Thickshake.png",
    name: "Nutella Thickshake",
    tag: "Thick & Cold",
  },
  {
    src: "/Wraps/Cheesy Paneer_wrap.png",
    name: "Cheesy Paneer Wrap",
    tag: "Veg Favourite",
  },
];

const SLIDE_DURATION = 4.5; // seconds

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const zoomRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reducedRef = useRef(false);

  const goTo = useCallback((next: number) => {
    const prev = activeRef.current;
    if (next === prev) return;

    gsap.to(slideRefs.current[prev], {
      opacity: 0,
      duration: 0.85,
      ease: "power2.inOut",
    });
    gsap.fromTo(
      slideRefs.current[next],
      { opacity: 0 },
      { opacity: 1, duration: 0.85, ease: "power2.inOut" },
    );

    if (!reducedRef.current) {
      const z = zoomRefs.current[next];
      if (z) {
        gsap.fromTo(
          z,
          { scale: 1.02 },
          { scale: 1.14, duration: SLIDE_DURATION + 1, ease: "none" },
        );
      }
      gsap.fromTo(
        cardRef.current,
        { rotate: -0.8, scale: 0.985 },
        { rotate: 0, scale: 1, duration: 1.1, ease: "power3.out" },
      );
    }

    activeRef.current = next;
    setActive(next);
  }, []);

  /* --------------------------------------------------------- auto-advance */
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!reducedRef.current && zoomRefs.current[0]) {
      gsap.fromTo(
        zoomRefs.current[0],
        { scale: 1.02 },
        { scale: 1.14, duration: SLIDE_DURATION + 1, ease: "none" },
      );
    }

    const id = window.setInterval(
      () => goTo((activeRef.current + 1) % SLIDES.length),
      SLIDE_DURATION * 1000,
    );
    return () => window.clearInterval(id);
  }, [goTo]);

  /* ------------------------------------------------------------- progress */
  useEffect(() => {
    if (!progressRef.current || reducedRef.current) return;
    const tween = gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: SLIDE_DURATION,
        ease: "none",
        transformOrigin: "left center",
      },
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  /* --------------------------------------------------- entrance & scroll */
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            kickerRef.current,
            subRef.current,
            statsRef.current,
            stageRef.current,
            thumbsRef.current,
            scrollHintRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, clearProps: "filter" },
        );
        if (ctaRef.current) gsap.set(ctaRef.current.children, { opacity: 1 });
        if (headlineRef.current) {
          gsap.set(headlineRef.current.querySelectorAll(".hero-word"), {
            yPercent: 0,
            opacity: 1,
          });
        }
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.9 },
      );

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current.querySelectorAll(".hero-word"),
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.08 },
          "-=0.55",
        );
      }

      tl.fromTo(
        stageRef.current,
        { opacity: 0, x: 90, scale: 0.9, rotate: 4 },
        { opacity: 1, x: 0, scale: 1, rotate: 0, duration: 1.4 },
        "-=1.0",
      );

      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 24, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
        "-=0.9",
      );

      tl.fromTo(
        ctaRef.current?.children ?? [],
        { opacity: 0, y: 26, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 },
        "-=0.6",
      );

      tl.fromTo(
        [statsRef.current, thumbsRef.current, scrollHintRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
        "-=0.45",
      );

      // idle float on the product stage
      gsap.to(cardRef.current, {
        y: -14,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.8,
      });

      // slow rotating seal
      gsap.to(badgeRef.current, {
        rotate: 360,
        duration: 26,
        repeat: -1,
        ease: "none",
      });

      // dashed ring counter-rotates
      gsap.to(ringRef.current, {
        rotate: -360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      gsap.to(scrollHintRef.current, {
        y: 9,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2,
      });

      // scroll parallax — text and product drift at different speeds
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        animation: gsap
          .timeline()
          .to(".hero-copy", { yPercent: -18, opacity: 0.15 }, 0)
          .to(stageRef.current, { yPercent: 12, scale: 0.94 }, 0)
          .to(scrollHintRef.current, { opacity: 0, duration: 0.2 }, 0),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* --------------------------------------------------- magnetic buttons */
  const magnetize = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.3,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  const demagnetize = useCallback((e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  /* ---------------------------------------------------- tilt on the card */
  const tilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedRef.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 10,
      rotateX: -py * 10,
      duration: 0.6,
      ease: "power3.out",
      transformPerspective: 900,
    });
  }, []);

  const untilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const scrollToMenu = () => {
    const el =
      document.getElementById("wraps") || document.getElementById("menu");
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 100,
      behavior: "smooth",
    });
  };

  const headline = ["Wrap", "It.", "Bite", "It.", "Love", "It."];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-wrappy-cream"
    >
      {/* ============================================== BACKGROUND (on-brand) */}
      {/* soft brand orbs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-wrappy-red/10 blur-3xl md:h-96 md:w-96" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-wrappy-red/10 blur-3xl md:h-[28rem] md:w-[28rem]" />
      <div className="pointer-events-none absolute left-1/3 bottom-1/4 h-56 w-56 rounded-full bg-wrappy-red/10 blur-3xl" />
      {/* dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#0e0e0e 1.4px, transparent 1.4px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* ===================================================== LAYOUT GRID */}
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-32">
        {/* ------------------------------------------------------------ COPY */}
        <div className="hero-copy text-center lg:text-left">

          {/* headline */}
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-wrappy-black"
          >
            {headline.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.08em]"
              >
                <span
                  className={`hero-word inline-block ${word === "Love" ? "text-wrappy-red" : ""
                    }`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* subline */}
          <p
            ref={subRef}
            className="mx-auto mt-6 max-w-lg text-balance text-sm font-light leading-relaxed text-wrappy-black/60 opacity-0 sm:text-base md:mt-7 md:text-lg lg:mx-0"
          >
            Hand-rolled wraps, crispy loaded fryz, thick shakes and ice-cold
            mojitos — built fresh, served hot, gone fast.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start lg:justify-start"
          >
            <a
              href="#order"
              onMouseMove={magnetize}
              onMouseLeave={demagnetize}
              className="group relative w-full overflow-hidden rounded-full bg-wrappy-black px-8 py-4 text-center text-sm font-bold tracking-wide text-wrappy-cream shadow-[0_14px_40px_-14px_rgba(14,14,14,0.7)] sm:w-auto md:px-10 md:text-base"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Order Now
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 z-0 translate-y-full bg-wrappy-red transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </a>

            <button
              type="button"
              onClick={scrollToMenu}
              onMouseMove={magnetize}
              onMouseLeave={demagnetize}
              className="group w-full rounded-full border-2 border-wrappy-black/15 bg-wrappy-cream/60 px-8 py-4 text-sm font-bold tracking-wide text-wrappy-black backdrop-blur-sm transition-colors duration-300 hover:border-wrappy-black hover:bg-wrappy-black hover:text-wrappy-cream sm:w-auto md:px-10 md:text-base"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Menu
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* stats strip */}
          <div
            ref={statsRef}
            className="mt-10 flex items-center justify-center gap-6 opacity-0 md:mt-12 md:gap-10 lg:justify-start"
          >
            {[
              { k: "30+", v: "Menu Items" },
              { k: "100%", v: "Made Fresh" },
              { k: "10 min", v: "Avg. Serve" },
            ].map((s, i) => (
              <div key={s.v} className="flex items-center gap-6 md:gap-10">
                {i > 0 && <span className="h-8 w-px bg-wrappy-black/10" />}
                <div className="text-left">
                  <div className="font-display text-xl font-extrabold leading-none text-wrappy-black md:text-2xl">
                    {s.k}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-wrappy-black/45">
                    {s.v}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------- PRODUCT STAGE */}
        <div
          ref={stageRef}
          className="relative mx-auto mt-4 w-full max-w-[380px] opacity-0 sm:max-w-[420px] lg:mt-0 lg:max-w-none"
        >
          {/* dashed ring */}
          <div
            ref={ringRef}
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-wrappy-black/10 md:block"
          />

          {/* the card */}
          <div
            ref={cardRef}
            onMouseMove={tilt}
            onMouseLeave={untilt}
            className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-wrappy-black shadow-[0_40px_80px_-30px_rgba(14,14,14,0.55)] ring-1 ring-wrappy-black/10 md:rounded-[2.5rem]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
                aria-hidden={i !== active}
              >
                <div
                  ref={(el) => {
                    zoomRefs.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={slide.src}
                    alt={slide.name}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    quality={85}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}

            {/* caption inside the card — solid band, no gradient */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-wrappy-black/80 p-5 md:p-7">
              <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-wrappy-red md:text-[10px]">
                {SLIDES[active].tag}
              </div>
              <div className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-wrappy-cream md:text-2xl">
                {SLIDES[active].name}
              </div>
            </div>
          </div>

          {/* rotating seal */}
          <div
            ref={badgeRef}
            className="pointer-events-none absolute -left-4 -top-4 h-20 w-20 md:-left-7 md:-top-7 md:h-28 md:w-28"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <path
                  id="wrappySeal"
                  d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                />
              </defs>
              <circle cx="50" cy="50" r="46" className="fill-wrappy-red" />
              <text className="fill-wrappy-cream text-[11px] font-bold uppercase tracking-[0.28em]">
                <textPath href="#wrappySeal" startOffset="0%">
                  Wrapz &amp; Fryz · Wrapz &amp; Fryz ·
                </textPath>
              </text>
              <circle cx="50" cy="50" r="16" className="fill-wrappy-cream" />
            </svg>
          </div>

          {/* floating price chip */}
          <div className="absolute -bottom-4 -right-2 z-10 rounded-2xl border border-wrappy-black/10 bg-wrappy-cream px-4 py-3 shadow-[0_16px_40px_-16px_rgba(14,14,14,0.45)] md:-bottom-6 md:-right-6 md:px-5 md:py-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-wrappy-black/45">
              Starting at
            </div>
            <div className="font-display text-xl font-extrabold leading-none text-wrappy-black md:text-2xl">
              ₹99
            </div>
          </div>

          {/* thumbnails + progress */}
          <div
            ref={thumbsRef}
            className="mt-6 flex items-center justify-center gap-3 opacity-0 md:mt-8 md:gap-4"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Show ${s.name}`}
                onClick={() => goTo(i)}
                className={`group relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-wrappy-black transition-all duration-300 md:h-14 md:w-14 ${i === active
                  ? "ring-2 ring-wrappy-red ring-offset-2 ring-offset-wrappy-cream"
                  : "opacity-45 hover:opacity-100"
                  }`}
              >
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="56px"
                  quality={45}
                  className="object-cover"
                />
                {i === active && (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] bg-wrappy-black/30">
                    <span
                      ref={progressRef}
                      className="block h-full origin-left scale-x-0 bg-wrappy-red"
                    />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================= SCROLL HINT */}
      <div
        ref={scrollHintRef}
        className="pointer-events-none absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-0 lg:flex"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-wrappy-black/40">
          Scroll
        </span>
        <span className="relative block h-9 w-px bg-wrappy-black/25">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-wrappy-red" />
        </span>
      </div>
    </section>
  );
}
