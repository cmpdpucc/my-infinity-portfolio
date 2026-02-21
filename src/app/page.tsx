"use client";

import React from "react";
import Spotlight from "@/components/Spotlight";
import ClickSpark from "@/components/ClickSpark";
import Sidebar from "@/components/Sidebar";
import { SECTIONS } from "@/data/sections.data";
import { useScrollSpy } from "@/hooks/useScrollSpy";

/**
 * page.tsx — Root portfolio page.
 *
 * Architecture:
 * - Left column: Sidebar (fixed, 50% width) with dynamic nav from SECTIONS
 * - Right column: scroll container with full-viewport sections
 *
 * Each section is 100vh, rendered by iterating SECTIONS array.
 * The scroll-snap behaviour is implemented purely in SCSS (.pf-scroll-container).
 *
 * To add a new section from an API:
 *   const sections = await fetch("/api/sections").then(r => r.json())
 *   Replace SECTIONS with the API response (same SectionConfig shape).
 */
export default function Home() {
  const sectionIds = SECTIONS.map(s => `#${s.id}`);
  const activeSectionId = useScrollSpy(sectionIds, 100);

  return (
    <ClickSpark sparkColor="#3b82f6" sparkCount={10} sparkRadius={20}>
      <div className="pf-page">
        <Spotlight />

        <div className="pf-layout">
          {/* LEFT: Fixed Sidebar — nav generated from sections list */}
          <Sidebar sections={SECTIONS} activeSectionId={activeSectionId} />

          {/* RIGHT: Scroll container — one fullscreen section per item */}
          <div className="pf-scroll-container" id="scroll-container">
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
