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
- `js/` — menu responsive (`menu.js`), visibilité combinée (`visibility.js`), recherche (`search.js`), filtrage (`filter.js`)
- `assets/` — images et PDF des recettes

## III. Pile Technologique

*Aucun gestionnaire de dépendances. N'introduisez aucun framework ou bundler sans approbation.*

- **Langages** : HTML5, CSS3 (custom properties, Grid, Flexbox), JavaScript ES6+ vanilla
- **Design** : thème sombre, glassmorphism, palette via CSS custom properties

## IV. Garde-Fous non négociables

1. **Zéro dépendance** — pas de npm, bundler ou framework JS. Tout est vanilla
2. **Pas de JavaScript inline** — tout le JS réside dans `js/`
3. **Data-attributes comme contrat** — les cartes utilisent `data-categories`, `data-title`, `data-ingredients` pour le filtrage ; ne pas altérer cette interface
4. **Responsive obligatoire** — toute modification visuelle doit fonctionner à 320px et 1440px
5. **Langue française** — tout contenu visible est en français

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

- **Dernier focus** : correctifs + unification DA. Recherche et filtres se **combinent** désormais (logique AND via drapeaux `data-search-hidden`/`data-filter-hidden` lus par `js/visibility.js` ; ne jamais écrire `card.style.display` directement, passer par `updateCardVisibility`). Contraste des filtres réparé (header sombre), overflow 320px corrigé (`flex-wrap`), bouton PDF réparé (`--primary`), focus-visible + ARIA ajoutés. **Tokens CSS de rôle** (`:root` de `style.css`) alignés sur le seed orange `#E8590C` de l'app LLMarmite — DA unifiée, site sombre conservé.
- **Focus immédiat** : (optionnel) revoir la sémantique du filtrage par groupe (logique OR actuelle : décocher une protéine ne masque pas une carte tant qu'un féculent reste coché).
