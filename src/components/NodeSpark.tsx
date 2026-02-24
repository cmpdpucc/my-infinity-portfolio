"use client";

import React, { useRef, useEffect } from "react";

/**
 * NodeSpark
 *
 * Fires radial spark-lines from just outside the node border
 * when `triggered` flips from false → true (runs once only).
 *
 * Key design decisions:
 * - Single rAF loop, started on trigger, stopped when all sparks expire
 * - 80ms startup delay so React finishes painting before we read canvas size
 * - Hardcoded fallback color; accepts any valid CSS color string
 * - Overflow visible on parent required (set via inline style on node wrapper)
 */

interface NodeSparkProps {
  triggered: boolean;
  nodeSize?: number;
  color?: string;
  count?: number;
  duration?: number;
}

export default function NodeSpark({
  triggered,
  nodeSize = 28,
  color = "#2563eb",
  count = 12,
  duration = 700,
}: NodeSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const firedRef = useRef(false);

  // Canvas is larger than node to accommodate outward sparks
  const pad = Math.ceil(nodeSize * 1.2); // extra space each side
  const size = nodeSize + pad * 2;
  const cx = size / 2;
  const cy = size / 2;
  const startR = nodeSize / 2 + 3; // orbit: 3px beyond node border

  useEffect(() => {
    if (!triggered || firedRef.current) return;
    firedRef.current = true;

    // Delay = node-dot CSS transition: 500ms delay + 700ms duration + 150ms pause
    const timeoutId = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const startTime = performance.now();

      // Pre-compute angles for all sparks
      const angles = Array.from(
        { length: count },
        (_, i) => (2 * Math.PI * i) / count
      );

      const draw = (now: number) => {
        const elapsed = now - startTime;

        // Ease-out cubic: t starts fast, ends slow
        const raw = Math.min(elapsed / duration, 1);
        const t = 1 - Math.pow(1 - raw, 3);

        ctx.clearRect(0, 0, size, size);

        if (raw < 1) {
          const dist = startR + t * (nodeSize * 0.9);        // travel outward
          const lineLen = (nodeSize * 0.4) * (1 - t);       // shrink line as it goes
          const alpha = Math.max(0, 1 - t * 1.3);            // fade

          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.globalAlpha = alpha;

          for (const angle of angles) {
            const x1 = cx + dist * Math.cos(angle);
            const y1 = cy + dist * Math.sin(angle);
            const x2 = cx + (dist + lineLen) * Math.cos(angle);
            const y2 = cy + (dist + lineLen) * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }

          ctx.restore();
          rafRef.current = requestAnimationFrame(draw);
        }
        // else: animation complete, canvas stays cleared
      };

      rafRef.current = requestAnimationFrame(draw);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, color, count, duration, nodeSize, size, cx, cy, startR]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-${size / 2}px, -${size / 2}px)`,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "visible",
      }}
      aria-hidden
    />
  );
}
