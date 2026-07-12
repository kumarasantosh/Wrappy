"use client";

/**
 * Persistent physical residue.
 * Every foil interaction on the page (hero tear, scratch card, packet peels)
 * drops flecks into this one fixed layer. They fall, tumble, land on a
 * heightfield at the bottom of the viewport and STAY — settled flecks are
 * baked into an offscreen canvas so the pile costs nothing to keep.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

type AddDebris = (x: number, y: number, count: number, ember?: boolean) => void;

const DebrisContext = createContext<AddDebris>(() => {});
export const useDebris = () => useContext(DebrisContext);

interface Fleck {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  s: number; // size px
  c: string;
}

const FOILS = ["#cdced6", "#b7b8c2", "#e6e8ef", "#a8a9b4"];
const SILKS = ["#a11224", "#7c0e1c", "#d32235", "#8f1020"];
const MAX_ACTIVE = 130;
const PILE_MAX = 64; // px max pile height

export function DebrisProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flecks = useRef<Fleck[]>([]);
  const settled = useRef<HTMLCanvasElement | null>(null);
  const heights = useRef<Float32Array>(new Float32Array(0));
  const raf = useRef<number>(0);
  const running = useRef(false);
  const dpr = useRef(1);

  const layerH = () =>
    Math.min(320, Math.round((typeof window !== "undefined" ? window.innerHeight : 800) * 0.4));

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    dpr.current = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const w = window.innerWidth;
      const h = layerH();
      canvas.width = w * dpr.current;
      canvas.height = h * dpr.current;
      canvas.style.height = `${h}px`;
      const cols = Math.ceil(w / 3);
      const next = new Float32Array(cols);
      // keep some pile on resize (rescale roughly)
      const prev = heights.current;
      if (prev.length) {
        for (let i = 0; i < cols; i++) {
          next[i] = prev[Math.min(prev.length - 1, Math.floor((i / cols) * prev.length))] ?? 0;
        }
      }
      heights.current = next;
      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      if (settled.current) {
        off.getContext("2d")?.drawImage(settled.current, 0, 0, off.width, off.height);
      }
      settled.current = off;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
      running.current = false;
    };
  }, [enabled]);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const d = dpr.current;
    const H = canvas.height / d;
    const W = canvas.width / d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (settled.current) ctx.drawImage(settled.current, 0, 0, W, H);

    const hs = heights.current;
    const list = flecks.current;
    for (let i = list.length - 1; i >= 0; i--) {
      const f = list[i];
      f.vy += 0.34; // gravity
      f.vx *= 0.985;
      f.x += f.vx;
      f.y += f.vy;
      f.rot += f.vr;
      const col = Math.min(hs.length - 1, Math.max(0, Math.floor(f.x / 3)));
      const floor = H - Math.min(PILE_MAX, hs[col]);
      if (f.y >= floor) {
        // settle: bake into the pile
        const sc = settled.current?.getContext("2d");
        if (sc) {
          sc.setTransform(d, 0, 0, d, 0, 0);
          sc.save();
          sc.translate(f.x, floor - f.s * 0.3);
          sc.rotate(f.rot);
          sc.fillStyle = f.c;
          sc.fillRect(-f.s / 2, -f.s / 4, f.s, f.s / 2);
          sc.restore();
        }
        hs[col] = Math.min(PILE_MAX, hs[col] + f.s * 0.32);
        if (col > 0) hs[col - 1] = Math.max(hs[col - 1], hs[col] - 2);
        if (col < hs.length - 1) hs[col + 1] = Math.max(hs[col + 1], hs[col] - 2);
        list.splice(i, 1);
        continue;
      }
      if (f.x < -20 || f.x > W + 20) {
        list.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);
      ctx.fillStyle = f.c;
      ctx.fillRect(-f.s / 2, -f.s / 4, f.s, f.s / 2);
      ctx.restore();
    }

    if (list.length > 0) {
      raf.current = requestAnimationFrame(tick);
    } else {
      running.current = false;
      // final redraw already includes settled pile
    }
  }, []);

  const addDebris = useCallback<AddDebris>(
    (x, y, count, ember = false) => {
      if (!enabled || !canvasRef.current) return;
      const H = layerH();
      const topOfLayer = window.innerHeight - H;
      const list = flecks.current;
      for (let i = 0; i < count; i++) {
        if (list.length >= MAX_ACTIVE) break;
        // ember=true → shed from the silk hero: mostly red fabric scraps
        const palette = ember && Math.random() < 0.8 ? SILKS : FOILS;
        list.push({
          x: x + (Math.random() - 0.5) * 26,
          // convert viewport y → layer-local y (spawn above layer clamps to 0)
          y: Math.max(-8, y - topOfLayer + (Math.random() - 0.5) * 10),
          vx: (Math.random() - 0.5) * 3.4,
          vy: -Math.random() * 2.2,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          s: 3 + Math.random() * 5,
          c: palette[(Math.random() * palette.length) | 0],
        });
      }
      if (!running.current && list.length) {
        running.current = true;
        raf.current = requestAnimationFrame(tick);
      }
    },
    [enabled, tick]
  );

  return (
    <DebrisContext.Provider value={addDebris}>
      {children}
      {enabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-0 z-[45] w-full"
        />
      )}
    </DebrisContext.Provider>
  );
}
