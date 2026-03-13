"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { PORTFOLIO_ROUTES } from "@/data/routes.config";

import IdentityBar from "@/components/IdentityBar";
import GooeyNav from "@/components/GooeyNav";

// --- Inline SVG Icon (from NavCard) ---
const ArrowUpRightIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

/**
 * Dynamically builds the nav card items from PORTFOLIO_ROUTES.
 * Only routes with `navCard` metadata get a colored card.
 * In the future this data will come from a backend API —
 * at that point just replace PORTFOLIO_ROUTES with the API response.
 */
const NAV_CARD_ITEMS = PORTFOLIO_ROUTES
  .filter((route) => route.navCard != null)
  .map((route) => ({
    label: route.label,
    bgColor: route.navCard!.bgColor,
    textColor: route.navCard!.textColor,
    links: route.navCard!.subLinks,
  }));

// --- Framer Motion variants for stagger ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  exit: {},
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.97,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

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
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
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

  // Handle window resize for orientation
  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth <= 1024 ? "vertical" : "horizontal");
    };
    handleResize(); // Init immediately
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cleanup on orientation change
  useEffect(() => {
    if (isExpanded) {
      closeMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation]);

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
    orientation === "vertical" ? "pf-nav-card-bar--vertical" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const verticalHeaderVariants = {
    closed: {
      width: 60,
      height: 60,
      transition: { duration: 0.35, ease: "easeInOut" as const }
    },
    open: {
      width: "calc(100vw - 2rem)",
      height: "auto",
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <>
      <AnimatePresence>
        {orientation === "vertical" && (
          <motion.div 
            className="pf-nav-card-bar__mobile-identity"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <IdentityBar
              avatarUrl={DEV_PROFILE.avatarUrl}
              name={DEV_PROFILE.name}
              title={DEV_PROFILE.title}
              handle={DEV_PROFILE.handle}
              status={DEV_PROFILE.status}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        ref={headerRef}
        className={headerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={orientation === "vertical" ? (isExpanded ? "open" : "closed") : "horizontal"}
        variants={{
          ...verticalHeaderVariants,
          horizontal: {
             width: "100%",
             height: "auto",
             transition: { duration: 0.2 }
          }
        }}
        style={orientation === "vertical" ? { overflow: "hidden", maxHeight: "calc(100vh - 2rem)" } : { width: "100%", height: "auto" }}
      >
        <div className="pf-nav-card-bar__top">
          {/* Left: Identity Logo */}
          <div className="pf-nav-card-bar__left">
          {orientation === "horizontal" && (
            <IdentityBar
              avatarUrl={DEV_PROFILE.avatarUrl}
              name={DEV_PROFILE.name}
              title={DEV_PROFILE.title}
              handle={DEV_PROFILE.handle}
              status={DEV_PROFILE.status}
            />
          )}
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

      {/* Expanded Menu — Colored Card Grid with Stagger */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="pf-nav-card-bar__expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="pf-expanded-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_CARD_ITEMS.map((item, idx) => (
                <motion.div
                  key={`${item.label}-${idx}`}
                  className="pf-nav-card"
                  variants={cardVariants}
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                >
                  <div className="pf-nav-card__label">{item.label}</div>
                  <div className="pf-nav-card__links">
                    {item.links.map((lnk, i) =>
                      lnk.isRoute ? (
                        <NavLink
                          key={`${lnk.label}-${i}`}
                          className="pf-nav-card__link"
                          to={lnk.href}
                          aria-label={lnk.ariaLabel}
                          onClick={closeMenu}
                        >
                          <ArrowUpRightIcon />
                          {lnk.label}
                        </NavLink>
                      ) : (
                        <a
                          key={`${lnk.label}-${i}`}
                          className="pf-nav-card__link"
                          href={lnk.href}
                          aria-label={lnk.ariaLabel}
                          onClick={(e) => e.preventDefault()}
                        >
                          <ArrowUpRightIcon />
                          {lnk.label}
                        </a>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
