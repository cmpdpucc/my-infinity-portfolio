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
      rootMargin: "0px",
      threshold: 0.5, // section must be 50% visible to be "active"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
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
