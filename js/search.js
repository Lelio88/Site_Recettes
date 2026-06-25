/* search.js */
document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('search');
  var cards = Array.from(document.querySelectorAll('.recette-list .card'));

  if (!input) return;

  function applySearch() {
    var query = input.value.toLowerCase().trim();
    cards.forEach(function (card) {
      var match = !query
        || (card.dataset.title || '').toLowerCase().includes(query)
        || (card.dataset.ingredients || '').toLowerCase().includes(query);
      card.dataset.searchHidden = match ? '' : 'true';
      updateCardVisibility(card);
    });
  }

  input.addEventListener('input', applySearch);
});
