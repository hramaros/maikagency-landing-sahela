"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { NailPolish, Foot, Scissors, Lipstick, Heart, Sparkle } from "./icons";

const categories = ["Tout", "Manucure", "Pédicure", "Coiffure", "Maquillage"];

const motifByCat = {
  Manucure: NailPolish,
  Pédicure: Foot,
  Coiffure: Scissors,
  Maquillage: Lipstick,
};

const works = [
  {
    title: "Nail art floral",
    cat: "Manucure",
    likes: 248,
    ratio: "aspect-[4/5]",
    bg: "radial-gradient(120% 120% at 20% 10%, #f7d9de 0%, #e1899a 55%, #c46b7c 100%)",
  },
  {
    title: "Balayage caramel",
    cat: "Coiffure",
    likes: 312,
    ratio: "aspect-square",
    bg: "radial-gradient(120% 120% at 80% 0%, #ecd2b0 0%, #c98a76 60%, #34203a 100%)",
  },
  {
    title: "Make-up mariée",
    cat: "Maquillage",
    likes: 421,
    ratio: "aspect-[4/5]",
    bg: "radial-gradient(120% 120% at 30% 20%, #fbe9ec 0%, #e1899a 45%, #c98a76 100%)",
  },
  {
    title: "French chromé",
    cat: "Manucure",
    likes: 189,
    ratio: "aspect-[4/3]",
    bg: "linear-gradient(135deg, #f3e9e0 0%, #ecd2b0 45%, #d8b08a 100%)",
  },
  {
    title: "Chignon bohème",
    cat: "Coiffure",
    likes: 276,
    ratio: "aspect-[4/5]",
    bg: "radial-gradient(120% 120% at 70% 20%, #f7d9de 0%, #c98a76 60%, #241526 100%)",
  },
  {
    title: "Spa & vernis nude",
    cat: "Pédicure",
    likes: 154,
    ratio: "aspect-square",
    bg: "radial-gradient(120% 120% at 20% 80%, #fbe9ec 0%, #ecd2b0 55%, #c98a76 100%)",
  },
  {
    title: "Smokey doré",
    cat: "Maquillage",
    likes: 358,
    ratio: "aspect-[4/3]",
    bg: "linear-gradient(135deg, #34203a 0%, #c46b7c 55%, #d8b08a 100%)",
  },
  {
    title: "Ongles bijoux",
    cat: "Manucure",
    likes: 203,
    ratio: "aspect-[4/5]",
    bg: "radial-gradient(120% 120% at 80% 80%, #e1899a 0%, #c98a76 55%, #241526 100%)",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("Tout");
  const filtered =
    active === "Tout" ? works : works.filter((w) => w.cat === active);

  return (
    <section id="realisations" className="relative overflow-hidden bg-plum py-24 text-cream sm:py-32">
      {/* soft glow */}
      <div className="aurora left-1/4 top-10 h-72 w-72 bg-rose/25" />
      <div className="aurora bottom-10 right-10 h-80 w-80 bg-rosegold/20" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-luxe text-rose">
                Nos réalisations
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Nos plus belles
                <span className="text-gradient-cream"> œuvres</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg text-cream/70">
                Un aperçu du travail de nos artistes. Chaque création est unique,
                pensée pour révéler la personnalité de celle qui la porte.
              </p>
            </Reveal>
          </div>

          {/* Filters */}
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active === c
                      ? "bg-cream text-plum shadow-lg"
                      : "border border-cream/20 text-cream/75 hover:border-cream/50 hover:text-cream"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Masonry gallery */}
        <motion.div layout className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((w) => {
              const Motif = motifByCat[w.cat] || Sparkle;
              return (
                <motion.figure
                  key={w.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-3xl ${w.ratio}`}
                >
                  {/* gradient artwork */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ background: w.bg }}
                  />
                  {/* grain */}
                  <div className="grain absolute inset-0" />
                  {/* faint motif */}
                  <Motif className="absolute -bottom-6 -right-6 h-40 w-40 text-white/15" />

                  {/* scrim + caption */}
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-plum/80 via-plum/20 to-transparent p-5">
                    <div>
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                        {w.cat}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                        {w.title}
                      </h3>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm text-white/90">
                      <Heart className="h-4 w-4" />
                      {w.likes}
                    </span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex items-center justify-center gap-3 text-cream/70">
            <Sparkle className="h-4 w-4 text-rose" />
            <span className="text-sm">
              Retrouvez toutes nos créations sur Instagram{" "}
              <a href="#contact" className="font-semibold text-cream underline-offset-4 hover:underline">
                @sahela.beaute
              </a>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
