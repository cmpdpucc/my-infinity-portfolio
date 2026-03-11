"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";
import ProfileCard from "@/components/ProfileCard";

/**
 * IdentityBar — Identity pill for navigation.
 *
 * Shows a mini avatar + developer name.
 * On Desktop: Expands to a dropdown ProfileCard. Closes on outside click.
 * On Mobile: Expands to a fullscreen modal with blur and close button.
 */

interface IdentityBarProps {
  avatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status: string;
}

// Custom hook for clicking outside to close
function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function IdentityBar({ avatarUrl, name, title, handle, status }: IdentityBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsExpanded(false);
    setAnimationKey((prev) => prev + 1);
  };

  const toggleDropdown = () => {
    if (isExpanded) {
      closeDropdown();
    } else {
      setIsExpanded(true);
    }
  };

  useOnClickOutside(containerRef, () => {
    if (isExpanded) closeDropdown();
  });

  return (
    <div className="pf-identity" ref={containerRef}>
      <motion.button
        className={`pf-identity__trigger ${isExpanded ? "pf-identity__trigger--active" : ""}`}
        onClick={toggleDropdown}
        aria-label="View developer profile"
        aria-expanded={isExpanded}
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <img
          src={avatarUrl}
          alt={`${name} avatar`}
          className="pf-identity__avatar"
        />
        <span className="pf-identity__name">
          <DecryptedText key={animationKey} text={name} speed={50} />
        </span>
      </motion.button>

      {/* Expanded view: Handles both desktop absolute dropdown and mobile fixed modal */}
      <AnimatePresence>
        {isExpanded && (
          <div className="pf-identity__expanded">
            {/* Backdrop: Only visible on mobile via CSS */}
            <motion.div
              className="pf-identity__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeDropdown}
            />

            {/* Close Button: Only visible on mobile via CSS */}
            <motion.button
              className="pf-identity__close"
              onClick={closeDropdown}
              aria-label="Close profile"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <X size={24} />
            </motion.button>

            {/* Profile Card Container */}
            <motion.div 
              className="pf-identity__card-container"
              style={{ transformOrigin: "top left" }}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 25 }}
            >
              <ProfileCard
                avatarUrl={avatarUrl}
                name={name}
                title={title}
                handle={handle}
                status={status}
                contactText="Download Resume"
                enableTilt={false} // Disable 3D tilt as per desktop popover preference
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(6, 23, 50, 0.35)"
                behindGlowSize="15%"
                innerGradient="linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(59, 130, 246, 0.12) 100%)"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
