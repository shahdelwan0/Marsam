window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-blur");
  } else {
    navbar.classList.remove("navbar-blur");
  }
});
const buttons = document.querySelectorAll('[data-bs-toggle="collapse"]');
buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const icon = this.querySelector(".arrow-icon");
    icon.classList.toggle("rotate");
  });
});

$(document).ready(function () {
  $(".slick-carousel").each(function () {
    var $carousel = $(this);
    var slideCount = $carousel.children('.slick-slide').length;
    var slidesToShowDesktop = Math.min(5, slideCount);
    var slidesToShowMobile = Math.min(1, slideCount);

    $carousel.slick({
      rtl: true,
      infinite: false,
      slidesToShow: slidesToShowDesktop,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      adaptiveHeight: true,
      centerMode: false,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: slidesToShowMobile,
            arrows: false,
            infinite: false,
            adaptiveHeight: true,
            centerMode: false,
            variableWidth: true,
          },
        },
      ],
    });
  });
});
