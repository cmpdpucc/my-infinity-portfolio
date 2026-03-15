"use client";

import React from "react";
import ScrollVelocity from "@/components/ScrollVelocity";
import { motion } from "framer-motion";

/**
 * AboutSection — prima sezione fullscreen del portfolio.
 * Contiene: bio, tech stack strip (ScrollVelocity), scroll indicator.
 */
export default function AboutSection() {
  return (
    <div className="pf-section-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="pf-section__title"
        style={{ width: '100%', marginBottom: '1rem' }}
      >
        About
      </motion.h2>

      <motion.div
        style={{ color: "var(--color-text-muted)", lineHeight: 1.8 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <p style={{ marginBottom: "var(--space-md)" }}>
          As a developer who bridges the gap between design and engineering, I specialize
          in building products that are beautiful, accessible, and performant. My journey
          started with a fascination for interactive UI, drawing inspiration from top-tier
          portfolios and implementing complex animations that surprise and delight users.
        </p>
        <p>
          When I&apos;m not pushing pixels or wrangling React components, I&apos;m usually
          exploring the latest WebGL techniques or contributing to the developer community.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: "var(--space-2xl)" }}
      >
        <ScrollVelocity
          texts={["React · Next.js · TypeScript · WebGL · SCSS · Framer Motion · Three.js"]}
          velocity={60}
          className="pf-scroll-velocity__tag"
        />
      </motion.div>

    </div>
  );
}
