"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "./icons";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <HeroVisualFallback />,
});

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

const stats = [
  { value: "4,9/5", label: "Note moyenne" },
  { value: "+12 000", label: "Clientes choyées" },
  { value: "4", label: "Univers beauté" },
];

const avatars = [
  { src: "/gallery/avatars/a1.jpg", name: "Voahirana" },
  { src: "/gallery/avatars/a2.jpg", name: "Mialy" },
  { src: "/gallery/avatars/a3.jpg", name: "Hanitra" },
  { src: "/gallery/avatars/a4.jpg", name: "Tantely" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  // Only mount the WebGL scene on large screens with motion enabled —
  // saves significant CPU/GPU on phones and respects reduced-motion.
  const [enrich, setEnrich] = useState(false);
  useEffect(() => {
    const big = window.matchMedia("(min-width: 1024px)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnrich(big.matches && motionOk.matches);
    update();
    big.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      big.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Text column */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-luxe text-plum/70 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-deep" />
            </span>
            Salon de beauté · Antananarivo
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl font-semibold leading-[1.04] text-plum sm:text-6xl lg:text-7xl"
          >
            Révélez l'éclat
            <br />
            qui sommeille
            <br />
            <span className="text-gradient-rose">en vous.</span>
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

          {/* Stats */}
          <motion.dl
            variants={item}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-plum/10 pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold text-plum">
                  {s.value}
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
          className="relative h-[360px] w-full sm:h-[460px] lg:h-[600px]"
        >
          {enrich ? (
            <>
              <Scene3D />
              <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-2 text-xs font-medium text-plum/70 shadow-soft">
                Bougez votre souris ✦ scène interactive
              </div>
            </>
          ) : (
            <HeroVisualFallback />
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-plum/25 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-plum/50" />
        </div>
      </div>
    </section>
  );
}
