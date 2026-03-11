"use client";

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Spotlight from "@/components/Spotlight";
import ClickSpark from "@/components/ClickSpark";
import SidebarController from "@/components/layout/SidebarController";
import NavigationBar from "@/components/layout/NavigationBar";
import MobileIdentityBar from "@/components/MobileIdentityBar";
import MobileNav from "@/components/MobileNav";

const DEV_PROFILE = {
  avatarUrl: "/avatar.svg",
  name: "DanyP",
  title: "Senior Developer",
  handle: "danyp",
  status: "Available for work",
} as const;

/**
 * PortfolioLayout — Shared layout wrapping ALL pages (Home, About, Experience, Projects).
 *
 * Architecture:
 * - Desktop: SidebarController (fixed, route-aware) + main content area (<Outlet />)
 * - Mobile: MobileIdentityBar (route-aware) + <Outlet /> + MobileNav (bottom, route-aware)
 */
export default function PortfolioLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <ClickSpark sparkColor="#3b82f6" sparkCount={10} sparkRadius={20}>
      {/* Global Top Navigation Bar */}
      <NavigationBar />
      
      <div className="pf-page-layout">
        <Spotlight />

        {/* Global Sidebar Controller (Desktop) */}
        <SidebarController />

        {/* MOBILE: Identity pill top-left (Hidden on Home) */}
        {!isHome && (
          <MobileIdentityBar
            avatarUrl={DEV_PROFILE.avatarUrl}
            name={DEV_PROFILE.name}
            title={DEV_PROFILE.title}
            handle={DEV_PROFILE.handle}
            status={DEV_PROFILE.status}
          />
        )}

        {/* BOTTOM: Floating mobile nav (< 1024px) (Hidden on Home) */}
        {!isHome && <MobileNav />}

        {/* MAIN CONTENT AREA */}
        <main 
          className={`pf-main-content ${isHome ? "" : "pf-main-content--with-sidebar"}`}
        >
          <Outlet />
        </main>
      </div>
    </ClickSpark>
  );
}
