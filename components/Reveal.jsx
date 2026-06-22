"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}) {
  const MotionTag = motion[as] || motion.div;
  const reduce = useReducedMotion();

  // Respect prefers-reduced-motion: skip the scroll-triggered reveal and show
  // content immediately. `reduce` defaults to false during SSR (no `window`),
  // so this must stay on the same MotionTag instance across hydration — an
  // `animate` mount effect always runs and overwrites any stale SSR-rendered
  // opacity:0 style, whereas switching to a plain element type can leave that
  // style stuck on the reused DOM node through hydration.
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
