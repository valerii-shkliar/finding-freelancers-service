const customersReviewSelector = 'section.customers-review';
const prevArrowSelector = '.interaction-box .arrows-box .slick-prev.slick-arrow';
const nextArrowSelector = '.interaction-box .arrows-box .slick-next.slick-arrow';
const customersReviewSliderSelector = 'section.customers-review .slick-slider';
const featuredJobsSliderSelector = 'section.featured-jobs .slick-slider';
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

appendEmptySlide(featuredJobsSliderSelector);

$(featuredJobsSliderSelector).slick({
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  appendArrows: $('section.featured-jobs .arrows-box'),
  prevArrow: arrowLeft,
  nextArrow: arrowRight,
  responsive: [
    {
      breakpoint: 1030,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

function appendEmptySlide(slider) {
  $(slider).append('<div></div>');
}

$(customersReviewSliderSelector).slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  appendArrows: $('section.customers-review .interaction-box .arrows-box'),
  prevArrow: arrowLeft,
  nextArrow: arrowRight,
  fade: true,
});
$(customersReviewSelector).on('click', prevArrowSelector, onPrevArrowClick);
$(customersReviewSelector).on('click', nextArrowSelector, onNextArrowClick);

function onPrevArrowClick() {
  $(customersReviewSliderSelector).slick('slickPrev');
}
function onNextArrowClick() {
  $(customersReviewSliderSelector).slick('slickNext');
}
