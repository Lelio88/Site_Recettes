# Mon Carnet de Recettes

Un carnet de recettes personnel en ligne, inspiré de Marmiton. On parcourt les recettes, on filtre par ingrédients, et on télécharge le PDF pour cuisiner tranquille.

## Fonctionnalités

- **Filtres par catégories** : viandes, poissons, légumes, féculents — avec sous-catégories dépliables
- **Recherche** : trouver une recette par titre ou ingrédient
- **Galerie photos** pour chaque recette
- **Export PDF** : télécharger la recette pour l'avoir sous la main en cuisine
- **Responsive** : fonctionne sur mobile comme sur desktop

## Lancer le site

Ouvrir `index.html` dans un navigateur. C'est tout — aucune installation, aucun serveur requis.

## Ajouter une recette

1. Copier une page existante dans `recettes/` et l'adapter (titre, ingrédients, étapes, photos)
2. Ajouter les images et le PDF dans `assets/`
3. Ajouter une carte dans `index.html` avec les bons `data-categories`, `data-title` et `data-ingredients`

## Personnaliser les couleurs

Les couleurs sont dans `css/style.css` en haut du fichier :

```css
:root {
  --bg: #0f1724;
  --accent1: #ffb86b;
  --accent2: #ff6b9f;
  --muted: #cbd5e1;
}
```

---

*Carnet de recettes personnel avec système de filtrage avancé*
