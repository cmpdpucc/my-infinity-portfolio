"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PixelCanvasRipple from "./PixelCanvasRipple";

interface PixelCardProps {
  image: string;
  title: string;
  description: string;
}

/**
 * PixelCard — Project showcase card with Canvas ripple idle animation.
 *
 * Idle: Canvas ripple animates pixel grid (epicenter effect)
 * Hover: Ripple fades out, description appears
 */
export default function PixelCard({ image, title, description }: PixelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // Sync ref with state for the canvas to read without causing re-effects
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  return (
    <div
      className="pf-card"
      style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9", padding: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        unoptimized
        style={{
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: isHovered ? "rgba(15, 23, 42, 0.4)" : "rgba(15, 23, 42, 0.8)",
          transition: "background-color 300ms ease",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "var(--space-lg)", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
        <h3 style={{ color: "var(--color-text)", fontSize: "1.5rem", fontWeight: 700 }}>{title}</h3>

        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{ color: "var(--color-text-muted)", marginTop: "var(--space-sm)" }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Canvas Ripple — replaces the old CSS radial-gradient pixel overlay */}
      <div style={{ opacity: isHovered ? 0 : 1, transition: "opacity 700ms ease-in-out" }}>
        <PixelCanvasRipple isHoveredRef={isHoveredRef} />
      </div>
    </div>
  );
}
