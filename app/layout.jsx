import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://sahela-beaute.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sahela — Salon de beauté · Manucure, Pédicure, Coiffure & Maquillage",
    template: "%s · Sahela",
  },
  description:
    "Sahela, votre salon de beauté. Manucure, pédicure, coiffure et maquillage par des expertes passionnées. Réservez votre moment de douceur en quelques clics.",
  keywords: [
    "salon de beauté",
    "manucure",
    "pédicure",
    "coiffure",
    "maquillage",
    "nail art",
    "réservation beauté",
    "Sahela",
  ],
  authors: [{ name: "Sahela" }],
  openGraph: {
    title: "Sahela — L'art de révéler votre beauté",
    description:
      "Manucure, pédicure, coiffure et maquillage. Une expérience beauté sur-mesure dans un écrin de douceur.",
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Sahela",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahela — Salon de beauté",
    description:
      "Manucure, pédicure, coiffure et maquillage. Réservez votre moment de douceur.",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#e1899a'/><stop offset='1' stop-color='#d8b08a'/></linearGradient></defs><rect width='32' height='32' rx='9' fill='#241526'/><text x='16' y='23' font-family='Georgia,serif' font-size='20' font-style='italic' text-anchor='middle' fill='url(#g)'>S</text></svg>`
          ),
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#241526",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
