// js/main.js
document.addEventListener("DOMContentLoaded", function () {
  // Mobile toggle
  const toggle = document.querySelector(".mobile-toggle");
  toggle && toggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  // Close menu when clicking a nav link (mobile)
  document.querySelectorAll(".nav a").forEach(a => {
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Optional: add small header shadow after scroll
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) header && header.classList.add("scrolled");
    else header && header.classList.remove("scrolled");
  });
});
