"use client";

import { useEffect, useRef } from "react";
import { subscribe } from "./bus";

// The portrait is sampled into a grid of particles. Left of the divider they render as
// colour tiles (frontend), right of it as monospace glyphs (backend). Pushing a particle
// across the divider changes what it renders as.
const W = 430;
const H = 537;
const STEP = 5;
const MID = W / 2;
const RAMP = ".,:;-~=+*<>(){}[]/?%&$#@";
const TERM = Array.from({ length: RAMP.length }, (_, i) => `rgba(190,203,222,${(0.3 + (0.7 * i) / (RAMP.length - 1)).toFixed(2)})`);

type Props = { src: string; alt: string };

export function ParticlePortrait({ src, alt }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const leftCount = useRef<HTMLSpanElement>(null);
  const rightCount = useRef<HTMLSpanElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cv = canvasRef.current;
    const tip = tipRef.current;
    const ctx = cv?.getContext("2d");
    if (!stage || !cv || !tip || !ctx) return;

    const events = new AbortController();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0;
    let observer: IntersectionObserver | undefined;

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (events.signal.aborted) return;
      document.fonts.ready.then(() => {
        if (!events.signal.aborted) start(sample(img));
      });
    };

    type Particles = ReturnType<typeof sample>;

    function sample(image: HTMLImageElement) {
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.drawImage(image, 0, 0, W, H);
      const px = o.getImageData(0, 0, W, H).data;

      // Percentile-based auto contrast, so any photo gives a full range of glyphs
      const lums: number[] = [];
      for (let i = 0; i < px.length; i += 16) if ((px[i + 3] ?? 0) > 110) lums.push(0.299 * px[i]! + 0.587 * px[i + 1]! + 0.114 * px[i + 2]!);
      lums.sort((a, b) => a - b);
      const lo = lums[Math.floor(lums.length * 0.02)] ?? 0;
      const hi = lums[Math.floor(lums.length * 0.98)] ?? 255;

      const pts: { x: number; y: number; color: string; lum: number }[] = [];
      for (let y = 0; y <= H - STEP; y += STEP) {
        for (let x = 0; x <= W - STEP; x += STEP) {
          const cx = x + 2;
          const cy = y + 2;
          const k = (cy * W + cx) * 4;
          if ((px[k + 3] ?? 0) < 110) continue;
          const r = px[k]!, g = px[k + 1]!, b = px[k + 2]!;
          const grey = 0.299 * r + 0.587 * g + 0.114 * b;
          // true colour, slightly more vivid
          const vivid = [r, g, b].map((c) => Math.max(0, Math.min(255, (grey + (c - grey) * 1.3 - 128) * 1.08 + 128)));
          pts.push({
            x: cx,
            y: cy,
            color: `rgb(${vivid.map(Math.round).join(",")})`,
            lum: Math.max(0, Math.min(1, (grey - lo) / Math.max(1, hi - lo))),
          });
        }
      }

      const n = pts.length;
      const p = {
        n,
        hx: new Float32Array(n), hy: new Float32Array(n),
        x: new Float32Array(n), y: new Float32Array(n),
        vx: new Float32Array(n), vy: new Float32Array(n),
        kk: new Float32Array(n), delay: new Float32Array(n), seed: new Float32Array(n),
        lum: new Float32Array(n), hot: new Float32Array(n),
        g0: new Uint8Array(n), g: new Uint8Array(n),
        color: pts.map((q) => q.color),
      };
      pts.forEach((q, i) => {
        p.hx[i] = q.x;
        p.hy[i] = q.y;
        p.lum[i] = q.lum;
        p.g0[i] = p.g[i] = Math.floor(q.lum * (RAMP.length - 1));
        p.seed[i] = Math.random() * Math.PI * 2;
        p.delay[i] = Math.hypot(q.x - MID, q.y - H * 0.42) / 320 + Math.random() * 0.25;
        if (reduce) {
          p.x[i] = q.x;
          p.y[i] = q.y;
        } else {
          const a = Math.random() * Math.PI * 2;
          const r = 260 + Math.random() * 360;
          p.x[i] = MID + Math.cos(a) * r;
          p.y[i] = H * 0.45 + Math.sin(a) * r;
        }
      });
      return p;
    }

    function start(p: Particles) {
      const { n, hx, hy, x, y, vx, vy, kk, delay, seed, lum, hot, g0, g, color } = p;
      const glyphFont = getComputedStyle(cv!).getPropertyValue("--glyph-font").trim() || "monospace";
      let k = 1;
      let dpr = 1;
      const bg = document.createElement("canvas");
      const bctx = bg.getContext("2d")!;

      // Same shape as the CSS arches underneath (border-radius 90% / 35%), so the two never disagree.
      function archPath(c: CanvasRenderingContext2D, left: boolean) {
        const top = H * 0.08, rx = MID * 0.9, ry = (H - top) * 0.352;
        c.beginPath();
        if (left) {
          c.moveTo(MID, top); c.lineTo(rx, top); c.ellipse(rx, top + ry, rx, ry, 0, -Math.PI / 2, Math.PI, true); c.lineTo(0, H); c.lineTo(MID, H);
        } else {
          c.moveTo(MID, top); c.lineTo(W - rx, top); c.ellipse(W - rx, top + ry, rx, ry, 0, -Math.PI / 2, 0, false); c.lineTo(W, H); c.lineTo(MID, H);
        }
        c.closePath();
      }

      function resize() {
        dpr = Math.min(2, window.devicePixelRatio || 1);
        k = stage!.clientWidth / W;
        cv!.width = bg.width = Math.round(stage!.clientWidth * dpr);
        cv!.height = bg.height = Math.round(stage!.clientHeight * dpr);
        // Pre-render the two backdrops: a dotted design canvas and a terminal
        bctx.setTransform(dpr * k, 0, 0, dpr * k, 0, 0);
        bctx.save();
        archPath(bctx, true);
        bctx.fillStyle = "#F7F7FA";
        bctx.fill();
        bctx.clip();
        bctx.fillStyle = "rgba(99,102,241,.22)";
        for (let gy = H * 0.08 + 6; gy < H; gy += 10) for (let gx = 5; gx < MID; gx += 10) bctx.fillRect(gx - 0.6, gy - 0.6, 1.2, 1.2);
        bctx.restore();
        archPath(bctx, false);
        bctx.fillStyle = "#0E1117";
        bctx.fill();
      }
      resize();
      addEventListener("resize", resize, { signal: events.signal });
      stage!.dataset.ready = "true";

      // Pointer, click shockwave, and a ghost cursor that demos the interaction
      const R = 44;
      let mx = -1e4, my = -1e4, touched = false, lastMove = performance.now();
      let ghost: { start: number } | null = null;
      const waves: { x: number; y: number; t: number }[] = [];

      stage!.addEventListener("pointermove", (e) => {
        const r = cv!.getBoundingClientRect();
        mx = (e.clientX - r.left) / k;
        my = (e.clientY - r.top) / k;
        touched = true;
        lastMove = performance.now();
        ghost = null;
        if (finePointer) inspect(e.clientX - r.left, e.clientY - r.top);
      }, { signal: events.signal });
      stage!.addEventListener("pointerleave", () => { mx = my = -1e4; tip!.style.opacity = "0"; }, { signal: events.signal });
      stage!.addEventListener("click", (e) => {
        if (reduce) return;
        const r = cv!.getBoundingClientRect();
        const cx = (e.clientX - r.left) / k, cy = (e.clientY - r.top) / k;
        waves.push({ x: cx, y: cy, t: 0 });
        for (let i = 0; i < n; i++) {
          const dx = x[i]! - cx, dy = y[i]! - cy, d = Math.hypot(dx, dy) || 1;
          const f = Math.max(0, 1 - d / 260) * 26 + Math.random() * 3;
          vx[i]! += (dx / d) * f;
          vy[i]! += (dy / d) * f;
          kk[i] = 0.02 + Math.random() * 0.02;
        }
      }, { signal: events.signal });

      // A request from the hero's request card pushes tiles across the API line (they turn into
      // glyphs); the response pushes glyphs back the other way.
      events.signal.addEventListener("abort", subscribe((e) => {
        const dir = e.type === "request" ? 1 : -1;
        pillRef.current?.animate(
          [{ backgroundColor: dir > 0 ? "#FF5A3C" : "#2E9E6E", scale: 1.3 }, { backgroundColor: "#111318", scale: 1 }],
          { duration: 800, easing: "ease-out" },
        );
        if (reduce) return;
        const REACH = 64, cyMid = H * 0.46;
        for (let i = 0; i < n; i++) {
          const off = (MID - hx[i]!) * dir;
          if (off < 0 || off > REACH) continue;
          const fy = 1 - Math.abs(hy[i]! - cyMid) / 170;
          if (fy <= 0) continue;
          vx[i]! += dir * (1 - off / REACH) * fy * (11 + Math.random() * 3);
          vy[i]! += (Math.random() - 0.5) * 2;
          kk[i] = 0.018 + Math.random() * 0.012;
          hot[i] = 0.9;
        }
      }));

      function inspect(px: number, py: number) {
        let best = -1, bd = Infinity;
        const qx = px / k, qy = py / k;
        for (let i = 0; i < n; i++) {
          const d = (x[i]! - qx) ** 2 + (y[i]! - qy) ** 2;
          if (d < bd) { bd = d; best = i; }
        }
        if (best < 0 || bd > 400) { tip!.style.opacity = "0"; return; }
        const left = x[best]! < MID;
        tip!.dataset.side = left ? "l" : "r";
        tip!.textContent = left
          ? `<Pixel /> ${color[best]} · x ${Math.round(hx[best]!)} y ${Math.round(hy[best]!)}`
          : `glyph '${RAMP[g[best]!]}' · row ${Math.round(hy[best]! / STEP)} col ${Math.round(hx[best]! / STEP)}`;
        tip!.style.setProperty("--swatch", left ? color[best]! : "transparent");
        tip!.style.transform = `translate(${px + 14}px, ${py + 14}px)`;
        tip!.style.opacity = "1";
      }

      function ghostPos(u: number): [number, number] {
        const a = 1 - u;
        return [
          a ** 3 * 70 + 3 * a * a * u * 150 + 3 * a * u * u * 290 + u ** 3 * 360,
          a ** 3 * 360 + 3 * a * a * u * 150 + 3 * a * u * u * 330 + u ** 3 * 150,
        ];
      }

      let visible = true;
      observer = new IntersectionObserver((es) => { visible = !!es[0]?.isIntersecting; });
      observer.observe(stage!);

      let introEnd = 0;
      for (let i = 0; i < n; i++) introEnd = Math.max(introEnd, delay[i]!);
      introEnd += 0.6;

      const t0 = performance.now();
      let lastT = t0, frame = 0, scanY = -1;

      function tick(now: number) {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = (now - t0) / 1000;
        frame++;

        if (!reduce && !ghost && now - lastMove > (touched ? 7000 : 3000) && t > 2.6) ghost = { start: now };
        let gx = -1e4, gy = -1e4;
        if (ghost) {
          const u = (now - ghost.start) / 2200;
          if (u >= 1) { ghost = null; lastMove = now; } else [gx, gy] = ghostPos(u);
        }
        const cx = mx > -1e3 ? mx : gx, cy = mx > -1e3 ? my : gy;

        if (!reduce && t > 3 && Math.floor(t / 4.5) !== Math.floor((t - (now - lastT) / 1000) / 4.5)) scanY = H * 0.06;
        if (scanY >= 0 && (scanY += 4.2) > H * 0.9) scanY = -1;
        lastT = now;

        if (!reduce) {
          for (let i = 0; i < n; i++) {
            if (t < delay[i]!) continue;
            if (kk[i]! < 0.04) kk[i] = Math.max(kk[i]!, 0.03 + (seed[i]! % 1) * 0.02);
            vx[i]! += (hx[i]! - x[i]!) * kk[i]!;
            vy[i]! += (hy[i]! - y[i]!) * kk[i]!;
            const dx = x[i]! - cx, dy = y[i]! - cy, d2 = dx * dx + dy * dy;
            if (d2 < R * R) {
              const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 4.2;
              vx[i]! += (dx / d) * f;
              vy[i]! += (dy / d) * f;
              hot[i] = 1;
            }
            vx[i]! *= 0.84;
            vy[i]! *= 0.84;
            x[i]! += vx[i]!;
            y[i]! += vy[i]!;
            if (kk[i]! < 0.075) kk[i]! += 0.0005;
            if (hot[i]! > 0) hot[i]! -= 0.03;
            if (scanY >= 0 && x[i]! > MID && Math.abs(y[i]! - scanY) < 5) {
              hot[i] = 0.9;
              g[i] = Math.floor(Math.random() * RAMP.length);
            } else if (hot[i]! <= 0 && g[i] !== g0[i] && Math.random() < 0.05) g[i] = g0[i]!;
          }
          if (frame % 6 === 0) {
            for (let m = 0; m < 26; m++) {
              const q = Math.floor(Math.random() * n);
              if (x[q]! > MID && hot[q]! <= 0) g[q] = Math.max(0, Math.min(RAMP.length - 1, g0[q]! + (Math.random() < 0.5 ? -1 : 1)));
            }
          }
        }

        ctx!.setTransform(1, 0, 0, 1, 0, 0);
        ctx!.clearRect(0, 0, cv!.width, cv!.height);
        ctx!.drawImage(bg, 0, 0);
        ctx!.setTransform(dpr * k, 0, 0, dpr * k, 0, 0);

        const breathe = reduce ? 0 : 0.35;
        let cL = 0, cR = 0;
        ctx!.font = `500 ${STEP * 1.45}px ${glyphFont}`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        const intro = !reduce && t < introEnd;
        for (let j = 0; j < n; j++) {
          if (intro) {
            const al = (t - delay[j]!) / 0.5;
            if (al <= 0) continue;
            ctx!.globalAlpha = al < 1 ? al : 1;
          }
          const bx = x[j]! + Math.sin(t * 1.3 + seed[j]!) * breathe;
          const by = y[j]! + Math.cos(t * 1.1 + seed[j]!) * breathe;
          if (bx < MID) {
            cL++;
            const s = STEP * (0.8 + 0.36 * (1 - lum[j]!)) * (1 + Math.max(0, hot[j]!) * 0.5);
            ctx!.fillStyle = color[j]!;
            ctx!.beginPath();
            ctx!.roundRect(bx - s / 2, by - s / 2, s, s, s * 0.3);
            ctx!.fill();
          } else {
            cR++;
            const ch = RAMP[g[j]!]!;
            ctx!.fillStyle = hot[j]! > 0.05
              ? `rgba(126,224,181,${(0.45 + hot[j]! * 0.55).toFixed(2)})`
              : ch === "{" || ch === "}" ? "#7EE0B5" : TERM[g[j]!]!;
            ctx!.fillText(ch, bx, by);
          }
        }

        ctx!.globalAlpha = 1;

        if (scanY >= 0) {
          const gr = ctx!.createLinearGradient(MID, 0, W, 0);
          gr.addColorStop(0, "rgba(126,224,181,0)");
          gr.addColorStop(0.5, "rgba(126,224,181,.55)");
          gr.addColorStop(1, "rgba(126,224,181,0)");
          ctx!.fillStyle = gr;
          ctx!.fillRect(MID, scanY - 0.6, MID, 1.2);
        }

        for (let w = waves.length - 1; w >= 0; w--) {
          const wv = waves[w]!;
          wv.t += 0.03;
          if (wv.t >= 1) { waves.splice(w, 1); continue; }
          ctx!.beginPath();
          ctx!.arc(wv.x, wv.y, 20 + wv.t * 240, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(17,19,24,${(0.45 * (1 - wv.t)).toFixed(2)})`;
          ctx!.lineWidth = 1.2 / k;
          ctx!.stroke();
        }

        if (cx > -1e3) {
          const accent = cx < MID ? "rgba(255,90,60,.6)" : "rgba(126,224,181,.7)";
          ctx!.beginPath();
          ctx!.arc(cx, cy, R, 0, Math.PI * 2);
          ctx!.strokeStyle = accent;
          ctx!.setLineDash([3, 4]);
          ctx!.lineWidth = 1.2 / k;
          ctx!.stroke();
          ctx!.setLineDash([]);
          ctx!.beginPath();
          ctx!.arc(cx, cy, 2.2, 0, Math.PI * 2);
          ctx!.fillStyle = cx < MID ? "#FF5A3C" : "#7EE0B5";
          ctx!.fill();
          if (ghost) {
            ctx!.font = `500 7px ${glyphFont}`;
            ctx!.textAlign = "left";
            ctx!.fillText("try me", cx + R * 0.75, cy - R * 0.75);
          }
        }

        if (frame % 10 === 1) {
          if (leftCount.current) leftCount.current.textContent = cL.toLocaleString("en-IN");
          if (rightCount.current) rightCount.current.textContent = cR.toLocaleString("en-IN");
        }
      }
      raf = requestAnimationFrame(tick);
    }

    return () => {
      events.abort();
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [src]);

  return (
    <div
      ref={stageRef}
      className="group relative aspect-[430/537] w-[min(86vw,440px)] touch-pan-y select-none lg:cursor-none xl:w-[clamp(300px,34vw,540px)]"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_74%,transparent_99%)]">
        {/* The two arches exist in CSS from the first paint; the canvas paints the same shapes over them once the photo is in. */}
        <span aria-hidden className="absolute bottom-0 left-0 top-[8%] w-1/2 rounded-tl-[90%_35%] bg-[#F7F7FA] bg-[radial-gradient(rgba(99,102,241,.22)_0.6px,transparent_0.7px)] bg-[size:10px_10px]" />
        <span aria-hidden className="absolute bottom-0 right-0 top-[8%] w-1/2 rounded-tr-[90%_35%] bg-term" />
        <canvas ref={canvasRef} role="img" aria-label={alt} className="absolute inset-0 block size-full [--glyph-font:var(--font-jetbrains)]" />
      </div>
      <span className="absolute right-[calc(50%+10px)] top-[3%] whitespace-nowrap rounded-md bg-white opacity-0 transition-opacity duration-500 group-data-ready:opacity-100 px-2 py-1.5 font-mono text-[10.5px] font-medium leading-none text-coral shadow-[0_8px_20px_-12px_rgba(0,0,0,.3)]">
        components · <span ref={leftCount} className="inline-block min-w-[3.4ch] text-right tabular-nums">0</span>
      </span>
      <span className="absolute left-[calc(50%+10px)] top-[3%] whitespace-nowrap rounded-md bg-term-2 opacity-0 transition-opacity duration-500 group-data-ready:opacity-100 px-2 py-1.5 font-mono text-[10.5px] font-medium leading-none text-[#8C97A8]">
        glyphs · <span ref={rightCount} className="inline-block min-w-[3.4ch] text-right tabular-nums">0</span> <b className="font-normal text-mint">$</b>
      </span>
      <span aria-hidden className="pointer-events-none absolute bottom-[8%] left-1/2 top-0 w-[1.5px] -translate-x-1/2 bg-ink">
        <span ref={pillRef} className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink px-1.5 py-1 font-mono text-[9px] font-medium uppercase leading-none tracking-[0.08em] text-white">
          api
        </span>
      </span>
      <span
        ref={tipRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden whitespace-nowrap rounded-md px-2 py-1.5 font-mono text-[10.5px] font-medium leading-none opacity-0 transition-opacity duration-150 before:mr-1.5 before:inline-block before:size-2.5 before:rounded-sm before:bg-[var(--swatch)] before:align-[-1px] data-[side=l]:bg-white data-[side=l]:text-ink data-[side=l]:shadow-[0_8px_20px_-10px_rgba(0,0,0,.35)] data-[side=r]:bg-term-2 data-[side=r]:text-mint data-[side=r]:before:hidden lg:block"
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
      </noscript>
    </div>
  );
}
