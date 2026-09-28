# Mon Carnet de Recettes — Contexte d'Opération et Garde-Fous Agentiques

Résolvez les problèmes sans introduire de régression ni de dette technique architecturale.

## I. Finalité

**Application** : Mon Carnet de Recettes — site web statique de consultation de recettes de cuisine
**Objectif métier** : permettre de parcourir, filtrer et consulter des recettes avec photos, ingrédients et export PDF

## II. Architecture

**Modèle** : site statique pur (HTML/CSS/JS vanilla, aucun build, aucune dépendance externe).

**Détails complets** : voir [`docs/architecture.md`](./docs/architecture.md).

Topologie rapide :
- `index.html` — page d'accueil avec cartes et filtres
- `recettes/` — une page HTML par recette
- `css/` — styles globaux (`style.css`), menu (`menu.css`), recettes (`recettes.css`)
- `js/` — menu responsive (`menu.js`), visibilité combinée (`visibility.js`), recherche (`search.js`), filtrage (`filter.js`), fond animé décoratif (`bgfx.js`)
- `assets/` — images et PDF des recettes ; `assets/fonts/` — Nunito auto-hébergée
- `mentions-legales.html` — mentions LCEN du site ; `confidentialite.html` — politique de l'**app** LLMarmite

## III. Pile Technologique

*Aucun gestionnaire de dépendances. N'introduisez aucun framework ou bundler sans approbation.*

- **Langages** : HTML5, CSS3 (custom properties, Grid, Flexbox), JavaScript ES6+ vanilla
- **Design** : **thème clair « doux »** (crème chaud, arrondis généreux, ombres diffuses, halos pêche), police **Nunito** (auto-hébergée, `assets/fonts/`), palette via CSS custom properties dérivée du seed orange `#E8590C` de l'app

## IV. Garde-Fous non négociables

1. **Zéro dépendance, zéro ressource tierce** — pas de npm, bundler ou framework JS ; tout est vanilla. Aucune requête vers un domaine tiers (CDN, Google Fonts, analytics) : tout est servi par le site, sinon l'IP du visiteur part chez un tiers ([`../conformite-securite-guide.md`](../conformite-securite-guide.md))
2. **Pas de JavaScript inline** — tout le JS réside dans `js/`
3. **Data-attributes comme contrat** — les cartes utilisent `data-categories`, `data-title`, `data-ingredients` pour le filtrage ; ne pas altérer cette interface
4. **Responsive obligatoire** — toute modification visuelle doit fonctionner à 320px et 1440px
5. **Langue française** — tout contenu visible est en français
6. **Chaque page porte le lien « Mentions légales »** dans son footer — y compris les pages générées par `LLMarmite/llmarmite/site_publisher.py`

## V. Flux de Travail (Explore → Plan → Code → Verify)

1. **Exploration** — lire les fichiers adjacents pour calquer les patterns existants
2. **Planification** — soumettre l'approche pour les changements non triviaux
3. **Implémentation** — respecter les conventions CSS/JS du projet
4. **Vérification** — ouvrir `index.html` dans un navigateur, tester filtres et responsive

## VI. Commandes de Développement

```bash
# Lancer le site (aucun serveur requis)
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

## VII. Maintenance documentaire

**Règle d'or** : le diff du code et le diff de la doc doivent être dans **le même commit**.

| Modification | Fichier à mettre à jour |
|---|---|
| Nouvelle recette ajoutée | `index.html` (carte) + `recettes/<slug>.html` |
| Nouvelle catégorie de filtre | `index.html` (bloc filtre) + `js/filter.js` si logique |
| Changement de palette/tokens | Section tokens de `css/style.css` |
| Nouvel anti-pattern découvert | `docs/architecture.md` section Anti-patterns |

## VIII. Contexte de Session

- **Dernier focus** : mise en conformité (guide transverse `../conformite-securite-guide.md`) — mentions légales LCEN liées depuis chaque footer, Nunito auto-hébergée (plus aucune requête tierce), boutons « + » des filtres nommés (`aria-label`), liens de footer contrastés (couleur texte, soulignés).
- **Focus immédiat** : (optionnel) revoir la sémantique du filtrage par groupe (logique OR : décocher une protéine ne masque pas une carte tant qu'un féculent reste coché).
