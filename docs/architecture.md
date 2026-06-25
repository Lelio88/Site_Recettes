# Architecture — Mon Carnet de Recettes

## Vue d'ensemble

Site web statique pur (HTML/CSS/JS vanilla) sans serveur ni build. Chaque recette est une page HTML autonome liée depuis l'index. Le filtrage et la recherche fonctionnent côté client via les `data-attributes` des cartes.

## Diagramme des couches

```
┌─────────────────────────────────────────────────────┐
│                   Navigateur                         │
├─────────────────────────────────────────────────────┤
│  index.html                                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │ menu.js   │  │ search.js │  │ filter.js │       │
│  │ (toggle)  │  │ (texte)   │  │ (catég.)  │       │
│  └───────────┘  └───────────┘  └───────────┘       │
│        │               │              │             │
│        ▼               ▼              ▼             │
│  ┌─────────────────────────────────────────┐        │
│  │  DOM — <article class="card">           │        │
│  │    data-categories="viande,poulet,patate"│        │
│  │    data-title="..."                      │        │
│  │    data-ingredients="..."                │        │
│  └─────────────────────────────────────────┘        │
├─────────────────────────────────────────────────────┤
│  recettes/<slug>.html — pages autonomes             │
│  (pas de JS de filtrage, seulement le CSS)          │
├─────────────────────────────────────────────────────┤
│  css/style.css ← tokens globaux (:root)             │
│  css/menu.css  ← header + navigation               │
│  css/recettes.css ← mise en page des recettes       │
├─────────────────────────────────────────────────────┤
│  assets/ — images (jpg/png) + PDF par recette       │
└─────────────────────────────────────────────────────┘
```

## Catalogue des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil : header, filtres, grille de cartes, footer |
| `recettes/poulet-patates.html` | Page recette avec galerie, ingrédients, étapes, lien PDF |
| `recettes/saumon-patates.html` | Idem pour le saumon |
| `css/style.css` | Tokens CSS (`:root`), reset, layout global, cartes, contrôles, footer, responsive |
| `css/menu.css` | Styles de la navigation principale |
| `css/recettes.css` | Layout des pages recette (header, galerie, ingrédients, étapes) |
| `js/menu.js` | Toggle du menu responsive (hamburger) + `aria-expanded` |
| `js/visibility.js` | Visibilité **combinée** d'une carte (recherche ET filtres) via `updateCardVisibility` |
| `js/search.js` | Pose le drapeau `data-search-hidden` (titre + ingrédients) puis délègue l'affichage |
| `js/filter.js` | Pose le drapeau `data-filter-hidden` (catégories) puis délègue l'affichage |

## Patterns imposés

### Data-attributes comme interface de filtrage

Les cartes de `index.html` déclarent leurs métadonnées via `data-*` :

```html
<article class="card"
  data-categories="viande,poulet,patate"
  data-title="Poulet rôti et pomme de terre au four"
  data-ingredients="poulet,sel,poivre,herbes">
```

`filter.js` lit `data-categories`. `search.js` lit `data-title` et `data-ingredients`. Ce contrat ne doit pas être modifié sans adapter les deux scripts.

### Visibilité combinée (recherche ET filtres)

`search.js` et `filter.js` ne touchent **jamais** `card.style.display` directement : chacun pose son propre drapeau (`data-search-hidden` / `data-filter-hidden`) puis appelle `updateCardVisibility(card)` (`js/visibility.js`), qui masque la carte si **l'un OU l'autre** critère la masque (logique AND entre les deux fonctionnalités). Charger `visibility.js` **avant** `search.js` et `filter.js` — sinon la dernière action écraserait l'autre.

### Checkboxes hiérarchiques (groupe ↔ enfants)

- Un `<input class="filter-group" data-group="viande">` contrôle tous les enfants `<input class="filter" data-parent="viande">`
- Cocher/décocher le groupe propage l'état aux enfants
- Si tous les enfants sont décochés, le groupe se décoche

### Structure d'une page recette

Chaque page dans `recettes/` suit ce template :
1. `<header class="recipe-header">` avec lien retour + titre + sous-titre
2. `<section class="gallery">` avec 2-3 images
3. `<section class="recipe-meta">` (temps, portions, catégories)
4. `<section class="ingredients">` avec sous-titres `<h3>` par groupe
5. `<section class="etapes">` avec `<ol>` numérotées
6. `<section class="notes">` (optionnel)
7. `<section class="telechargement">` avec lien PDF

### Design tokens — thème « doux » (clair)

Couleurs centralisées dans `:root` de `css/style.css`, **nommées par rôle**, dérivées du seed orange `#E8590C` de l'app. Le site est **clair et doux** (crème chaud, arrondis, ombres diffuses, halos pêche), aligné sur le thème clair de l'app. Police **Nunito** (Google Fonts, chargée via `<link>`). Des **alias** rétrocompatibles (`--bg`, `--accent1`, `--primary`…) pointent vers ces rôles.

```css
:root {
  --color-primary: #E8590C;            /* orange marque — CTA, accents */
  --color-primary-soft: #f7a977;       /* orange doux — survols, focus */
  --color-bg: #fbf2ea;                 /* crème chaud (fond) */
  --color-surface: #ffffff;            /* cartes, panneaux */
  --color-surface-soft: #fff4ec;
  --color-on-surface: #5a4a40;         /* texte courant (chaud, jamais noir) */
  --color-on-surface-strong: #36271e;  /* titres */
  --color-on-surface-muted: #7c6657;
  --color-outline: #f1e2d6;
  --radius: 22px; --radius-pill: 999px;
  /* alias compat : --bg --card --accent1 --accent2 --muted --glass --primary */
}
```

## Anti-patterns à éviter

- ❌ Ajouter une dépendance npm ou un bundler — le site fonctionne par simple ouverture de fichier
- ❌ Utiliser `innerHTML` avec du contenu dynamique non sanitisé
- ❌ Modifier les noms de `data-*` sans adapter `filter.js` et `search.js`
- ❌ Ajouter du JS inline dans les fichiers HTML
- ❌ Oublier l'attribut `alt` sur les images
- ❌ Hardcoder des couleurs au lieu d'utiliser les variables CSS de rôle (`--color-*`)
- ❌ Écrire `card.style.display` directement depuis `search.js`/`filter.js` — passer par `updateCardVisibility`
- ❌ Hardcoder des couleurs hors de la palette de rôle (le thème doux dérive entièrement du seed `#E8590C`)
- ❌ Casser le responsive en utilisant des largeurs fixes en pixels

## Ajouter une recette (procédure)

1. Créer `recettes/<slug>.html` en copiant le template d'une recette existante
2. Ajouter les images dans `assets/` (jpg ou png)
3. Ajouter le PDF dans `assets/recette-<slug>.pdf`
4. Ajouter une carte `<article class="card">` dans `index.html` section `#liste-recettes`
5. Renseigner `data-categories`, `data-title`, `data-ingredients` sur la carte

## Stratégie de test

Pas de suite de tests automatisés. Vérification manuelle :
- Ouvrir `index.html` dans un navigateur
- Vérifier le filtrage par catégories (cocher/décocher)
- Vérifier la recherche textuelle
- Vérifier le responsive (320px → 1440px)
- Vérifier les liens vers les pages recettes et les téléchargements PDF
