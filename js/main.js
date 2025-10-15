// js/main.js — mobile nav toggle, smooth scroll, small UI polish
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const body = document.body;

  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('nav-open');
      // animate toggle (simple)
      toggle.setAttribute('aria-expanded', body.classList.contains('nav-open'));
    });
  }

  // Close mobile nav when clicking a nav link
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => body.classList.remove('nav-open'));
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // header shadow on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 18) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
});
