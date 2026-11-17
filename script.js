/* ===========================
   HOLTZ SOLUÇÕES – script.js
   Formulário desativado: envio indisponível.
   =========================== */

// ---- Header scroll ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

// ---- Menu mobile ----
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');
function setMenu(open) {
  nav.classList.toggle('open', open);
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
hamburger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    setMenu(false);
    hamburger.focus();
  }
});

// ---- Link ativo no menu ----
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...navLinks].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
function setActiveNav() {
  let current = sections[0]?.id;
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// ---- Abas de soluções ----
const tabs = document.querySelectorAll('.sol-tab');
function selectTab(id) {
  tabs.forEach(t => {
    const on = t.dataset.tab === id;
    t.classList.toggle('is-active', on);
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
  });
  document.querySelectorAll('.sol-panel').forEach(p => { p.hidden = p.id !== 'painel-' + id; });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t.dataset.tab));
  t.addEventListener('keydown', e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next = tabs[(i + (e.key === 'ArrowDown' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next.dataset.tab); next.focus();
  });
});
// Links externos às abas (barra do hero, rodapé)
document.querySelectorAll('a[data-tab]').forEach(a => a.addEventListener('click', () => selectTab(a.dataset.tab)));

// ---- Formulário de contato: indisponível, sem envio ----
const form = document.getElementById('contact-form');
if (form) {
  form.querySelectorAll('input, textarea, button, select, fieldset').forEach(el => { el.disabled = true; });
  form.addEventListener('submit', e => { e.preventDefault(); e.stopImmediatePropagation(); }, true);
  form.submit = () => {};
  form.requestSubmit = () => {};
}