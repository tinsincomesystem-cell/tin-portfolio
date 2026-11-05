// Boots site-wide behaviour: smooth scroll, reveals, intro, cursor, magnetic buttons.
import { gsap, ScrollTrigger, initSmoothScroll, reducedMotion, finePointer, token, scrollToTarget } from './core';

function intro() {
  const el = document.querySelector<HTMLElement>('.intro');
  const done = () => { el?.classList.add('is-done'); document.documentElement.classList.add('intro-done'); window.dispatchEvent(new Event('intro:done')); };
  if (!el || reducedMotion() || sessionStorageSafe('seenIntro')) { el?.remove(); done(); return; }
  const secs = Math.min(token('--intro-duration', 1.2), 1.4);
  gsap.from(el.querySelectorAll('.intro-mark > *'), { yPercent: 110, duration: secs * 0.55, ease: 'expo.out', stagger: 0.08 });
  // let the hero start animating just before the intro lifts (faster first paint)
  setTimeout(() => window.dispatchEvent(new Event('intro:almost')), Math.max(0, secs * 1000 - 500));
  setTimeout(() => { done(); setTimeout(() => el.remove(), 600); }, secs * 1000);
}

function sessionStorageSafe(key: string): boolean {
  try { const seen = sessionStorage.getItem(key) === '1'; sessionStorage.setItem(key, '1'); return seen; } catch { return false; }
}

function reveals() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || reducedMotion()) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((e) => io.observe(e));
}

function magnetic() {
  if (!finePointer() || reducedMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '') || 0.35;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}

function cursor() {
  const c = document.querySelector<HTMLElement>('.cursor');
  if (!c || !finePointer() || reducedMotion()) return;
  document.documentElement.classList.add('has-cursor');
  const dot = c.querySelector<HTMLElement>('.cursor-dot')!;
  const ring = c.querySelector<HTMLElement>('.cursor-ring')!;
  const label = ring.querySelector('span')!;
  const dx = gsap.quickTo(dot, 'x', { duration: 0.08 }), dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' }), ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });
  c.style.opacity = '0';
  window.addEventListener('pointermove', (e) => { c.style.opacity = '1'; dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('a, button, [role="button"], [data-cursor], label, summary, input[type="range"]');
    c.classList.toggle('is-hover', !!t);
    const text = t?.dataset.cursor || '';
    label.textContent = text;
    c.classList.toggle('has-label', !!text);
  });
  document.addEventListener('pointerleave', () => { c.style.opacity = '0'; });
  document.addEventListener('pointerenter', () => { c.style.opacity = '1'; });
}

function anchors() {
  document.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    // Matches "#pricing" and the menu's "/#pricing" when already on that page.
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || a.target === '_blank' || a.pathname !== location.pathname || a.hash.length < 2) return;
    const id = a.hash;
    const el = document.getElementById(id.slice(1));
    if (!el) return;
    e.preventDefault();
    scrollToTarget(el);
    history.pushState(null, '', id);
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });
}

// Sections off screen stop their looping effects, so the part you're looking at stays smooth.
function pauseOffscreen() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('fx-paused', !e.isIntersecting));
  }, { rootMargin: '200px 0px' });
  document.querySelectorAll('main section').forEach((s) => io.observe(s));
}

export function boot() {
  initSmoothScroll();
  pauseOffscreen();
  intro();
  reveals();
  magnetic();
  cursor();
  anchors();
  // Recalculate pinned sections once fonts & images have settled (prevents jumps).
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
