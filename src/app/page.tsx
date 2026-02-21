"use client";

import React from "react";
import Spotlight from "@/components/Spotlight";
import AuroraBackground from "@/components/AuroraBackground";
import BottomDock from "@/components/BottomDock";
import DecryptedText from "@/components/DecryptedText";
import Magnet from "@/components/Magnet";
import InfiniteScroll from "@/components/InfiniteScroll";
import PixelCard from "@/components/PixelCard";
import ExpandableCard from "@/components/ExpandableCard";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Github, Linkedin, Code } from "lucide-react";
import { motion } from "framer-motion";

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function Home() {
  const activeSection = useScrollSpy(["#about", "#experience", "#projects"], 100);

  return (
    <div className="pf-page">
      <AuroraBackground />
      <Spotlight />
      
      <div className="pf-layout">
        
        {/* LEFT COLUMN - Fixed Header */}
        <header className="pf-layout__sidebar">
          <div>
            <h1 className="pf-page__title">
              <a href="/">Developer Name</a>
            </h1>
            <h2 className="pf-page__subtitle">
              <DecryptedText text="Senior Software Engineer & Product Designer" speed={60} />
            </h2>
            <p className="pf-page__description">
              I build pixel-perfect, engaging, and accessible digital experiences.
            </p>
            
            <div style={{ marginTop: "var(--space-md)" }}>
                 <button className="pf-button pf-button--primary">
                     <span style={{ marginRight: "var(--space-sm)" }}>Download Resume</span>
                 </button>
            </div>

            {/* Note: nav moved to BottomDock */}
          </div>
          
          {/* Social Links */}
          <ul className="pf-page__social" aria-label="Social media">
            <li><Magnet><a href="#" aria-label="Github"><Github size={24} /></a></Magnet></li>
            <li><Magnet><a href="#" aria-label="LinkedIn"><Linkedin size={24} /></a></Magnet></li>
            <li><Magnet><a href="#" aria-label="CodePen"><Code size={24} /></a></Magnet></li>
          </ul>
        </header>

        {/* RIGHT COLUMN - Scrolling Content */}
        <main className="pf-layout__content">
          <section id="about" className="pf-section">
            <motion.h2 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
               className="pf-section__title"
            >
                About
            </motion.h2>
            <motion.div 
              style={{ color: "var(--color-text-muted)", lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              <p style={{ marginBottom: "var(--space-md)" }}>
                As a developer who bridges the gap between design and engineering, I specialize in building products that are beautiful, accessible, and performant. My journey started with a fascination for interactive UI, drawing inspiration from top-tier portfolios and implementing complex animations that surprise and delight users.
              </p>
              <p>
                When I'm not pushing pixels or wrangling React components, I'm usually exploring the latest WebGL techniques or contributing to the developer community.
              </p>
            </motion.div>
          </section>

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
                        Furthermore, I integrated continuous QA cycles utilizing AI subagents to establish a "Zero-Day Build" methodology, ensuring every push is pixel-perfect and accessible.
                    </p>
                  </>
                }
              >
                <div style={{ marginTop: "var(--space-md)" }}>
                  <InfiniteScroll items={["React", "Next.js", "SCSS", "Framer Motion", "TypeScript", "WebGL", "Three.js"]} />
                </div>
              </ExpandableCard>
            </motion.div>
          </section>

          <section id="projects" className="pf-section">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="pf-section__title"
            >
              Projects
            </motion.h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
               <motion.div
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
            </div>
          </section>
        </main>

      </div>

      {/* BOTTOM DOCK — replaces old nav, smooth scroll */}
      <BottomDock items={NAV_SECTIONS} activeId={activeSection} />
    </div>
  );
}
