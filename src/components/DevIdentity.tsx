"use client";

import React from "react";
import Magnet from "@/components/Magnet";
import DecryptedText from "@/components/DecryptedText";
import { motion } from "framer-motion";
import { Github, Linkedin, Code } from "lucide-react";

/**
 * DevIdentity — Developer branding card.
 *
 * Renders: name, title, tagline, CTA button, social links.
 * Used in two contexts:
 * - Desktop: inside the sidebar (fixed left column)
 * - Mobile/Tablet: as a hero header inside the scroll container
 *
 * The `variant` prop controls layout adaption:
 * - "sidebar": vertical layout with spacious margins (desktop)
 * - "hero": compact horizontal/centered layout (mobile)
 */

interface DevIdentityProps {
  variant?: "sidebar" | "hero";
}

export default function DevIdentity({ variant = "sidebar" }: DevIdentityProps) {
  return (
    <div className={`pf-identity pf-identity--${variant}`}>
      <div className="pf-identity__info">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="pf-identity__name"
        >
          <a href="/">Developer Name</a>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pf-identity__title"
        >
          <DecryptedText text="Senior Software Engineer & Product Designer" speed={60} />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pf-identity__tagline"
        >
          I build pixel-perfect, engaging, and accessible digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pf-identity__cta"
        >
          <button className="pf-button pf-button--primary">Download Resume</button>
        </motion.div>
      </div>

      {/* Social Links */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="pf-identity__social"
        aria-label="Social media"
      >
        <li><Magnet><a href="#" aria-label="Github"><Github size={20} /></a></Magnet></li>
        <li><Magnet><a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a></Magnet></li>
        <li><Magnet><a href="#" aria-label="CodePen"><Code size={20} /></a></Magnet></li>
      </motion.ul>
    </div>
  );
}
