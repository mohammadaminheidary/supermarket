// Mouse dragging supplements native touch, trackpad and keyboard scrolling.
for (const track of document.querySelectorAll('.sale-products, .bundle-products, .bestsellers-products, .catalog-grid, .quick-categories')) {
  const dragThreshold = 6;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // The discounts rail owns its keyboard controls and automatic movement.
  if (!track.matches('.sale-products')) {
    track.addEventListener('keydown', (event) => {
      if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const limit = Math.max(0, track.scrollWidth - track.clientWidth);
      const stride = track.querySelector('.card, .quick-category')?.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 12);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? -limit : track.scrollLeft + (event.key === 'ArrowLeft' ? -stride : stride);
      track.scrollTo({ left: Math.max(-limit, Math.min(0, next)), behavior: motion.matches ? 'instant' : 'smooth' });
    });
  }
  let gesture = null;
  let suppressClick = false;

  function finish() {
    if (!gesture) return;
    const { pointerId, dragging } = gesture;
    gesture = null;
    suppressClick = dragging;
    track.classList.remove('is-mouse-down', 'is-dragging');
    if (track.hasPointerCapture(pointerId)) track.releasePointerCapture(pointerId);
  }

  track.addEventListener('pointerdown', (event) => {
    // A new gesture must never inherit click suppression from an earlier drag.
    suppressClick = false;
    if (event.pointerType !== 'mouse' || event.button !== 0 || gesture) return;
    if (track.scrollWidth <= track.clientWidth) return;
    // Leave the native scrollbar available for direct manipulation.
    const bounds = track.getBoundingClientRect();
    if (event.clientY >= bounds.top + track.clientTop + track.clientHeight) return;

    gesture = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      dragging: false,
    };
    track.classList.add('is-mouse-down');
  });

  window.addEventListener('pointermove', (event) => {
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    if (!(event.buttons & 1)) { finish(); return; }
    const distance = event.clientX - gesture.startX;
    if (!gesture.dragging) {
      if (Math.abs(distance) < dragThreshold) return;
      gesture.dragging = true;
      track.classList.add('is-dragging');
      window.getSelection()?.removeAllRanges();
      // Capture only after dragging starts, so ordinary button clicks retain their target.
      track.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    track.scrollLeft = gesture.startScroll - distance;
  }, { passive: false });

  function endPointer(event) {
    if (gesture && event.pointerId === gesture.pointerId) finish();
  }

  window.addEventListener('pointerup', endPointer);
  window.addEventListener('pointercancel', endPointer);
  track.addEventListener('lostpointercapture', endPointer);
  window.addEventListener('blur', finish);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) finish();
  });

  track.addEventListener('click', (event) => {
    // detail=0 belongs to keyboard/assistive activation, which remains available.
    if (!suppressClick || event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }, { capture: true });

  track.addEventListener('selectstart', (event) => {
    if (gesture) event.preventDefault();
  });
  track.addEventListener('dragstart', (event) => {
    if (gesture) event.preventDefault();
  });
}
