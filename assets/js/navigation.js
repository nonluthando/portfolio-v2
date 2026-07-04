const mobileToggle = document.querySelector("[data-mobile-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
