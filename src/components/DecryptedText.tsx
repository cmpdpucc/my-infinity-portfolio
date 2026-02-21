"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DecryptedText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    // Small delay before starting
    const timeout = setTimeout(startAnimation, 300);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, speed, letters]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-block"
    >
      {displayText}
    </motion.span>
  );
}
