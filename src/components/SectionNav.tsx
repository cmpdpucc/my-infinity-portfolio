"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { PORTFOLIO_ROUTES } from "@/data/routes.config";

/**
 * SectionNav — Desktop sidebar navigation links.
 *
 * Renders a vertical list of section links dynamically from PORTFOLIO_ROUTES.
 * Uses react-router-dom NavLink for automatic active state management.
 * Hidden on mobile (< 64em) — MobileNav handles navigation there.
 */
export default function SectionNav() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="pf-section-nav"
      aria-label="Portfolio sections"
    >
      <ul className="pf-section-nav__list">
        {PORTFOLIO_ROUTES.map(({ id, path, label }) => (
          <li key={id}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `pf-section-nav__link ${isActive ? "pf-section-nav__link--active" : ""}`
              }
            >
              <span className="pf-section-nav__indicator" />
              <span className="pf-section-nav__text">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
