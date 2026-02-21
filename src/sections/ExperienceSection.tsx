"use client";

import React from "react";
import ExpandableCard from "@/components/ExpandableCard";
import SpotlightCard from "@/components/SpotlightCard";
import ScrollVelocity from "@/components/ScrollVelocity";
import { motion } from "framer-motion";

/**
 * ExperienceSection — sezione fullscreen con ExpandableCard (P0)
 * e SpotlightCard per le experience più vecchie.
 */
export default function ExperienceSection() {
  return (
    <div className="pf-section-content pf-section-content--scrollable">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pf-section__title"
      >
        Experience
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <ExpandableCard
          title="Senior Frontend Engineer · Kimi Inc"
          subtitle="2024 — Present"
          tags={["React", "Next.js", "SCSS", "Framer Motion", "TypeScript", "WebGL"]}
          details={
            <>
              <p style={{ marginBottom: "1rem" }}>
                At Kimi Inc, I lead the core UI architecture for a next-generation visual
                coding platform. My role involves crossing the boundary between design and
                deep front-end engineering.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                I architected the scalable BEM SCSS framework that removed Tailwind
                dependency, increasing render speed and providing a proprietary,
                highly-customizable design system.
              </p>
              <p>
                I integrated continuous QA cycles utilizing AI subagents to establish
                a &ldquo;Zero-Day Build&rdquo; methodology, ensuring every push is
                pixel-perfect and accessible.
              </p>
            </>
          }
        >
          <ScrollVelocity
            texts={["React · Next.js · SCSS · Framer Motion · TypeScript · WebGL · Three.js"]}
            velocity={50}
            className="pf-scroll-velocity__tag"
          />
        </ExpandableCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ marginTop: "var(--space-lg)" }}
      >
        <SpotlightCard>
          <header style={{
            fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "var(--color-text-muted)",
            marginBottom: "var(--space-sm)"
          }}>
            2022 — 2024
          </header>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text)" }}>
            UI/UX Engineer · Uderly
          </h3>
          <p style={{
            marginTop: "var(--space-sm)", fontSize: "0.875rem",
            color: "var(--color-text-muted)", lineHeight: 1.7
          }}>
            Built a multi-locale e-commerce frontend covering cart, checkout and wishlist
            flows. Established the SCSS/BEM design system still used in production.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "var(--space-md)" }}>
            {["React", "SCSS", "i18n", "Supabase", "MUI"].map(tag => (
              <span key={tag} style={{
                fontSize: "0.7rem", background: "rgba(59,130,246,0.1)",
                color: "var(--color-cta)", padding: "0.2rem 0.6rem",
                borderRadius: "4px", fontWeight: 600
              }}>
                {tag}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
