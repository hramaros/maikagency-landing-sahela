import Reveal from "./Reveal";
import { Star } from "./icons";

const reviews = [
  {
    name: "Voahirana R.",
    service: "Manucure semi-permanente",
    initials: "VR",
    text: "Un vrai moment de détente du début à la fin. Ma manucure a tenu plus de trois semaines sans un éclat. Je recommande les yeux fermés !",
    grad: "from-rose to-rosegold",
  },
  {
    name: "Mialy A.",
    service: "Balayage & soin",
    initials: "MA",
    text: "Le balayage de mes rêves. L'équipe a parfaitement compris ce que je voulais, et l'accueil était tout simplement adorable. Je ne vais plus ailleurs.",
    grad: "from-rosegold to-champagne",
  },
  {
    name: "Hanitra T.",
    service: "Maquillage mariée",
    initials: "HT",
    text: "Un maquillage de mariée sublime qui a tenu toute la journée. J'étais resplendissante sur toutes les photos. Merci infiniment pour votre talent.",
    grad: "from-rose-deep to-rose",
  },
];

export default function Testimonials() {
  return (
    <section id="avis" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-luxe text-rose-deep">
              Elles nous adorent
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-5xl">
              La beauté qui fait
              <span className="text-gradient-rose"> sourire</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-5 flex items-center justify-center gap-2 text-plum/70">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} filled className="h-5 w-5 text-gold" />
                ))}
              </div>
              <span className="text-sm font-medium">
                4,9 / 5 — plus de 320 avis vérifiés
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-[2rem] border border-plum/10 bg-white/70 p-8 shadow-[0_18px_50px_-30px_rgba(89,41,58,0.4)] transition-transform duration-500 hover:-translate-y-1.5">
                <span className="font-display text-6xl leading-none text-rose/40">
                  &ldquo;
                </span>
                <div className="-mt-4 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} filled className="h-4 w-4 text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-plum/75">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-plum/10 pt-5">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${r.grad} text-sm font-semibold text-white`}
                  >
                    {r.initials}
                  </span>
                  <span>
                    <span className="block font-semibold text-plum">{r.name}</span>
                    <span className="block text-sm text-plum/55">{r.service}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
