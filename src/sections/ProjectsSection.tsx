"use client";

import React from "react";
import BlurSlider from "@/components/BlurSlider";
import type { BlurSliderItem } from "@/components/BlurSlider/types";
import PixelCard from "@/components/PixelCard";

/**
 * ProjectsSection — fullscreen horizontal BlurSlider.
 *
 * Architecture:
 * - BlurSlider is fully agnostic: it receives `items` and a `renderItem` render prop.
 * - ProjectsSection maps PROJECTS → BlurSliderItem shape.
 * - PixelCard is injected via renderItem, keeping BlurSlider decoupled from any specific UI.
 * - Vertical scroll is locked inside the section and released at the slider edges
 *   by Swiper's `mousewheel.releaseOnEdges` option.
 */

// Extended project type — adds the fields PixelCard needs.
// Satisfies BlurSliderItem (id + imageUrl) plus card-specific data.
interface Project extends BlurSliderItem {
  title: string;
  description: string;
  tags: string[];
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
// `imageUrl` is consumed by BlurSlider for the thumbnail + background glow.
// `image` is the same URL forwarded to PixelCard for its own rendering.
const PROJECTS: Project[] = [
  {
    id: "omni-ide",
    title: "Omni IDE",
    description:
      "A futuristic development environment with integrated sub-agents visualizing live architecture constraints.",
    imageUrl:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop",
    tags: ["Electron", "VS Code API", "AI Agents"],
  },
  {
    id: "orbita",
    title: "Orbita Trip Planner",
    description:
      "Bespoke travel platform using Flowise parsing nodes and Next.js App Router for real-time booking.",
    imageUrl:
      "https://images.unsplash.com/photo-1629815413123-f3c5ad8043ac?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Flowise", "Supabase"],
  },
  {
    id: "scss-ds",
    title: "SCSS Design System",
    description:
      "A zero-dependency BEM SCSS framework with full dark mode, token system, and responsive utilities.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    tags: ["SCSS", "BEM", "CSS Variables"],
  },
  {
    id: "ai-gateway",
    title: "AI Gateway",
    description:
      "Custom multi-agent orchestration layer built on OpenRouter and Zod for structured AI output.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1000&auto=format&fit=crop",
    tags: ["TypeScript", "OpenRouter", "Zod"],
  },
  {
    id: "project-devs",
    title: "Project Devs",
    description:
      "The monorepo platform behind this portfolio — multi-agent workflow tooling and agent memory system.",
    imageUrl:
      "https://images.unsplash.com/photo-1642790551116-18a150d248d5?q=80&w=1000&auto=format&fit=crop",
    tags: ["Monorepo", "Agents", "Turborepo"],
  },
];

/**
 * Render prop: receives a Project and returns the PixelCard.
 * BlurSlider calls this for each slide's foreground content.
 */
function renderProjectCard(project: Project) {
  return (
    <PixelCard
      image={project.imageUrl}
      title={project.title}
      description={project.description}
    />
  );
}

export default function ProjectsSection() {
  return (
    <BlurSlider<Project>
      items={PROJECTS}
      renderItem={renderProjectCard}
    />
  );
}
