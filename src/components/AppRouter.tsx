"use client";

import React, { Suspense, lazy, useEffect } from "react";
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
  // Eagerly preload all routes in the background after the initial render.
  // This ensures the initial load is fast (only loading the requested route),
  // but subsequent navigations are instant without showing the Suspense fallback.
  useEffect(() => {
    // We use setTimeout or requestIdleCallback to ensure this happens AFTER
    // the main UI thread has finished painting the current screen.
    const preloadAll = () => {
      PORTFOLIO_ROUTES.forEach((route) => {
        // Call the dynamic import function, discarding the result.
        // The browser network layer will fetch and cache the JS chunk.
        route.preload().catch(console.error);
      });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadAll);
    } else {
      setTimeout(preloadAll, 2000);
    }
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* All pages — share the global PortfolioLayout structure */}
          <Route element={<PortfolioLayout />}>
            <Route path="/" element={<HomePage />} />
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
