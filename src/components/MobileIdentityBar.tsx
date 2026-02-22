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
      {/* Collapsed bar — top-left pill */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="pf-mobile-identity"
        onClick={() => setIsExpanded(true)}
        aria-label="View developer profile"
        type="button"
      >
        <img
          src={avatarUrl}
          alt={`${name} avatar`}
          className="pf-mobile-identity__avatar"
        />
        <span className="pf-mobile-identity__name">
          <DecryptedText text={name} speed={50} />
        </span>
      </motion.button>

      {/* Expanded fullscreen modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="pf-mobile-identity__modal"
            initial={{ opacity: 0, scale: 0.3, originX: 0, originY: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              className="pf-mobile-identity__close"
              onClick={() => setIsExpanded(false)}
              aria-label="Close profile"
              type="button"
            >
              <X size={24} />
            </button>

            <div className="pf-mobile-identity__card-container">
              <ProfileCard
                avatarUrl={avatarUrl}
                name={name}
                title={title}
                handle={handle}
                status={status}
                contactText="Download Resume"
                enableTilt={true}
                enableMobileTilt={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(59, 130, 246, 0.35)"
                behindGlowSize="30%"
                innerGradient="linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(59, 130, 246, 0.12) 100%)"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
