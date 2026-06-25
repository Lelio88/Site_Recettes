/* filter.js */
document.addEventListener('DOMContentLoaded', function () {
  var checkboxes = Array.from(document.querySelectorAll('.filter'));
  var groups = Array.from(document.querySelectorAll('.filter-group'));
  var cards = Array.from(document.querySelectorAll('.recette-list .card'));
  var toggles = Array.from(document.querySelectorAll('.toggle-subfilters'));

  function getActiveFilters() {
    return checkboxes
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  function applyFilters() {
    var active = getActiveFilters();
    cards.forEach(function (card) {
      var cats = (card.dataset.categories || '')
        .split(',')
        .map(s => s.trim());
      var match = cats.some(c => active.includes(c));
      card.dataset.filterHidden = match ? '' : 'true';
      updateCardVisibility(card);
    });
  }

  // Groupe -> enfants
  groups.forEach(group => {
    group.addEventListener('change', function () {
      let children = checkboxes.filter(cb => cb.dataset.parent === group.dataset.group);
      children.forEach(cb => cb.checked = group.checked);
      applyFilters();
    });
  });

  // Enfants -> groupe
  checkboxes.forEach(cb => {
    cb.addEventListener('change', function () {
      let parentName = cb.dataset.parent;
      let parentGroup = document.querySelector(`.filter-group[data-group="${parentName}"]`);
      if (parentGroup) {
        let siblings = checkboxes.filter(c => c.dataset.parent === parentName);
        parentGroup.checked = siblings.every(c => c.checked);
      }
      applyFilters();
    });
  });

  // Bouton plier/déplier
  toggles.forEach(btn => {
    btn.addEventListener('click', function () {
      let subFilters = btn.closest('.filter-block').querySelector('.sub-filters');
      var hiddenNow = subFilters.classList.toggle('hidden');
      btn.textContent = hiddenNow ? '+' : '-';
      btn.setAttribute('aria-expanded', String(!hiddenNow));
    });
  });

  applyFilters();
});