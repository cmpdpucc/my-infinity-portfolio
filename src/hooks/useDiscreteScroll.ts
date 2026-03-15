import { useEffect, useRef } from 'react';
import { smoothScrollTo, easings } from '@/utils/smoothScroll';

/**
 * @deprecated THIS HOOK IS DEPRECATED.
 * The portfolio has moved from a single-page scroll architecture to a multi-page routing
 * architecture. react-router-dom and native platform scroll now handle navigation.
 * 
 * useDiscreteScroll — Hybrid scroll: snap sections + free-scroll zones.
 *
 * Sections marked with `data-free-scroll="true"` allow native scrolling.
 * When the user reaches the boundary of a free-scroll zone, scrolling
 * STOPS (wall). The user must scroll again to trigger snap to next section.
 */
export function useDiscreteScroll(sectionIds: string[], containerId: string = "scroll-container") {
  const isScrolling = useRef(false);
  const scrollAccumulator = useRef(0);
  const wallHitTime = useRef(0);         // Timestamp of when the wall was hit
  const wallCooldown = useRef(false);     // Is the wall active?
  const THRESHOLD = 30;
  const WALL_DELAY_MS = 400;             // Must pause this long at wall before snap

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
      // If a child element (e.g. Swiper) already handled the scroll, ignore it.
      if (e.defaultPrevented) return;

      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      const { index: currentIndex, element: currentEl, isFreeScroll } = getCurrentSectionInfo();

      // FREE-SCROLL ZONE
      if (isFreeScroll && currentEl) {
        const sectionTop = currentEl.offsetTop;
        const sectionBottom = sectionTop + currentEl.scrollHeight;
        const viewportTop = container.scrollTop;
        const viewportBottom = viewportTop + container.clientHeight;
        const scrollingDown = e.deltaY > 0;
        const scrollingUp = e.deltaY < 0;

        // ---- WALL AT BOTTOM: scrolling down past last item ----
        if (scrollingDown && Math.ceil(viewportBottom) >= Math.floor(sectionBottom) - 20) {
          e.preventDefault();

          const now = Date.now();

          // First hit → activate wall, record time
          if (!wallCooldown.current) {
            wallCooldown.current = true;
            wallHitTime.current = now;
            scrollAccumulator.current = 0;
            return; // Block — wall is up
          }

          // Wall is active — check if enough time has passed
          if (now - wallHitTime.current < WALL_DELAY_MS) {
            // Still within cooldown — block scroll
            return;
          }

          // Cooldown expired — user is intentionally scrolling again → snap
          scrollAccumulator.current += e.deltaY;
          if (Math.abs(scrollAccumulator.current) >= THRESHOLD) {
            const nextIndex = Math.min(currentIndex + 1, ids.length - 1);
            if (nextIndex !== currentIndex) {
              wallCooldown.current = false;
              snapToSection(container, ids, nextIndex);
            }
            scrollAccumulator.current = 0;
          }
          return;
        }

        // ---- WALL AT TOP: scrolling up past first item ----
        if (scrollingUp && Math.floor(viewportTop) <= Math.ceil(sectionTop) + 20) {
          e.preventDefault();

          const now = Date.now();

          if (!wallCooldown.current) {
            wallCooldown.current = true;
            wallHitTime.current = now;
            scrollAccumulator.current = 0;
            return;
          }

          if (now - wallHitTime.current < WALL_DELAY_MS) {
            return;
          }

          scrollAccumulator.current += e.deltaY;
          if (Math.abs(scrollAccumulator.current) >= THRESHOLD) {
            const prevIndex = Math.max(currentIndex - 1, 0);
            if (prevIndex !== currentIndex) {
              wallCooldown.current = false;
              snapToSection(container, ids, prevIndex);
            }
            scrollAccumulator.current = 0;
          }
          return;
        }

        // ---- INSIDE FREE ZONE: clear wall state, allow native scroll ----
        wallCooldown.current = false;
        return;
      }

      // ---- SNAP MODE: standard section-by-section ----
      e.preventDefault();
      wallCooldown.current = false;

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
        smoothScrollTo({
          container: cont,
          targetY: targetElement.offsetTop,
          duration: 850,
          easing: easings.easeInOutCubic,
          onComplete: () => {
            // Free the scroll lock strictly when animation physically completes
            isScrolling.current = false;
            scrollAccumulator.current = 0;
          }
        });
      } else {
        isScrolling.current = false;
        scrollAccumulator.current = 0;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => container.removeEventListener('wheel', handleWheel);
  }, [sectionIds, containerId]);
}
