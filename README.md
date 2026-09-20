# Workspace

Le studio YouTube tout-en-un de Loan : un ensemble d'outils pour planifier,
tourner et suivre des vidéos, sans backend ni compte — tout tourne dans le
navigateur.

## Outils

| Outil | Fichier | Description |
|---|---|---|
| 🏠 Accueil | `index.html` | Vue d'ensemble, stats YouTube en direct, accès à tous les outils. |
| 🔁 Loop Builder | `loop-builder.html` | Structure une vidéo boucle par boucle, timeline et courbe émotionnelle. |
| 📅 Calendrier Éditorial | `planning.html` | Planning de contenu avec deadlines et compte à rebours. |
| 📚 Organisation Scolaire | `school.html` | Suivi de l'année scolaire (DST, moyennes) en parallèle de YouTube. |
| 📅🎬 École × YouTube | `organisation.html` | Emploi du temps type entre école et création de contenu. |
| 📋 Mes Projets | `projets.html` | Gestion de projets vidéo : miniatures, notes, A/B tests, liens. |
| 💣 Outlier Finder | `outlier-finder.html` | Suivi manuel des outliers repérés sur YouTube (vidéos longues/Shorts), classement par glisser-déposer. |
| 🧰 Tous les outils | `tools.html` | Grille listant tous les outils disponibles. |

## Fonctionnement

Workspace est un site 100 % statique : HTML, CSS et JavaScript « vanilla »,
sans framework ni étape de build. Chaque page est autonome et stocke ses
données dans le `localStorage` du navigateur — il n'y a pas de serveur, pas
de base de données, pas de compte utilisateur.

Deux outils peuvent appeler des services externes, toujours depuis le
navigateur de l'utilisateur et jamais via un serveur intermédiaire :

- **Statistiques YouTube en direct** (accueil, Loop Builder) : optionnelles,
  via l'API YouTube Data officielle, avec une clé API que l'utilisateur
  fournit et qui reste stockée en local.
- **Outlier Finder** : miniatures et titres publics via les endpoints publics
  `i.ytimg.com` / `youtube.com/oembed` (sans clé), et photo de profil de
  chaîne via `unavatar.io`.

## Lancer le projet en local

Aucune installation n'est nécessaire. Un simple serveur statique suffit,
par exemple :

```bash
python3 -m http.server 8000
```

puis ouvrir `http://localhost:8000/index.html`.

## Sécurité, confidentialité et légal

- [`SECURITY.md`](SECURITY.md) — politique de sécurité et comment signaler
  un problème.
- [`privacy.html`](privacy.html) — confidentialité et données (ce qui est
  stocké, où, et comment tout effacer).
- [`mentions-legales.html`](mentions-legales.html) — mentions légales.
- [`cgu.html`](cgu.html) — conditions générales d'utilisation.

## Licence

Projet personnel sous tous droits réservés — voir [`LICENSE`](LICENSE).
Workspace n'est ni affilié à, ni approuvé par YouTube ou Google LLC ; les
marques citées appartiennent à leurs propriétaires respectifs.

## Contact

Une idée, un bug, une question ? Le formulaire « Proposer une idée »,
accessible depuis l'accueil, reste le meilleur moyen de me contacter.
