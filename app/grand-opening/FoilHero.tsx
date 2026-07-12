"use client";

/**
 * HERO — real-time silky red cloth sim (verlet physics, GPU satin shading).
 *  - Cloth grid pinned along its top edge, draped over the logo zone.
 *  - Reacts to touch/pointer drag and device tilt (gyroscope).
 *  - On first scroll / flick release it tears along a seeded voronoi-ish
 *    crack path (unique every load): constraints crossing the crack are cut
 *    top→bottom, triangles spanning it are degenerated, nearby pins release.
 *  - Steam: GPU point particles emitted along the actual tear polyline,
 *    swirled by an analytic divergence-free flow in the vertex shader.
 *  - "GRAND OPENING" assembles from foil-shard particles flying in under a
 *    magnetic-attraction sim (spring + damping + snap), seeded per visit.
 *  - Film grain is added inside the fragment shaders.
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  generateTearPath,
  makeSeed,
  mulberry32,
  tearXAt,
  TearPoint,
} from "./lib";
import { useDebris } from "./Debris";

/* ---------------- shaders ---------------- */

const FOIL_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec2 vUv;
  void main() {
    vN = normalMatrix * normal;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FOIL_FRAG = /* glsl */ `
  precision mediump float;
  varying vec3 vN;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uWarm;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  void main() {
    vec3 n = normalize(vN);
    if (!gl_FrontFacing) n = -n;
    /* silk folds are smooth — low-frequency, gentle normal perturbation */
    float cr = vnoise(vUv * 11.0) * 0.7 + vnoise(vUv * 27.0) * 0.3;
    float cr2 = vnoise(vUv * 16.0 + 7.3);
    n = normalize(n + vec3((cr - 0.5) * 0.35, (cr2 - 0.5) * 0.35, 0.0));
    vec3 L = normalize(vec3(0.35, 0.55, 0.75));
    vec3 V = vec3(0.0, 0.0, 1.0);
    float diff = max(dot(n, L), 0.0);
    vec3 H = normalize(L + V);
    /* satin: tight thread highlight + broad soft sheen + fresnel rim */
    float spec = pow(max(dot(n, H), 0.0), 70.0) * 0.7;
    float sheen = pow(max(dot(n, H), 0.0), 6.0) * 0.22;
    float rim = pow(1.0 - max(dot(n, V), 0.0), 2.5) * 0.30;
    float band = sin(vUv.y * 16.0 + n.x * 4.0 + cr * 3.0) * 0.018; /* weave */
    vec3 base = vec3(0.54, 0.05, 0.10);              /* deep silk red */
    vec3 hi = vec3(1.0, 0.82, 0.78);                 /* warm satin gloss */
    vec3 col = base * (0.35 + diff * 0.65) + hi * (spec + sheen) + vec3(0.85, 0.25, 0.25) * rim + band;
    col = mix(col, col * vec3(1.05, 0.78, 0.55), uWarm * 0.14); /* kitchen grade */
    col += (hash(gl_FragCoord.xy + fract(uTime) * 371.0) - 0.5) * 0.05; /* grain */
    gl_FragColor = vec4(col, uOpacity);
  }
`;

const STEAM_VERT = /* glsl */ `
  attribute float aSeed;
  uniform vec2 uTear[9];
  uniform float uTime;
  uniform float uStart;
  uniform float uPR;
  varying float vA;
  varying float vSeed;
  void main() {
    vSeed = aSeed;
    float since = uTime - uStart;
    float life = 7.0;
    float t = fract(since / life + aSeed);
    float pick = aSeed * 7.999;
    float fi = floor(pick);
    float ff = fract(pick);
    vec2 emit = uTear[0];
    for (int i = 0; i < 8; i++) {
      if (float(i) == fi) { emit = mix(uTear[i], uTear[i + 1], ff); }
    }
    /* analytic divergence-free swirl (curl of a sin/cos potential) */
    float sway = (cos(t * 4.0 + aSeed * 41.0) * 17.0
                + cos(t * 9.3 + aSeed * 17.0) * 6.5) * (t + 0.15);
    float rise = t * 205.0 + t * t * 60.0;
    vec3 p = vec3(emit.x + sway, emit.y + rise, 1.0);
    float on = step(0.0, uStart) * smoothstep(0.4, 2.2, since);
    vA = smoothstep(0.02, 0.2, t) * (1.0 - smoothstep(0.5, 1.0, t)) * 0.34 * on;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = mix(10.0, 36.0, t) * uPR;
  }
`;

const STEAM_FRAG = /* glsl */ `
  precision mediump float;
  varying float vA;
  varying float vSeed;
  uniform float uWarm;
  void main() {
    vec2 q = gl_PointCoord - 0.5;
    float d = length(q);
    float a = smoothstep(0.5, 0.1, d) * vA;
    a *= 0.7 + 0.3 * sin(vSeed * 91.0 + d * 22.0);
    vec3 c = mix(vec3(0.93, 0.94, 0.97), vec3(1.0, 0.86, 0.72), uWarm * 0.55);
    gl_FragColor = vec4(c, a);
  }
`;

const SHARD_VERT = /* glsl */ `
  attribute float aSeed;
  attribute vec3 aColor;
  attribute float aKind;
  uniform float uPR;
  varying float vSeed;
  varying vec3 vColor;
  varying float vKind;
  void main() {
    vSeed = aSeed;
    vColor = aColor;
    vKind = aKind;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (4.4 + aSeed * 3.8) * uPR;
  }
`;

const SHARD_FRAG = /* glsl */ `
  precision mediump float;
  varying float vSeed;
  varying vec3 vColor;
  varying float vKind;
  uniform float uWarm;
  uniform float uTime;
  uniform float uLogoFade;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    /* once assembled, logo shards hand over to the crisp DOM lockup */
    float alpha = vKind > 0.5 ? 1.0 - uLogoFade : 1.0;
    if (alpha < 0.02) discard;
    vec2 q = gl_PointCoord - 0.5;
    float ang = vSeed * 6.28318;
    q = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * q;
    if (max(abs(q.x), abs(q.y)) > 0.42) discard;
    float shade = 0.6 + 0.4 * sin(vSeed * 43.0 + q.x * 9.0);
    vec3 c;
    if (vKind > 0.5) {
      /* logo shard — carries the sampled logo color, gentle facet shimmer */
      c = vColor * (0.78 + shade * 0.35);
    } else {
      /* foil shard */
      c = vec3(0.8, 0.81, 0.85) * shade;
      if (fract(vSeed * 13.71) > 0.94) c = vec3(1.0, 0.6, 0.26) * (0.8 + shade * 0.3);
      c = mix(c, c * vec3(1.0, 0.72, 0.5), uWarm * 0.14);
    }
    c += (hash(gl_FragCoord.xy + fract(uTime) * 113.0) - 0.5) * 0.06;
    gl_FragColor = vec4(c, alpha);
  }
`;

/* ---------------- component ---------------- */

interface Props {
  warmth: number;
  onTorn?: () => void;
}

export default function FoilHero({ warmth, onTorn }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [torn, setTorn] = useState(false);
  const [gone, setGone] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const addDebris = useDebris();
  const warmRef = useRef(warmth);
  warmRef.current = warmth;
  const tornRef = useRef(onTorn);
  tornRef.current = onTorn;
  const setTornRef = useRef({ setTorn, setGone, setAssembled });
  setTornRef.current = { setTorn, setGone, setAssembled };
  const debrisRef = useRef(addDebris);
  debrisRef.current = addDebris;

  useEffect(() => {
    const mount = mountRef.current;
    const canvas = canvasRef.current;
    if (!mount || !canvas) return;

    const seed = makeSeed();
    const rand = mulberry32(seed);

    let W = mount.clientWidth;
    let H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    const PR = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(PR);
    renderer.setSize(W, H, false);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -500, 500);

    /* ---------- cloth ---------- */
    const CW = 26, CH = 32; // grid segments
    const NX = CW + 1, NY = CH + 1, N = NX * NY;
    let clothW = Math.min(W * 0.94, 620);
    let clothH = Math.min(H * 0.68, 560);
    const clothCY = H * 0.03; // slight upward bias

    const pos = new Float32Array(N * 3);
    const prev = new Float32Array(N * 3);
    const pinned = new Uint8Array(N);
    const idx = (c: number, r: number) => r * NX + c;

    const initCloth = () => {
      for (let r = 0; r < NY; r++) {
        for (let c = 0; c < NX; c++) {
          const i = idx(c, r) * 3;
          const u = c / CW, v = r / CH;
          // silk drapes smooth — only a whisper of jitter so folds read soft
          const jx = (rand() - 0.5) * 2.5;
          const jz = (rand() - 0.5) * 9;
          pos[i] = (u - 0.5) * clothW + jx;
          pos[i + 1] = clothH / 2 - v * clothH + clothCY;
          pos[i + 2] = jz;
          prev[i] = pos[i];
          prev[i + 1] = pos[i + 1];
          prev[i + 2] = pos[i + 2];
          pinned[idx(c, r)] = r === 0 ? 1 : 0;
        }
      }
    };
    initCloth();

    interface Constraint { a: number; b: number; rest: number; vMid: number; cut: boolean; cross: boolean; }
    const constraints: Constraint[] = [];
    const addC = (a: number, b: number) => {
      const dx = pos[a * 3] - pos[b * 3];
      const dy = pos[a * 3 + 1] - pos[b * 3 + 1];
      constraints.push({
        a, b,
        rest: Math.hypot(dx, dy),
        vMid: 0, cut: false, cross: false,
      });
    };
    for (let r = 0; r < NY; r++) {
      for (let c = 0; c < NX; c++) {
        if (c < CW) addC(idx(c, r), idx(c + 1, r));
        if (r < CH) addC(idx(c, r), idx(c, r + 1));
        if (c < CW && r < CH) addC(idx(c, r), idx(c + 1, r + 1)); // shear
      }
    }

    /* geometry + index (triangles remembered so tear can degenerate them) */
    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(pos, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", posAttr);
    const uvs = new Float32Array(N * 2);
    for (let r = 0; r < NY; r++)
      for (let c = 0; c < NX; c++) {
        uvs[idx(c, r) * 2] = c / CW;
        uvs[idx(c, r) * 2 + 1] = 1 - r / CH;
      }
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    const indices = new Uint16Array(CW * CH * 6);
    interface Tri { at: number; verts: [number, number, number]; cross: boolean; vMid: number; }
    const tris: Tri[] = [];
    let ii = 0;
    for (let r = 0; r < CH; r++) {
      for (let c = 0; c < CW; c++) {
        const a = idx(c, r), b = idx(c + 1, r), d = idx(c, r + 1), e = idx(c + 1, r + 1);
        tris.push({ at: ii, verts: [a, d, b], cross: false, vMid: (r + 0.5) / CH });
        indices[ii++] = a; indices[ii++] = d; indices[ii++] = b;
        tris.push({ at: ii, verts: [b, d, e], cross: false, vMid: (r + 0.5) / CH });
        indices[ii++] = b; indices[ii++] = d; indices[ii++] = e;
      }
    }
    const idxAttr = new THREE.BufferAttribute(indices, 1);
    idxAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setIndex(idxAttr);
    geo.computeVertexNormals();

    const foilUniforms = {
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uWarm: { value: warmRef.current },
    };
    const foilMat = new THREE.ShaderMaterial({
      vertexShader: FOIL_VERT,
      fragmentShader: FOIL_FRAG,
      uniforms: foilUniforms,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const cloth = new THREE.Mesh(geo, foilMat);
    scene.add(cloth);

    /* ---------- procedural tear ---------- */
    const tearPath: TearPoint[] = generateTearPath(rand);
    const paramOf = (i: number) => {
      const c = i % NX, r = (i / NX) | 0;
      return { u: c / CW, v: r / CH };
    };
    // which constraints / triangles cross the crack (computed once)
    for (const con of constraints) {
      const pa = paramOf(con.a), pb = paramOf(con.b);
      const sa = Math.sign(pa.u - tearXAt(tearPath, pa.v));
      const sb = Math.sign(pb.u - tearXAt(tearPath, pb.v));
      con.cross = sa !== sb;
      con.vMid = (pa.v + pb.v) / 2;
    }
    for (const t of tris) {
      const ps = t.verts.map(paramOf);
      const ss = ps.map((p) => Math.sign(p.u - tearXAt(tearPath, p.v)));
      t.cross = !(ss[0] === ss[1] && ss[1] === ss[2]);
    }

    /* ---------- steam (disabled — set STEAM_N > 0 to bring it back) ---------- */
    const STEAM_N = 0;
    const steamGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(STEAM_N * 3);
    const sSeed = new Float32Array(STEAM_N);
    for (let i = 0; i < STEAM_N; i++) sSeed[i] = rand();
    steamGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    steamGeo.setAttribute("aSeed", new THREE.BufferAttribute(sSeed, 1));
    const tearWorld: THREE.Vector2[] = Array.from({ length: 9 }, () => new THREE.Vector2());
    const steamUniforms = {
      uTear: { value: tearWorld },
      uTime: { value: 0 },
      uStart: { value: -1 },
      uPR: { value: PR },
      uWarm: { value: warmRef.current },
    };
    const steamMat = new THREE.ShaderMaterial({
      vertexShader: STEAM_VERT,
      fragmentShader: STEAM_FRAG,
      uniforms: steamUniforms,
      transparent: true,
      depthWrite: false,
    });
    const steam = new THREE.Points(steamGeo, steamMat);
    steam.frustumCulled = false;
    steam.visible = STEAM_N > 0;
    if (steam.visible) scene.add(steam);

    const syncTearWorld = () => {
      for (let i = 0; i < 9; i++) {
        const t = i / 8;
        const y = t; // param v
        const x = tearXAt(tearPath, y);
        tearWorld[i].set((x - 0.5) * clothW, clothH / 2 - y * clothH + clothCY);
      }
    };
    syncTearWorld();

    /* ---------- shard typography (headline + logo, one particle cloud) ---------- */
    interface ShardSet {
      targets: Float32Array; colors: Float32Array; kinds: Float32Array; count: number;
      loCy: number; loFont: number;
    }

    /** sample a painted canvas into world-space shard targets w/ pixel colors */
    const sampleCanvas = (
      ctx: CanvasRenderingContext2D,
      cw: number,
      ch: number,
      cap: number,
      scale: number,
      cyWorld: number,
      kind: number
    ) => {
      const img = ctx.getImageData(0, 0, cw, ch).data;
      for (let stride = 3; stride <= 9; stride++) {
        const out: number[] = [];
        for (let y = 0; y < ch; y += stride)
          for (let x = 0; x < cw; x += stride) {
            const o = (y * cw + x) * 4;
            if (img[o + 3] > 128) out.push(x, y, img[o], img[o + 1], img[o + 2]);
          }
        if (out.length / 5 <= cap || stride === 9) {
          const n = out.length / 5;
          const pts: number[] = [];
          for (let i = 0; i < n; i++) {
            pts.push(
              (out[i * 5] - cw / 2) * scale,
              -(out[i * 5 + 1] - ch / 2) * scale + cyWorld,
              out[i * 5 + 2] / 255,
              out[i * 5 + 3] / 255,
              out[i * 5 + 4] / 255,
              kind
            );
          }
          return pts;
        }
      }
      return [] as number[];
    };

    const buildTargets = (): ShardSet => {
      // --- GRAND OPENING (foil shards, dead-centre) ---
      const cw = 480, ch = 230;
      const c1 = document.createElement("canvas");
      c1.width = cw; c1.height = ch;
      const x1 = c1.getContext("2d")!;
      x1.fillStyle = "#fff";
      x1.textAlign = "center";
      x1.textBaseline = "middle";
      const fit = (text: string, y: number, max: number) => {
        let size = 120;
        x1.font = `900 ${size}px system-ui, sans-serif`;
        size = Math.floor((size * max) / Math.max(x1.measureText(text).width, 1));
        x1.font = `900 ${size}px system-ui, sans-serif`;
        x1.fillText(text, cw / 2, y);
      };
      fit("GRAND", 62, 440);
      fit("OPENING", 172, 440);
      const goScale = Math.min(W * 0.94, 660) / cw;
      const goHalf = (ch / 2) * goScale;
      const goPts = sampleCanvas(x1, cw, ch, 1100, goScale, 0, 0);

      // --- Wrapz N Fryz (logo shards in logo colors, above the headline) ---
      const lw = 480, lh = 120;
      const c2 = document.createElement("canvas");
      c2.width = lw; c2.height = lh;
      const x2 = c2.getContext("2d")!;
      x2.textBaseline = "middle";
      x2.textAlign = "left";
      const segs: Array<[string, string]> = [
        ["Wrapz ", "#f6efe4"],
        ["N", "#ff1e1e"],
        [" Fryz", "#f6efe4"],
      ];
      let size = 80;
      const fontFor = (s: number) => `700 ${s}px Georgia, 'Times New Roman', serif`;
      x2.font = fontFor(size);
      const total = segs.reduce((a, [t]) => a + x2.measureText(t).width, 0);
      size = Math.floor((size * 440) / Math.max(total, 1));
      x2.font = fontFor(size);
      let penX = lw / 2 - segs.reduce((a, [t]) => a + x2.measureText(t).width, 0) / 2;
      for (const [t, col] of segs) {
        x2.fillStyle = col;
        x2.fillText(t, penX, lh / 2);
        penX += x2.measureText(t).width;
      }
      const loScale = Math.min(W * 0.82, 560) / lw;
      const loHalf = (lh / 2) * loScale;
      const loCy = goHalf + 44 + loHalf; // sits above the headline, 44px gap
      const loPts = sampleCanvas(x2, lw, lh, 620, loScale, loCy, 1);

      const all = goPts.concat(loPts);
      const count = all.length / 6;
      const targets = new Float32Array(count * 2);
      const colors = new Float32Array(count * 3);
      const kinds = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        targets[i * 2] = all[i * 6];
        targets[i * 2 + 1] = all[i * 6 + 1];
        colors[i * 3] = all[i * 6 + 2];
        colors[i * 3 + 1] = all[i * 6 + 3];
        colors[i * 3 + 2] = all[i * 6 + 4];
        kinds[i] = all[i * 6 + 5];
      }
      return { targets, colors, kinds, count, loCy, loFont: size * loScale };
    };
    const { targets, colors, kinds, count: SH_N, loCy, loFont } = buildTargets();
    // hand the shard-logo's exact position/size to the crisp DOM lockup
    mount.style.setProperty("--go-lo-cy", `${loCy}px`);
    mount.style.setProperty("--go-lo-font", `${loFont}px`);
    const shPos = new Float32Array(SH_N * 3);
    const shVel = new Float32Array(SH_N * 2);
    const shSeed = new Float32Array(SH_N);
    const shLocked = new Uint8Array(SH_N);
    for (let i = 0; i < SH_N; i++) {
      // scattered start: ring around the viewport edge, unique per load
      const a = rand() * Math.PI * 2;
      const rr = Math.max(W, H) * (0.65 + rand() * 0.4);
      shPos[i * 3] = Math.cos(a) * rr;
      shPos[i * 3 + 1] = Math.sin(a) * rr;
      shPos[i * 3 + 2] = 2;
      shSeed[i] = rand();
    }
    const shardGeo = new THREE.BufferGeometry();
    const shPosAttr = new THREE.BufferAttribute(shPos, 3);
    shPosAttr.setUsage(THREE.DynamicDrawUsage);
    shardGeo.setAttribute("position", shPosAttr);
    shardGeo.setAttribute("aSeed", new THREE.BufferAttribute(shSeed, 1));
    shardGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    shardGeo.setAttribute("aKind", new THREE.BufferAttribute(kinds, 1));
    const shardUniforms = {
      uPR: { value: PR },
      uWarm: { value: warmRef.current },
      uTime: { value: 0 },
      uLogoFade: { value: 0 },
    };
    const shardMat = new THREE.ShaderMaterial({
      vertexShader: SHARD_VERT,
      fragmentShader: SHARD_FRAG,
      uniforms: shardUniforms,
      transparent: true,
      depthWrite: false,
    });
    const shards = new THREE.Points(shardGeo, shardMat);
    shards.frustumCulled = false;
    shards.visible = false;
    scene.add(shards);
    let shardsDone = false;
    let logoFadeStart = -1;

    /* ---------- interaction state ---------- */
    let tearStarted = false;
    let tearAt = 0; // clock seconds
    let clothAlive = true;
    let grabbed = -1;
    const pointer = { x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0, t: 0, down: false };
    const gravity = { x: 0, y: -1500 };
    let debrisSpawned = 0;

    const clock = new THREE.Clock();

    const toWorld = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left - rect.width / 2,
        y: -(e.clientY - rect.top - rect.height / 2),
        cx: e.clientX,
        cy: e.clientY,
      };
    };

    const startTear = () => {
      if (tearStarted) return;
      tearStarted = true;
      tearAt = clock.getElapsedTime();
      steamUniforms.uStart.value = tearAt;
      shards.visible = true;
      setTornRef.current.setTorn(true);
      tornRef.current?.();
      // release pins near the crack so the halves swing apart
      const topX = tearXAt(tearPath, 0);
      for (let c = 0; c < NX; c++) {
        if (Math.abs(c / CW - topX) < 0.16) pinned[idx(c, 0)] = 0;
      }
    };

    /* pointer — drag to nudge the foil, flick to tear */
    const onDown = (e: PointerEvent) => {
      if (!clothAlive || tearStarted) return;
      requestGyro();
      const p = toWorld(e);
      let best = -1, bd = 90 * 90;
      for (let i = 0; i < N; i++) {
        if (pinned[i]) continue;
        const dx = pos[i * 3] - p.x, dy = pos[i * 3 + 1] - p.y;
        const d = dx * dx + dy * dy;
        if (d < bd) { bd = d; best = i; }
      }
      grabbed = best;
      pointer.down = true;
      pointer.x = pointer.px = p.x;
      pointer.y = pointer.py = p.y;
      pointer.t = performance.now();
      if (grabbed >= 0) canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!pointer.down) return;
      const p = toWorld(e);
      const now = performance.now();
      const dt = Math.max(1, now - pointer.t) / 1000;
      pointer.vx = (p.x - pointer.x) / dt;
      pointer.vy = (p.y - pointer.y) / dt;
      pointer.px = pointer.x; pointer.py = pointer.y;
      pointer.x = p.x; pointer.y = p.y;
      pointer.t = now;
    };
    const onUp = () => {
      pointer.down = false;
      grabbed = -1;
      const speed = Math.hypot(pointer.vx, pointer.vy);
      if (speed > 550) startTear(); // flick release tears it open
    };
    const onCancel = () => {
      // browser claimed the gesture for scrolling → treat as unwrap intent
      pointer.down = false;
      grabbed = -1;
      startTear();
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onCancel);

    /* scroll intent tears the foil */
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 4) startTear(); };
    const onScroll = () => { if (window.scrollY > 24) startTear(); };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    /* gyroscope tilt → gravity vector (iOS needs a user-gesture permission) */
    let gyroOn = false;
    const onOrient = (e: DeviceOrientationEvent) => {
      const g = e.gamma ?? 0; // left/right
      const b = e.beta ?? 0;  // front/back
      gravity.x = Math.max(-1, Math.min(1, g / 40)) * 900;
      const flat = Math.max(0, 1 - Math.abs(b - 40) / 90);
      gravity.y = -1500 * (0.7 + 0.3 * (1 - flat));
    };
    const DOE = (window as unknown as {
      DeviceOrientationEvent?: { requestPermission?: () => Promise<string> };
    }).DeviceOrientationEvent;
    const requestGyro = () => {
      if (gyroOn || !DOE) return;
      gyroOn = true;
      if (typeof DOE.requestPermission === "function") {
        DOE.requestPermission()
          .then((s) => { if (s === "granted") window.addEventListener("deviceorientation", onOrient); })
          .catch(() => {});
      } else {
        window.addEventListener("deviceorientation", onOrient);
      }
    };
    // non-iOS: listen immediately so tilt works before any touch
    if (DOE && typeof DOE.requestPermission !== "function") {
      window.addEventListener("deviceorientation", onOrient);
      gyroOn = true;
    }

    /* visibility gates the loop */
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.02 }
    );
    io.observe(mount);

    /* ---------- sim + render loop ---------- */
    let raf = 0;
    let last = 0;
    const damp = 0.985;

    const step = (dt: number, t: number) => {
      if (!clothAlive) return;
      const gx = gravity.x * dt * dt;
      const gy = gravity.y * dt * dt;
      // subtle idle breath so it never looks frozen
      const breath = Math.sin(t * 0.8) * 220 * dt * dt;
      for (let i = 0; i < N; i++) {
        if (pinned[i]) continue;
        const i3 = i * 3;
        const x = pos[i3], y = pos[i3 + 1], z = pos[i3 + 2];
        pos[i3] += (x - prev[i3]) * damp + gx + breath;
        pos[i3 + 1] += (y - prev[i3 + 1]) * damp + gy;
        pos[i3 + 2] += (z - prev[i3 + 2]) * damp;
        prev[i3] = x; prev[i3 + 1] = y; prev[i3 + 2] = z;
      }
      // grabbed vertex follows the pointer hard
      if (grabbed >= 0 && pointer.down) {
        const g3 = grabbed * 3;
        pos[g3] += (pointer.x - pos[g3]) * 0.55;
        pos[g3 + 1] += (pointer.y - pos[g3 + 1]) * 0.55;
      }
      // progressive cut: crack runs top→bottom over ~0.9s
      if (tearStarted) {
        const prog = Math.min(1, (t - tearAt) / 0.9);
        for (const con of constraints) {
          if (con.cross && !con.cut && con.vMid <= prog) {
            con.cut = true;
            // shove the halves apart perpendicular to the crack
            const pa = paramOf(con.a);
            const side = Math.sign(pa.u - tearXAt(tearPath, pa.v)) || 1;
            const kick = side * (140 + Math.random() * 120) * dt;
            pos[con.a * 3] += kick;
            pos[con.b * 3] -= kick;
            // a few flecks fall out of the crack into the debris pile
            if (debrisSpawned < 36 && Math.random() < 0.34) {
              debrisSpawned += 2;
              const rect = canvas.getBoundingClientRect();
              const wx = (pos[con.a * 3] + pos[con.b * 3]) / 2;
              const wy = (pos[con.a * 3 + 1] + pos[con.b * 3 + 1]) / 2;
              debrisRef.current(rect.left + rect.width / 2 + wx, rect.top + rect.height / 2 - wy, 2, true);
            }
          }
        }
        for (const tri of tris) {
          if (tri.cross && tri.vMid <= prog && indices[tri.at] !== indices[tri.at + 1]) {
            indices[tri.at] = indices[tri.at + 1] = indices[tri.at + 2] = 0;
            idxAttr.needsUpdate = true;
          }
        }
        // fade + retire the foil
        const since = t - tearAt;
        if (since > 1.5) foilUniforms.uOpacity.value = Math.max(0, 1 - (since - 1.5) / 1.1);
        if (since > 2.7) {
          clothAlive = false;
          cloth.visible = false;
          setTornRef.current.setGone(true);
        }
      }
      // satisfy constraints
      for (let iter = 0; iter < 3; iter++) {
        for (const con of constraints) {
          if (con.cut) continue;
          const a3 = con.a * 3, b3 = con.b * 3;
          const dx = pos[b3] - pos[a3];
          const dy = pos[b3 + 1] - pos[a3 + 1];
          const dz = pos[b3 + 2] - pos[a3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
          const diff = ((dist - con.rest) / dist) * 0.5;
          const pa = pinned[con.a], pb = pinned[con.b];
          const wa = pa ? 0 : pb ? 1 : 0.5;
          const wb = pb ? 0 : pa ? 1 : 0.5;
          pos[a3] += dx * diff * wa; pos[a3 + 1] += dy * diff * wa; pos[a3 + 2] += dz * diff * wa;
          pos[b3] -= dx * diff * wb; pos[b3 + 1] -= dy * diff * wb; pos[b3 + 2] -= dz * diff * wb;
        }
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();
    };

    const stepShards = (dt: number, t: number) => {
      if (!tearStarted || shardsDone || SH_N === 0) return;
      const since = t - tearAt - 0.35;
      if (since < 0) return;
      let allLocked = true;
      for (let i = 0; i < SH_N; i++) {
        if (shLocked[i]) continue;
        const delay = shSeed[i] * 1.1;
        if (since < delay) { allLocked = false; continue; }
        const i3 = i * 3, i2 = i * 2;
        const tx = targets[i2], ty = targets[i2 + 1];
        const dx = tx - shPos[i3], dy = ty - shPos[i3 + 1];
        const dist = Math.hypot(dx, dy);
        // magnetic attraction: pull strengthens as it closes in, drag rises too
        const k = 18 + 60 / (1 + dist * 0.02);
        shVel[i2] += dx * k * dt;
        shVel[i2 + 1] += dy * k * dt;
        // early-flight turbulence for unique, physical-looking paths
        const wob = Math.min(1, dist / 160);
        shVel[i2] += Math.sin(t * 7 + shSeed[i] * 90) * 260 * wob * dt;
        shVel[i2 + 1] += Math.cos(t * 6.3 + shSeed[i] * 55) * 260 * wob * dt;
        const drag = dist < 40 ? 0.82 : 0.94;
        shVel[i2] *= drag;
        shVel[i2 + 1] *= drag;
        shPos[i3] += shVel[i2] * dt;
        shPos[i3 + 1] += shVel[i2 + 1] * dt;
        const speed = Math.hypot(shVel[i2], shVel[i2 + 1]);
        if (dist < 2 && speed < 30) {
          shPos[i3] = tx; shPos[i3 + 1] = ty;
          shLocked[i] = 1;
        } else {
          allLocked = false;
        }
      }
      shPosAttr.needsUpdate = true;
      if (allLocked) {
        shardsDone = true; // static from here on — free
        logoFadeStart = t;
        setTornRef.current.setAssembled(true); // crisp DOM logo takes over
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(1 / 30, Math.max(1 / 240, t - last));
      last = t;
      foilUniforms.uTime.value = t;
      steamUniforms.uTime.value = t;
      shardUniforms.uTime.value = t;
      foilUniforms.uWarm.value = warmRef.current;
      steamUniforms.uWarm.value = warmRef.current;
      shardUniforms.uWarm.value = warmRef.current;
      if (logoFadeStart >= 0) {
        shardUniforms.uLogoFade.value = Math.min(1, (t - logoFadeStart) / 0.7);
      }
      step(dt, t);
      stepShards(dt, t);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    /* resize */
    let rto = 0;
    const onResize = () => {
      window.clearTimeout(rto);
      rto = window.setTimeout(() => {
        W = mount.clientWidth;
        H = mount.clientHeight;
        renderer.setSize(W, H, false);
        camera.left = -W / 2; camera.right = W / 2;
        camera.top = H / 2; camera.bottom = -H / 2;
        camera.updateProjectionMatrix();
        if (!tearStarted) {
          clothW = Math.min(W * 0.94, 620);
          clothH = Math.min(H * 0.68, 560);
          initCloth();
          for (const con of constraints) {
            const dx = pos[con.a * 3] - pos[con.b * 3];
            const dy = pos[con.a * 3 + 1] - pos[con.b * 3 + 1];
            con.rest = Math.hypot(dx, dy);
          }
          syncTearWorld();
        }
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(rto);
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("resize", onResize);
      geo.dispose(); steamGeo.dispose(); shardGeo.dispose();
      foilMat.dispose(); steamMat.dispose(); shardMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={mountRef}
      className="go-hero relative flex w-full items-center justify-center overflow-hidden"
      aria-label="WrapzNfryz grand opening"
    >
      {/* content revealed behind the silk */}
      <div className="pointer-events-none absolute inset-0">
        <h1 className="sr-only">WrapzNfryz — Grand Opening</h1>

        {/* crisp original logo — takes over from the shards once they lock,
            positioned/sized to exactly match the shard-assembled lockup */}
        <div
          aria-hidden="true"
          className={`absolute left-1/2 whitespace-nowrap font-bold leading-none transition-opacity duration-700 ${
            assembled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: "calc(50% - var(--go-lo-cy, 240px))",
            transform: "translate(-50%, -50%)",
            fontSize: "var(--go-lo-font, 52px)",
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "var(--go-cream)",
          }}
        >
          Wrapz <span className="text-wrappy-red">N</span> Fryz
        </div>

        {/* the logo + GRAND OPENING both assemble from shards in the canvas;
            only the tagline lives in the DOM, below the shard text */}
        <p
          className={`absolute left-1/2 w-full max-w-xs -translate-x-1/2 text-center text-sm tracking-widest transition-opacity duration-1000 sm:text-base ${
            torn ? "opacity-90" : "opacity-0"
          }`}
          style={{
            top: "calc(50% + min(22.5vw, 158px) + 48px)",
            color: "var(--go-cream)",
            transitionDelay: "2.2s",
          }}
        >
          <span className="mb-2 block text-[10px] tracking-[0.5em] opacity-70">
            NOW SERVING
          </span>
          EVERY KITCHEN · ONE WRAPPER
          <span className="mt-2 block text-xs opacity-70">
            Multi-vendor ordering, unwrapped near you
          </span>
        </p>
      </div>

      {/* the sim — pan-y lets vertical swipes scroll (and tear); drags nudge foil */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${gone ? "pointer-events-none" : ""}`}
        style={{ touchAction: "pan-y" }}
        aria-hidden="true"
      />

      {/* unwrap hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[11px] tracking-[0.3em] transition-opacity duration-500 ${
          torn ? "opacity-0" : "opacity-60"
        }`}
        style={{ color: "var(--go-cream)" }}
        aria-hidden="true"
      >
        NUDGE THE SILK · SCROLL TO UNVEIL
        <div className="mx-auto mt-2 h-6 w-px animate-pulse" style={{ background: "var(--go-cream)" }} />
      </div>
    </section>
  );
}
