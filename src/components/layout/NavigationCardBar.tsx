"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PORTFOLIO_ROUTES } from "@/data/routes.config";
import IdentityBar from "@/components/IdentityBar";
import GooeyNav from "@/components/GooeyNav";
import { motion, AnimatePresence } from "framer-motion";

const DEV_PROFILE = {
  avatarUrl: "/avatar.svg",
  name: "Daniele Puccio",
  title: "Senior Developer",
  handle: "danyp",
  status: "Available for work",
} as const;

type OpenedBy = "hover" | "click" | null;

export default function NavigationCardBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openedBy, setOpenedBy] = useState<OpenedBy>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Handle scroll detection for the frosted glass effect on Home page
  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  /** Open menu via hover trigger */
  const openViaHover = useCallback(() => {
    if (!isExpanded) {
      setIsExpanded(true);
      setOpenedBy("hover");
    }
  }, [isExpanded]);

  /** Open menu via click trigger */
  const openViaClick = useCallback(() => {
    if (isExpanded && openedBy === "click") {
      // Toggle off if already click-opened
      setIsExpanded(false);
      setOpenedBy(null);
    } else {
      setIsExpanded(true);
      setOpenedBy("click");
    }
  }, [isExpanded, openedBy]);

  /** Close menu */
  const closeMenu = useCallback(() => {
    setIsExpanded(false);
    setOpenedBy(null);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  // 3-second hover timer on the entire bar
  const handleMouseEnter = () => {
    if (!isExpanded) {
      hoverTimeoutRef.current = setTimeout(() => {
        openViaHover();
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    // Always clear the 3-sec timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // If opened via hover → close on leave
    if (openedBy === "hover") {
      closeMenu();
    }
    // If opened via click → stays open (user must click link or click outside)
  };

  // Click outside detection for click-opened menus
  // Uses capture phase + rAF to guarantee it fires regardless of ClickSpark or other wrappers
  useEffect(() => {
    if (openedBy !== "click") return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      // Use rAF to let the click event fully propagate first
      requestAnimationFrame(() => {
        if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
          closeMenu();
        }
      });
    };

    // capture: true ensures we see the event before any stopPropagation calls
    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [openedBy, closeMenu]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    ...PORTFOLIO_ROUTES.map((route) => ({
      label: route.label,
      href: route.path,
    })),
  ];

  const headerClasses = [
    "pf-nav-card-bar",
    isScrolled ? "pf-nav-card-bar--scrolled" : "pf-nav-card-bar--transparent",
    isExpanded ? "pf-nav-card-bar--has-expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      ref={headerRef}
      className={headerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pf-nav-card-bar__top">
        {/* Left: Identity Logo */}
        <div className="pf-nav-card-bar__left">
          <IdentityBar
            avatarUrl={DEV_PROFILE.avatarUrl}
            name={DEV_PROFILE.name}
            title={DEV_PROFILE.title}
            handle={DEV_PROFILE.handle}
            status={DEV_PROFILE.status}
          />
        </div>

        {/* Center: GooeyNav (Desktop only) */}
        <div className="pf-nav-card-bar__center hidden-on-mobile">
          <GooeyNav items={navItems} animationTime={500} />
        </div>

        {/* Right: Hamburger */}
        <div className="pf-nav-card-bar__right">
          <button
            className={`pf-hamburger-btn ${isExpanded ? "pf-hamburger-btn--open" : ""}`}
            onClick={openViaClick}
            onMouseEnter={openViaHover}
            aria-label="Toggle Navigation Menu"
            type="button"
          >
            <span className="pf-hamburger-btn__line" />
            <span className="pf-hamburger-btn__line" />
          </button>
        </div>
      </div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="pf-nav-card-bar__expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pf-expanded-content">
              {/* Fake inner links for the demo, representing sub-pages eventually */}
              <div className="pf-expanded-content__section">
                <div className="pf-expanded-content__title">Projects</div>
                <NavLink to="/projects" onClick={closeMenu}>All Projects</NavLink>
                <a href="#" onClick={(e) => e.preventDefault()}>E-commerce Platform</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Fintech Dashboard</a>
              </div>
              <div className="pf-expanded-content__section">
                <div className="pf-expanded-content__title">Experience</div>
                <NavLink to="/experience" onClick={closeMenu}>Full Timeline</NavLink>
                <a href="#" onClick={(e) => e.preventDefault()}>Frontend Lead</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Full Stack Dev</a>
              </div>
              <div className="pf-expanded-content__section">
                <div className="pf-expanded-content__title">About</div>
                <NavLink to="/about" onClick={closeMenu}>About Me</NavLink>
                <a href="#" onClick={(e) => e.preventDefault()}>Tech Stack</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Setup</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
