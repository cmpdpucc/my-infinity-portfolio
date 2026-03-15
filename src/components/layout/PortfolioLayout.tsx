"use client";

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Spotlight from "@/components/Spotlight";
import ClickSpark from "@/components/ClickSpark";
import NavigationCardBar from "@/components/layout/NavigationCardBar";
import MobileNav from "@/components/MobileNav";

/**
 * PortfolioLayout — Shared layout wrapping ALL pages (Home, About, Experience, Projects).
 *
 * Architecture:
 * - Desktop: NavigationCardBar (top) + main content area (<Outlet />)
 * - Mobile: NavigationBar (top, modal identity) + <Outlet /> + MobileNav (bottom)
 */
export default function PortfolioLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <ClickSpark sparkColor="#3b82f6" sparkCount={10} sparkRadius={20} />
      
      {/* Global Top Navigation Bar */}
      <NavigationCardBar />
      
      <div className="pf-page-layout">
        <Spotlight />

        {/* MAIN CONTENT AREA */}
        <main className="pf-main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
