"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Layers, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { PORTFOLIO_ROUTES } from "@/data/routes.config";

// Map section IDs to specific Lucide icons
const iconMap: Record<string, React.ReactNode> = {
  about: <User size={20} />,
  experience: <Briefcase size={20} />,
  projects: <Layers size={20} />,
};

export default function MobileNav() {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      className="pf-mobile-nav"
      aria-label="Mobile navigation"
    >
      <ul className="pf-mobile-nav__list">
        {/* Static Home Link */}
        <li className="pf-mobile-nav__item">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `pf-mobile-nav__button ${isActive ? "pf-mobile-nav__button--active" : ""}`
            }
            aria-label="Home"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active-indicator"
                    className="pf-mobile-nav__active-bg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="pf-mobile-nav__icon">
                  <Home size={20} />
                </span>
                <span className="pf-mobile-nav__label">Home</span>
              </>
            )}
          </NavLink>
        </li>

        {PORTFOLIO_ROUTES.map(({ id, path, label }) => {
          return (
            <li key={id} className="pf-mobile-nav__item">
              <NavLink
                to={path}
                className={({ isActive }) => 
                  `pf-mobile-nav__button ${isActive ? "pf-mobile-nav__button--active" : ""}`
                }
                aria-label={label}
              >
                {({ isActive }) => (
                  <>
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
                    <span className="pf-mobile-nav__label">{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
