"use client";

import React, { useState, useEffect } from "react";
import { Code2, Globe, Cpu, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { EXPERIENCES, type Experience } from "@/data/experiences.data";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import AnimatedTerminal from "@/components/AnimatedTerminal";

/**
 * ExperienceSection — Staggered Terminal Timeline.
 *
 * Z-pattern: text ↔ terminal alternate sides on desktop.
 * Mobile: text ALWAYS first, terminal second (via CSS order).
 * Stagger delay: text appears → 400ms → terminal animation starts.
 */

const ICON_MAP: Record<Experience["icon"], React.ReactNode> = {
  code: <Code2 size={16} />,
  globe: <Globe size={16} />,
  cpu: <Cpu size={16} />,
  smartphone: <Smartphone size={16} />,
};

function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  const [ref, isVisible] = useScrollReveal(0.2);
  const [isTerminalReady, setIsTerminalReady] = useState(false);
  const isEven = index % 2 === 0;

  // Stagger: terminal starts 400ms after text becomes visible
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setIsTerminalReady(true), 400);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const visibilityClass = isVisible
    ? "pf-exp-timeline__left--visible"
    : "pf-exp-timeline__left--hidden";

  const textBlock = (
    <div className={`pf-exp-timeline__text pf-exp-timeline__text--${isEven ? "left" : "right"}`}>
      <div className="pf-exp-timeline__category">
        {ICON_MAP[experience.icon]}
        {experience.category}
      </div>
      <div className="pf-exp-timeline__period">{experience.period}</div>
      <h3 className="pf-exp-timeline__title">{experience.title}</h3>
      <p className="pf-exp-timeline__description">{experience.description}</p>
    </div>
  );

  const terminalBlock = (
    <div className={`pf-exp-timeline__terminal pf-exp-timeline__terminal--${isEven ? "right" : "left"}`}>
      <AnimatedTerminal feature={experience} isVisible={isTerminalReady} />
    </div>
  );

  // Connector node — now position:absolute, centered on dashed line
  const connector = (
    <div className="pf-exp-timeline__connector">
      <div className="pf-exp-timeline__node">
        <div className={`pf-exp-timeline__node-dot ${isVisible ? "pf-exp-timeline__node-dot--active" : ""}`} />
      </div>
    </div>
  );

  /*
   * Layout logic:
   * isEven (0, 2, 4...): left = TEXT,     right = TERMINAL (text-first)
   * isOdd  (1, 3, 5...): left = TERMINAL, right = TEXT     (terminal-first)
   *
   * On mobile, CSS order forces text always before terminal regardless
   * of which div it's in. On desktop, order is unset = natural flow.
   */

  // Mobile order classes
  const leftOrderClass = isEven
    ? "pf-exp-timeline__left--text-first"      // text is in left → order:1
    : "pf-exp-timeline__left--terminal-first";  // terminal is in left → order:2 (mobile) / unset (desktop)

  const rightOrderClass = isEven
    ? "pf-exp-timeline__right--text-first"      // terminal in right → order:2
    : "pf-exp-timeline__right--terminal-first"; // text in right → order:1 (mobile) / unset (desktop)

  // Stagger: terminal side gets pushed down on desktop
  const leftStagger = !isEven ? "pf-exp-timeline__left--stagger" : "";  // odd: terminal in left → stagger down
  const rightStagger = isEven ? "pf-exp-timeline__right--stagger" : ""; // even: terminal in right → stagger down

  return (
    <div ref={ref} className="pf-exp-timeline__item">
      {connector}

      {/* Left half */}
      <div className={`pf-exp-timeline__left ${visibilityClass} ${leftOrderClass} ${leftStagger}`}>
        {isEven ? textBlock : terminalBlock}
      </div>

      {/* Right half */}
      <div
        className={`pf-exp-timeline__right ${visibilityClass} ${rightOrderClass} ${rightStagger}`}
        style={{ transitionDelay: "150ms" }}
      >
        {isEven ? terminalBlock : textBlock}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <div className="pf-section-content pf-section-content--scrollable">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pf-section__title"
      >
        Experience
      </motion.h2>

      <div className="pf-exp-timeline">
        <div className="pf-exp-timeline__line" />
        <div className="pf-exp-timeline__items">
          {EXPERIENCES.map((exp, idx) => (
            <TimelineItem key={exp.id} experience={exp} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
