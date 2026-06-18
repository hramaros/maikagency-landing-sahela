import Image from "next/image";
import Reveal from "./Reveal";
import { NailPolish, Foot, Scissors, Lipstick, Check, ArrowRight, Sparkle } from "./icons";

const services = [
  {
    icon: NailPolish,
    title: "Manucure",
    tagline: "Des mains sublimées",
    description:
      "Pose semi-permanente, gel et nail art sur-mesure pour des ongles impeccables qui durent.",
    features: ["Vernis semi-permanent", "Pose gel & capsules", "Nail art personnalisé", "Soin des cuticules"],
    price: "dès 30 000 Ar",
    img: "/gallery/services/manucure.jpg",
    alt: "Pose de vernis rose vif lors d'une manucure soignée",
    span: "lg:col-span-2",
    wide: true,
  },
  {
    icon: Foot,
    title: "Pédicure",
    tagline: "Des pieds de princesse",
    description:
      "Un rituel spa complet : gommage, soin hydratant et vernis longue tenue pour des pieds doux.",
    features: ["Bain & gommage", "Soin spa hydratant", "Beauté des pieds", "Vernis longue tenue"],
    price: "dès 40 000 Ar",
    img: "/gallery/services/pedicure.jpg",
    alt: "Moment de détente et de soin spa au salon",
    span: "lg:col-span-1",
  },
  {
    icon: Scissors,
    title: "Coiffure",
    tagline: "Cheveux de rêve",
    description:
      "Coupe, couleur, balayage et coiffures d'exception, pensés selon votre style et votre événement.",
    features: ["Coupe & brushing", "Couleur & balayage", "Soin profond", "Coiffure événementielle"],
    price: "dès 50 000 Ar",
    img: "/gallery/services/coiffure.jpg",
    alt: "Coiffeuse réalisant un brushing lumineux en salon",
    span: "lg:col-span-1",
    popular: true,
  },
  {
    icon: Lipstick,
    title: "Maquillage",
    tagline: "Un teint lumineux",
    description:
      "Make-up jour, soirée ou mariée réalisé par nos artistes, pour révéler le meilleur de vous-même.",
    features: ["Make-up jour & soirée", "Maquillage mariée", "Mise en beauté événement", "Cours d'auto-maquillage"],
    price: "dès 60 000 Ar",
    img: "/gallery/services/maquillage.jpg",
    alt: "Sélection de produits de maquillage premium sur un plan en marbre",
    span: "lg:col-span-2",
    wide: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-rose-deep">Nos services</span>
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
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08} className={`h-full ${s.span}`}>
                <article className="card-lux group relative flex h-full flex-col overflow-hidden">
                  {/* media header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/55 via-plum/10 to-transparent" />

                    {/* popular badge */}
                    {s.popular && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-plum/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream shadow-sm backdrop-blur">
                        <Sparkle className="h-3 w-3 text-gold" />
                        Populaire
                      </span>
                    )}

                    {/* icon badge overlapping the image edge */}
                    <div className="absolute -bottom-7 left-7 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-plum to-plum-soft text-cream shadow-md ring-4 ring-cream transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* content */}
                  <div className="relative flex flex-1 flex-col p-7 pt-11 sm:p-8 sm:pt-12">
                    <p className="text-sm font-medium uppercase tracking-wide text-rose-deep">
                      {s.tagline}
                    </p>
                    <h3 className="mt-1 font-display text-3xl font-semibold text-plum">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-md text-plum/65">{s.description}</p>

                    <ul
                      className={`mt-6 grid gap-x-4 gap-y-2.5 ${
                        s.wide ? "sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-1"
                      }`}
                    >
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

                    <div className="mt-auto flex items-center justify-between border-t border-plum/10 pt-6">
                      <span className="font-display text-xl font-semibold text-plum">
                        {s.price}
                      </span>
                      <a
                        href="#reserver"
                        className="inline-flex items-center gap-1.5 rounded-full px-1 text-sm font-semibold text-rose-deep transition-all hover:gap-2.5"
                        aria-label={`Réserver une prestation ${s.title}`}
                      >
                        Réserver
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
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
