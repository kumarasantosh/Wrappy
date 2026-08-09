"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE = [
  "WRAPS",
  "FRIES",
  "THICK SHAKES",
  "MOJITOS",
  "DESSERTS",
  "UFO WRAPS",
];

const MENU = [
  {
    n: "01",
    title: "WRAPS",
    copy: "UFO wraps and classic rolls — marinated fillings, fresh veg, wrapped tight and grilled to order.",
  },
  {
    n: "02",
    title: "FRIES",
    copy: "Crispy, salted, loaded or plain — the fries that give the place its name.",
  },
  {
    n: "03",
    title: "THICK SHAKES & MOJITOS",
    copy: "Thick shakes and chill mojitos, blended alongside the fryer.",
  },
  {
    n: "04",
    title: "DESSERTS",
    copy: "A sweet finish after the wraps and fries.",
  },
];

export default function SignatureWraps() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------- mobile slider position (dots) */
  const [slide, setSlide] = useState(0);

  const handleSlide = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const i = Math.round((el.scrollLeft / max) * 3);
    setSlide(Math.min(3, Math.max(0, i)));
  }, []);

  const goToSlide = useCallback((i: number) => {
    const el = gridRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (max / 3) * i, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            headingRef.current?.querySelectorAll(".crave-line") ?? [],
            gridRef.current?.children ?? [],
            menuLabelRef.current,
            menuRef.current?.children ?? [],
          ],
          { opacity: 1, y: 0, yPercent: 0 },
        );
        return;
      }

      // heading: line-by-line mask reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.querySelectorAll(".crave-line"),
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          },
        );
      }

      // grid tiles rise in
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
          },
        );
      }

      // menu rows
      gsap.fromTo(
        menuLabelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: menuLabelRef.current, start: "top 90%" },
        },
      );

      if (menuRef.current) {
        gsap.fromTo(
          menuRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: menuRef.current, start: "top 85%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="wraps" ref={sectionRef} className="relative bg-wrappy-cream">
      {/* ==================================================== RED MARQUEE */}
      <div className="overflow-hidden bg-wrappy-red py-3 md:py-3.5">
        <div className="flex w-max animate-marquee will-change-transform">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              aria-hidden={dup === 1}
              className="flex w-max flex-none items-center gap-8 pr-8 font-display text-base font-extrabold tracking-[0.06em] text-wrappy-cream md:gap-10 md:pr-10 md:text-[22px]"
            >
              {MARQUEE.map((word) => (
                <span key={word} className="flex items-center gap-8 md:gap-10">
                  <span className="whitespace-nowrap">{word}</span>
                  <span className="text-wrappy-black">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================================================= CRAVE IT. ROLL IT. */}
      <div className="px-5 pb-10 pt-12 sm:px-8 md:px-12 md:pb-10 md:pt-14">
        <h2
          ref={headingRef}
          className="mb-8 font-display text-[clamp(2.25rem,6.5vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.025em] text-wrappy-black md:mb-10"
          style={{ marginLeft: "-0.058em" }}
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="crave-line block">CRAVE IT. ROLL IT.</span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="crave-line block text-wrappy-red">FRY IT.</span>
          </span>
        </h2>

        {/* mobile: swipeable slider · sm+ : original grid (unchanged) */}
        <div
          ref={gridRef}
          onScroll={handleSlide}
          className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 pb-1 [-webkit-overflow-scrolling:touch] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-[2px] sm:overflow-visible sm:bg-wrappy-black/10 sm:px-0 sm:pb-0 lg:grid-cols-4"
        >
          {/* 01 — wrap photo */}
          <figure className="group relative m-0 aspect-[3/4] w-[82%] shrink-0 snap-center overflow-hidden rounded-2xl bg-wrappy-black sm:w-auto sm:shrink sm:rounded-none">
            <Image
              src="/Wraps/Smoky Tandoori Chicken_wrap.png"
              alt="Smoky Tandoori Chicken wrap"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </figure>

          {/* 02 — black statement card */}
          <div className="flex aspect-[3/4] w-[82%] shrink-0 snap-center flex-col justify-between rounded-2xl bg-wrappy-black p-6 sm:w-auto sm:shrink sm:rounded-none md:p-7">
            <p className="m-0 font-display text-[clamp(1.25rem,2.4vw,1.625rem)] font-extrabold leading-[1.15] tracking-[-0.01em] text-wrappy-red">
              Turn up the flavour, turn up the fun.
            </p>
            <p className="m-0 font-display text-[13px] font-extrabold tracking-[0.12em] text-wrappy-cream">
              WRAPZ <span className="text-wrappy-red">N</span> FRYZ
            </p>
          </div>

          {/* 03 — fries photo */}
          <figure className="group relative m-0 aspect-[3/4] w-[82%] shrink-0 snap-center overflow-hidden rounded-2xl bg-wrappy-black sm:w-auto sm:shrink sm:rounded-none">
            <Image
              src="/Fries/Cheesy Loaded Fries.png"
              alt="Cheesy loaded fries"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </figure>

          {/* 04 — red CTA card */}
          <div className="flex aspect-[3/4] w-[82%] shrink-0 snap-center flex-col justify-between rounded-2xl bg-wrappy-red p-6 sm:w-auto sm:shrink sm:rounded-none md:p-7">
            <p className="m-0 font-display text-[clamp(1.25rem,2.4vw,1.625rem)] font-extrabold leading-[1.15] tracking-[-0.01em] text-wrappy-cream">
              Snack like you mean it.
            </p>
            <a
              href="https://shop.wrapznfryz.com/"
              className="inline-flex w-fit items-center rounded-full border-2 border-wrappy-cream px-5 py-2.5 font-display text-xs font-extrabold uppercase tracking-[0.08em] text-wrappy-cream transition-colors duration-300 hover:bg-wrappy-cream hover:text-wrappy-red"
            >
              Order online
            </a>
          </div>
        </div>

        {/* dots — mobile only */}
        <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to card ${i + 1}`}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === slide
                  ? "w-6 bg-wrappy-red"
                  : "w-1.5 bg-wrappy-black/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ====================================================== ON THE MENU */}
      <div className="px-5 pb-14 pt-2 sm:px-8 md:px-12 md:pb-16">
        <span
          ref={menuLabelRef}
          className="mb-2 block font-display text-[13px] font-extrabold tracking-[0.12em] text-wrappy-red"
        >
          ON THE MENU
        </span>

        <div ref={menuRef}>
          {MENU.map((item, i) => (
            <div
              key={item.n}
              className={`grid grid-cols-[40px_minmax(0,1fr)] items-baseline gap-x-6 gap-y-3 border-t-2 border-wrappy-black/10 py-5 md:grid-cols-[60px_minmax(0,320px)_minmax(0,1fr)] md:gap-x-10 md:py-[22px] ${
                i === MENU.length - 1 ? "border-b-2" : ""
              }`}
            >
              <p className="m-0 font-display text-[15px] font-extrabold text-wrappy-black">
                {item.n}
              </p>
              <h3 className="m-0 font-display text-xl font-extrabold tracking-[-0.01em] text-wrappy-black md:text-[26px]">
                {item.title}
              </h3>
              <p className="col-span-full m-0 text-[15px] leading-[26px] text-wrappy-black/[0.78] md:col-span-1 md:text-[15.5px]">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
