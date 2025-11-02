window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");

mobileToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  mobileToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const isClickInside =
    mobileToggle.contains(event.target) || navLinks.contains(event.target);
  if (!isClickInside && navLinks.classList.contains("active")) {
    mobileToggle.classList.remove("active");
    navLinks.classList.remove("active");

    // Close all dropdowns
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.classList.remove("active");
    });
  }
});

// Mobile dropdown functionality
let mobileBound = false;

function handleMobileDropdowns() {
  if (window.innerWidth <= 968 && !mobileBound) {
    mobileBound = true;

    document.querySelectorAll(".dropdown > a").forEach((dropdown) => {
      dropdown.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const parent = this.parentElement;
        const isActive = parent.classList.contains("active");

        document.querySelectorAll(".dropdown").forEach((d) => d.classList.remove("active"));
        if (!isActive) parent.classList.add("active");
      });
    });

    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        const isActive = this.classList.contains("active");
        this.parentElement
          .querySelectorAll(".dropdown-item")
          .forEach((s) => s.classList.remove("active"));
        if (!isActive) this.classList.add("active");
      });
    });
  }
}

handleMobileDropdowns();
window.addEventListener("resize", () => {
  if (window.innerWidth > 968) mobileBound = false;
});


// Initialize mobile dropdowns
handleMobileDropdowns();

// Reinitialize on resize
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    handleMobileDropdowns();

    // Close mobile menu on resize to desktop
    if (window.innerWidth > 968) {
      mobileToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
  }, 250);
});

