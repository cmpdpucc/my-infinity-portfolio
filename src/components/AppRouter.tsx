"use client";

import React, { Suspense, useEffect, useState, ComponentType } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PORTFOLIO_ROUTES } from "@/data/routes.config";
import PortfolioLayout from "@/components/layout/PortfolioLayout";

// Global cache for component modules to bypass React.lazy Suspense flash
const componentCache: Record<string, ComponentType<any>> = {};

/**
 * Custom AsyncRoute wrapper.
 * This completely bypasses <Suspense> if the component is already in the cache.
 */
function AsyncRoute({ routeId, importFn }: { routeId: string, importFn: () => Promise<{ default: ComponentType<any> }> }) {
  const [Comp, setComp] = useState<ComponentType<any> | null>(() => componentCache[routeId] || null);

  useEffect(() => {
    // If the route changed and Comp is still the old one, or if Comp is missing
    if (!componentCache[routeId]) {
      importFn().then((m) => {
        componentCache[routeId] = m.default;
        setComp(() => m.default);
      }).catch(console.error);
    } else if (Comp !== componentCache[routeId]) {
      setComp(() => componentCache[routeId]);
    }
  }, [Comp, importFn, routeId]);

  if (!Comp) {
    return <LoadingFallback />;
  }

  return <Comp />;
}

// Ensure Home is cached the exact same way
const HOME_ROUTE_ID = "home";
const homeImportFn = () => import("@/components/routes/HomePage");

/**
 * Minimal loading fallback displayed only if the chunk isn't cached yet.
 */
function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-bg, #0B1120)",
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

/**
 * ScrollToTop — Helper to ensure every route change starts at the top.
 * This is needed because ScrollRestoration requires a data router (createBrowserRouter).
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppRouter() {
  // Eagerly preload all routes in the background after the initial render.
  useEffect(() => {
    const preloadAll = () => {
      PORTFOLIO_ROUTES.forEach((route) => {
        if (!componentCache[route.id]) {
          route.importFn().then((m) => {
            componentCache[route.id] = m.default;
          }).catch(console.error);
        }
      });
      if (!componentCache[HOME_ROUTE_ID]) {
         homeImportFn().then((m) => {
            componentCache[HOME_ROUTE_ID] = m.default;
         }).catch(console.error);
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadAll);
    } else {
      setTimeout(preloadAll, 1500);
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Suspense is kept only as a safety net for deep child components */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<PortfolioLayout />}>
            <Route path="/" element={<AsyncRoute key={HOME_ROUTE_ID} routeId={HOME_ROUTE_ID} importFn={homeImportFn} />} />
            {PORTFOLIO_ROUTES.map((route) => (
              <Route 
                key={route.id} 
                path={route.path} 
                element={<AsyncRoute key={route.id} routeId={route.id} importFn={route.importFn} />} 
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
