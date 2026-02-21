"use client";

import React from "react";
import Spotlight from "@/components/Spotlight";
import SpotlightCard from "@/components/SpotlightCard";
import DecryptedText from "@/components/DecryptedText";
import Magnet from "@/components/Magnet";
import ScrollVelocity from "@/components/ScrollVelocity";
import PixelCard from "@/components/PixelCard";
import ExpandableCard from "@/components/ExpandableCard";
import ClickSpark from "@/components/ClickSpark";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Github, Linkedin, Code, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const activeSection = useScrollSpy(["#about", "#experience", "#projects"], 100);

  return (
    <ClickSpark sparkColor="#3b82f6" sparkCount={10} sparkRadius={20}>
      <div className="pf-page">
        <Spotlight />

        <div className="pf-layout">

          {/* LEFT COLUMN - Fixed Sidebar */}
          <header className="pf-layout__sidebar">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="pf-page__title"
              >
                <a href="/">Developer Name</a>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="pf-page__subtitle"
              >
                <DecryptedText text="Senior Software Engineer & Product Designer" speed={60} />
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pf-page__description"
              >
                I build pixel-perfect, engaging, and accessible digital experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ marginTop: "var(--space-md)" }}
              >
                <button className="pf-button pf-button--primary">
                  <span style={{ marginRight: "var(--space-sm)" }}>Download Resume</span>
                </button>
              </motion.div>

              {/* Nav */}
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pf-page__nav"
                aria-label="In-page jump links"
              >
                <ul className="pf-page__nav-list">
                  {[
                    { id: "about", label: "About" },
                    { id: "experience", label: "Experience" },
                    { id: "projects", label: "Projects" }
                  ].map(({ id, label }) => (
                    <li key={id}>
                      <a
                        className={`pf-page__nav-link ${activeSection === id ? "pf-page__nav-link--active" : ""}`}
                        href={`#${id}`}
                      >
                        <span className="pf-page__nav-indicator"></span>
                        <span className="pf-page__nav-text">{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </div>

            {/* Social Links */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pf-page__social"
              aria-label="Social media"
            >
              <li><Magnet><a href="#" aria-label="Github"><Github size={20} /></a></Magnet></li>
              <li><Magnet><a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a></Magnet></li>
              <li><Magnet><a href="#" aria-label="CodePen"><Code size={20} /></a></Magnet></li>
            </motion.ul>
          </header>

          {/* RIGHT COLUMN - Scrolling Content */}
          <main className="pf-layout__content">

            {/* ABOUT */}
            <section id="about" className="pf-section">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pf-section__title"
              >
                About
              </motion.h2>
              <motion.div
                style={{ color: "var(--color-text-muted)", lineHeight: 1.8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p style={{ marginBottom: "var(--space-md)" }}>
                  As a developer who bridges the gap between design and engineering, I specialize in building products that are beautiful, accessible, and performant. My journey started with a fascination for interactive UI, drawing inspiration from top-tier portfolios and implementing complex animations that surprise and delight users.
                </p>
                <p>
                  When I&apos;m not pushing pixels or wrangling React components, I&apos;m usually exploring the latest WebGL techniques or contributing to the developer community.
                </p>
              </motion.div>

              {/* Scroll velocity tech strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: "var(--space-2xl)" }}
              >
                <ScrollVelocity
                  texts={["React · Next.js · TypeScript · WebGL · SCSS · Framer Motion · Three.js"]}
                  velocity={60}
                  className="pf-scroll-velocity__tag"
                />
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "var(--space-2xl)",
                  color: "var(--color-text-muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase"
                }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowDown size={14} />
                </motion.div>
                Scroll to explore
              </motion.div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="pf-section">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="pf-section__title"
              >
                Experience
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
              >
                <ExpandableCard
                  title="Senior Frontend Engineer · Kimi Inc"
                  subtitle="2024 — Present"
                  tags={["React", "Next.js", "SCSS", "Framer Motion", "TypeScript", "WebGL"]}
                  details={
                    <>
                      <p style={{ marginBottom: "1rem" }}>
                        At Kimi Inc, I lead the core UI architecture for a next-generation visual coding platform. My role involves crossing the boundary between design and deep front-end engineering.
                      </p>
                      <p style={{ marginBottom: "1rem" }}>
                        I architected the scalable BEM SCSS framework that removed Tailwind dependency, increasing render speed and providing a proprietary, highly-customizable design system.
                      </p>
                      <p>
                        Furthermore, I integrated continuous QA cycles utilizing AI subagents to establish a &ldquo;Zero-Day Build&rdquo; methodology, ensuring every push is pixel-perfect and accessible.
                      </p>
                    </>
                  }
                >
                  <div style={{ marginTop: "var(--space-md)" }}>
                    <ScrollVelocity
                      texts={["React · Next.js · SCSS · Framer Motion · TypeScript · WebGL · Three.js"]}
                      velocity={50}
                      className="pf-scroll-velocity__tag"
                    />
                  </div>
                </ExpandableCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2 }}
                style={{ marginTop: "var(--space-lg)" }}
              >
                <SpotlightCard>
                  <header style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", marginBottom: "var(--space-sm)" }}>
                    2022 — 2024
                  </header>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text)" }}>
                    UI/UX Engineer · Uderly
                  </h3>
                  <p style={{ marginTop: "var(--space-sm)", fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
                    Built a multi-locale e-commerce frontend covering cart, checkout and wishlist flows. Established the SCSS/BEM design system still used in production.
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "var(--space-md)" }}>
                    {["React", "SCSS", "i18n", "Supabase", "MUI"].map(tag => (
                      <span key={tag} style={{ fontSize: "0.7rem", background: "rgba(59,130,246,0.1)", color: "var(--color-cta)", padding: "0.2rem 0.6rem", borderRadius: "4px", fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            </section>

            {/* PROJECTS — Bento Grid */}
            <section id="projects" className="pf-section">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="pf-section__title"
              >
                Projects
              </motion.h2>

              <div className="pf-bento-grid">
                <motion.div
                  className="pf-bento-grid__item pf-bento-grid__item--large"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1 }}
                >
                  <PixelCard
                    image="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop"
                    title="Omni IDE"
                    description="A futuristic development environment with integrated sub-agents visualizing live architecture constraints."
                  />
                </motion.div>

                <motion.div
                  className="pf-bento-grid__item pf-bento-grid__item--normal"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 }}
                >
                  <PixelCard
                    image="https://images.unsplash.com/photo-1629815413123-f3c5ad8043ac?q=80&w=1000&auto=format&fit=crop"
                    title="Orbita Trip Planner"
                    description="Bespoke travel platform using Flowise parsing nodes and Next.js App Router for real-time booking."
                  />
                </motion.div>

                <motion.div
                  className="pf-bento-grid__item pf-bento-grid__item--normal"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3 }}
                >
                  <SpotlightCard style={{ height: "100%", minHeight: "220px" } as React.CSSProperties}>
                    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>Open Source</p>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text)" }}>SCSS Design System</h3>
                        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                          A zero-dependency BEM SCSS framework with full dark mode, token system, and responsive utilities.
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        {["SCSS", "BEM", "CSS Variables"].map(t => (
                          <span key={t} style={{ fontSize: "0.7rem", background: "rgba(59,130,246,0.1)", color: "var(--color-cta)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </ClickSpark>
  );
}
