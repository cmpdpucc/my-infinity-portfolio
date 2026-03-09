"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Props for the ProjectCard component.
 *
 * Designed as a lightweight replacement for PixelCard inside BlurSlider —
 * no Canvas, no requestAnimationFrame loop. Pure CSS + Framer Motion.
 */
export interface ProjectCardProps {
  /** Project display title */
  title: string;
  /** Short description (revealed on hover, always visible on mobile) */
  description: string;
  /** Primary image URL for the card background */
  imageUrl: string;
  /** CSS gradient string used as fallback when image fails to load */
  gradient: string;
  /** Tech stack or category tags rendered as pills */
  tags: string[];
}

/** Framer Motion animation variants for the description text */
const descriptionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: { opacity: 0, y: 4, transition: { duration: 0.2 } },
} as const;

/**
 * ProjectCard — Lightweight project showcase card for use inside BlurSlider.
 *
 * Features:
 * - Gradient fallback if image fails to load (`onError` handler)
 * - Glassmorphism info panel with title, description, tags
 * - Hover: description reveal via AnimatePresence + subtle scale lift
 * - Respects `prefers-reduced-motion` (handled via CSS in `_project-card.scss`)
 * - No Canvas, no rAF — zero overhead in carousel context
 *
 * @param props - {@link ProjectCardProps}
 */
export default function ProjectCard({
  title,
  description,
  imageUrl,
  gradient,
  tags,
}: ProjectCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImgError = useCallback(() => {
    setImgFailed(true);
  }, []);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient fallback — always rendered behind the image */}
      <div
        className="project-card__gradient"
        style={{ background: gradient }}
      />

      {/* Primary image — hidden on error, replaced by gradient */}
      {!imgFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`${title} project screenshot`}
          className="project-card__image"
          loading="lazy"
          onError={handleImgError}
        />
      )}

      {/* Dark overlay for text contrast */}
      <div className="project-card__overlay" />

      {/* Info panel — glass effect */}
      <div className="project-card__info">
        <h3 className="project-card__title">{title}</h3>

        <AnimatePresence>
          {isHovered && (
            <motion.p
              className="project-card__description"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ opacity: 1, transform: "none" }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Mobile: description always visible (CSS handles opacity) */}
        {!isHovered && (
          <p className="project-card__description">
            {description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="project-card__tags">
            {tags.map((tag) => (
              <span key={tag} className="project-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
