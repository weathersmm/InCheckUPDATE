// Particle Animation for Hero (Neural Mesh Style)
(function () {
  const el = document.getElementById('particles-js');
  if (!el || typeof particlesJS !== 'function') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#4f46e5' }, // Tailwind primary
      shape: { type: 'circle', stroke: { width: 0, color: '#000' } },
      opacity: { value: 0.3, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#22d3ee', // Tailwind accent
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: false },
        resize: true
      },
      modes: { grab: { distance: 200, line_linked: { opacity: 0.4 } } }
    },
    retina_detect: true
  });
})();
