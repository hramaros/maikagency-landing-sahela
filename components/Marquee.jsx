import { Sparkle } from "./icons";

const words = [
  "Manucure",
  "Pédicure",
  "Coiffure",
  "Maquillage",
  "Nail Art",
  "Balayage",
  "Soin Spa",
  "Make-up Mariée",
];

export default function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-plum/10 bg-plum py-6 text-cream"
    >
      <div className="mask-fade-x">
        <div className="marquee-row flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {words.map((w, i) => (
                <span key={`${dup}-${i}`} className="flex items-center">
                  <span
                    className={`px-7 font-display text-2xl font-medium tracking-wide sm:text-3xl ${
                      i % 2 ? "italic text-rose/80" : "text-cream/90"
                    }`}
                  >
                    {w}
                  </span>
                  <Sparkle className="h-5 w-5 shrink-0 text-rose" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
