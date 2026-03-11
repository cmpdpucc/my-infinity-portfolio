"use client";

import React from "react";
import BlurSlider from "@/components/BlurSlider";
import type { BlurSliderItem } from "@/components/BlurSlider/types";
import ProjectCard from "@/components/ProjectCard";

/**
 * ProjectsSection — fullscreen horizontal BlurSlider.
 *
 * Architecture:
 * - BlurSlider is fully agnostic: it receives `items` and a `renderItem` render prop.
 * - ProjectsSection maps PROJECTS → BlurSliderItem shape.
 * - ProjectCard is injected via renderItem, keeping BlurSlider decoupled from any specific UI.
 * - Vertical scroll is locked inside the section and released at the slider edges
 *   by Swiper's `mousewheel.releaseOnEdges` option.
 */

// Extended project type — adds the fields ProjectCard needs.
// Satisfies BlurSliderItem (id + imageUrl) plus card-specific data.
interface Project extends BlurSliderItem {
  title: string;
  description: string;
  tags: string[];
  /** CSS gradient string used as fallback when imageUrl fails to load */
  gradient: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
// Each project has a unique gradient fallback to ensure the section
// always looks complete even when remote images are unavailable.
const PROJECTS: Project[] = [
  {
    id: "omni-ide",
    title: "Omni IDE",
    description:
      "A futuristic development environment with integrated sub-agents visualizing live architecture constraints.",
    imageUrl:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop",
    iconUrl: "https://picsum.photos/64/64",
    projectUrl: "https://www.google.com",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    tags: ["Electron", "VS Code API", "AI Agents"],
  },
  {
    id: "orbita",
    title: "Orbita Trip Planner",
    description:
      "Bespoke travel platform using AI parsing nodes and Next.js App Router for real-time booking.",
    imageUrl:
      "https://images.unsplash.com/photo-1629815413123-f3c5ad8043ac?q=80&w=1000&auto=format&fit=crop",
    iconUrl: "https://picsum.photos/64/64",
    projectUrl: "https://www.google.com",
    gradient: "linear-gradient(135deg, #0a192f 0%, #112240 50%, #1d3557 100%)",
    tags: ["Next.js", "OpenRouter", "Supabase"],
  },
  {
    id: "scss-ds",
    title: "SCSS Design System",
    description:
      "A zero-dependency BEM SCSS framework with full dark mode, token system, and responsive utilities.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    iconUrl: "https://picsum.photos/64/64",
    projectUrl: "https://www.google.com",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #0a0e24 50%, #2d1b69 100%)",
    tags: ["SCSS", "BEM", "CSS Variables"],
  },
  {
    id: "ai-gateway",
    title: "AI Gateway",
    description:
      "Custom multi-agent orchestration layer built on OpenRouter and Zod for structured AI output.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1000&auto=format&fit=crop",
    iconUrl: "https://picsum.photos/64/64",
    projectUrl: "https://www.google.com",
    gradient: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1f2937 100%)",
    tags: ["TypeScript", "OpenRouter", "Zod"],
  },
  {
    id: "project-devs",
    title: "Project Devs",
    description:
      "The monorepo platform behind this portfolio — multi-agent workflow tooling and agent memory system.",
    imageUrl:
      "https://images.unsplash.com/photo-1642790551116-18a150d248d5?q=80&w=1000&auto=format&fit=crop",
    iconUrl: "https://picsum.photos/64/64",
    projectUrl: "https://www.google.com",
    gradient: "linear-gradient(135deg, #0c1821 0%, #1b2838 50%, #324a5f 100%)",
    tags: ["Monorepo", "Agents", "Turborepo"],
  },
];

/**
 * Render prop: receives a Project and returns the ProjectCard.
 * BlurSlider calls this for each slide's foreground content.
 */
function renderProjectCard(project: Project) {
  return (
    <ProjectCard
      title={project.title}
      description={project.description}
      imageUrl={project.imageUrl}
      gradient={project.gradient}
      tags={project.tags}
    />
  );
}

export default function ProjectsSection() {
  return (
    <section className="pf-scroll-section" id="projects-section">
      <BlurSlider<Project>
        items={PROJECTS}
        renderItem={renderProjectCard}
      />
    </section>
  );
}

