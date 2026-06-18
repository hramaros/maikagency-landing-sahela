import Image from "next/image";
import Reveal from "./Reveal";
import { ArrowRight, MapPin, Clock, Sparkle } from "./icons";

const thumbs = [
  {
    src: "/gallery/portfolio/coif-boucles.jpg",
    alt: "Mise en forme de boucles soyeuses",
  },
  {
    src: "/gallery/portfolio/manu-paillete.jpg",
    alt: "Manucure perle et argent pailleté",
  },
  {
    src: "/gallery/portfolio/pedi-spa.jpg",
    alt: "Rituel spa relaxant",
  },
];

export default function Experience() {
  return (
    <section id="ecrin" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      {/* soft ambient blobs */}
      <div className="aurora left-[-5rem] top-16 h-72 w-72 bg-blush/50" />
      <div className="aurora bottom-10 right-[-4rem] h-80 w-80 bg-lilac/50" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative grid items-center gap-8 lg:grid-cols-12">
          {/* Ambiance photo */}
          <Reveal className="lg:col-span-8 lg:col-start-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-white/60 shadow-[0_40px_90px_-40px_rgba(89,41,58,0.6)] sm:aspect-[16/10]">
              <Image
                src="/gallery/salon-ambiance.jpg"
                alt="Intérieur élégant et lumineux du salon de beauté Sahela"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-plum/30 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* Glass content card (overlaps the photo on desktop) */}
          <Reveal
            delay={0.1}
            className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:z-10 lg:self-center"
          >
            <div className="glass rounded-[2rem] border border-white/60 p-7 shadow-[0_30px_70px_-34px_rgba(89,41,58,0.5)] sm:p-10">
              <span className="eyebrow text-rose-deep">L'écrin Sahela</span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-5xl">
                Un cocon pensé pour
                <span className="text-gradient-rose"> votre beauté</span>
              </h2>
              <p className="mt-5 max-w-md text-plum/70">
                Poussez la porte d'un lieu hors du temps : lumière douce, matières
                nobles et attentions délicates. Ici, chaque visite devient un
                rituel de bien-être, pensé pour vous faire rayonner.
              </p>

              {/* Mini gallery */}
              <div className="mt-7 grid grid-cols-3 gap-3">
                {thumbs.map((t) => (
                  <div
                    key={t.src}
                    className="relative aspect-square overflow-hidden rounded-2xl border border-white/60 shadow-sm"
                  >
                    <Image
                      src={t.src}
                      alt={t.alt}
                      fill
                      sizes="(max-width: 1024px) 30vw, 130px"
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Location & hours pills */}
              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white/70 px-4 py-2 text-sm text-plum/75">
                  <MapPin className="h-4 w-4 text-rose-deep" />
                  Antaninarenina, Antananarivo
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-plum/12 bg-white/70 px-4 py-2 text-sm text-plum/75">
                  <Clock className="h-4 w-4 text-rose-deep" />
                  Lun – Sam · 9h – 18h
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#reserver" className="btn-primary">
                  Réserver une visite
                  <ArrowRight className="h-4 w-4" />
                </a>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-plum/60">
                  <Sparkle className="h-4 w-4 text-rose" />
                  Premier rendez-vous ? On vous guide.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
