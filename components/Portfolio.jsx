"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";
import { Heart, Sparkle } from "./icons";

const categories = ["Tout", "Manucure", "Pédicure", "Coiffure", "Maquillage"];

const works = [
  {
    title: "Nail art écaille",
    cat: "Manucure",
    likes: 248,
    ratio: "aspect-[4/5]",
    src: "/gallery/portfolio/manu-ecaille.jpg",
    alt: "Manucure élégante en vernis noir et écaille de tortue sur une main soignée",
  },
  {
    title: "Couleur lavande",
    cat: "Coiffure",
    likes: 312,
    ratio: "aspect-[4/5]",
    src: "/gallery/portfolio/coif-lavande.jpg",
    alt: "Longue chevelure ondulée colorée en lavande, réalisée en salon",
  },
  {
    title: "Regard rosé",
    cat: "Maquillage",
    likes: 421,
    ratio: "aspect-[4/3]",
    src: "/gallery/portfolio/maq-rose.jpg",
    alt: "Maquillage des yeux dans des tons roses et lèvres glossy en cours d'application",
  },
  {
    title: "French nude",
    cat: "Manucure",
    likes: 189,
    ratio: "aspect-[4/3]",
    src: "/gallery/portfolio/manu-nude.jpg",
    alt: "Manucure naturelle en vernis nude rosé posée sur une fourrure blanche",
  },
  {
    title: "Boucles glamour",
    cat: "Coiffure",
    likes: 276,
    ratio: "aspect-[4/5]",
    src: "/gallery/portfolio/coif-boucles.jpg",
    alt: "Mise en forme de boucles soyeuses au fer à boucler doré",
  },
  {
    title: "Rituel spa",
    cat: "Pédicure",
    likes: 154,
    ratio: "aspect-[4/3]",
    src: "/gallery/portfolio/pedi-spa.jpg",
    alt: "Soin spa relaxant aux pierres chaudes et fleurs d'orchidée",
  },
  {
    title: "Éclat naturel",
    cat: "Maquillage",
    likes: 358,
    ratio: "aspect-square",
    src: "/gallery/portfolio/maq-eclat.jpg",
    alt: "Portrait beauté au teint lumineux et mise en beauté naturelle",
  },
  {
    title: "Ongles pailletés",
    cat: "Manucure",
    likes: 203,
    ratio: "aspect-square",
    src: "/gallery/portfolio/manu-paillete.jpg",
    alt: "Manucure couleur perle et argent pailleté sur un pull douillet",
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
              <span className="eyebrow text-rose">Nos réalisations</span>
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
                  type="button"
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
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

        {/* La révélation — before/after interactif */}
        <Reveal delay={0.1}>
          <div className="mt-14">
            <BeforeAfter />
          </div>
        </Reveal>

        {/* Masonry gallery */}
        <motion.div layout className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((w) => (
              <motion.figure
                key={w.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-3xl ${w.ratio}`}
              >
                {/* real photography */}
                <Image
                  src={w.src}
                  alt={w.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* scrim + caption */}
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-plum/85 via-plum/25 to-transparent p-5">
                  <div>
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                      {w.cat}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white drop-shadow-sm">
                      {w.title}
                    </h3>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-white/90">
                    <Heart className="h-4 w-4" />
                    {w.likes}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
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
