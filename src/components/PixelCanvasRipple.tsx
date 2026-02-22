"use client";

import React, { useEffect, useRef } from "react";

/**
 * PixelCanvasRipple — Canvas 2D ripple animation for PixelCard idle state.
 *
 * Architecture:
 * - Offscreen canvas caching: static pixel grid drawn once
 * - 6 Path2D wave bands for batched draw calls (6 fills per frame)
 * - IntersectionObserver: skip rAF when off-screen
 * - ResizeObserver: safe canvas resize without distortion
 * - DPR scaling for Retina displays
 * - prefers-reduced-motion: shows static grid, no animation
 * - Cooldown between ripples for visual breathing room
 *
 * Performance budget: < 4ms per frame, 0 reflows in loop.
 */

interface PixelCanvasRippleProps {
  /** Ref-based hover state to avoid useEffect re-creation */
  isHoveredRef: React.RefObject<boolean>;
}

// ─── CONFIGURATION ──────────────────────────────────────────────
const GAP = 12;           // Distance between pixel centers (px)
const PIXEL_SIZE = 2;     // Size of each "pixel" dot (px)
const SPEED = 1.5;        // Ripple expansion speed (px/frame)
const COOLDOWN_MS = 2000; // Pause between ripples (ms)

// Wave band opacity definitions — from leading edge to trailing fade
const WAVE_BAND_FILLS = [
  "rgba(255, 255, 255, 0.12)",  // 0: Fade-in (leading edge)
  "rgba(255, 255, 255, 0.85)",  // 1: Peak brightness
  "rgba(255, 255, 255, 0.45)",  // 2: Decay start
  "rgba(148, 163, 184, 0.25)",  // 3: Mid-tail (slate tint)
  "rgba(148, 163, 184, 0.12)",  // 4: Far tail
  "rgba(148, 163, 184, 0.04)",  // 5: Final dissolve
];

// Band distance thresholds relative to wave front (diff = dist - radius)
const BAND_RANGES: [number, number][] = [
  [15, 35],     // Band 0
  [-10, 15],    // Band 1
  [-30, -10],   // Band 2
  [-60, -30],   // Band 3
  [-110, -60],  // Band 4
  [-180, -110], // Band 5
];
// ────────────────────────────────────────────────────────────────

export default function PixelCanvasRipple({ isHoveredRef }: PixelCanvasRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // ── Reduced motion check ──
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = motionQuery.matches;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true, // GPU latency hint
    });
    if (!ctx) return;

    // Offscreen canvas for static grid pre-rendering
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    // ── Cached dimensions (FIX L1: no getBoundingClientRect in loop) ──
    let cWidth = 0;
    let cHeight = 0;
    let cx = 0;
    let cy = 0;
    let maxRadius = 0;

    // ── Wave state ──
    let waveRadius = 0;
    let isCoolingDown = false;
    let cooldownTimer: ReturnType<typeof setTimeout> | null = null;

    // ── Visibility (IntersectionObserver) ──
    let isVisible = false;

    // ── Animation handle ──
    let rafId: number | null = null;

    /**
     * Setup canvas dimensions and pre-render the static pixel grid.
     * Called once on mount and on every resize.
     */
    const setupCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      cWidth = rect.width;
      cHeight = rect.height;
      cx = cWidth / 2;
      cy = cHeight / 2;
      maxRadius = Math.hypot(cWidth, cHeight);

      // Physical vs logical dimensions
      canvas.width = cWidth * dpr;
      canvas.height = cHeight * dpr;
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Pre-render static grid (single draw call)
      offCtx.clearRect(0, 0, cWidth, cHeight);
      offCtx.fillStyle = "rgba(255, 255, 255, 0.06)";
      offCtx.beginPath();
      for (let x = 0; x < cWidth; x += GAP) {
        for (let y = 0; y < cHeight; y += GAP) {
          offCtx.rect(x, y, PIXEL_SIZE, PIXEL_SIZE);
        }
      }
      offCtx.fill();
    };

    /**
     * Main render loop. Runs at display refresh rate via rAF.
     * Skips work when: off-screen, hovered, cooling down, or reduced-motion.
     */
    const render = () => {
      // Skip conditions
      if (!isVisible || isHoveredRef.current || isCoolingDown || prefersReducedMotion) {
        rafId = requestAnimationFrame(render);
        return;
      }

      // 1. Blit static grid from offscreen cache
      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.drawImage(offCanvas, 0, 0, cWidth, cHeight);

      // 2. Build Path2D batches for each wave band
      const paths: Path2D[] = BAND_RANGES.map(() => new Path2D());

      for (let x = 0; x < cWidth; x += GAP) {
        for (let y = 0; y < cHeight; y += GAP) {
          const dist = Math.hypot(x - cx, y - cy);
          const diff = dist - waveRadius;

          for (let b = 0; b < BAND_RANGES.length; b++) {
            if (diff >= BAND_RANGES[b][0] && diff < BAND_RANGES[b][1]) {
              paths[b].rect(x, y, PIXEL_SIZE, PIXEL_SIZE);
              break; // pixel belongs to at most one band
            }
          }
        }
      }

      // 3. Fill each band (6 draw calls total)
      for (let b = 0; b < paths.length; b++) {
        ctx.fillStyle = WAVE_BAND_FILLS[b];
        ctx.fill(paths[b]);
      }

      // 4. Advance wave
      waveRadius += SPEED;

      // 5. Check if wave + trailing tail has fully exited
      if (waveRadius > maxRadius + 200) {
        waveRadius = 0;
        isCoolingDown = true;

        // Cooldown: pause before next ripple for visual breathing
        cooldownTimer = setTimeout(() => {
          isCoolingDown = false;
        }, COOLDOWN_MS);
      }

      rafId = requestAnimationFrame(render);
    };

    // ── Observers ──
    const resizeObserver = new ResizeObserver(() => setupCanvas());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // ── Start ──
    setupCanvas();

    // If reduced motion, just draw static grid once and stop
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.drawImage(offCanvas, 0, 0, cWidth, cHeight);
    } else {
      rafId = requestAnimationFrame(render);
    }

    // ── Cleanup ──
    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (cooldownTimer !== null) clearTimeout(cooldownTimer);
    };
  }, []); // Empty deps: never re-created. Hover communicated via ref.

  return (
    <div
      ref={containerRef}
      className="pf-pixel-ripple"
    >
      <canvas ref={canvasRef} className="pf-pixel-ripple__canvas" />
    </div>
  );
}
