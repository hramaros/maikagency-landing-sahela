import Reveal from "./Reveal";
import { Star, Sparkle } from "./icons";

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
  {
    name: "Tantely R.",
    service: "Pédicure spa",
    initials: "TR",
    text: "Le rituel pédicure spa est divin. Mes pieds n'ont jamais été aussi doux et l'ambiance du salon est un vrai cocon. Une parenthèse hors du temps.",
    grad: "from-mauve to-rose",
  },
  {
    name: "Niaina F.",
    service: "Coiffure événementielle",
    initials: "NF",
    text: "Coiffée pour le mariage de ma sœur : un chignon tenue parfaite et élégant. Toutes les invitées m'ont demandé l'adresse. Bravo aux artistes !",
    grad: "from-champagne to-rosegold",
  },
  {
    name: "Lova H.",
    service: "Nail art personnalisé",
    initials: "LH",
    text: "Des ongles bijoux d'une finesse incroyable. On sent la passion du détail. Le résultat dépasse à chaque fois ce que j'avais imaginé.",
    grad: "from-rose to-mauve",
  },
  {
    name: "Sarobidy M.",
    service: "Forfait complet",
    initials: "SM",
    text: "Une journée entière de soins, choyée de la tête aux pieds. Je suis ressortie transformée et apaisée. Sahela, c'est devenu mon rendez-vous beauté.",
    grad: "from-rosegold to-plum-soft",
  },
];

function Card({ r }) {
  return (
    <figure className="card-lux mx-3 flex w-[300px] shrink-0 flex-col p-7 sm:w-[360px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} filled className="h-4 w-4 text-gold" />
          ))}
        </div>
        <span className="font-display text-5xl leading-none text-rose/30">&rdquo;</span>
      </div>
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-plum/75">
        {r.text}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-plum/10 pt-5">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${r.grad} text-sm font-semibold text-white shadow-sm`}
          aria-hidden="true"
        >
          {r.initials}
        </span>
        <span>
          <span className="block font-semibold text-plum">{r.name}</span>
          <span className="block text-sm text-plum/55">{r.service}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const rowA = reviews.slice(0, 4);
  const rowB = reviews.slice(3);

  return (
    <section id="avis" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="aurora left-[-4rem] top-24 h-72 w-72 bg-lilac/50" />
      <div className="aurora bottom-10 right-[-4rem] h-80 w-80 bg-blush/50" />

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="eyebrow text-rose-deep">Elles nous adorent</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-5xl">
            La beauté qui fait
            <span className="text-gradient-orchid"> sourire</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-plum/10 bg-white/70 px-5 py-2.5 shadow-sm">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} filled className="h-5 w-5 text-gold" />
              ))}
            </div>
            <span className="text-sm font-semibold text-plum">
              4,9 / 5
            </span>
            <span className="text-sm text-plum/55">— plus de 320 avis vérifiés</span>
          </div>
        </Reveal>
      </div>

      {/* Marquee rows */}
      <div className="relative mt-14 flex flex-col gap-5">
        <div className="mask-fade-x">
          <div className="marquee-row flex w-max animate-marquee">
            {[...rowA, ...rowA].map((r, i) => (
              <Card key={`a-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="mask-fade-x">
          <div className="marquee-row flex w-max animate-marquee-rtl">
            {[...rowB, ...rowB].map((r, i) => (
              <Card key={`b-${i}`} r={r} />
            ))}
          </div>
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 flex items-center justify-center gap-2 text-sm text-plum/60">
          <Sparkle className="h-4 w-4 text-rose" />
          Rejoignez nos clientes comblées — votre tour de briller approche.
        </p>
      </Reveal>
    </section>
  );
}
