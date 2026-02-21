"use client";

import React from "react";
import { motion } from "framer-motion";

interface DockItem {
  id: string;
  label: string;
}

interface BottomDockProps {
  items: DockItem[];
  activeId: string;
}

export default function BottomDock({ items, activeId }: BottomDockProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="pf-dock" aria-label="Section navigation">
      <ul className="pf-dock__list">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="pf-dock__item">
              <a
                href={`#${item.id}`}
                className={`pf-dock__link ${isActive ? "pf-dock__link--active" : ""}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-indicator"
                    className="pf-dock__indicator"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="pf-dock__label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
