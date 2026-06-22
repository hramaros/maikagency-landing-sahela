import { Instagram, Phone, MapPin } from "./icons";

const cols = [
  {
    title: "Prestations",
    links: ["Manucure", "Pédicure", "Coiffure", "Maquillage"],
    hrefs: ["#services", "#services", "#services", "#services"],
  },
  {
    title: "Le salon",
    links: ["Nos réalisations", "Avis clientes", "Réserver", "Contact"],
    hrefs: ["#realisations", "#avis", "#reserver", "#contact"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="aurora left-1/4 top-[-4rem] h-72 w-72 bg-rose/15" />

      {/* Footer body */}
      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 font-display text-base font-semibold italic text-gradient-rose">
                S
              </span>
              <span className="font-display text-xl font-semibold tracking-wide">
                Sahela
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">
              Salon de beauté à Antananarivo. L'art de révéler votre beauté
              naturelle, avec passion et délicatesse.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#contact"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/80 transition hover:border-rose hover:text-rose"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#contact"
                aria-label="Téléphone"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/80 transition hover:border-rose hover:text-rose"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-cream/90">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={l}>
                    <a
                      href={col.hrefs[i]}
                      className="text-sm text-cream/65 transition hover:text-rose"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cream/90">
              Nous trouver
            </h3>
            <p className="mt-4 flex items-start gap-2 text-sm text-cream/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
              Lot II, Antaninarenina, 101 Antananarivo, Madagascar
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-cream/65">
              <Phone className="h-4 w-4 shrink-0 text-rose" />
              +261 34 00 000 00
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-7 text-sm text-cream/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Sahela. Tous droits réservés.</p>
          <p>
            Conçu avec <span className="text-rose">♥</span> par Maik Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
