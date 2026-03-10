"use client";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";
import SectionNav from "@/components/SectionNav";

const DEV_PROFILE = {
  avatarUrl: "/avatar.svg",
  name: "DanyP",
  title: "Senior Developer",
  handle: "danyp",
  status: "Available for work",
} as const;

/**
 * SidebarController — manages the desktop sidebar.
 * - On Home (`/`): hidden initially, appears on scroll (position: fixed, z-index: 50 to hover over content).
 * - On Portfolio pages: always visible.
 */
export default function SidebarController() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Use window scroll for Home page since it scrolls naturally
  const { scrollY } = useScroll();
  
  // Transform scroll position to sidebar appearance
  // If user scrolls past 400px, reveal sidebar
  const scrollOpacity = useTransform(scrollY, [300, 600], [0, 1]);
  const scrollX = useTransform(scrollY, [300, 600], [-100, 0]);

  // Card shrink effect inside sidebar (only active when scrolling down)
  const cardScale = useTransform(scrollY, [0, 300], [1, 0.62]);
  const cardOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);

  return (
    <motion.aside 
      className="pf-sidebar-controller"
      style={{
        // On Home, animate in via scroll values. On other pages, pin to 1 / 0px.
        opacity: isHome ? scrollOpacity : 1,
        x: isHome ? scrollX : 0,
      }}
    >
      <motion.div
        className="pf-sidebar-controller__card"
        style={{
          scale: isHome ? 0.62 : cardScale, // if appearing on home scroll, already shrunk. If on portfolio pages, reacts to scroll.
          opacity: isHome ? 0.95 : cardOpacity,
          transformOrigin: "top left",
        }}
      >
        <ProfileCard
          avatarUrl={DEV_PROFILE.avatarUrl}
          name={DEV_PROFILE.name}
          title={DEV_PROFILE.title}
          handle={DEV_PROFILE.handle}
          status={DEV_PROFILE.status}
          contactText="Download Resume"
          enableTilt={true}
          behindGlowEnabled={true}
          behindGlowColor="rgba(59, 130, 246, 0.35)"
          behindGlowSize="30%"
          innerGradient="linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(59, 130, 246, 0.12) 100%)"
        />
      </motion.div>
      <SectionNav />
    </motion.aside>
  );
}
