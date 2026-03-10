"use client";

import dynamic from "next/dynamic";

/**
 * Root page — Entry point for the portfolio SPA.
 *
 * Uses dynamic import with `ssr: false` to load AppRouter client-side only.
 * This prevents hydration mismatches since react-router-dom's BrowserRouter
 * requires a browser environment (window, history API).
 *
 * All routing is handled by AppRouter via react-router-dom.
 */
const AppRouter = dynamic(() => import("@/components/AppRouter"), {
  ssr: false,
});

export default function Home() {
  return <AppRouter />;
}
