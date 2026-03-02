"use client";

import React from "react";
import { motion } from "framer-motion";
import { smoothScrollTo, easings } from "@/utils/smoothScroll";
import type { SectionConfig } from "@/data/sections.data";

/**
 * SectionNav — Desktop sidebar navigation links.
 *
 * Renders a vertical list of section links with animated indicators.
 * Hidden on mobile (< 64em) — MobileNav handles navigation there.
 */

interface SectionNavProps {
  sections: SectionConfig[];
  activeSectionId: string;
}

export default function SectionNav({ sections, activeSectionId }: SectionNavProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const container = document.getElementById("scroll-container");
    if (el && container) {
      smoothScrollTo({
        container,
        targetY: el.offsetTop,
        duration: 950,
        easing: easings.easeInOutQuart,
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="pf-section-nav"
      aria-label="Portfolio sections"
    >
      <ul className="pf-section-nav__list">
        {sections.map(({ id, navLabel }) => (
          <li key={id}>
            <button
              className={`pf-section-nav__link ${activeSectionId === id ? "pf-section-nav__link--active" : ""}`}
              onClick={() => scrollToSection(id)}
              aria-current={activeSectionId === id ? "true" : undefined}
            >
              <span className="pf-section-nav__indicator" />
              <span className="pf-section-nav__text">{navLabel}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
