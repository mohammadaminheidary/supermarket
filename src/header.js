// Only the glass lighting responds to the pointer. Store controls are UI previews.
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
