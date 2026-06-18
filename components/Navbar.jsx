"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "./icons";

const links = [
  { href: "#services", label: "Services", id: "services" },
  { href: "#realisations", label: "Réalisations", id: "realisations" },
  { href: "#avis", label: "Avis", id: "avis" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy — highlight the section currently in view
  useEffect(() => {
    const ids = ["services", "realisations", "avis", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 rounded-full px-5 py-3 transition-all duration-500 sm:px-7 ${
          scrolled
            ? "glass shadow-[0_18px_50px_-24px_rgba(89,41,58,0.5)] mx-4 lg:mx-auto"
            : "bg-transparent"
        }`}
      >
        {/* Wordmark */}
        <a href="#accueil" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-plum text-base font-semibold italic text-gradient-rose font-display shadow-md">
            S
          </span>
          <span className="font-display text-xl font-semibold tracking-wide text-plum">
            Sahela
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-plum/80 md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-rose after:transition-all after:duration-300 ${
                    isActive
                      ? "text-plum after:w-full"
                      : "hover:text-plum after:w-0 hover:after:w-full"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#reserver" className="btn-primary hidden text-sm sm:inline-flex">
            Réserver
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-plum/15 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-plum transition-all duration-300 ${
                  open ? "top-2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-0.5 w-5 bg-plum transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-plum transition-all duration-300 ${
                  open ? "top-2 -rotate-45" : "top-3.5"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mx-4 overflow-hidden rounded-3xl transition-all duration-500 md:hidden ${
          open ? "mt-3 max-h-96 glass shadow-soft" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 transition-colors hover:bg-white/60 ${
                  active === l.id ? "bg-white/50 text-plum" : "text-plum/85"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#reserver"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full justify-center"
            >
              Réserver un rendez-vous
              <ArrowRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
