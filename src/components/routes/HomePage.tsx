"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Zap,
  Globe,
  Layers,
  Terminal,
  Cpu,
  Rocket,
  Mail,
} from "lucide-react";
import FloatingLines from "@/components/FloatingLines";
import MagicBento from "@/components/MagicBento";

/** Framer-motion stagger container */
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

/** Fade-up animation for individual items */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Bento skill data — drives the grid dynamically */
const SKILLS = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description:
      "React, Next.js, TypeScript — pixel-perfect interfaces with clean, maintainable architecture.",
    tags: ["React", "Next.js", "TypeScript"],
    span: "wide",
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    description:
      "Design systems, micro-interactions, and intuitive user flows that feel alive.",
    tags: ["Figma", "Framer Motion", "SCSS"],
    span: "normal",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Core Web Vitals optimization, lazy loading, and GPU-accelerated animations.",
    tags: ["Lighthouse", "WAAPI", "Code Splitting"],
    span: "normal",
  },
  {
    icon: Globe,
    title: "WebGL & 3D",
    description:
      "Custom shaders, Three.js scenes, and immersive visual experiences for the web.",
    tags: ["Three.js", "GLSL", "WebGL"],
    span: "normal",
  },
  {
    icon: Layers,
    title: "Full-Stack",
    description:
      "End-to-end product development — APIs, databases, and cloud infrastructure.",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    span: "normal",
  },
  {
    icon: Terminal,
    title: "DevOps & CI/CD",
    description:
      "Automated pipelines, Docker containers, and zero-downtime deployments.",
    tags: ["Docker", "GitHub Actions", "Vercel"],
    span: "wide",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    description:
      "Agent-driven workflows, LLM integration, and intelligent tooling for dev teams.",
    tags: ["LLM", "MCP", "Python"],
    span: "normal",
  },
  {
    icon: Rocket,
    title: "Product Thinking",
    description:
      "From idea to launch — user research, rapid prototyping, and iterative delivery.",
    tags: ["Agile", "MVP", "Analytics"],
    span: "normal",
  },
] as const;

/**
 * HomePage — Full-screen landing page with FloatingLines background.
 *
 * Section 1: Hero (100vh) — FloatingLines BG + overlay with CTAs
 * Section 2: Bento Skill Showcase — scroll-reveal grid cards
 */
export default function HomePage() {
  return (
    <div className="pf-home">
      {/* ─── HERO ─── */}
      <section className="pf-home__hero">
        {/* FloatingLines background (z-0) */}
        <div className="pf-home__bg">
          <FloatingLines
            linesGradient={[
              "#1e3a5f",
              "#2563eb",
              "#3b82f6",
              "#60a5fa",
              "#93c5fd",
            ]}
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={[4, 6, 3]}
            lineDistance={[8, 5, 6]}
            animationSpeed={0.8}
            interactive
            parallax
            parallaxStrength={0.15}
          />
        </div>

        {/* Content overlay (z-10) */}
        <motion.div
          className="pf-home__overlay"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Status pill */}
          <motion.div className="pf-home__pill" variants={fadeUp}>
            <span className="pf-home__pill-dot" />
            Available for new projects
          </motion.div>

          {/* Hero title */}
          <motion.h1 className="pf-home__title" variants={fadeUp}>
            Crafting Digital
            <br />
            <span className="pf-home__title-accent">Experiences</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="pf-home__subtitle" variants={fadeUp}>
            Full-stack developer & designer building beautiful, performant
            products at the intersection of code and creativity.
          </motion.p>

          {/* CTA group */}
          <motion.div className="pf-home__cta-group" variants={fadeUp}>
            <Link to="/projects" className="pf-home__cta pf-home__cta--primary">
              <Rocket size={18} />
              View Projects
            </Link>
            <a
              href="mailto:hello@danyp.dev"
              className="pf-home__cta pf-home__cta--secondary"
            >
              <Mail size={18} />
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="pf-home__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span className="pf-home__scroll-line" />
        </motion.div>
      </section>

      {/* ─── BENTO SKILL SHOWCASE ─── */}
      <section className="pf-home__bento-section">
        <motion.div
          className="pf-home__bento-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="pf-home__bento-title">What I Do</h2>
          <p className="pf-home__bento-subtitle">
            A blend of engineering precision and design sensibility.
          </p>
        </motion.div>

        <MagicBento items={SKILLS} />
      </section>
    </div>
  );
}
