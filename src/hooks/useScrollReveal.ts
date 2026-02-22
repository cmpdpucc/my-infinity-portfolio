"use client";

import { useState, useEffect, useRef, type RefObject } from "react";

/**
 * useScrollReveal — IntersectionObserver hook for scroll-triggered animations.
 *
 * Returns [ref, isVisible]. Once the element enters the viewport past the
 * threshold, `isVisible` latches to `true` permanently (no reverse trigger).
 *
 * @param threshold Visibility fraction to trigger (0–1). Default 0.3.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.3
): [RefObject<T | null>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Latch — no further observations needed
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
