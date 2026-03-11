"use client";

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PORTFOLIO_ROUTES } from "@/data/routes.config";
import { Terminal } from "lucide-react"; // Using Terminal as a logo placeholder

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Handle scroll detection for the frosted glass effect on Home page
  useEffect(() => {
    // If not on home page, it's always frosted glass
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      // Add frosted glass after scrolling past 50px
      setIsScrolled(window.scrollY > 50);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={`pf-nav-bar ${
        isScrolled ? "pf-nav-bar--scrolled" : "pf-nav-bar--transparent"
      }`}
    >
      <div className="pf-nav-bar__container">
        {/* Logo Area */}
        <NavLink to="/" className="pf-nav-bar__logo" aria-label="Go to Home">
          <Terminal size={24} className="pf-nav-bar__logo-icon" />
          <span className="pf-nav-bar__logo-text">Dan.P</span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="pf-nav-bar__links">
          {/* Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pf-nav-bar__link ${isActive ? "pf-nav-bar__link--active" : ""}`
            }
          >
            Home
          </NavLink>
          
          {/* Dynamic Portfolio Links */}
          {PORTFOLIO_ROUTES.map((route) => (
            <NavLink
              key={route.id}
              to={route.path}
              className={({ isActive }) =>
                `pf-nav-bar__link ${isActive ? "pf-nav-bar__link--active" : ""}`
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
