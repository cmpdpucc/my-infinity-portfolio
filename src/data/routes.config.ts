import { lazy, ComponentType } from "react";

/**
 * Type definition for a dynamic route configuration.
 */
export const PORTFOLIO_ROUTES = [
  {
    id: "about",
    path: "/about",
    label: "About",
    preload: () => import("@/components/routes/AboutPage"),
    component: lazy(() => import("@/components/routes/AboutPage")),
  },
  {
    id: "experience",
    path: "/experience",
    label: "Experience",
    preload: () => import("@/components/routes/ExperiencePage"),
    component: lazy(() => import("@/components/routes/ExperiencePage")),
  },
  {
    id: "projects",
    path: "/projects",
    label: "Projects",
    preload: () => import("@/components/routes/ProjectsPage"),
    component: lazy(() => import("@/components/routes/ProjectsPage")),
  },
] as const;

export type RouteConfig = typeof PORTFOLIO_ROUTES[number];
