"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { ChevronDown, Sparkle, ArrowRight } from "./icons";

const faqs = [
  {
    q: "Comment réserver un rendez-vous ?",
    a: "En quelques clics via le formulaire en ligne, ou par téléphone. Nous vous confirmons votre créneau très vite, avec le sourire. Les demandes sont traitées du lundi au samedi.",
  },
  {
    q: "Faut-il réserver à l'avance ?",
    a: "C'est vivement recommandé, surtout le week-end et en période de fêtes. Nous accueillons aussi les visites spontanées selon les disponibilités du moment.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Espèces, Mvola, Orange Money et Airtel Money. Le règlement se fait sur place, à la fin de votre prestation.",
  },
  {
    q: "Combien de temps dure une prestation ?",
    a: "Comptez environ 45 min à 1 h pour une manucure, 1 h pour une pédicure spa, 2 à 3 h pour une couleur ou un balayage, et 45 min à 1 h 30 pour un maquillage selon l'occasion.",
  },
  {
    q: "Proposez-vous des forfaits et des cartes cadeaux ?",
    a: "Oui ! Notre forfait complet réunit plusieurs soins à tarif doux, et nos cartes cadeaux sont parfaites pour offrir une parenthèse beauté à celles que vous aimez.",
  },
  {
    q: "Utilisez-vous des produits adaptés à toutes les peaux ?",
    a: "Absolument. Nous sélectionnons des marques premium, douces et adaptées à chaque type de peau, d'ongles et de cheveux, dans le respect d'une hygiène irréprochable.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="aurora right-[-4rem] top-20 h-72 w-72 bg-blush/50" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow text-rose-deep">Questions fréquentes</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-5xl">
              On vous dit
              <span className="text-gradient-rose"> tout</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-plum/65">
              Tout ce qu'il faut savoir avant votre visite. Une autre question ?
              Écrivez-nous, on adore échanger.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={0.04 * i}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white/70 backdrop-blur transition-colors duration-300 ${
                    isOpen ? "border-rose/40 shadow-sm" : "border-plum/10"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <span className="font-medium text-plum sm:text-lg">{f.q}</span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          isOpen ? "bg-rose text-white" : "bg-blush text-rose-deep"
                        }`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-plum/70">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-3xl border border-plum/10 bg-white/60 p-6 text-center sm:flex-row sm:gap-5 sm:text-left">
            <Sparkle className="h-6 w-6 shrink-0 text-rose" />
            <p className="flex-1 text-plum/75">
              Vous ne trouvez pas votre réponse ? Notre équipe vous répond avec
              plaisir.
            </p>
            <a href="#reserver" className="btn-primary shrink-0 text-sm">
              Nous contacter
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
