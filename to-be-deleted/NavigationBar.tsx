"use client";

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PORTFOLIO_ROUTES } from "@/data/routes.config";
import IdentityBar from "@/components/IdentityBar";
import NavCard, { NavCardItem } from "@/components/NavCard";

const DEV_PROFILE = {
  avatarUrl: "/avatar.svg",
  name: "Daniele Puccio",
  title: "Senior Developer",
  handle: "danyp",
  status: "Available for work",
} as const;

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Dynamic orientation for NavCard
  const [navOrientation, setNavOrientation] = useState<"horizontal" | "vertical">("horizontal");

  useEffect(() => {
    const handleResize = () => {
      setNavOrientation(window.innerWidth <= 1024 ? "vertical" : "horizontal");
    };
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const navItems: NavCardItem[] = [
    {
      label: "Navigation",
      bgColor: "var(--color-bg-light, #1e293b)",
      textColor: "var(--color-text, #f8fafc)",
      links: [
        { label: "Home", href: "/", ariaLabel: "Go to Home" },
        ...PORTFOLIO_ROUTES.map((route) => ({
          label: route.label,
          href: route.path,
          ariaLabel: `Go to ${route.label}`,
        })),
      ],
    },
  ];

  return (
    <header
      className={`pf-nav-bar ${
        isScrolled ? "pf-nav-bar--scrolled" : "pf-nav-bar--transparent"
      }`}
    >
      <div className="pf-nav-bar__container">
        {/* Logo Area */}
        {/* Identity Logo Dropdown */}
        <IdentityBar
            avatarUrl={DEV_PROFILE.avatarUrl}
            name={DEV_PROFILE.name}
            title={DEV_PROFILE.title}
            handle={DEV_PROFILE.handle}
            status={DEV_PROFILE.status}
        />

        {/* Desktop & Mobile Navigation via NavCard */}
        <NavCard
          logo=""
          items={navItems}
          orientation={navOrientation}
          className="pf-nav-bar__card"
          baseColor="rgba(255, 255, 255, 0.05)"
          menuColor="var(--color-text)"
          buttonBgColor="var(--color-primary)"
          buttonTextColor="#fff"
        />
      </div>
    </header>
  );
}
