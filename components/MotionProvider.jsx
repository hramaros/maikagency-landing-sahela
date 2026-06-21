"use client";

import { MotionConfig } from "framer-motion";

/**
 * Globally honor the user's prefers-reduced-motion setting.
 * With reducedMotion="user", framer-motion automatically disables
 * transform/layout animations (x, y, scale, rotate) while keeping
 * opacity transitions — the WCAG-recommended behavior.
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
