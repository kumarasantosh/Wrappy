"use client";

/**
 * MENU TEASER — fold-out packets living inside the wrapper net.
 * Tapping a packet hinges its foil lid open IN PLACE (no modal, no flip):
 * the lid is a 3D flap with a printed front and a foil underside, and the
 * dish rises out of the pouch beneath it. Opening one drops a couple of
 * foil flecks into the persistent debris pile.
 */

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Tier } from "./lib";
import { useDebris } from "./Debris";

export interface MenuItem {
  name: string;
  kind: string;
  price: string;
  img: string;
}

const ITEMS: MenuItem[] = [
  {
    name: "Smoky Tandoori Chicken",
    kind: "Signature wrap",
    price: "₹149",
    img: "/Wraps/Smoky%20Tandoori%20Chicken_wrap.png",
  },
  {
    name: "Cheesy Paneer",
    kind: "Veg wrap",
    price: "₹129",
    img: "/Wraps/Cheesy%20Paneer_wrap.png",
  },
  {
    name: "Peri Peri Fries",
    kind: "Loaded fries",
    price: "₹99",
    img: "/Fries/Peri%20Peri%20Fries.png",
  },
  {
    name: "Thickshake",
    kind: "Shakes & desserts",
    price: "₹119",
    img: "/thickshake.png",
  },
];

function Packet({
  item,
  animate,
  tall = false,
}: {
  item: MenuItem;
  animate: boolean;
  tall?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const addDebris = useDebris();
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && ref.current) {
      const r = ref.current.getBoundingClientRect();
      addDebris(r.left + r.width / 2, r.top + r.height * 0.4, 3);
    }
  };

  const spring = animate
    ? { type: "spring" as const, stiffness: 120, damping: 15 }
    : { duration: 0 };

  return (
    <div ref={ref} style={{ perspective: "700px" }}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={`${item.name}, ${item.price} — ${open ? "close" : "peel open"} packet`}
        className={`relative block w-full text-left ${tall ? "h-64" : "h-52"}`}
        style={{ transformStyle: "preserve-3d", minHeight: 44 }}
      >
        {/* pouch interior — revealed as the lid hinges up */}
        <div
          className="absolute inset-0 overflow-hidden rounded-sm border"
          style={{
            background: "linear-gradient(180deg, #2a2019, #1c1510)",
            borderColor: "var(--go-kraft-deep)",
          }}
        >
          <motion.div
            className="flex h-full flex-col items-center justify-end pb-3"
            initial={false}
            animate={open ? { y: 0, opacity: 1 } : { y: 26, opacity: 0 }}
            transition={spring}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt=""
              loading="lazy"
              className={`object-contain drop-shadow-lg ${tall ? "h-40 w-40" : "h-28 w-28"}`}
            />
            <p className={`mt-1 px-2 text-center font-bold leading-tight ${tall ? "text-sm" : "text-[11px]"}`} style={{ color: "var(--go-cream)" }}>
              {item.name}
            </p>
            <p className={`font-extrabold ${tall ? "text-base" : "text-sm"}`} style={{ color: "var(--go-ember)" }}>
              {item.price}
            </p>
          </motion.div>
        </div>

        {/* foil lid — hinged at the crimped top edge */}
        <motion.div
          className="absolute inset-0 rounded-sm"
          style={{
            transformOrigin: "50% 0%",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          initial={false}
          animate={{ rotateX: open ? -128 : 0 }}
          transition={spring}
          aria-hidden="true"
        >
          {/* printed foil front */}
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-sm p-3"
            style={{
              background:
                "linear-gradient(155deg, #d6d7de 0%, #adaeb9 34%, #e9eaf0 52%, #b6b7c1 70%, #cfd0d8 100%)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* crimped seal */}
            <div
              className="h-2 w-full opacity-50"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #8e8f9a 0 4px, #e6e7ee 4px 8px)",
              }}
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60" style={{ color: "#2c2c34" }}>
                {item.kind}
              </p>
              <p className="text-sm font-extrabold leading-tight" style={{ color: "#1e1e26" }}>
                {item.name}
              </p>
              <p className="mt-1 text-[10px] tracking-widest opacity-60" style={{ color: "#2c2c34" }}>
                TAP TO PEEL ▾
              </p>
            </div>
          </div>
          {/* foil underside — what you see once it hinges past ~90° */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background:
                "linear-gradient(25deg, #74757f 0%, #9b9ca8 45%, #6b6c76 100%)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>
      </button>
    </div>
  );
}

export default function MenuPackets({
  tier,
  items = ITEMS,
  single = false,
}: {
  tier: Tier;
  items?: MenuItem[];
  single?: boolean;
}) {
  const animate = tier !== "static";
  return (
    <div className={single ? "mx-auto mt-5 max-w-[280px]" : "mt-5 grid grid-cols-2 gap-3"}>
      {items.map((item) => (
        <Packet key={item.name} item={item} animate={animate} tall={single} />
      ))}
    </div>
  );
}
