/* search.js */
document.addEventListener('DOMContentLoaded', function () {
  var checkboxes = Array.from(document.querySelectorAll('.filter'));
  var groups = Array.from(document.querySelectorAll('.filter-group'));
  var cards = Array.from(document.querySelectorAll('.recette-list .card'));

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
      var match = cats.some(c => active.indexOf(c) !== -1);
      card.style.display = match ? '' : 'none';
    });
  }

  // Gérer relation parent -> enfants
  groups.forEach(group => {
    group.addEventListener('change', function () {
      let children = checkboxes.filter(cb => cb.dataset.parent === group.dataset.group);
      children.forEach(cb => cb.checked = group.checked);
      applyFilters();
    });
  });

  // Gérer relation enfants -> parent (si tous décochés, décocher parent)
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

  applyFilters();
  input.addEventListener('input', applySearch);
});
