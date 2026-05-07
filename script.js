/* =============================================
   THE POLISHED ABODE — script.js
============================================= */

'use strict';

/* ─── PRELOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('gone');
    document.body.style.overflow = '';
  }, 1400);
});
document.body.style.overflow = 'hidden';

/* ─── CUSTOM CURSOR ─── */
(function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  });

  // Smooth cursor lag
  function animateCursor() {
    cx += (mx - cx) * 0.14;
    cy += (my - cy) * 0.14;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll(
    'a, button, .svc-card, .city-badge, .promise-card'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });
})();

/* ─── NAVIGATION SCROLL STATE ─── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('stuck', window.scrollY > 56);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── MOBILE MENU ─── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if (!hamburger || !mobileMenu) return;

  const open  = () => { mobileMenu.classList.add('open');  document.body.style.overflow = 'hidden'; };
  const close = () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; };

  hamburger.addEventListener('click', open);
  mobileClose?.addEventListener('click', close);

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', close);
  });
})();

/* ─── SCROLL REVEAL ─── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Stagger sibling reveals
  const staggerParents = new Set();
  els.forEach(el => staggerParents.add(el.parentElement));

  staggerParents.forEach(parent => {
    const children = Array.from(parent.querySelectorAll(':scope > .reveal, .reveal'));
    if (children.length > 1) {
      children.forEach((child, i) => {
        if (i > 0) child.dataset.stagger = i * 110;
      });
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.stagger || 0);
      setTimeout(() => el.classList.add('in'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ─── HERO PARALLAX ─── */
(function initParallax() {
  const photo = document.querySelector('.hero-photo');
  if (!photo) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        photo.style.transform = `translateY(${scrollY * 0.08}px) scale(1)`;
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

/* ─── SMOOTH ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id     = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH   = document.getElementById('nav')?.offsetHeight || 80;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── SERVICE CARD MICRO-TILT ─── */
(function initCardTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.querySelectorAll('.svc-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ─── CITY BADGE STAGGER ON ENTER ─── */
(function initCityBadges() {
  const badges = document.querySelectorAll('.city-badge');
  if (!badges.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      badges.forEach((badge, i) => {
        setTimeout(() => {
          badge.style.opacity   = '1';
          badge.style.transform = 'translateY(0)';
        }, i * 60);
      });
      observer.disconnect();
    });
  }, { threshold: 0.2 });

  badges.forEach(badge => {
    badge.style.opacity   = '0';
    badge.style.transform = 'translateY(12px)';
    badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  observer.observe(document.querySelector('.area-cities'));
})();
