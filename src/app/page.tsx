import React from "react";
import Spotlight from "@/components/Spotlight";
import DecryptedText from "@/components/DecryptedText";
import Magnet from "@/components/Magnet";
import InfiniteScroll from "@/components/InfiniteScroll";
import PixelCard from "@/components/PixelCard";

export default function Home() {
  return (
    <div className="pf-page">
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
            
            {/* Nav */}
            <nav className="pf-page__nav" aria-label="In-page jump links">
              <ul className="pf-page__nav-list">
                <li>
                  <a className="pf-page__nav-link" href="#about">
                    <span className="pf-page__nav-indicator"></span>
                    <span className="pf-page__nav-text">About</span>
                  </a>
                </li>
                <li>
                  <a className="pf-page__nav-link" href="#experience">
                    <span className="pf-page__nav-indicator"></span>
                    <span className="pf-page__nav-text">Experience</span>
                  </a>
                </li>
                <li>
                  <a className="pf-page__nav-link" href="#projects">
                    <span className="pf-page__nav-indicator"></span>
                    <span className="pf-page__nav-text">Projects</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Social Links */}
          <ul className="pf-page__social" aria-label="Social media">
            <li><Magnet>Github</Magnet></li>
            <li><Magnet>LinkedIn</Magnet></li>
            <li><Magnet>CodePen</Magnet></li>
          </ul>
        </header>

        {/* RIGHT COLUMN - Scrolling Content */}
        <main className="pf-layout__content">
          <section id="about" className="pf-section">
            <h2 className="pf-section__title">About</h2>
            <div style={{ color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              <p style={{ marginBottom: "var(--space-md)" }}>
                As a developer who bridges the gap between design and engineering, I specialize in building products that are beautiful, accessible, and performant. My journey started with a fascination for interactive UI, drawing inspiration from top-tier portfolios and implementing complex animations that surprise and delight users.
              </p>
              <p>
                When I'm not pushing pixels or wrangling React components, I'm usually exploring the latest WebGL techniques or contributing to the developer community.
              </p>
            </div>
          </section>

          <section id="experience" className="pf-section">
            <h2 className="pf-section__title">Experience</h2>
            <div className="pf-card">
              <header style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "var(--color-border)", marginBottom: "var(--space-xs)" }}>2024 — Present</header>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "var(--color-text)" }}>
                  Senior Frontend Engineer · Kimi Inc
                </h3>
                <p style={{ marginTop: "var(--space-sm)", fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                  Built the core architecture for the new visual coding platform. Integrated AI subagents and crafted a resilient UI using BEM SCSS.
                </p>
                <div style={{ marginTop: "var(--space-md)" }}>
                  <InfiniteScroll items={["React", "Next.js", "SCSS", "Framer Motion", "TypeScript", "Tailwind"]} />
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="pf-section">
            <h2 className="pf-section__title">Projects</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
               <PixelCard 
                  image="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop" 
                  title="Omni IDE"
                  description="A futuristic development environment with integrated sub-agents visualizing live architecture constraints."
               />
               <PixelCard 
                  image="https://images.unsplash.com/photo-1629815413123-f3c5ad8043ac?q=80&w=1000&auto=format&fit=crop" 
                  title="Orbita Trip Planner"
                  description="Bespoke travel platform using Flowise parsing nodes and Next.js App Router for real-time booking."
               />
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}
