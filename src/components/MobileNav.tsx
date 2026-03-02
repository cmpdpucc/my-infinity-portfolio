"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Layers } from "lucide-react";
import { smoothScrollTo, easings } from "@/utils/smoothScroll";
import type { SectionConfig } from "@/data/sections.data";

interface MobileNavProps {
  sections: SectionConfig[];
  activeSectionId: string;
}

// Map section IDs to specific Lucide icons
const iconMap: Record<string, React.ReactNode> = {
  about: <User size={20} />,
  experience: <Briefcase size={20} />,
  projects: <Layers size={20} />,
};

export default function MobileNav({ sections, activeSectionId }: MobileNavProps) {
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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      className="pf-mobile-nav"
      aria-label="Mobile navigation"
    >
      <ul className="pf-mobile-nav__list">
        {sections.map(({ id, navLabel }) => {
          const isActive = activeSectionId === id;
          return (
            <li key={id} className="pf-mobile-nav__item">
              <button
                className={`pf-mobile-nav__button ${isActive ? "pf-mobile-nav__button--active" : ""}`}
                onClick={() => scrollToSection(id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={navLabel}
              >
                {/* Visual indicator dot for active state */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active-indicator"
                    className="pf-mobile-nav__active-bg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className="pf-mobile-nav__icon">
                  {iconMap[id.toLowerCase()] || <Layers size={20} />}
                </span>
                <span className="pf-mobile-nav__label">{navLabel}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
