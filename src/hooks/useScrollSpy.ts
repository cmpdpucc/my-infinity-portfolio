import { useState, useEffect } from "react";

/**
 * useScrollSpy
 *
 * Tracks which section is currently visible using IntersectionObserver.
 * Works with an inner scrollable container (pf-scroll-container) rather
 * than the window scroll, which is needed for the 100vh snap layout.
 *
 * @param sectionIds - Array of section IDs (without #) to observe
 * @param containerId - ID of the scrollable container div (default: "scroll-container")
 */
export function useScrollSpy(
  sectionIds: string[],
  containerId: string = "scroll-container"
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    // Strip leading # if any
    const ids = sectionIds.map(id => id.replace(/^#/, ""));
    if (ids.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      root: document.getElementById(containerId) ?? null,
      rootMargin: "-45% 0px -45% 0px", // Extremely thin 10% tripwire
      threshold: 0, 
    };

    const observer = new IntersectionObserver((entries) => {
      // Find all intersecting entries
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        // If multiple intersect the thin wire, pick the first one (most likely scrolling down into it)
        setActiveId(intersecting[0].target.id);
      }
    }, observerOptions);

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, sectionIds.join(",")]);

  return activeId;
}
