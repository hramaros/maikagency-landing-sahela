import Image from "next/image";
import Reveal from "./Reveal";
import { Star, Sparkle, Check, Heart } from "./icons";

const pillars = [
  {
    icon: Star,
    title: "Expertes passionnées",
    text: "Une équipe certifiée qui se forme en continu aux dernières tendances beauté.",
  },
  {
    icon: Sparkle,
    title: "Produits premium",
    text: "Des marques sélectionnées avec soin, douces pour vous et pour votre beauté.",
  },
  {
    icon: Check,
    title: "Hygiène irréprochable",
    text: "Matériel stérilisé et protocoles stricts, pour des soins en toute sérénité.",
  },
  {
    icon: Heart,
    title: "Ambiance cocon",
    text: "Un écrin chaleureux pensé comme une parenthèse de douceur, hors du temps.",
  },
];

export default function WhySahela() {
  return (
    <section className="relative bg-cream pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-plum/10 bg-gradient-to-br from-blush-soft via-cream to-cream-deep p-8 shadow-[0_30px_70px_-40px_rgba(89,41,58,0.5)] sm:p-14">
          <div className="aurora right-[-3rem] top-[-3rem] h-64 w-64 bg-lilac/50" />

          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:items-center">
            <div className="max-w-sm">
              <Reveal>
                <span className="eyebrow text-rose-deep">Pourquoi Sahela</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-[2.75rem]">
                  L'excellence, dans
                  <span className="text-gradient-orchid"> chaque détail</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-plum/65">
                  Bien plus qu'un salon : une promesse de soin, de confiance et de
                  bien-être à chacune de vos visites.
                </p>
              </Reveal>

              {/* Ambiance photo + floating rating */}
              <Reveal delay={0.15}>
                <div className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-white/70 shadow-[0_24px_55px_-28px_rgba(89,41,58,0.55)]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/gallery/salon-rose.jpg"
                      alt="Espace chaleureux du salon Sahela avec ses fauteuils roses et ses miroirs"
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/35 to-transparent" />
                  </div>
                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl glass px-4 py-3 shadow-sm">
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} filled className="h-4 w-4 text-gold" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-plum">4,9/5</span>
                    <span className="text-sm text-plum/60">· clientes ravies</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={i * 0.08}>
                    <div className="flex h-full gap-4 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm transition-transform duration-500 hover:-translate-y-1">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose to-rosegold text-white shadow-sm">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-plum">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-plum/65">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
