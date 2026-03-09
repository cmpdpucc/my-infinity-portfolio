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
            layoutId="profile-container"
            initial={{ opacity: 0, x: -20, borderRadius: 9999 }}
            animate={{ opacity: 1, x: 0, borderRadius: 9999 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
            className="pf-mobile-identity"
            onClick={() => setIsExpanded(true)}
            aria-label="View developer profile"
            type="button"
          >
            <motion.img
              layoutId="profile-avatar"
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
              transition={{ duration: 0.3 }}
            />

            <motion.button
              className="pf-mobile-identity__close"
              onClick={() => setIsExpanded(false)}
              aria-label="Close profile"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <X size={24} />
            </motion.button>

            <motion.div 
              layoutId="profile-container"
              className="pf-mobile-identity__card-container"
              style={{ borderRadius: 24, overflow: 'hidden', padding: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
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
