document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const ensureDesktopState = () => {
    if (window.innerWidth >= 992) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  };

  toggle.addEventListener('click', () => {
    if (window.innerWidth >= 992) return; // guard
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });

  // Close on escape for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });

  // Clear mobile state on resize/debounced
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(ensureDesktopState, 150);
  });
  ensureDesktopState();
});