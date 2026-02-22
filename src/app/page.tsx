"use client";

import React, { useRef } from "react";
import Spotlight from "@/components/Spotlight";
import ClickSpark from "@/components/ClickSpark";
import ProfileCard from "@/components/ProfileCard";
import SectionNav from "@/components/SectionNav";
import MobileIdentityBar from "@/components/MobileIdentityBar";
import MobileNav from "@/components/MobileNav";
import { SECTIONS } from "@/data/sections.data";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useDiscreteScroll } from "@/hooks/useDiscreteScroll";
import { motion, useScroll, useTransform } from "framer-motion";

// Developer profile data — centralized so all components share the same source
const DEV_PROFILE = {
  avatarUrl: "https://avatar.iran.liara.run/public",
  name: "Developer Name",
  title: "Senior Software Engineer & Product Designer",
  handle: "devname",
  status: "Available for work",
} as const;

/**
 * page.tsx — Root portfolio page.
 *
 * Architecture:
 * - Desktop: left sidebar (ProfileCard with scroll-shrink + SectionNav) + right scroll container
 * - Mobile: MobileIdentityBar (expandable) + scroll container + floating MobileNav
 */
export default function Home() {
  const sectionIds = SECTIONS.map(s => `#${s.id}`);
  const activeSectionId = useScrollSpy(sectionIds, "scroll-container");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useDiscreteScroll(sectionIds, "scroll-container");

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
            <SectionNav sections={SECTIONS} activeSectionId={activeSectionId} />
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
          <MobileNav sections={SECTIONS} activeSectionId={activeSectionId} />

          {/* RIGHT: Scroll container — one fullscreen section per item */}
          <div className="pf-scroll-container" id="scroll-container" ref={scrollContainerRef}>
            {SECTIONS.map(({ id, component: SectionComponent }) => (
              <section
                key={id}
                id={id}
                className={`pf-scroll-section${id === "experience" ? " pf-scroll-section--free" : ""}`}
                aria-label={id}
                {...(id === "experience" ? { "data-free-scroll": "true" } : {})}
              >
                <SectionComponent />
              </section>
            ))}
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}
