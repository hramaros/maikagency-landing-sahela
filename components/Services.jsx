import Reveal from "./Reveal";
import { NailPolish, Foot, Scissors, Lipstick, Check, ArrowRight } from "./icons";

const services = [
  {
    icon: NailPolish,
    title: "Manucure",
    tagline: "Des mains sublimées",
    description:
      "Pose semi-permanente, gel et nail art sur-mesure pour des ongles impeccables qui durent.",
    features: ["Vernis semi-permanent", "Pose gel & capsules", "Nail art personnalisé", "Soin des cuticules"],
    price: "dès 30 000 Ar",
    tint: "from-rose/25 to-blush/10",
  },
  {
    icon: Foot,
    title: "Pédicure",
    tagline: "Des pieds de princesse",
    description:
      "Un rituel spa complet : gommage, soin hydratant et vernis longue tenue pour des pieds doux et soignés.",
    features: ["Bain & gommage", "Soin spa hydratant", "Beauté des pieds", "Vernis longue tenue"],
    price: "dès 40 000 Ar",
    tint: "from-champagne/30 to-rosegold/10",
  },
  {
    icon: Scissors,
    title: "Coiffure",
    tagline: "Cheveux de rêve",
    description:
      "Coupe, couleur, balayage et coiffures d'exception, pensés selon votre style et votre événement.",
    features: ["Coupe & brushing", "Couleur & balayage", "Soin profond", "Coiffure événementielle"],
    price: "dès 50 000 Ar",
    tint: "from-rosegold/25 to-plum-soft/10",
  },
  {
    icon: Lipstick,
    title: "Maquillage",
    tagline: "Un teint lumineux",
    description:
      "Make-up jour, soirée ou mariée réalisé par nos artistes, pour révéler le meilleur de vous-même.",
    features: ["Make-up jour & soirée", "Maquillage mariée", "Mise en beauté événement", "Cours d'auto-maquillage"],
    price: "dès 60 000 Ar",
    tint: "from-rose/20 to-champagne/15",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-luxe text-rose-deep">
              Nos services
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-5xl">
              Quatre univers, une seule
              <span className="text-gradient-rose"> obsession</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-plum/65">
              Chaque prestation est un rituel sur-mesure, mené par des expertes
              passionnées, avec des produits premium et beaucoup de douceur.
            </p>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <article
                  className={`group relative h-full overflow-hidden rounded-[2rem] border border-plum/10 bg-white/60 p-8 shadow-[0_18px_50px_-30px_rgba(89,41,58,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(89,41,58,0.5)] sm:p-10`}
                >
                  {/* hover tint */}
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${s.tint} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-plum text-cream shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                      <Icon className="h-8 w-8" />
                    </div>
                    <span className="font-display text-5xl font-semibold text-plum/10">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="relative mt-7">
                    <p className="text-sm font-medium uppercase tracking-wide text-rose-deep">
                      {s.tagline}
                    </p>
                    <h3 className="mt-1 font-display text-3xl font-semibold text-plum">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-plum/65">{s.description}</p>
                  </div>

                  <ul className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-plum/75"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blush text-rose-deep">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-8 flex items-center justify-between border-t border-plum/10 pt-5">
                    <span className="font-display text-xl font-semibold text-plum">
                      {s.price}
                    </span>
                    <a
                      href="#reserver"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-deep transition-all hover:gap-2.5"
                    >
                      Réserver
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
