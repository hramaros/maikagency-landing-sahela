# Sahela — Salon de beauté ✦ Landing page

Landing page moderne (2026) pour le salon de beauté **Sahela** : manucure,
pédicure, coiffure et maquillage. Le site présente les services, une galerie de
réalisations et un module de réservation en ligne, avec des éléments **3D
interactifs** et un design responsive.

🔗 **Démo en ligne :** déployée sur Vercel (voir l'URL de déploiement).

## ✨ Fonctionnalités

- **Hero 3D interactif** — scène React Three Fiber (sphère organique, anneau
  rose-gold, perles flottantes) avec parallaxe à la souris. 100 % généré par le
  code, donc **libre de droit**, aucune ressource externe.
- **Sections** — Hero, bandeau défilant, Services (bento), Réalisations
  (galerie filtrable façon masonry), Avis clientes, Réservation + Contact, Footer.
- **Réservation** — formulaire complet (service, date, créneau, message) relié à
  une API route Next.js (`/api/reservation`) avec validation et état de confirmation.
- **Design 2026** — glassmorphism, dégradés mesh/aurora, grain, typographie
  display (Playfair Display) + sans (Manrope), micro-animations Framer Motion.
- **Responsive** & accessible (préférence `prefers-reduced-motion`, focus visibles,
  navigation mobile).
- **SEO** — métadonnées Open Graph/Twitter, favicon SVG, langue `fr`.

## 🛠️ Stack technique

| Élément        | Techno                                   |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 16 (App Router)                  |
| UI             | React 19                                 |
| Styles         | Tailwind CSS v4                          |
| 3D             | Three.js · @react-three/fiber · drei     |
| Animations     | Framer Motion                            |
| Déploiement    | Vercel                                   |

## 🚀 Démarrage local

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de production :

```bash
npm run build
npm run start
```

## 📁 Structure

```
app/
  layout.jsx              # polices, métadonnées SEO, <html lang="fr">
  page.jsx                # assemble les sections
  globals.css            # design system (tokens, utilitaires, animations)
  api/reservation/route.js  # endpoint de réservation
components/
  Navbar · Hero · Scene3D · Marquee · Services
  Portfolio · Testimonials · Reservation · Footer
  Reveal · icons          # helpers (reveal au scroll, icônes SVG)
```

## 🎨 Personnalisation

- **Contenu** (services, prix, avis, adresse, téléphone) : éditable directement
  dans les composants de `components/`. Les prix et coordonnées sont des exemples.
- **Couleurs / polices** : centralisées dans `app/globals.css` (bloc `@theme`).
- **Réservation** : brancher l'envoi d'email / CRM / base de données dans
  `app/api/reservation/route.js` (point d'intégration indiqué en commentaire).

---

Conçu avec ♥ par Maik Agency.
