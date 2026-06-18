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
- **Sections** — Hero, bandeau défilant, Services (bento asymétrique),
  Pourquoi Sahela (atouts), Réalisations (galerie filtrable façon masonry),
  Avis clientes (marquee animé), Réservation + Contact, Footer.
- **Réservation** — formulaire complet (service, date, créneau, message) relié à
  une API route Next.js (`/api/reservation`) qui transmet la demande à un
  **workflow n8n** (enregistrement + emails). Validation et écran de confirmation inclus.
- **Design 2026** — « Soft UI Evolution » : glassmorphism, dégradés mesh/aurora,
  accent mauve/orchidée, échelle d'ombres douce, grain, typographie display
  (Playfair Display) + sans (Manrope), micro-animations Framer Motion.
- **Responsive** & accessible — `prefers-reduced-motion`, focus visibles (clavier),
  contrastes WCAG AA, libellés de formulaire reliés, navigation mobile + scroll-spy.
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
  Navbar · Hero · Scene3D · Marquee · Services · WhySahela
  Portfolio · Testimonials · Reservation · Footer
  Reveal · icons          # helpers (reveal au scroll, icônes SVG)
```

## 🎨 Personnalisation

- **Contenu** (services, prix, avis, adresse, téléphone) : éditable directement
  dans les composants de `components/`. Les prix et coordonnées sont des exemples.
- **Couleurs / polices** : centralisées dans `app/globals.css` (bloc `@theme`).
- **Réservation** : la demande est transmise à n8n (voir ci-dessous). Pour
  changer d'instance, définir `N8N_WEBHOOK_URL` (cf. `.env.example`).

## 📨 Réservations & emails (n8n)

Le formulaire de réservation envoie les données à l'API route
`app/api/reservation/route.js`, qui les transmet (côté serveur) à un **webhook
n8n**. Le workflow **« Sahela — Réservations »** :

1. **Webhook** `POST /webhook/sahela-reservation` — reçoit la demande
2. **Normalisation** des champs (Set)
3. **Data Table** « Réservations Sahela » — enregistre chaque demande
4. **Google Agenda** — crée automatiquement l'événement du rendez-vous (créneau
   d'1 h, fuseau Indian/Antananarivo) sur l'agenda connecté
5. **Gmail** — email de notification au salon
6. **Gmail** (si email fourni) — email de confirmation à la cliente

Configuration côté hébergement (Vercel → *Settings → Environment Variables*,
ou fichier `.env.local` en local) :

```bash
N8N_WEBHOOK_URL=https://n8n.maikagency.dev/webhook/sahela-reservation
```

> Les emails partent du compte Gmail connecté dans n8n. L'adresse de
> notification du salon se règle dans le nœud « Email au salon ».

---

Conçu avec ♥ par Maik Agency.
