import Image from "next/image";
import Reveal from "./Reveal";
import { Instagram, Sparkle } from "./icons";

const team = [
  {
    name: "Tahiana R.",
    role: "Fondatrice & coloriste",
    tag: "Couleur & balayage",
    img: "/gallery/team/tahiana.jpg",
  },
  {
    name: "Onja R.",
    role: "Prothésiste ongulaire",
    tag: "Nail art sur-mesure",
    img: "/gallery/team/onja.jpg",
  },
  {
    name: "Fitia A.",
    role: "Maquilleuse pro",
    tag: "Make-up mariée",
    img: "/gallery/team/fitia.jpg",
  },
  {
    name: "Miora H.",
    role: "Coiffeuse & styliste",
    tag: "Coiffure événementielle",
    img: "/gallery/team/miora.jpg",
  },
];

export default function Team() {
  return (
    <section id="equipe" className="relative overflow-hidden bg-plum py-24 text-cream sm:py-32">
      {/* soft glow */}
      <div className="aurora left-10 top-16 h-72 w-72 bg-rose/20" />
      <div className="aurora bottom-10 right-1/4 h-80 w-80 bg-rosegold/20" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-rose">Notre équipe</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Les mains expertes derrière
              <span className="text-gradient-cream"> votre éclat</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-cream/70">
              Des artistes passionnées, formées en continu, qui mettent tout leur
              cœur à révéler le meilleur de vous-même.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <article className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={m.img}
                    alt={`${m.name}, ${m.role} chez Sahela`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-plum via-plum/25 to-transparent" />

                  {/* specialty pill */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
                    <Sparkle className="h-3 w-3 text-rose" />
                    {m.tag}
                  </span>

                  {/* hover social */}
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full glass-dark text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Instagram className="h-4 w-4" />
                  </span>

                  {/* caption */}
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-2xl font-semibold text-white drop-shadow-sm">
                      {m.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-rose">{m.role}</p>
                  </figcaption>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
