'use strict';

/* PRELOADER + HERO ENTRANCE */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('gone');
    document.querySelectorAll('.hd-line').forEach(l => l.classList.add('show'));
  }, 1000);
});

/* CUSTOM CURSOR */
(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const cur = document.getElementById('cursorX');
  if (!cur) return;
  let cx = -100, cy = -100, mx = -100, my = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function tick() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cur.style.left = cx + 'px';
    cur.style.top  = cy + 'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a, button, .svc-row, .city-tag, .gal-main, .gal-sm, .why-card, .proc-step').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
})();

/* NAV SCROLL STATE */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 48), { passive: true });
})();

/* MOBILE MENU */
(function () {
  const burger  = document.getElementById('burger');
  const menu    = document.getElementById('mobMenu');
  const closeBtn = document.getElementById('mobClose');
  if (!burger || !menu) return;
  const open  = () => { menu.classList.add('open');    document.body.style.overflow = 'hidden'; };
  const close = () => { menu.classList.remove('open'); document.body.style.overflow = ''; };
  burger.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', close));
})();

/* SCROLL REVEAL */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  els.forEach(el => obs.observe(el));
})();

/* SMOOTH ANCHOR SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('nav')?.offsetHeight || 80;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* SERVICE ROW STAGGER ON ENTER */
(function () {
  const rows = document.querySelectorAll('.svc-row');
  if (!rows.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      rows.forEach((row, i) => {
        setTimeout(() => row.classList.add('in'), i * 80);
      });
      obs.disconnect();
    });
  }, { threshold: 0.15 });
  obs.observe(document.querySelector('.svc-list'));
})();

/* CITY TAG STAGGER */
(function () {
  const tags = document.querySelectorAll('.city-tag');
  if (!tags.length) return;
  tags.forEach((t, i) => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    t.style.transition = `opacity 0.45s ease ${i * 55}ms, transform 0.45s ease ${i * 55}ms`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      tags.forEach(t => { t.style.opacity = '1'; t.style.transform = 'none'; });
      obs.disconnect();
    });
  }, { threshold: 0.2 });
  const grid = document.querySelector('.area-cities');
  if (grid) obs.observe(grid);
})();
