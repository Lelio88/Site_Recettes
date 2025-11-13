# Mon Carnet de Recettes

## Description

Site web de gestion et consultation de recettes de cuisine de type Marmiton. L'application permet de parcourir, rechercher et filtrer des recettes par catégories d'ingrédients, avec des pages détaillées incluant photos, étapes de préparation et téléchargement PDF.

## Fonctionnalités

- **Système de filtrage avancé** : Filtres par catégories (viandes, poissons, légumes, féculents) avec sous-catégories dépliables
- **Recherche dynamique** : Barre de recherche pour trouver des recettes par titre ou ingrédients
- **Galerie photos** : Affichage de plusieurs photos pour chaque recette
- **Pages détaillées** : Informations complètes (temps, portions, ingrédients, étapes)
- **Export PDF** : Téléchargement de chaque recette au format PDF
- **Design responsive** : Interface adaptée mobile et desktop
- **Navigation intuitive** : Menu par catégories et retour facile à l'accueil

## Technologies utilisées

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox, Gradients)
- JavaScript vanilla
- Design moderne avec glassmorphism

## Structure du projet

```
carnet-recettes/
├── index.html                  # Page d'accueil avec liste des recettes
├── css/
│   ├── style.css              # Styles globaux et layout
│   ├── menu.css               # Styles du menu de navigation
│   └── recettes.css           # Styles des pages de recettes
├── js/
│   ├── menu.js                # Logique du menu responsive
│   ├── search.js              # Fonctionnalité de recherche
│   └── filter.js              # Système de filtrage par catégories
├── recettes/
│   ├── poulet-patates.html    # Page détaillée d'une recette
│   └── saumon-patates.html    # Page détaillée d'une recette
└── assets/                     # Images et PDFs (non inclus)
```

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/Lelio88/carnet-recettes.git
cd carnet-recettes
```

2. Ajouter vos images dans le dossier `assets/`

3. Ouvrir `index.html` dans un navigateur

Aucune dépendance ou serveur requis.

## Utilisation

### Page d'accueil
- Parcourir toutes les recettes sous forme de cartes
- Utiliser la barre de recherche pour filtrer par mots-clés
- Cocher/décocher les catégories pour affiner les résultats
- Cliquer sur une carte pour accéder à la recette complète

### Page de recette
- Consulter les photos en galerie
- Voir les informations (temps, portions)
- Lire la liste des ingrédients organisée par section
- Suivre les étapes de préparation numérotées
- Télécharger la recette en PDF

## Ajouter une recette

1. Créer un fichier HTML dans `/recettes/` en suivant le template existant
2. Ajouter les images dans `/assets/`
3. Ajouter une carte dans `index.html` avec les attributs :
   - `data-categories` : catégories séparées par virgules
   - `data-title` : titre de la recette
   - `data-ingredients` : ingrédients principaux

## Personnalisation

Les couleurs principales sont définies dans `css/style.css` :
```css
:root{
  --bg: #0f1724;
  --accent1: #ffb86b;
  --accent2: #ff6b9f;
  --muted: #cbd5e1;
}
```

---

*Carnet de recettes personnel avec système de filtrage avancé*