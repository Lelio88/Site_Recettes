/* bgfx.js — effets de fond ambiants : bulles de mijotage, vapeur, ingrédients flottants.
   Génère des éléments décoratifs avec des délais ÉCHELONNÉS (animation-delay aléatoire)
   pour qu'ils n'apparaissent jamais tous en même temps. Purement décoratif :
   aria-hidden, pointer-events:none, derrière le contenu. Désactivé si l'utilisateur
   préfère réduire les animations. Styles + keyframes : css/style.css (.bgfx*). */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  function rand(min, max) { return min + Math.random() * (max - min); }

  var layer = document.createElement('div');
  layer.className = 'bgfx';
  layer.setAttribute('aria-hidden', 'true');

  function spawn(kind, count, conf) {
    for (var i = 0; i < count; i++) {
      var el = document.createElement('span');
      el.className = 'bgfx-' + kind;
      el.style.left = rand(conf.minLeft, conf.maxLeft).toFixed(2) + '%';
      el.style.setProperty('--size', rand(conf.minSize, conf.maxSize).toFixed(0) + 'px');
      el.style.animationDuration = rand(conf.minDur, conf.maxDur).toFixed(1) + 's';
      // délai réparti sur toute la durée -> apparitions espacées dans le temps
      el.style.animationDelay = '-' + rand(0, conf.maxDelay).toFixed(1) + 's';
      if (conf.items) el.textContent = conf.items[Math.floor(rand(0, conf.items.length))];
      layer.appendChild(el);
    }
  }

  spawn('bubble', 7, { minLeft: 4, maxLeft: 96, minSize: 8, maxSize: 22, minDur: 11, maxDur: 17, maxDelay: 17 });
  spawn('steam', 4, { minLeft: 8, maxLeft: 92, minSize: 120, maxSize: 200, minDur: 13, maxDur: 19, maxDelay: 19 });
  spawn('food', 6, {
    minLeft: 5, maxLeft: 92, minSize: 26, maxSize: 44, minDur: 28, maxDur: 42, maxDelay: 42,
    items: ['🍅', '🌿', '🧄', '🧅', '🌶️', '🥔', '🧈', '🫑']
  });

  function mount() { document.body.appendChild(layer); }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
