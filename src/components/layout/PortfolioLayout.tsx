"use client";

import React from "react";
import { Outlet } from "react-router-dom";

/**
 * PortfolioLayout — Shared layout for content pages (About, Experience, Projects).
 *
 * Architecture:
 * - Desktop: sidebar (ProfileCard + RouteNav) + main content area (<Outlet />)
 * - Mobile: MobileIdentityBar + <Outlet /> + MobileNav (bottom)
 * - Sidebar is OUTSIDE any transition wrapper → persists during route changes.
 *
 * Full implementation in Phase 3. Currently renders Outlet only.
 */
export default function PortfolioLayout() {
  return (
    <div className="pf-page">
      <div className="pf-layout">
        {/* Sidebar placeholder - keeps CSS Grid aligned so <main> goes into the 1fr column */}
        <aside className="pf-sidebar"></aside>
        
        <main className="pf-scroll-container" style={{ width: "100%", height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
