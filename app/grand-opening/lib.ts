"use client";

import { useEffect, useState } from "react";

/* ---------------- seeded RNG ---------------- */

export function makeSeed(): number {
  return (Date.now() ^ ((Math.random() * 0xffffffff) | 0)) >>> 0;
}

/** mulberry32 — tiny deterministic PRNG. Every visit gets its own seed,
 *  so every tear line / shard flight is unique but internally consistent. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------------- device capability tiers ---------------- */

export type Tier = "full" | "lite" | "static";

export function detectTier(): Tier {
  if (typeof window === "undefined") return "lite";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }
  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webgl = false;
  }
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string; saveData?: boolean };
  };
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory ?? 4;
  const et = nav.connection?.effectiveType ?? "4g";
  const saveData = nav.connection?.saveData ?? false;
  const lowEnd =
    cores <= 3 || mem <= 2 || et === "2g" || et === "slow-2g" || saveData;
  return !webgl || lowEnd ? "lite" : "full";
}

/** null until mounted (SSR-safe) — callers render the static shell meanwhile */
export function useCapabilities(): Tier | null {
  const [tier, setTier] = useState<Tier | null>(null);
  useEffect(() => {
    setTier(detectTier());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setTier(detectTier());
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return tier;
}

/* ---------------- time-of-day kitchen grade ---------------- */

/** warmth 0..1 — peaks around breakfast / lunch / dinner, cools off-peak */
export function timeWarmth(d = new Date()): number {
  const h = d.getHours() + d.getMinutes() / 60;
  const peaks = [8, 13, 20]; // meal times
  let w = 0;
  for (const p of peaks) {
    const dd = Math.min(Math.abs(h - p), 24 - Math.abs(h - p));
    w = Math.max(w, Math.exp(-(dd * dd) / (2 * 1.9 * 1.9)));
  }
  return w;
}

export function useTimeGrade(): number {
  const [w, setW] = useState(0.5);
  useEffect(() => {
    const update = () => setW(timeWarmth());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  return w;
}

/* ---------------- procedural voronoi-ish tear path ---------------- */

export interface TearPoint {
  x: number; // 0..1 across cloth
  y: number; // 0..1 top→bottom
}

/**
 * Scatters voronoi seed points over the cloth, then walks a crack from top
 * to bottom that gets deflected along the boundaries between seeds
 * (perpendicular repulsion from the nearest seed) with jitter — reads as a
 * cell-boundary tear and is different on every load.
 */
export function generateTearPath(
  rand: () => number,
  steps = 26
): TearPoint[] {
  const seeds: TearPoint[] = [];
  const n = 10 + Math.floor(rand() * 5);
  for (let i = 0; i < n; i++) seeds.push({ x: rand(), y: rand() });

  const pts: TearPoint[] = [];
  let x = 0.32 + rand() * 0.36;
  for (let i = 0; i <= steps; i++) {
    const y = i / steps;
    // repulsion from nearest seed pushes the crack along cell boundaries
    let nearest = seeds[0];
    let best = Infinity;
    for (const s of seeds) {
      const dx = s.x - x;
      const dy = s.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 < best) {
        best = d2;
        nearest = s;
      }
    }
    const d = Math.sqrt(best) + 1e-4;
    const repel = (-(nearest.x - x) / d) * Math.min(0.05, 0.004 / best);
    x += repel + (rand() - 0.5) * 0.075;
    x = Math.min(0.86, Math.max(0.14, x));
    pts.push({ x, y });
  }
  return pts;
}

/** x of the tear at a given y (linear interp along the polyline) */
export function tearXAt(path: TearPoint[], y: number): number {
  if (y <= path[0].y) return path[0].x;
  for (let i = 1; i < path.length; i++) {
    if (y <= path[i].y) {
      const a = path[i - 1];
      const b = path[i];
      const t = (y - a.y) / (b.y - a.y + 1e-6);
      return a.x + (b.x - a.x) * t;
    }
  }
  return path[path.length - 1].x;
}

/* ---------------- shared palette ---------------- */

export const PALETTE = {
  char: "#171310", // charred base
  charWarm: "#211511", // meal-time base
  kraft: "#d7b78a",
  kraftDeep: "#b8935e",
  kraftInk: "#3d2b17",
  foil: "#c8c9d1",
  foilDim: "#9a9ba6",
  foilBright: "#eceef4",
  ember: "#ff9e2c",
  emberRed: "#e5482e",
  cream: "#f6efe4",
};
