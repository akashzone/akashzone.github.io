// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.classList.toggle('is-active', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll-reveal for sections (respects prefers-reduced-motion via CSS)
const revealTargets = document.querySelectorAll(
  '.section, .hero-response, .project, .edu-block, .cert-block'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

// Active nav link highlight based on scroll position
const sections = document.querySelectorAll('main section[id], main .hero[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const setActiveLink = () => {
  let currentId = 'top';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120) currentId = section.id;
  });
  navAnchors.forEach((a) => {
    a.style.color = a.getAttribute('href') === `#${currentId}` ? 'var(--accent)' : '';
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();
