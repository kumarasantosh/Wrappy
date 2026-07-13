"use client";

/**
 * Composes the whole experience and owns the two page-wide systems:
 *  - capability tier (full WebGL / lite CSS / static reduced-motion)
 *  - the live "kitchen" time-of-day grade (client clock, no backend)
 * SSR + first paint render the static shell (real text, SEO-safe); the
 * simulation mounts over it once the device proves it can carry it.
 */

import React, { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useCapabilities, useTimeGrade } from "./lib";
import { DebrisProvider } from "./Debris";
import StaticHero from "./StaticHero";
import WrapperNet from "./WrapperNet";

const FoilHero = dynamic(() => import("./FoilHero"), { ssr: false });

/* lerp two hex colors */
function mix(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export default function Experience() {
  const tier = useCapabilities(); // null until mounted
  const warmth = useTimeGrade();
  const effective = tier ?? "static";

  /* ---------- background music ---------- */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.wav");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  // Auto-play on first user interaction (click/scroll/touch)
  useEffect(() => {
    if (userInteracted) return;
    const start = () => {
      setUserInteracted(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener("click", start, { once: true });
    window.addEventListener("touchstart", start, { once: true });
    window.addEventListener("scroll", start, { once: true });
    return () => {
      window.removeEventListener("click", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("scroll", start);
    };
  }, [userInteracted]);

  // kitchen ambient grade: char base warms toward ember at meal times
  const bgTop = mix("#14110e", "#241611", warmth);
  const bgBottom = mix("#0f0d0b", "#1b120d", warmth);

  return (
    <div
      className="go-root relative min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgBottom} 100%)`,
      }}
    >
      {/* ember haze that breathes with the time of day */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          opacity: 0.12 + warmth * 0.2,
          background:
            "radial-gradient(75% 55% at 50% 108%, rgba(229,72,46,0.5) 0%, rgba(255,158,44,0.16) 45%, transparent 75%)",
        }}
      />

      <DebrisProvider enabled={effective === "full"}>
        <div className="relative z-10">
          {effective === "full" ? (
            <div className="go-grain relative">
              <FoilHero warmth={warmth} />
            </div>
          ) : (
            <StaticHero tier={effective} />
          )}

          <WrapperNet tier={effective} />

          <footer
            className="relative z-10 px-6 pb-32 pt-4 text-center text-[11px] tracking-widest opacity-50"
            style={{ color: "var(--go-cream)" }}
          >
            © {new Date().getFullYear()} WRAPZNFRYZ · WRAPPED FRESH DAILY
          </footer>
        </div>
      </DebrisProvider>
    </div>
  );
}
