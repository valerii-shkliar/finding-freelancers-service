const arrowLeft = `
  <a class="slick-prev">
    <svg class="icon">
      <use xlink:href="./../img/sprites/interaction-icons.svg#arrow-left"></use>
    </svg>
  </a>`;
const arrowRight = `
  <a class="slick-next">
    <svg class="icon">
      <use xlink:href="./../img/sprites/interaction-icons.svg#arrow-right"></use>
    </svg>
  </a>`;

appendEmptySlide();

$('.slick-slider').slick({
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  appendArrows: $('section.featured-jobs .arrows-box'),
  prevArrow: arrowLeft,
  nextArrow: arrowRight,
});

function appendEmptySlide() {
  $('section.featured-jobs .slick-slider').append('<div></div>');
}
