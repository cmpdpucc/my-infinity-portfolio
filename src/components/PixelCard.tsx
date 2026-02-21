"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

export default function PixelCard({ image, title, description }: { image: string, title: string, description: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="pf-card"
      style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9", padding: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Immagine di fondo */}
      <Image 
        src={image}
        alt={title}
        fill
        unoptimized
        style={{
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.6,
          zIndex: 0
        }}
      />
      
      {/* Overlay Scuro */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: isHovered ? "rgba(15, 23, 42, 0.4)" : "rgba(15, 23, 42, 0.8)",
          transition: "background-color 300ms ease",
          zIndex: 1
        }}
      />

      {/* Contenuto Reale */}
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

      {/* Simulazione Pixel Effect: grid of divs in react bits style using css gradient */}
      <AnimatePresence>
        {!isHovered && (
             <motion.div
               initial={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               style={{
                 position: "absolute",
                 inset: 0,
                 zIndex: 3,
                 backgroundImage: "radial-gradient(var(--color-background) 20%, transparent 20%)",
                 backgroundSize: "10px 10px",
                 backdropFilter: "blur(4px)"
               }}
             />
        )}
      </AnimatePresence>
    </div>
  );
}
