"use client";

import React from "react";
import PixelCard from "@/components/PixelCard";
import SpotlightCard from "@/components/SpotlightCard";
import { motion } from "framer-motion";

/**
 * ProjectsSection — sezione fullscreen con Bento Grid auto-generato.
 * I progetti sono in un array locale (future-ready per API).
 */

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  variant: "pixel" | "spotlight";
  size: "large" | "normal";
  category?: string;
}

// MOCK DATA — sostituibile con /api/projects
const PROJECTS: Project[] = [
  {
    id: "omni-ide",
    title: "Omni IDE",
    description: "A futuristic development environment with integrated sub-agents visualizing live architecture constraints.",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop",
    tags: ["Electron", "VS Code API", "AI Agents"],
    variant: "pixel",
    size: "large",
  },
  {
    id: "orbita",
    title: "Orbita Trip Planner",
    description: "Bespoke travel platform using Flowise parsing nodes and Next.js App Router for real-time booking.",
    image: "https://images.unsplash.com/photo-1629815413123-f3c5ad8043ac?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Flowise", "Supabase"],
    variant: "pixel",
    size: "normal",
  },
  {
    id: "scss-ds",
    title: "SCSS Design System",
    description: "A zero-dependency BEM SCSS framework with full dark mode, token system, and responsive utilities.",
    tags: ["SCSS", "BEM", "CSS Variables"],
    variant: "spotlight",
    size: "normal",
    category: "Open Source",
  },
];

export default function ProjectsSection() {
  return (
    <div className="pf-section-content pf-section-content--scrollable">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pf-section__title"
      >
        Projects
      </motion.h2>

      <div className="pf-bento-grid">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            className={`pf-bento-grid__item pf-bento-grid__item--${project.size}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {project.variant === "pixel" && project.image ? (
              <PixelCard
                image={project.image}
                title={project.title}
                description={project.description}
              />
            ) : (
              <SpotlightCard style={{ height: "100%", minHeight: "220px" } as React.CSSProperties}>
                <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    {project.category && (
                      <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                        {project.category}
                      </p>
                    )}
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text)" }}>
                      {project.title}
                    </h3>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                      {project.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                    {project.tags.map(t => (
                      <span key={t} style={{ fontSize: "0.7rem", background: "rgba(59,130,246,0.1)", color: "var(--color-cta)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
