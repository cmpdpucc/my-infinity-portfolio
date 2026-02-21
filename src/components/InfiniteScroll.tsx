"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InfiniteScroll({ items }: { items: string[] }) {
  // Duplichiamo per effetto scroll infinito
  const duplicatedItems = [...items, ...items];

  return (
    <div style={{ overflow: "hidden", display: "flex", gap: "1rem" }}>
      <motion.div
        style={{ display: "flex", gap: "1rem" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          bounce: 0,
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            style={{
              padding: "8px 16px",
              borderRadius: "99px",
              background: "rgba(37, 99, 235, 0.1)",
              color: "var(--color-cta)",
              fontWeight: 600,
              fontSize: "0.875rem",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
