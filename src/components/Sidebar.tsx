"use client";

import React from "react";
import Magnet from "@/components/Magnet";
import DecryptedText from "@/components/DecryptedText";
import ClickSpark from "@/components/ClickSpark";
import { motion } from "framer-motion";
import { Github, Linkedin, Code } from "lucide-react";
import type { SectionConfig } from "@/data/sections.data";

interface SidebarProps {
  sections: SectionConfig[];
  activeSectionId: string;
}

export default function Sidebar({ sections, activeSectionId }: SidebarProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="pf-sidebar">
      {/* Identity */}
      <div className="pf-sidebar__identity">
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
          <button className="pf-button pf-button--primary">Download Resume</button>
        </motion.div>

        {/* Dynamic Nav — generated from sections list */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pf-page__nav"
          aria-label="Portfolio sections"
        >
          <ul className="pf-page__nav-list">
            {sections.map(({ id, navLabel }) => (
              <li key={id}>
                <button
                  className={`pf-page__nav-link ${activeSectionId === id ? "pf-page__nav-link--active" : ""}`}
                  onClick={() => scrollToSection(id)}
                  aria-current={activeSectionId === id ? "true" : undefined}
                >
                  <span className="pf-page__nav-indicator" />
                  <span className="pf-page__nav-text">{navLabel}</span>
                </button>
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
  );
}
