"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkle } from "./icons";

/* « La révélation » — interactive before/after slider.
   Same photo twice: the "avant" layer is desaturated/dimmed and clipped to the
   left of a draggable divider; sliding it reveals the radiant "après".
   The real control is a full-frame invisible <input type="range">, which gives
   pointer drag, touch and keyboard (arrow keys) support natively. */
export default function BeforeAfter({
  src = "/gallery/portfolio/maq-eclat.jpg",
  alt = "Mise en beauté éclatante réalisée au salon Sahela",
}) {
  const [pos, setPos] = useState(58);
  const [active, setActive] = useState(false);

  return (
    <div>
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-lg transition-shadow duration-500 sm:aspect-[16/8] ${
          active ? "shadow-glow" : ""
        }`}
      >
        {/* Après — pleine couleur, lumière rosée */}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 960px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-rose/15"
        />

        {/* Avant — terne, clippé à gauche de la poignée */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
            style={{ filter: "grayscale(0.9) brightness(0.7) contrast(0.95)" }}
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-ink/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream/90 backdrop-blur">
          Avant
        </span>
        <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-rose to-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
          Après
        </span>

        {/* Divider + poignée */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/85 shadow-[0_0_18px_rgba(225,137,154,0.85)]" />
          <div
            className={`glass-dark absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-cream transition-transform duration-300 ${
              active ? "scale-110" : ""
            }`}
          >
            <Sparkle className="h-5 w-5 text-champagne" />
          </div>
        </div>

        {/* Contrôle réel : range plein cadre (drag + tactile + clavier) */}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          onPointerDown={() => setActive(true)}
          onPointerUp={() => setActive(false)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          aria-label="Comparer la photo avant et après la mise en beauté"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
          style={{ touchAction: "pan-y" }}
        />
      </div>

      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-cream/60">
        <Sparkle className="h-3.5 w-3.5 text-gold" />
        Faites glisser la poignée pour révéler l'éclat
      </p>
    </div>
  );
}
