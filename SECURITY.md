# Politique de sécurité

Workspace est un site statique (HTML/CSS/JS uniquement), sans backend ni
base de données. Toutes les données saisies par l'utilisateur (projets,
notes, plannings, outliers…) restent dans le `localStorage` de son
navigateur et ne sont jamais transmises à un serveur contrôlé par ce
projet.

## Périmètre

Sont couverts par cette politique tous les fichiers HTML/CSS/JS de ce
dépôt.

Sont hors périmètre : les services tiers utilisés par certains outils
(API YouTube Data via une clé fournie par l'utilisateur, endpoint public
`youtube.com/oembed`, miniatures `i.ytimg.com`, avatars `unavatar.io`,
Google Fonts) — leurs propres vulnérabilités relèvent de leurs éditeurs
respectifs.

## Mesures en place

- **Aucune donnée serveur** : pas de compte, pas de base de données, pas
  de session — donc pas de fuite de données côté serveur possible.
- **Content-Security-Policy** sur chaque page, limitant les scripts,
  styles, images et connexions réseau aux domaines strictement
  nécessaires à cette page.
- **`referrer-policy: strict-origin-when-cross-origin`** sur chaque page,
  pour limiter les informations envoyées aux sites tiers en cas de clic
  sortant.
- **`rel="noopener noreferrer"`** sur tous les liens externes ouverts
  dans un nouvel onglet, contre le *reverse tabnabbing*.
- **Validation des URL** (protocole `http`/`https` uniquement) avant tout
  affichage ou navigation vers un lien saisi par l'utilisateur (Outlier
  Finder, Mes Projets), pour empêcher l'exécution de liens `javascript:`
  ou d'autres schémas dangereux.
- **Échappement systématique** du texte saisi par l'utilisateur avant
  insertion dans le DOM sur les zones les plus exposées (titres, notes,
  libellés de liens), pour limiter les risques d'injection HTML.
- **Clé API YouTube** (quand l'utilisateur en fournit une) : stockée
  uniquement en local, utilisée uniquement pour des appels directs
  navigateur → API YouTube, jamais transmise ailleurs.

## Limites connues

Ce projet est un outil personnel mono-utilisateur, sans fonctionnalité
d'import, de partage ou de collaboration entre utilisateurs : la surface
d'attaque réaliste est donc très réduite (il n'existe pas de canal par
lequel un tiers pourrait injecter du contenu dans les données d'un autre
utilisateur). Le code de certains outils plus anciens n'a pas encore fait
l'objet d'un audit ligne à ligne exhaustif ; les zones les plus exposées
(liens saisis par l'utilisateur, ouverture d'onglets externes) ont été
revues et corrigées en priorité.

En hébergement statique (type GitHub Pages), certains en-têtes de
sécurité HTTP (`X-Content-Type-Options`, `Strict-Transport-Security`,
etc.) ne peuvent pas être définis sans passer par une configuration
serveur dédiée ; la `Content-Security-Policy` est donc appliquée via une
balise `<meta>` dans chaque page, ce qui couvre l'essentiel des risques
côté navigateur mais pas la totalité de ce qu'un en-tête HTTP permettrait.

## Signaler un problème

Ce projet n'a pas de programme de bug bounty. Si tu repères une faille
de sécurité, merci de la signaler via le formulaire « Proposer une idée »
accessible depuis l'accueil de Workspace, en décrivant le problème et,
si possible, comment le reproduire. Merci de ne pas exploiter la faille
au-delà de ce qui est nécessaire pour la démontrer.
