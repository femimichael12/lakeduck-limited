/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps {
  className?: string; // Tailwind sizes, e.g., "w-10 h-10"
  dark?: boolean;     // Whether to render white duck on black, or black duck on white
}

export default function LakeduckLogo({ className = "w-10 h-10", dark = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} transition-transform duration-300 hover:scale-105`}
      id="lakeduck-logo-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle background */}
      <circle cx="50" cy="50" r="48" fill={dark ? "#000000" : "#ffffff"} />
      
      {/* Elegant Duck/Swan shape based on the second screenshot */}
      <path
        d="M 10 29
           C 10 26.5, 12 26.5, 15 27.5
           C 18 28.5, 21 28.5, 23 30.5
           C 25 21, 31 12, 45 12
           C 51.5 12, 53.5 17, 53.5 26.5
           C 53.5 36, 46 47, 40 57
           C 36 63.5, 34 68.5, 35 73.5
           C 38 85.5, 53 88.5, 91.5 74.5
           C 79 78.5, 66 78.5, 52 73.5
           C 40 68.5, 29 61.5, 21.5 74.5
           C 18.5 79.5, 20.5 86.5, 26.5 90.5
           C 20.5 84.5, 19.5 75.5, 23.5 66.5
           C 27.5 57.5, 35.5 51.5, 40.5 40.5
           C 41 38.5, 39.5 38.5, 36.5 38.5
           C 30.5 38.5, 25.5 38.5, 23.5 31.5
           C 23.5 31.5, 18.5 31.5, 15.5 31.5
           C 12.5 31.5, 10 31.5, 10 29"
        fill={dark ? "#ffffff" : "#000000"}
        stroke={dark ? "#ffffff" : "#000000"}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />

      {/* Embedded Eye (relative to color theme) */}
      <circle cx="32" cy="22" r="2.2" fill={dark ? "#000000" : "#ffffff"} />

      {/* Bill separator split line */}
      <path
        d="M 10 30.2 L 18 30.2"
        stroke={dark ? "#000000" : "#ffffff"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
