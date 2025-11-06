const nav = $('nav.mobile-menu');
const menuBtn = $('.logo-container .menu-btn');
const wrapper = $('header .wrapper');

menuBtn.on('click', function () {
  console.log(this);

  nav.toggleClass('nav-open');
  menuBtn.toggleClass('close');
});
