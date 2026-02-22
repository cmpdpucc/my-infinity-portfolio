import { useEffect, useRef } from 'react';

/**
 * useDiscreteScroll — Hybrid scroll: snap sections + free-scroll zones.
 *
 * Sections marked with `data-free-scroll="true"` allow native scrolling.
 * The hook detects when the user has scrolled past the free-scroll content
 * and then resumes snap behavior to the next/previous section.
 */
export function useDiscreteScroll(sectionIds: string[], containerId: string = "scroll-container") {
  const isScrolling = useRef(false);
  const scrollAccumulator = useRef(0);
  const THRESHOLD = 30;

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ids = sectionIds.map(id => id.replace(/^#/, ""));

    /**
     * Determine which section the user is currently viewing
     * and whether that section is a free-scroll zone.
     */
    const getCurrentSectionInfo = () => {
      const sectionHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      // Find the section that overlaps the most with the viewport
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        if (el.offsetTop <= scrollTop + sectionHeight * 0.5) {
          const isFreeScroll = el.getAttribute("data-free-scroll") === "true";
          return { index: i, element: el, isFreeScroll };
        }
      }

      return { index: 0, element: document.getElementById(ids[0]), isFreeScroll: false };
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      const { index: currentIndex, element: currentEl, isFreeScroll } = getCurrentSectionInfo();

      // FREE-SCROLL ZONE: allow native scrolling, detect boundary exits
      if (isFreeScroll && currentEl) {
        const sectionTop = currentEl.offsetTop;
        const sectionBottom = sectionTop + currentEl.scrollHeight;
        const viewportTop = container.scrollTop;
        const viewportBottom = viewportTop + container.clientHeight;
        const scrollingDown = e.deltaY > 0;
        const scrollingUp = e.deltaY < 0;

        // If scrolling down and viewport bottom has reached section bottom → snap to next
        if (scrollingDown && viewportBottom >= sectionBottom - 2) {
          e.preventDefault();
          scrollAccumulator.current += e.deltaY;

          if (Math.abs(scrollAccumulator.current) >= THRESHOLD) {
            const nextIndex = Math.min(currentIndex + 1, ids.length - 1);
            if (nextIndex !== currentIndex) {
              snapToSection(container, ids, nextIndex);
            }
            scrollAccumulator.current = 0;
          }
          return;
        }

        // If scrolling up and viewport top is at or above section top → snap to previous
        if (scrollingUp && viewportTop <= sectionTop + 2) {
          e.preventDefault();
          scrollAccumulator.current += e.deltaY;

          if (Math.abs(scrollAccumulator.current) >= THRESHOLD) {
            const prevIndex = Math.max(currentIndex - 1, 0);
            if (prevIndex !== currentIndex) {
              snapToSection(container, ids, prevIndex);
            }
            scrollAccumulator.current = 0;
          }
          return;
        }

        // Otherwise: allow native scroll within the free-scroll zone
        return;
      }

      // SNAP MODE: hijack scroll for section-by-section navigation
      e.preventDefault();

      scrollAccumulator.current += e.deltaY;

      if (Math.abs(scrollAccumulator.current) >= THRESHOLD) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        let nextIndex = currentIndex + direction;
        nextIndex = Math.max(0, Math.min(nextIndex, ids.length - 1));

        if (nextIndex !== currentIndex) {
          snapToSection(container, ids, nextIndex);
        }
        scrollAccumulator.current = 0;
      }
    };

    const snapToSection = (cont: HTMLElement, sectionIds: string[], targetIndex: number) => {
      isScrolling.current = true;
      const targetElement = document.getElementById(sectionIds[targetIndex]);

      if (targetElement) {
        cont.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });

        setTimeout(() => {
          isScrolling.current = false;
          scrollAccumulator.current = 0;
        }, 750);
      } else {
        isScrolling.current = false;
        scrollAccumulator.current = 0;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => container.removeEventListener('wheel', handleWheel);
  }, [sectionIds, containerId]);
}
