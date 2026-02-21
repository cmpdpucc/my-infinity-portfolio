import { useState, useEffect } from "react";

export function useScrollSpy(selectors: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = selectors[0].replace("#", "");

      // Loop al contrario per trovare la sezione più in basso che ha sorpassato la soglia critica
      for (let i = selectors.length - 1; i >= 0; i--) {
        const element = document.querySelector(selectors[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            currentActiveId = element.id;
            break;
          }
        }
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectors, offset]);

  return activeId;
}
