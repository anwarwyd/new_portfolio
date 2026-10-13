/* ============================================================
   PORTFOLIO JAVASCRIPT — Anwar Sadath Ambally
   ============================================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Mobile menu toggle ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- Typed text animation ----
const titles = [
  'Administrative Assistant',
  'IT Support Engineer',
  'Documentation Specialist',
  'Office Coordination Expert',
  'HR Administrative Support'
];
let titleIndex = 0;
let charIndex = 0;
let deleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  const current = titles[titleIndex];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 90);
}
typeEffect();

// ---- Particle system ----
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 40;

function createParticle() {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 4 + 2;
  const colors = ['#4f9cf9', '#7c5df9', '#00d4aa', '#ffffff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    background: ${color};
    animation-duration: ${Math.random() * 15 + 10}s;
    animation-delay: ${Math.random() * 10}s;
    box-shadow: 0 0 ${size * 2}px ${color};
  `;
  particleContainer.appendChild(p);
}
for (let i = 0; i < PARTICLE_COUNT; i++) createParticle();

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll(
  '.glass-card, .timeline-item, .section-header, .hero-stats, .edu-card, .cert-card, .skill-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---- Active nav link highlight ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#4f9cf9';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ---- Contact form ----
function handleFormSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = document.getElementById('form-submit-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate send (no backend — mailto fallback)
  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  setTimeout(() => {
    const mailto = `mailto:anwar.ambally@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailto;
    status.textContent = '✅ Opening your email client to send the message!';
    status.className = 'form-status success';
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 900);
}

// ---- Smooth counter animation for hero stats ----
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val = parseInt(num.textContent);
        if (!isNaN(val)) animateCounter(num, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ---- Subtle parallax on hero ----
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg');
  if (!heroContent || !heroBg) return;
  const y = window.scrollY;
  heroBg.style.transform = `translateY(${y * 0.3}px)`;
  heroContent.style.transform = `translateY(${y * 0.1}px)`;
});
