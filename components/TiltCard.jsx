"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* Subtle 3D tilt that follows the mouse (≤ `max` degrees).
   Mouse-only (ignores touch pointers), disabled for reduced-motion,
   writes transform directly (no re-render) throttled to one frame. */
export default function TiltCard({ children, className = "", max = 4 }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();

  const onPointerMove = useCallback(
    (e) => {
      if (reduce || e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(
          2
        )}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      });
    },
    [reduce, max]
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
      style={{
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
