import { ComponentType } from "react";

/** A sub-link shown inside the nav card for this route. */
export interface NavCardSubLink {
  label: string;
  href: string;
  ariaLabel: string;
  /** If true, renders as <NavLink> (internal route). Otherwise renders as <a> placeholder. */
  isRoute?: boolean;
}

/** Visual metadata for the navigation card associated with a route. */
export interface NavCardMeta {
  bgColor: string;
  textColor: string;
  /** Sub-links displayed inside the card. The first one is typically the "main" route link. */
  subLinks: NavCardSubLink[];
}

export interface RouteConfig {
  id: string;
  path: string;
  label: string;
  importFn: () => Promise<{ default: ComponentType<any> }>;
  /**
   * Optional nav card metadata. If provided, this route gets its own
   * colored card in the NavigationCardBar expanded menu.
   * In the future this data will come from a backend API.
   */
  navCard?: NavCardMeta;
}

export const PORTFOLIO_ROUTES: RouteConfig[] = [
  {
    id: "about",
    path: "/about",
    label: "About",
    importFn: () => import("@/components/routes/AboutPage"),
    navCard: {
      bgColor: "#1b3d2f",
      textColor: "#d5ffe8",
      subLinks: [
        { label: "About Me", href: "/about", ariaLabel: "Learn more about me", isRoute: true },
        { label: "Tech Stack", href: "#", ariaLabel: "My tech stack" },
        { label: "Setup", href: "#", ariaLabel: "My development setup" },
      ],
    },
  },
  {
    id: "experience",
    path: "/experience",
    label: "Experience",
    importFn: () => import("@/components/routes/ExperiencePage"),
    navCard: {
      bgColor: "#2d1b4e",
      textColor: "#e8d5ff",
      subLinks: [
        { label: "Full Timeline", href: "/experience", ariaLabel: "View full experience timeline", isRoute: true },
        { label: "Frontend Lead", href: "#", ariaLabel: "Frontend Lead role" },
        { label: "Full Stack Dev", href: "#", ariaLabel: "Full Stack Developer role" },
      ],
    },
  },
  {
    id: "projects",
    path: "/projects",
    label: "Projects",
    importFn: () => import("@/components/routes/ProjectsPage"),
    navCard: {
      bgColor: "#1e3a5f",
      textColor: "#e0f0ff",
      subLinks: [
        { label: "All Projects", href: "/projects", ariaLabel: "View all projects", isRoute: true },
        { label: "E-commerce Platform", href: "#", ariaLabel: "E-commerce Platform project" },
        { label: "Fintech Dashboard", href: "#", ariaLabel: "Fintech Dashboard project" },
      ],
    },
  },
];
