"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COL_ONE = [
  { label: "MENU", href: "/#wraps" },
  { label: "FRYZ", href: "/#fryz" },
  { label: "OUR STORY", href: "/#brand-story" },
  { label: "STORES", href: "/stores" },
];

const COL_TWO = [
  { label: "ORDER ONLINE", href: "#order" },
  {
    label: "INSTAGRAM",
    href: "https://instagram.com/heywrappy",
    external: true,
  },
  { label: "FRANCHISE", href: "/franchise" },
  { label: "TERMS OF USE", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [gridRef.current?.children ?? [], legalRef.current, wordmarkRef.current],
          { opacity: 1, y: 0, yPercent: 0 },
        );
        return;
      }

      gsap.fromTo(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 88%" },
        },
      );

      gsap.fromTo(
        legalRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 80%" },
        },
      );

      // giant wordmark rises out of the bottom edge
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: wordmarkRef.current, start: "top 96%" },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="visit"
      ref={footerRef}
      className="relative overflow-hidden bg-wrappy-black px-5 pt-12 text-wrappy-cream sm:px-8 md:px-12 md:pt-12"
    >
      {/* ------------------------------------------------------------- GRID */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-x-6 gap-y-9 pb-10 md:grid-cols-4 md:gap-8"
      >
        {/* nav column one */}
        <div className="flex flex-col gap-2.5 text-[13px] tracking-[0.08em]">
          {COL_ONE.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="w-fit text-wrappy-cream no-underline transition-colors duration-200 hover:text-wrappy-red"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* nav column two */}
        <div className="flex flex-col gap-2.5 text-[13px] tracking-[0.08em]">
          {COL_TWO.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-wrappy-cream no-underline transition-colors duration-200 hover:text-wrappy-red"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="w-fit text-wrappy-cream no-underline transition-colors duration-200 hover:text-wrappy-red"
              >
                {l.label}
              </Link>
            ),
          )}
        </div>

        {/* visit */}
        <div>
          <p className="m-0 mb-2.5 font-display text-xs font-extrabold tracking-[0.12em] text-wrappy-red">
            VISIT
          </p>
          <p className="m-0 text-sm leading-6 text-wrappy-cream">
            Shop 5A, Plot 192, Addagutta Society,
            <br />
            Kukatpally, Hyderabad
          </p>
        </div>

        {/* call */}
        <div>
          <p className="m-0 mb-2.5 font-display text-xs font-extrabold tracking-[0.12em] text-wrappy-red">
            CALL
          </p>
          <a
            href="tel:+919177599393"
            className="m-0 block text-sm leading-6 text-wrappy-cream no-underline transition-colors duration-200 hover:text-wrappy-red"
          >
            91775 99393
          </a>
          <a
            href="mailto:hello@wrappy.com"
            className="mt-1 block text-sm leading-6 text-wrappy-cream/60 no-underline transition-colors duration-200 hover:text-wrappy-red"
          >
            hello@wrappy.com
          </a>
        </div>
      </div>

      {/* ------------------------------------------------------------ LEGAL */}
      <div
        ref={legalRef}
        className="flex flex-col gap-1.5 border-t border-wrappy-cream/15 py-4 text-[11px] tracking-[0.06em] text-wrappy-cream/45 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>© {new Date().getFullYear()} Wrapz N Fryz. All rights reserved.</span>
        <span>STREET FOOD, MADE TO ORDER</span>
      </div>

      {/* --------------------------------------------------- GIANT WORDMARK */}
      <p
        ref={wordmarkRef}
        className="m-0 whitespace-nowrap font-display text-[13.2vw] font-extrabold leading-[0.82] tracking-[-0.04em]"
        style={{ marginLeft: "-0.058em", marginBottom: "-0.16em" }}
      >
        WRAPZ <span className="text-wrappy-red">N</span> FRYZ
      </p>
    </footer>
  );
}
