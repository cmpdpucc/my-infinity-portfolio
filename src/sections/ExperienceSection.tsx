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
 * Each experience entry alternates text ↔ terminal in a staggered layout
 * with a central dashed connector line (desktop only).
 *
 * Text appears first; terminal animation starts 400ms later (stagger delay).
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

  // Connector node between the halves (flex child, not absolute)
  const connector = (
    <div className="pf-exp-timeline__connector">
      <div className="pf-exp-timeline__node">
        <div className={`pf-exp-timeline__node-dot ${isVisible ? "pf-exp-timeline__node-dot--active" : ""}`} />
      </div>
      <div className="pf-exp-timeline__connector-line" />
    </div>
  );

  return (
    <div ref={ref} className="pf-exp-timeline__item">
      {/* Left half */}
      <div
        className={`pf-exp-timeline__left ${visibilityClass} ${!isEven ? "pf-exp-timeline__left--stagger" : ""}`}
      >
        {isEven ? textBlock : terminalBlock}
      </div>

      {connector}

      {/* Right half */}
      <div
        className={`pf-exp-timeline__right ${visibilityClass} ${isEven ? "pf-exp-timeline__right--stagger" : ""}`}
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
