"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone } from "./icons";

export default function MobileBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("accueil");
    const reserver = document.getElementById("reserver");
    if (!hero || !reserver) return;

    let heroVisible = true;
    let reserverVisible = false;
    const update = () => setVisible(!heroVisible && !reserverVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === hero) heroVisible = entry.isIntersecting;
          if (entry.target === reserver) reserverVisible = entry.isIntersecting;
        });
        update();
      },
      { rootMargin: "-15% 0px -15% 0px" }
    );

    observer.observe(hero);
    observer.observe(reserver);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
        >
          <div className="glass-dark mx-auto flex max-w-md items-center gap-2.5 rounded-full p-2 shadow-lg">
            <a
              href="tel:+261340000000"
              aria-label="Appeler le salon Sahela"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-cream transition hover:border-rose hover:text-rose"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href="#reserver"
              className="btn-primary h-12 flex-1 justify-center text-sm"
            >
              Réserver un rendez-vous
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
