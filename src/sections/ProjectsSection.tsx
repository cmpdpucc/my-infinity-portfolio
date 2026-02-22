"use client";

import React from "react";
import PixelCard from "@/components/PixelCard";
import { motion } from "framer-motion";

/**
 * ProjectsSection — sezione fullscreen con Bento Grid auto-generato.
 * Tutti i progetti usano PixelCard con Canvas ripple effect.
 */

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  size: "large" | "normal";
}

// MOCK DATA — sostituibile con /api/projects
const PROJECTS: Project[] = [
  {
    id: "omni-ide",
    title: "Omni IDE",
    description: "A futuristic development environment with integrated sub-agents visualizing live architecture constraints.",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop",
    tags: ["Electron", "VS Code API", "AI Agents"],
    size: "large",
  },
  {
    id: "orbita",
    title: "Orbita Trip Planner",
    description: "Bespoke travel platform using Flowise parsing nodes and Next.js App Router for real-time booking.",
    image: "https://images.unsplash.com/photo-1629815413123-f3c5ad8043ac?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Flowise", "Supabase"],
    size: "normal",
  },
  {
    id: "scss-ds",
    title: "SCSS Design System",
    description: "A zero-dependency BEM SCSS framework with full dark mode, token system, and responsive utilities.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    tags: ["SCSS", "BEM", "CSS Variables"],
    size: "normal",
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
            <PixelCard
              image={project.image}
              title={project.title}
              description={project.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

