// Header presentation only; store controls remain UI previews.
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

for (const surface of document.querySelectorAll('.glass')) {
  let frame = 0;

  const reset = () => {
    cancelAnimationFrame(frame);
    surface.style.removeProperty('--pointer-x');
    surface.style.removeProperty('--pointer-y');
  };

  surface.addEventListener('pointermove', (event) => {
    if (motionQuery.matches || !pointerQuery.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = surface.getBoundingClientRect();
      surface.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      surface.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    });
  });

  surface.addEventListener('pointerleave', reset);
  motionQuery.addEventListener('change', reset);
  pointerQuery.addEventListener('change', reset);
}

const navigation = document.querySelector('[data-header-navigation]');
const topbar = document.querySelector('.site-header');

if (navigation && topbar) {
  let frame = 0;
  let threshold = topbar.offsetHeight;
  let compact = false;

  const update = () => {
    frame = 0;
    // A small dead band prevents flickering near the change in presentation.
    compact = window.scrollY > threshold + (compact ? -8 : 8);
    navigation.classList.toggle('is-scrolled', compact);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  new ResizeObserver(() => {
    threshold = topbar.offsetHeight;
    schedule();
  }).observe(topbar);
  update();
}
