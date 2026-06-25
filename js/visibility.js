/* visibility.js — visibilité combinée des cartes (recherche ET filtres).
   Chaque module pose son propre drapeau dataset (searchHidden / filterHidden) ;
   une carte n'est visible que si AUCUN critère ne la masque (logique AND).
   Évite que la dernière action (recherche OU filtre) écrase l'autre. */
function updateCardVisibility(card) {
  var hidden = card.dataset.searchHidden === 'true'
    || card.dataset.filterHidden === 'true';
  card.style.display = hidden ? 'none' : '';
}
