"use client";

import React from "react";
import Spotlight from "@/components/Spotlight";
import ClickSpark from "@/components/ClickSpark";
import DevIdentity from "@/components/DevIdentity";
import SectionNav from "@/components/SectionNav";
import MobileNav from "@/components/MobileNav";
import { SECTIONS } from "@/data/sections.data";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useDiscreteScroll } from "@/hooks/useDiscreteScroll";

/**
 * page.tsx — Root portfolio page.
 *
 * Architecture:
 * - Desktop: left sidebar (DevIdentity + SectionNav) + right scroll container
 * - Mobile: DevIdentity hero header inside scroll container + floating MobileNav
 *
 * Each section is 100vh, rendered by iterating SECTIONS array.
 * Discrete scroll hook intercepts wheel events for 1-to-1 section jumps.
 */
export default function Home() {
  const sectionIds = SECTIONS.map(s => `#${s.id}`);
  const activeSectionId = useScrollSpy(sectionIds, "scroll-container");

  // Intercept wheel events to force section-by-section jumps
  useDiscreteScroll(sectionIds, "scroll-container");

  return (
    <ClickSpark sparkColor="#3b82f6" sparkCount={10} sparkRadius={20}>
      <div className="pf-page">
        <Spotlight />

        <div className="pf-layout">
          {/* LEFT: Desktop sidebar — Identity + Nav (hidden < 64em) */}
          <aside className="pf-sidebar">
            <DevIdentity variant="sidebar" />
            <SectionNav sections={SECTIONS} activeSectionId={activeSectionId} />
          </aside>

          {/* BOTTOM: Floating mobile nav (< 1024px) */}
          <MobileNav sections={SECTIONS} activeSectionId={activeSectionId} />

          {/* RIGHT: Scroll container — one fullscreen section per item */}
          <div className="pf-scroll-container" id="scroll-container">
            {/* Mobile hero: DevIdentity shown as first element in scroll flow */}
            <DevIdentity variant="hero" />

            {SECTIONS.map(({ id, component: SectionComponent }) => (
              <section
                key={id}
                id={id}
                className="pf-scroll-section"
                aria-label={id}
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

