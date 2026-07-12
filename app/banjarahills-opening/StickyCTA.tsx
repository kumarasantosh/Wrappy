"use client";

/**
 * STICKY CTA — "Order Now" pill with a heat-shimmer backdrop.
 * Full tier: a tiny raw-WebGL fragment shader refracts the pill's ember
 * backdrop through a rising screen-space distortion field (real UV
 * displacement, not a blur). Lite tier: SVG feDisplacementMap. Static: flat.
 * Fixed bottom-centre, ≥56px tall — thumb territory.
 */

import React, { useEffect, useRef } from "react";
import type { Tier } from "./lib";

const FRAG = `
precision mediump float;
uniform float uT;
uniform vec2 uRes;
uniform float uWarm;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  /* rising heat field displaces the sampling coords — refraction, not blur */
  float n1 = vnoise(vec2(uv.x * 5.0, uv.y * 2.6 - uT * 1.1));
  float n2 = vnoise(vec2(uv.x * 12.0 + 31.7, uv.y * 5.2 - uT * 2.3));
  vec2 duv = uv + vec2((n1 - 0.5) * 0.10 + (n2 - 0.5) * 0.05, (n2 - 0.5) * 0.06);
  vec3 deep = vec3(0.52, 0.12, 0.07);
  vec3 amber = vec3(1.0, 0.60, 0.16);
  vec3 col = mix(deep, amber, smoothstep(0.0, 1.1, duv.y + 0.22 * sin(duv.x * 3.14159)));
  float core = smoothstep(0.6, 0.0, distance(duv, vec2(0.5 + 0.09 * sin(uT * 0.7), 0.3)));
  col += amber * core * 0.45;
  col *= 0.88 + 0.28 * uWarm;
  col += (hash(gl_FragCoord.xy + fract(uT) * 217.0) - 0.5) * 0.05; /* grain */
  gl_FragColor = vec4(col, 1.0);
}`;

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

function ShimmerCanvas({ warmth }: { warmth: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const warmRef = useRef(warmth);
  warmRef.current = warmth;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(prog, "uT");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uWarm = gl.getUniformLocation(prog, "uWarm");
    gl.uniform2f(uRes, w, h);

    let raf = 0;
    const t0 = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.uniform1f(uWarm, warmRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}

export default function StickyCTA({
  tier,
  warmth,
}: {
  tier: Tier;
  warmth: number;
}) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center"
      style={{ bottom: "max(14px, env(safe-area-inset-bottom))" }}
    >
      {tier === "lite" && (
        <svg width="0" height="0" aria-hidden="true">
          <filter id="go-heat">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.09" numOctaves="2" seed="7">
              <animate
                attributeName="baseFrequency"
                dur="6s"
                values="0.02 0.09;0.025 0.12;0.02 0.09"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="6" />
          </filter>
        </svg>
      )}
      <a
        href="/"
        aria-label="Order now from WrapzNfryz"
        className="pointer-events-auto relative flex min-h-[56px] min-w-[190px] items-center justify-center overflow-hidden rounded-full px-9 shadow-xl"
        style={{
          background:
            tier === "full"
              ? "#7a1d10"
              : "linear-gradient(165deg, #85200f 0%, #e5482e 55%, #ff9e2c 130%)",
          filter: tier === "lite" ? "url(#go-heat)" : undefined,
          boxShadow: "0 8px 30px rgba(229,72,46,0.35)",
        }}
      >
        {tier === "full" && <ShimmerCanvas warmth={warmth} />}
        <span
          className="relative z-10 text-base font-extrabold tracking-wide"
          style={{ color: "var(--go-cream)", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
        >
          Order Now
        </span>
      </a>
    </div>
  );
}
