"use client";

import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Spotlight from "@/components/Spotlight";
import ClickSpark from "@/components/ClickSpark";
import ProfileCard from "@/components/ProfileCard";
import SectionNav from "@/components/SectionNav";
import MobileIdentityBar from "@/components/MobileIdentityBar";
import MobileNav from "@/components/MobileNav";

// Developer profile data (imported from where it was previously in page.tsx)
const DEV_PROFILE = {
  avatarUrl: "/avatar.svg",
  name: "DanyP", // Updated to match user
  title: "Senior Developer", // Simplified for now
  handle: "danyp",
  status: "Available for work",
} as const;

/**
 * PortfolioLayout — Shared layout for content pages (About, Experience, Projects).
 *
 * Architecture:
 * - Desktop: sidebar (ProfileCard + SectionNav) + main content area (<Outlet />)
 * - Mobile: MobileIdentityBar + <Outlet /> + MobileNav (bottom)
 * - Sidebar is OUTSIDE any transition wrapper → persists during route changes.
 */
export default function PortfolioLayout() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven shrink for ProfileCard on desktop
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const cardScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.62]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  return (
    <ClickSpark sparkColor="#3b82f6" sparkCount={10} sparkRadius={20}>
      <div className="pf-page">
        <Spotlight />

        <div className="pf-layout">
          {/* LEFT: Desktop sidebar — ProfileCard (shrinks on scroll) + SectionNav */}
          <aside className="pf-sidebar">
            <motion.div
              className="pf-sidebar__card"
              style={{
                scale: cardScale,
                opacity: cardOpacity,
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
          </aside>

          {/* MOBILE: Identity pill top-left (expands to fullscreen ProfileCard) */}
          <MobileIdentityBar
            avatarUrl={DEV_PROFILE.avatarUrl}
            name={DEV_PROFILE.name}
            title={DEV_PROFILE.title}
            handle={DEV_PROFILE.handle}
            status={DEV_PROFILE.status}
          />

          {/* BOTTOM: Floating mobile nav (< 1024px) */}
          <MobileNav />

          <main 
            className="pf-scroll-container" 
            id="scroll-container" 
            ref={scrollContainerRef}
            style={{ width: "100%", height: "100vh", overflowY: "auto", overflowX: "hidden" }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </ClickSpark>
  );
}
