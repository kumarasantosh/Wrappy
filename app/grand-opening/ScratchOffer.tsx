"use client";

/**
 * SCRATCH-REVEAL OFFER with persistent physical residue.
 * The code hides under a canvas-painted foil layer. Scratching erases it
 * (destination-out) and every stroke sheds flecks into the global debris
 * layer, where they fall and pile up at the bottom of the viewport.
 * Past 55% scratched, the rest of the foil lets go in a burst.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Tier } from "./lib";
import { useDebris } from "./Debris";

const CODE = "UNWRAP11";

export default function ScratchOffer({ tier }: { tier: Tier }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const addDebris = useDebris();
  const strokes = useRef(0);
  const lastFleck = useRef({ x: 0, y: 0 });
  const interactive = tier !== "static";

  /* paint the foil coat */
  useEffect(() => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#c9cad2");
    g.addColorStop(0.35, "#9fa0ac");
    g.addColorStop(0.55, "#e3e4eb");
    g.addColorStop(0.8, "#a8a9b4");
    g.addColorStop(1, "#c4c5cd");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // brushed speckle
    for (let i = 0; i < 260; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.16)" : "rgba(60,60,72,0.14)";
      ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 3 + 0.5, 1);
    }
    ctx.fillStyle = "rgba(40,40,50,0.55)";
    ctx.font = "700 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "3px";
    ctx.fillText("SCRATCH THE FOIL", w / 2, h / 2 - 6);
    ctx.font = "500 9px system-ui, sans-serif";
    ctx.fillText("launch-week code underneath", w / 2, h / 2 + 12);
  }, [interactive]);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 4 * 7) {
      total++;
      if (data[i] < 40) clear++;
    }
    if (clear / total > 0.55 && !revealed) {
      setRevealed(true);
      const r = canvas.getBoundingClientRect();
      addDebris(r.left + r.width / 2, r.top + r.height / 2, 26);
    }
  }, [revealed, addDebris]);

  const scratchTo = useCallback(
    (e: React.PointerEvent) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || revealed) return;
      if (e.buttons !== 1 && e.pointerType === "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      // shed flecks roughly every 34px of stroke
      const dx = e.clientX - lastFleck.current.x;
      const dy = e.clientY - lastFleck.current.y;
      if (dx * dx + dy * dy > 34 * 34) {
        lastFleck.current = { x: e.clientX, y: e.clientY };
        addDebris(e.clientX, e.clientY, 2);
      }
      strokes.current++;
      if (strokes.current % 12 === 0) checkProgress();
    },
    [revealed, addDebris, checkProgress]
  );

  const copy = () => {
    navigator.clipboard?.writeText(CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold sm:text-2xl" style={{ color: "var(--go-ink)" }}>
        Something under the foil
      </h2>
      <p className="mt-1 text-xs opacity-70" style={{ color: "var(--go-ink)" }}>
        {interactive
          ? "Scratch it off — the flecks land where flecks land."
          : "Your launch-week offer:"}
      </p>

      <div
        ref={wrapRef}
        className="relative mx-auto mt-5 h-36 w-full max-w-xs overflow-hidden rounded-md"
        style={{ background: "#221a13", border: "1px dashed var(--go-ink)" }}
      >
        {/* the prize */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--go-ember)" }}>
            Buy 1 Get 1 · launch week
          </p>
          <p
            className="font-mono text-2xl font-extrabold tracking-[0.2em]"
            style={{ color: "var(--go-cream)" }}
          >
            {CODE}
          </p>
          <button
            type="button"
            onClick={copy}
            className="mt-1 min-h-[44px] rounded-full px-5 text-xs font-bold"
            style={{ background: "var(--go-ember-red)", color: "var(--go-cream)" }}
          >
            {copied ? "Copied ✓" : "Copy code"}
          </button>
        </div>

        {/* the foil coat */}
        {interactive && (
          <canvas
            ref={canvasRef}
            onPointerDown={scratchTo}
            onPointerMove={scratchTo}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
              revealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            style={{ touchAction: "none" }}
            aria-label="Scratch to reveal the discount code"
            role="img"
          />
        )}
        {!interactive && !revealed && (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="absolute inset-0 flex min-h-[44px] items-center justify-center text-sm font-bold"
            style={{
              background: "linear-gradient(155deg, #cfd0d8, #a5a6b1 55%, #dcdde4)",
              color: "#26262e",
            }}
          >
            Reveal launch-week code
          </button>
        )}
      </div>
    </div>
  );
}
