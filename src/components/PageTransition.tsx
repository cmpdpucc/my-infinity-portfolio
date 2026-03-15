"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * PageTransition — Wrapper component for staggered page content animations.
 * 
 * This component provides a smooth entrance animation for page content,
 * complementing the page-level View Transitions API.
 */

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any, // Apple-style cubic-bezier
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(4px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* 
        We use motion.div as a wrapper for children if they are not already motion elements.
        If children are motion elements, they can inherit the variants.
      */}
      {children}
    </motion.div>
  );
}

/**
 * TransitionItem — Helper to wrap individual elements for staggered entrance.
 */
export function TransitionItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
