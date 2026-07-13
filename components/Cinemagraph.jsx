"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { Sparkle } from "./icons";

/* Full-bleed cinematic band — a slow, scroll-linked Ken Burns drift over the
   salon ambiance photo, sandwiched between soft colour seams so the page flows
   cream → dark → plum (into Portfolio) without hard edges.
   Reduced-motion gets a static, gently zoomed frame. */
export default function Cinemagraph() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      ref={ref}
      aria-label="L'expérience Sahela"
      className="grain relative h-[420px] overflow-hidden sm:h-[520px]"
    >
      {/* Ken Burns layer */}
      <motion.div
        aria-hidden="true"
        style={reduce ? { scale: 1.12 } : { scale, y }}
        className="absolute -inset-[6%]"
      >
        <Image
          src="/gallery/salon-ambiance.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Tint for contrast + colour seams (cream above, plum below) */}
      <div aria-hidden="true" className="absolute inset-0 bg-plum/50" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-plum to-transparent"
      />

      {/* Quote */}
      <div className="relative z-10 flex h-full items-center justify-center px-5">
        <Reveal>
          <blockquote className="max-w-2xl text-center">
            <Sparkle className="mx-auto h-6 w-6 text-champagne" />
            <p className="mt-5 font-display text-3xl font-medium leading-snug text-white drop-shadow-md sm:text-4xl">
              « Ici, le temps s'arrête — et votre éclat prend toute la lumière. »
            </p>
            <footer className="mt-5 text-xs uppercase tracking-[0.3em] text-cream/75">
              L'expérience Sahela
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
