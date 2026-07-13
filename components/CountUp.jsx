"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/* Animated number that counts up the first time it enters the viewport.
   Declarative formatting props (no function props — this component is used
   from Server Components, which can't serialize functions across the
   client boundary): `decimals` renders with a French comma, `thousands`
   groups with fr-FR separators, `prefix`/`suffix` wrap the number.
   Reduced-motion users get the final value immediately. */
export default function CountUp({
  end,
  decimals = 0,
  thousands = false,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? end : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(end);
      return;
    }
    const controls = animate(0, end, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduce, end, duration]);

  let display;
  if (decimals > 0) {
    display = value.toFixed(decimals).replace(".", ",");
  } else if (thousands) {
    display = Math.round(value).toLocaleString("fr-FR");
  } else {
    display = `${Math.round(value)}`;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
