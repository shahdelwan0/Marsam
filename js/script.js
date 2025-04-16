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
