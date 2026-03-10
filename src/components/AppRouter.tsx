"use client";

import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PORTFOLIO_ROUTES } from "@/data/routes.config";

/**
 * AppRouter — Core SPA routing using react-router-dom.
 *
 * Architecture:
 * - `/` → HomePage (standalone, no sidebar, full-screen immersion)
 * - `/about`, `/experience`, `/projects` → PortfolioLayout (sidebar + content)
 * - React.lazy() for code splitting on every route component
 * - BrowserRouter for client-side navigation
 *
 * This component is dynamically imported in `app/page.tsx` with `ssr: false`
 * to avoid hydration mismatches (BrowserRouter is client-only).
 */

const HomePage = lazy(() => import("@/components/routes/HomePage"));
const PortfolioLayout = lazy(() => import("@/components/layout/PortfolioLayout"));

/**
 * Minimal loading fallback displayed while lazy components are loading.
 * Matches the portfolio's dark background to avoid flash of white.
 */
function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-background, #0F172A)",
        color: "var(--color-text-muted, #94A3B8)",
        fontFamily: "var(--font-sans), 'DM Sans', sans-serif",
        fontSize: "0.85rem",
        letterSpacing: "0.05em",
      }}
    >
      Loading…
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Home — standalone route, no sidebar/layout shell */}
          <Route path="/" element={<HomePage />} />

          {/* Portfolio pages — share sidebar layout via PortfolioLayout */}
          <Route element={<PortfolioLayout />}>
            {PORTFOLIO_ROUTES.map((route) => (
              <Route 
                key={route.id} 
                path={route.path} 
                element={<route.component />} 
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
