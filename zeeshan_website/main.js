/* main.js — Syed Zeeshan Ahmad Portfolio */

/* ── THEME ── */
const THEME_KEY = 'zeeshan-theme';
const themeBtn  = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === 'light') document.body.classList.add('light');

function updateThemeBtn() {
  if (!themeBtn) return;
  themeBtn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
  themeBtn.title = document.body.classList.contains('light') ? 'Switch to dark mode' : 'Switch to light mode';
}
updateThemeBtn();
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem(THEME_KEY, document.body.classList.contains('light') ? 'light' : 'dark');
    updateThemeBtn();
  });
}

/* ── MOBILE NAV ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

/* ── ACTIVE NAV LINK ── */
(function() {
  const links = document.querySelectorAll('.nav__links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
    // Galleries parent highlight
    if (href === 'galleries.html' && current.startsWith('galleries')) {
      a.classList.add('active');
    }
  });
})();

/* ── BACK TO TOP ── */
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── CAROUSEL ── */
function initCarousel(el) {
  if (!el) return;
  const track  = el.querySelector('.carousel__track');
  const slides = el.querySelectorAll('.carousel__slide');
  const dots   = el.querySelectorAll('.carousel__dot');
  const prev   = el.querySelector('.carousel__prev');
  const next   = el.querySelector('.carousel__next');
  let current  = 0;
  let timer;

  function goTo(n) {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5500);
  }

  if (prev) prev.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  if (next) next.addEventListener('click', () => { goTo(current + 1); startTimer(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startTimer(); }));

  // Touch swipe
  let touchX = 0;
  el.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(current + (diff > 0 ? 1 : -1)); startTimer(); }
  }, { passive: true });

  goTo(0);
  startTimer();
}
document.querySelectorAll('.carousel').forEach(initCarousel);

/* ── LIGHTBOX ── */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCap    = document.getElementById('lbCap');
const lbClose  = document.getElementById('lbClose');

function openLightbox(emoji, caption) {
  if (!lightbox) return;
  lbImg.textContent = emoji;
  lbCap.textContent = caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-lightbox]').forEach(el => {
  el.addEventListener('click', () => {
    openLightbox(el.dataset.emoji || el.textContent.trim(), el.dataset.caption || '');
  });
});
if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── SKILL BARS ── */
function animateSkillBars() {
  document.querySelectorAll('.skill-bar__fill').forEach(fill => {
    const pct = fill.dataset.pct;
    if (pct) fill.style.width = pct + '%';
  });
}
// Triggered by animations.js after scroll
window.animateSkillBars = animateSkillBars;
