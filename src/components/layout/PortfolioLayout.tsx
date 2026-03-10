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
        {/* Sidebar will be added in Phase 3 */}
        <main style={{ width: "100%", height: "100vh", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
