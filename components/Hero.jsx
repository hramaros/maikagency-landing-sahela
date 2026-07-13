"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, Sparkle } from "./icons";
import CountUp from "./CountUp";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

/* Lightweight, motion-free decorative orb — used on small screens,
   reduced-motion, and as the 3D loading state. No WebGL cost. */
function HeroVisualFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="relative h-72 w-72 sm:h-80 sm:w-80">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose via-rosegold to-champagne shadow-glow" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-white/70 via-transparent to-transparent mix-blend-overlay" />
        <div className="absolute -right-2 top-8 h-12 w-12 rounded-full bg-lilac/80 blur-[2px]" />
        <div className="absolute -left-3 bottom-12 h-8 w-8 rounded-full bg-blush shadow-sm" />
        <div className="absolute right-10 -bottom-2 h-5 w-5 rounded-full bg-champagne shadow-sm" />
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* Headline words rise and de-blur one by one — the text itself "se révèle". */
const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const headline = [
  ["Révélez", "l'éclat"],
  ["qui", "sommeille"],
];

const stats = [
  { end: 4.9, decimals: 1, suffix: "/5", label: "Note moyenne" },
  { end: 12000, thousands: true, prefix: "+", label: "Clientes choyées" },
  { end: 4, label: "Univers beauté" },
];

const avatars = [
  { src: "/gallery/avatars/a1.jpg", name: "Voahirana" },
  { src: "/gallery/avatars/a2.jpg", name: "Mialy" },
  { src: "/gallery/avatars/a3.jpg", name: "Hanitra" },
  { src: "/gallery/avatars/a4.jpg", name: "Tantely" },
];

/* Decorative sparkles drifting over the hero (pure CSS twinkle). */
const sparkles = [
  { pos: "left-[5%] top-[24%] h-5 w-5 text-rose/50", delay: "0s" },
  { pos: "left-[40%] top-[13%] h-4 w-4 text-gold/70", delay: "1.4s" },
  { pos: "right-[10%] top-[18%] h-6 w-6 text-champagne", delay: "0.7s" },
  { pos: "right-[32%] bottom-[22%] h-4 w-4 text-mauve/60", delay: "2.2s" },
  { pos: "left-[13%] bottom-[15%] h-5 w-5 text-rosegold/70", delay: "2.9s" },
  { pos: "right-[4%] bottom-[40%] h-3.5 w-3.5 text-rose/40", delay: "3.6s" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  // Mount the WebGL scene whenever motion is allowed — the lipstick's
  // entrance animation is the point of the hero on every screen size,
  // it only falls back to the static orb when reduced-motion is set.
  const [enrich, setEnrich] = useState(false);
  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnrich(motionOk.matches);
    update();
    motionOk.addEventListener("change", update);
    return () => motionOk.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="accueil"
      className="grain relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* Warm gradient base */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 10%, #fbe9ec 0%, #fbf6f1 42%, #f3e9e0 100%)",
        }}
      />
      {/* Aurora blobs */}
      <div className="aurora left-[-6rem] top-24 h-80 w-80 animate-drift bg-rose/45" />
      <div
        className="aurora right-[-4rem] top-40 h-96 w-96 animate-drift bg-champagne/50"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="aurora bottom-0 left-1/3 h-72 w-72 animate-drift bg-lilac/60"
        style={{ animationDelay: "-12s" }}
      />

      {/* Twinkling sparkles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {sparkles.map((s) => (
          <span
            key={s.pos}
            className={`sparkle-float absolute ${s.pos}`}
            style={{ animationDelay: s.delay }}
          >
            <Sparkle className="h-full w-full" />
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Text column */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1"
        >
          <motion.h1
            variants={headlineContainer}
            className="font-display text-5xl font-semibold leading-[1.04] text-plum sm:text-6xl lg:text-7xl"
          >
            {headline.map((line) => (
              <span key={line.join(" ")} className="block">
                {line.map((word, wi) => (
                  <Fragment key={word}>
                    <motion.span
                      variants={wordItem}
                      className="inline-block will-change-transform"
                    >
                      {word}
                    </motion.span>
                    {/* real space in the DOM — screen readers & copy/paste */}
                    {wi < line.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            ))}
            <motion.span
              variants={wordItem}
              className="text-shimmer-gold inline-block will-change-transform"
            >
              en vous.
            </motion.span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-lg leading-relaxed text-plum/70"
          >
            Manucure, pédicure, coiffure et maquillage. Une parenthèse de douceur
            où chaque détail est pensé pour sublimer votre beauté naturelle.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#reserver" className="btn-primary">
              Réserver un rendez-vous
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#realisations" className="btn-ghost text-plum">
              Voir nos réalisations
            </a>
          </motion.div>

          {/* Social proof — avatars + rating above the fold */}
          <motion.div
            variants={item}
            className="mt-9 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {avatars.map((a) => (
                <span
                  key={a.src}
                  className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-cream"
                >
                  <Image
                    src={a.src}
                    alt={`Cliente ${a.name}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <div className="text-sm text-plum/70">
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} filled className="h-4 w-4 text-gold" />
                ))}
              </div>
              <span className="mt-0.5 block">Recommandé par +320 clientes</span>
            </div>
          </motion.div>

          {/* Stats — count up on first view */}
          <motion.dl
            variants={item}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-plum/10 pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold text-plum">
                  <CountUp
                    end={s.end}
                    decimals={s.decimals}
                    thousands={s.thousands}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-plum/70">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* 3D column */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative order-1 h-[360px] w-full sm:h-[460px] lg:order-2 lg:h-[600px]"
          aria-hidden="true"
        >
          {/* Luminous rotating halo — the lipstick's stage */}
          <div className="halo-ring inset-[4%] sm:inset-[8%]" />
          {enrich ? <Scene3D /> : <HeroVisualFallback />}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-plum/45">
          Découvrir
        </span>
        <span className="scroll-cue-track block rounded-full" />
      </div>
    </section>
  );
}
