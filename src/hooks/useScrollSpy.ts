import { useState, useEffect } from "react";

export function useScrollSpy(selectors: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = selectors.map((sel) => document.querySelector(sel));

    elements.forEach((element) => {
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id);
              }
            });
          },
          { rootMargin: `-${offset}px 0px 0px 0px`, threshold: 0.6 }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [selectors, offset]);

  return activeId;
}
