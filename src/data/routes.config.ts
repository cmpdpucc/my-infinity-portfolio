import { ComponentType } from "react";

export interface RouteConfig {
  id: string;
  path: string;
  label: string;
  importFn: () => Promise<{ default: ComponentType<any> }>;
}

export const PORTFOLIO_ROUTES: RouteConfig[] = [
  {
    id: "about",
    path: "/about",
    label: "About",
    importFn: () => import("@/components/routes/AboutPage"),
  },
  {
    id: "experience",
    path: "/experience",
    label: "Experience",
    importFn: () => import("@/components/routes/ExperiencePage"),
  },
  {
    id: "projects",
    path: "/projects",
    label: "Projects",
    importFn: () => import("@/components/routes/ProjectsPage"),
  },
];
