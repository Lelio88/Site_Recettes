/* menu.js */
document.addEventListener('DOMContentLoaded', function(){
  var btn = document.getElementById('menu-toggle');
  var menu = document.getElementById('main-menu');
  if(!btn || !menu) return;
  btn.addEventListener('click', function(){
    var open = menu.style.display !== 'block';
    menu.style.display = open ? 'block' : '';
    btn.setAttribute('aria-expanded', String(open));
  });
});
