"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";
import ProfileCard from "@/components/ProfileCard";

/**
 * MobileIdentityBar — Floating identity pill for mobile/tablet viewports.
 *
 * Shows a mini avatar + developer name in top-left corner.
 * On click, expands to a fullscreen ProfileCard modal.
 * Hidden on desktop (>= 64em) via CSS.
 */

interface MobileIdentityBarProps {
  avatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status: string;
}

export default function MobileIdentityBar({ avatarUrl, name, title, handle, status }: MobileIdentityBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.button
            key="collapsed-pill"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, type: "tween", ease: "easeInOut" }}
            className="pf-mobile-identity"
            onClick={() => setIsExpanded(true)}
            aria-label="View developer profile"
            type="button"
          >
            <motion.img
              src={avatarUrl}
              alt={`${name} avatar`}
              className="pf-mobile-identity__avatar"
            />
            <motion.span className="pf-mobile-identity__name">
              <DecryptedText text={name} speed={50} />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded fullscreen modal */}
      <AnimatePresence>
        {isExpanded && (
          <div className="pf-mobile-identity__modal">
            <motion.div
              className="pf-mobile-identity__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />

            <motion.button
              className="pf-mobile-identity__close"
              onClick={() => setIsExpanded(false)}
              aria-label="Close profile"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2, delay: 0.15, ease: "easeOut" }}
            >
              <X size={24} />
            </motion.button>

            <motion.div 
              className="pf-mobile-identity__card-container"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, type: "tween", ease: "easeOut" }}
            >
              <ProfileCard
                avatarUrl={avatarUrl}
                name={name}
                title={title}
                handle={handle}
                status={status}
                contactText="Download Resume"
                enableTilt={false}
                enableMobileTilt={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(6, 23, 50, 0.35)"
                behindGlowSize="15%"
                innerGradient="linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(59, 130, 246, 0.12) 100%)"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
