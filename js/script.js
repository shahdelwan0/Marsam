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
  $(".slick-carousel").slick({
    rtl: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false,
          infinite: false,
          adaptiveHeight: true,
          centerMode: false,
          variableWidth: true,
          dots: false,
        },
      },
    ],
  });
});
