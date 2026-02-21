/**
 * sections.data.ts
 *
 * Single source of truth for portfolio sections.
 * Currently hardcoded (mock), but structured to be
 * replaced with an API/DB response in the future.
 *
 * Future shape: fetch("/api/sections") → SectionConfig[]
 */

import React from "react";

export type SectionId = "about" | "experience" | "projects" | string;

export interface SectionConfig {
  id: SectionId;
  /** Label shown in the sidebar nav */
  navLabel: string;
  /** Component to render as the section content */
  component: React.ComponentType;
}

/**
 * MOCK DATA — replace with API call when ready.
 *
 * Usage:
 *   import { SECTIONS } from "@/data/sections.data";
 *   // or in the future:
 *   const sections = await fetch("/api/sections").then(r => r.json());
 */

// Lazy imports keep the bundle split per section
import AboutSection from "@/sections/AboutSection";
import ExperienceSection from "@/sections/ExperienceSection";
import ProjectsSection from "@/sections/ProjectsSection";

export const SECTIONS: SectionConfig[] = [
  {
    id: "about",
    navLabel: "About",
    component: AboutSection,
  },
  {
    id: "experience",
    navLabel: "Experience",
    component: ExperienceSection,
  },
  {
    id: "projects",
    navLabel: "Projects",
    component: ProjectsSection,
  },
];
