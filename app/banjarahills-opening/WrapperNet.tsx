"use client";

/**
 * SCROLL = UNFOLDING A WRAPPER NET.
 * The page below the hero is modelled as a flattened wrapper net: kraft
 * panels connected by a dashed spine, each one hinged in 3D. Scroll drives
 * the hinge matrices directly (scrubbed, not tweened), so panels fold down /
 * swing in from their crease like an unfolding diagram — sections literally
 * hinge into view instead of stacking.
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Tier } from "./lib";
import MenuPackets, { MenuItem } from "./MenuPackets";
import ScratchOffer from "./ScratchOffer";

const WRAP_FEATURE: MenuItem[] = [
  {
    name: "Smoky Tandoori Chicken",
    kind: "Signature wrap",
    price: "₹149",
    img: "/Wraps/Smoky%20Tandoori%20Chicken_wrap.png",
  },
];

const FRY_FEATURE: MenuItem[] = [
  {
    name: "Peri Peri Fries",
    kind: "Loaded fries",
    price: "₹99",
    img: "/Fries/Peri%20Peri%20Fries.png",
  },
];

type Hinge = "top" | "left" | "right";

function FoldPanel({
  hinge,
  index,
  label,
  animate,
  children,
}: {
  hinge: Hinge;
  index: number;
  label: string;
  animate: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 102%", "start 52%"],
  });
  const from = hinge === "top" ? -76 : hinge === "left" ? -64 : 64;
  // slight overshoot past flat so the hinge reads as physical, then settles
  const deg = useTransform(scrollYProgress, [0, 0.82, 1], [from, from * -0.06, 0]);
  const rotateX = hinge === "top" ? deg : 0;
  const rotateY = hinge === "top" ? 0 : deg;
  const shade = useTransform(scrollYProgress, [0, 1], [0.5, 0]);
  const origin =
    hinge === "top" ? "50% 0%" : hinge === "left" ? "0% 50%" : "100% 50%";

  const inner = (
    <div className="relative overflow-hidden rounded-sm px-5 py-8 sm:px-8 sm:py-10 go-kraft">
      {/* net-diagram dressing: fold line + glue tab + panel label */}
      <div
        className="absolute inset-x-3 top-2 border-t border-dashed opacity-40"
        style={{ borderColor: "var(--go-ink)" }}
        aria-hidden="true"
      />
      <span
        className="absolute right-3 top-3 text-[9px] tracking-[0.25em] opacity-45"
        style={{ color: "var(--go-ink)" }}
        aria-hidden="true"
      >
        PANEL {String(index).padStart(2, "0")} · {label}
      </span>
      <div
        aria-hidden="true"
        className="absolute -left-1 top-1/2 h-16 w-2 -translate-y-1/2 opacity-30"
        style={{
          background: "var(--go-kraft-deep)",
          clipPath: "polygon(100% 0, 0 18%, 0 82%, 100% 100%)",
        }}
      />
      {children}
    </div>
  );

  if (!animate) {
    return (
      <div ref={ref} className="mx-auto w-full max-w-xl px-4 py-4">
        {inner}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-xl px-4 py-4"
      style={{ perspective: "1300px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformOrigin: origin,
          transformStyle: "preserve-3d",
        }}
        className="relative will-change-transform"
      >
        {inner}
        {/* crease shadow while folded — composited opacity only */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-sm bg-black"
          style={{ opacity: shade }}
        />
      </motion.div>
    </div>
  );
}

export default function WrapperNet({ tier }: { tier: Tier }) {
  const animate = tier === "full" || tier === "lite";
  return (
    <div className="relative pb-36">
      {/* the net's spine — panels hang off this crease */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-px border-l border-dashed opacity-20"
        style={{ borderColor: "var(--go-kraft)" }}
      />

      <FoldPanel hinge="top" index={2} label="FOLD DOWN" animate={animate}>
        <h2
          className="text-2xl font-extrabold tracking-tight sm:text-3xl"
          style={{ color: "var(--go-ink)" }}
        >
          Now proudly serving the
          <br />
          Banjara Hills neighbourhood.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80" style={{ color: "var(--go-ink)" }}>
          Experience signature wraps, loaded fries, and handcrafted thickshakes—prepared fresh to order, wrapped hot, and served with care.
          Welcome to your new go-to destination for great food.        </p>
        <dl className="mt-6 flex gap-3 text-center">
          {[
            ["15 JUL", "doors open"],
            ["94+", "things to eat"],
            ["11–23", "open daily"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="flex-1 rounded-sm border border-dashed px-2 py-3"
              style={{ borderColor: "var(--go-ink)" }}
            >
              <dt className="text-[10px] uppercase tracking-widest opacity-60" style={{ color: "var(--go-ink)" }}>
                {l}
              </dt>
              <dd className="text-lg font-extrabold" style={{ color: "var(--go-ember-red)" }}>
                {n}
              </dd>
            </div>
          ))}
        </dl>
      </FoldPanel>

      <FoldPanel hinge="left" index={3} label="REBRAND" animate={animate}>
        <div
          className="rounded-lg px-4 py-6 sm:px-6 sm:py-8 text-center -mx-3 -my-4 sm:-mx-5 sm:-my-6"
          style={{
            background: "#000",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Announcement: logo + "is now" */}
          <p
            className="text-[10px] uppercase tracking-[0.35em] mb-4"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Exciting news
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src="/images/logo2.jpeg"
              alt="Wrappy logo"
              style={{
                height: "40px",
                width: "auto",
                filter: "invert(1)",
              }}
            />
            <span
              className="text-2xl font-extrabold tracking-tight sm:text-3xl"
              style={{ color: "#fff" }}
            >
              is now
            </span>
          </div>
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl mt-2"
            style={{ color: "#fff" }}
          >
            Wrapz{" "}
            <span style={{ color: "#ff1e1e" }}>N</span>
            {" "}Fryz
          </h2>

          {/* Divider */}
          <div
            className="mx-auto my-5"
            style={{
              width: "48px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #ff1e1e, transparent)",
            }}
          />

          <p
            className="text-sm leading-relaxed italic"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Same great taste, bold new identity.
          </p>
        </div>
      </FoldPanel>

      <FoldPanel hinge="right" index={4} label="THE WRAPZ" animate={animate}>
        <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: "var(--go-ink)" }}>
          Signature Wrap<span className="text-wrappy-red">z</span>
        </h2>
        <p className="mt-1 text-xs opacity-70" style={{ color: "var(--go-ink)" }}>
          Rolled tight, grilled hot, wrapped to go — peel the packet.
        </p>
        <MenuPackets tier={tier} items={WRAP_FEATURE} single />
      </FoldPanel>

      <FoldPanel hinge="left" index={5} label="THE FRYZ" animate={animate}>
        <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: "var(--go-ink)" }}>
          Try Our Dutch Style Fry<span className="text-wrappy-red">z</span>
        </h2>
        <p className="mt-1 text-xs opacity-70" style={{ color: "var(--go-ink)" }}>
          Pick your favorite seasonings, sauce and dive into crispy Dutch Style Fries!
        </p>
        <MenuPackets tier={tier} items={FRY_FEATURE} single />
      </FoldPanel>

      <FoldPanel hinge="right" index={6} label="SCRATCH HERE" animate={animate}>
        <ScratchOffer tier={tier} />
      </FoldPanel>

      <FoldPanel hinge="top" index={7} label="LAST FOLD" animate={animate}>
        <h2 className="text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--go-ink)" }}>
          Doors open 15 July.
          <br />
          Come hungry.
        </h2>
        <p className="mt-3 text-sm leading-relaxed opacity-80" style={{ color: "var(--go-ink)" }}>
          Join us on opening day — first wraps off the grill, opening-week
          specials, and a counter worth watching. Walk in, or order ahead on
          the website.
        </p>
        {/* flagship kitchen — Banjara Hills */}
        <div
          className="mt-5 rounded-sm border-2 px-4 py-4"
          style={{
            borderColor: "var(--go-ember-red)",
            background: "rgba(229, 72, 46, 0.08)",
          }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "var(--go-ember-red)" }}
          >
            ★ Grand opening · Wed 15 July
          </p>
          <p className="mt-1 text-lg font-extrabold" style={{ color: "var(--go-ink)" }}>
            Banjara Hills, Hyderabad
          </p>
          <p className="mt-1 text-xs opacity-75" style={{ color: "var(--go-ink)" }}>
            Dine-in &amp; takeaway · from 11:00
          </p>
        </div>

        {/* Map Preview */}
        <div
          className="mt-4 overflow-hidden rounded-sm border border-dashed h-[180px] w-full"
          style={{ borderColor: "var(--go-ink)" }}
        >
          <iframe
            src="https://maps.google.com/maps?hl=en&q=Wrapz%20N%20Fryz%20Banjara%20Hills%20Hyderabad&t=&z=15&ie=UTF8&iwloc=B&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wrapz N Fryz Banjara Hills Location Map"
          />
        </div>

        <div className="mt-4 space-y-2 text-sm" style={{ color: "var(--go-ink)" }}>
          <p className="flex items-center gap-2">
            <span aria-hidden="true">◴</span> Open daily · 11:00 – 24:00
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true">⌖</span> More neighbourhoods coming soon
          </p>
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Wrapz%20N%20Fryz%20Banjara%20Hills%20Hyderabad"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full px-8 text-sm font-bold tracking-wide"
          style={{ background: "var(--go-ember-red)", color: "var(--go-cream)" }}
        >
          Open in Google Maps →
        </a>
      </FoldPanel>
    </div>
  );
}
