import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Rewrites — Direct all SPA routes to the root page.
   *
   * Since we use react-router-dom for client-side routing,
   * Next.js only knows about `/` (the root page). When a user
   * navigates directly to `/about`, `/experience`, or `/projects`,
   * Next.js would return a 404. These rewrites transparently serve
   * the root page for all known SPA routes, allowing react-router-dom
   * to handle the routing client-side.
   */
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/",
      },
      {
        source: "/experience",
        destination: "/",
      },
      {
        source: "/projects",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
