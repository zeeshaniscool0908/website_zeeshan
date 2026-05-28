/* animations.js — Syed Zeeshan Ahmad Portfolio
   IntersectionObserver-powered scroll animations */

(function() {
  const THRESHOLD = 0.15;

  /* ── FADE IN / SLIDE UP / SCALE IN ── */
  const motionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        motionObs.unobserve(entry.target);
      }
    });
  }, { threshold: THRESHOLD });

  document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
    motionObs.observe(el);
  });

  /* ── STAGGERED CHILDREN ── */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 90}ms`;
      child.classList.add('fade-in');
    });
    motionObs.observe(parent);
    parent.addEventListener('intersect', () => {
      Array.from(children).forEach(c => c.classList.add('visible'));
    });
  });

  /* ── STAGGER PARENT OBSERVER ── */
  const staggerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Array.from(entry.target.children).forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 90);
        });
        staggerObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-stagger]').forEach(el => staggerObs.observe(el));

  /* ── SKILL BARS ── */
  const skillBarObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (typeof window.animateSkillBars === 'function') window.animateSkillBars();
        skillBarObs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillSection = document.querySelector('.skill-categories');
  if (skillSection) skillBarObs.observe(skillSection);

  /* ── HERO ENTRANCE ── */
  const heroInner = document.querySelector('.hero__inner');
  if (heroInner) {
    const items = heroInner.querySelectorAll('.hero__label, .hero__photo, .hero__name, .hero__tagline, .hero__intro, .hero__divider, .hero__pills');
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.transitionDelay = `${0.15 + i * 0.12}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }));
    });
  }

  /* ── PARALLAX ── */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

  /* ── COUNT UP ── */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start = performance.now();
        function step(ts) {
          const progress = Math.min((ts - start) / duration, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

})();
