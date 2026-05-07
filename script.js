/* THE POLISHED ABODE — script.js v2 */
'use strict';

document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('gone');
    document.body.style.overflow = '';
  }, 1500);
});

(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const c = document.getElementById('cursor');
  if (!c) return;
  let mx = -100, my = -100, cx = -100, cy = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    cx += (mx - cx) * 0.13; cy += (my - cy) * 0.13;
    c.style.left = cx + 'px'; c.style.top = cy + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .svc, .gal-main, .gal-item, .why-card, .city').forEach(el => {
    el.addEventListener('mouseenter', () => c.classList.add('big'));
    el.addEventListener('mouseleave', () => c.classList.remove('big'));
  });
})();

(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const tick = () => nav.classList.toggle('stuck', window.scrollY > 50);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();

(function () {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobMenu');
  const close  = document.getElementById('mobClose');
  if (!burger || !menu) return;
  const open = () => { menu.classList.add('open');    document.body.style.overflow = 'hidden'; };
  const shut = () => { menu.classList.remove('open'); document.body.style.overflow = ''; };
  burger.addEventListener('click', open);
  close?.addEventListener('click', shut);
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', shut));
})();

(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('in'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  const seen = new Set();
  els.forEach(el => {
    const parent = el.parentElement;
    if (!seen.has(parent)) {
      seen.add(parent);
      const sibs = Array.from(parent.querySelectorAll(':scope > .reveal'));
      if (sibs.length > 1) sibs.forEach((s, i) => { if (i > 0) s.dataset.delay = i * 100; });
    }
    observer.observe(el);
  });
})();

(function () {
  const photo = document.querySelector('.hero-photo');
  if (!photo) return;
  let t = false;
  window.addEventListener('scroll', () => {
    if (t) return;
    requestAnimationFrame(() => {
      if (window.scrollY < window.innerHeight)
        photo.style.transform = 'translateY(' + (window.scrollY * 0.07) + 'px)';
      t = false;
    });
    t = true;
  }, { passive: true });
})();

(function () {
  const cities = document.querySelectorAll('.city');
  const wrap   = document.querySelector('.area-cities');
  if (!cities.length || !wrap) return;
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    cities.forEach((c, i) => setTimeout(() => c.classList.add('shown'), i * 70));
    obs.disconnect();
  }, { threshold: 0.2 });
  obs.observe(wrap);
})();

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    const off = document.getElementById('nav')?.offsetHeight || 80;
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
  });
});

(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.svc').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = 'translateY(-4px) rotateX(' + (-y*3) + 'deg) rotateY(' + (x*3) + 'deg)';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();
