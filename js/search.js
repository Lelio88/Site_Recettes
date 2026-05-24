/* search.js */
document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('search');
  var cards = Array.from(document.querySelectorAll('.recette-list .card'));

  if (!input) return;

  function applySearch() {
    var query = input.value.toLowerCase().trim();
    cards.forEach(function (card) {
      if (!query) {
        card.dataset.searchHidden = '';
        card.style.display = '';
        return;
      }
      var title = (card.dataset.title || '').toLowerCase();
      var ingredients = (card.dataset.ingredients || '').toLowerCase();
      var match = title.includes(query) || ingredients.includes(query);
      card.dataset.searchHidden = match ? '' : 'true';
      card.style.display = match ? '' : 'none';
    });
  }

  input.addEventListener('input', applySearch);
});
