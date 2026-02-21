import { useEffect, useRef } from 'react';

/**
 * useDiscreteScroll
 *
 * Intercepts mouse wheel / trackpad scrolling on a specific container
 * and forces it to scroll exactly ONE section at a time.
 * Prevents the native "smooth" fast scrolling that skips sections.
 */
export function useDiscreteScroll(sectionIds: string[], containerId: string = "scroll-container") {
  const isScrolling = useRef(false);
  const scrollAccumulator = useRef(0);
  const THRESHOLD = 30; // Amount of delta required to trigger a jump (prevents hyper-sensitive trackpads)

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Stripped IDs
    const ids = sectionIds.map(id => id.replace(/^#/, ""));

    const handleWheel = (e: WheelEvent) => {
      // Always prevent native scroll on wheel to hijack the interaction
      e.preventDefault();
      
      if (isScrolling.current) return;

      // Accumulate delta for trackpads (which fire many small delta events)
      scrollAccumulator.current += e.deltaY;

      if (Math.abs(scrollAccumulator.current) >= THRESHOLD) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        
        // Find current section index based on scrollTop
        const sectionHeight = container.clientHeight;
        const scrollTop = container.scrollTop;
        const currentIndex = Math.round(scrollTop / sectionHeight);
        
        // Calculate next index
        let nextIndex = currentIndex + direction;
        nextIndex = Math.max(0, Math.min(nextIndex, ids.length - 1));

        if (nextIndex !== currentIndex) {
          isScrolling.current = true;
          const targetElement = document.getElementById(ids[nextIndex]);
          
          if (targetElement) {
            // Programmatic smooth scroll
            container.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
            
            // Lock out wheel events while scrolling (adjust time based on transition feel)
            setTimeout(() => {
              isScrolling.current = false;
              scrollAccumulator.current = 0;
            }, 750); 
          } else {
             isScrolling.current = false;
             scrollAccumulator.current = 0;
          }
        } else {
           // Boundary hit (top or bottom)
           scrollAccumulator.current = 0;
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => container.removeEventListener('wheel', handleWheel);
  }, [sectionIds, containerId]);
}
