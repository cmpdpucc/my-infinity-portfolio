import { lazy, ComponentType } from "react";

/**
 * Type definition for a dynamic route configuration.
 */
export interface RouteConfig {
  id: string;      // Unique identifier (used for keys and analytics)
  path: string;    // URL path (e.g., '/about')
  label: string;   // Display name in UI navigation
  // The React component to render. Use `any` here or specific props if known.
  component: ComponentType<any>; 
}

/**
 * PORTFOLIO_ROUTES
 * 
 * Centralized, data-driven routing configuration.
 * By defining routes here, the UI (Navigation, Sidebar) and the Router (AppRouter)
 * stay completely agnostic. 
 * 
 * Future Backend Integration:
 * This array can be replaced by a fetch() call to a CMS or database, allowing
 * you to dynamically add/remove pages without touching the frontend code.
 */
export const PORTFOLIO_ROUTES: RouteConfig[] = [
  {
    id: "about",
    path: "/about",
    label: "About",
    component: lazy(() => import("@/components/routes/AboutPage")),
  },
  {
    id: "experience",
    path: "/experience",
    label: "Experience",
    component: lazy(() => import("@/components/routes/ExperiencePage")),
  },
  {
    id: "projects",
    path: "/projects",
    label: "Projects",
    component: lazy(() => import("@/components/routes/ProjectsPage")),
  },
];
