"use client";

/**
 * Fallback hero — the same concept, illustrated.
 * A foil wrap already torn ajar over the logo, with the crack drawn as a
 * jagged (pre-baked) voronoi-ish polyline and steam as strokes.
 * lite tier: gentle CSS drift on the steam + a sheen sweep.
 * static tier (prefers-reduced-motion): completely still — finished, not broken.
 */

import React from "react";
import type { Tier } from "./lib";

export default function StaticHero({ tier }: { tier: Tier }) {
  const animate = tier === "lite";
  return (
    <section
      className="go-hero relative flex w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      aria-label="WrapzNfryz grand opening"
    >
      <div className="relative h-72 w-72 sm:h-80 sm:w-80">
        <svg viewBox="0 0 320 320" className="h-full w-full" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="goFoil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#b31730" />
              <stop offset="0.4" stopColor="#7c0e1c" />
              <stop offset="0.55" stopColor="#e8546a" />
              <stop offset="0.8" stopColor="#8f1020" />
              <stop offset="1" stopColor="#a91428" />
            </linearGradient>
            <linearGradient id="goFoilDark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#560a14" />
              <stop offset="1" stopColor="#71101f" />
            </linearGradient>
          </defs>
          {/* kraft disc behind */}
          <circle cx="160" cy="160" r="128" fill="#d7b78a" />
          <circle cx="160" cy="160" r="128" fill="none" stroke="#3d2b17" strokeDasharray="4 6" opacity="0.35" />
          {/* monogram peeking through the tear */}
          <text
            x="160"
            y="176"
            textAnchor="middle"
            fontSize="46"
            fontWeight="700"
            fontFamily="serif"
            fill="#ff1e1e"
          >
            WnF
          </text>
          {/* left foil half, torn edge jagged */}
          <path
            d="M32 60 L150 60 L142 84 L156 108 L144 132 L158 158 L146 186 L160 212 L148 238 L156 262 L32 262 Z"
            fill="url(#goFoil)"
            opacity="0.97"
          />
          {/* right foil half */}
          <path
            d="M288 60 L174 60 L186 88 L172 112 L184 140 L170 164 L184 192 L172 218 L182 244 L174 262 L288 262 Z"
            fill="url(#goFoil)"
            opacity="0.97"
          />
          {/* curled-back tear lips */}
          <path d="M150 60 L142 84 L156 108 L144 132 L158 158 L146 186 L160 212 L148 238 L156 262 L146 262 L138 234 L150 208 L136 184 L148 156 L134 130 L146 106 L132 82 L140 60 Z" fill="url(#goFoilDark)" />
          <path d="M174 60 L186 88 L172 112 L184 140 L170 164 L184 192 L172 218 L182 244 L174 262 L184 262 L192 240 L182 216 L194 190 L180 166 L194 138 L182 110 L196 86 L184 60 Z" fill="url(#goFoilDark)" />
          {animate && (
            <rect x="0" y="0" width="320" height="320" fill="url(#goFoil)" opacity="0.08" className="go-sheen" />
          )}
        </svg>
      </div>

      <p className="mt-6 font-serif text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: "var(--go-cream)" }}>
        Wrapz <span className="text-wrappy-red">N</span> Fryz
      </p>
      <h1
        className="mt-3 text-4xl font-black tracking-tight sm:text-5xl"
        style={{ color: "var(--go-foil-bright)" }}
      >
        GRAND
        <br />
        OPENING
      </h1>
      <p className="mt-4 max-w-xs text-sm tracking-widest" style={{ color: "var(--go-cream)", opacity: 0.9 }}>
        GRAND OPENING · 15 JULY
        <span className="mt-2 block text-xs opacity-70">
          Banjara Hills, Hyderabad — doors open Wednesday
        </span>
      </p>
    </section>
  );
}
