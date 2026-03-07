"use client";

import React from 'react';

/**
 * ExploreIcon — Diagonal arrow SVG icon extracted into its own component
 * for clean separation and reuse.
 */
export const ExploreIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M3.33334 12.6667L12.6667 3.33333M12.6667 3.33333H4.66667M12.6667 3.33333V11.3333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
