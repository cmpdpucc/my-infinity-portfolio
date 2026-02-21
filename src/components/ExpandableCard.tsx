"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableCardProps {
  title: string;
  subtitle: string;
  details: string | React.ReactNode;
  children?: React.ReactNode;
  tags?: string[];
}

export default function ExpandableCard({ title, subtitle, details, children, tags }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* CARD BASE - INLINE */}
      <motion.div 
        layoutId={`card-${title}`} 
        onClick={() => setIsOpen(true)}
        className="pf-card"
        style={{ cursor: "pointer", position: "relative" }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h3 layoutId={`title-${title}`} style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text)" }}>
          {title}
        </motion.h3>
        <motion.p layoutId={`subtitle-${title}`} style={{ color: "var(--color-text-muted)", marginTop: "0.25rem", fontSize: "0.9rem" }}>
          {subtitle}
        </motion.p>
        
        {tags && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1rem 0" }}>
            {tags.map(tag => (
              <span key={tag} style={{ fontSize: "0.75rem", background: "rgba(59, 130, 246, 0.1)", color: "var(--color-cta)", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--color-cta)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          Click to expand experience
        </p>
      </motion.div>

      {/* OVERLAY E CARD ESPANSA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-xl)"
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              layoutId={`card-${title}`}
              className="pf-card"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "700px",
                maxHeight: "85vh",
                overflowY: "auto",
                backgroundColor: "var(--color-surface)",
                cursor: "default",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                border: "1px solid var(--color-border)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <motion.h3 layoutId={`title-${title}`} style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.02em" }}>
                        {title}
                    </motion.h3>
                    <motion.p layoutId={`subtitle-${title}`} style={{ color: "var(--color-cta)", fontSize: "1.1rem", marginTop: "0.25rem", fontWeight: 500 }}>
                        {subtitle}
                    </motion.p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "var(--color-text)", cursor: "pointer", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              
              <div style={{ marginTop: "var(--space-2xl)", color: "var(--color-text)", lineHeight: 1.8, fontSize: "1.05rem" }}>
                {details}
              </div>
              
              <div style={{ marginTop: "var(--space-xl)" }}>
                  {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
