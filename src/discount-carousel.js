// Native RTL scrolling preserves touch momentum, trackpad input and focus navigation.
const carousel = document.querySelector('[data-sale-carousel]');

if (carousel) {
  const track = carousel.querySelector('.sale-products');
  const playButton = carousel.querySelector('[data-sale-play]');
  const playIcon = carousel.querySelector('[data-sale-play-icon]');
  const previousButton = carousel.querySelector('[data-sale-prev]');
  const nextButton = carousel.querySelector('[data-sale-next]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motion.matches;
  let hovered = false;
  let focused = false;
  let visible = false;
  let pointerId = null;
  let resumeAt = 0;
  let direction = 1;
  let lastTime = null;
  let lastWritten = null;
  let animatedPosition = null;
  let frame = null;
  let resumeTimer;
  let limit = 0;

  const position = () => Math.max(0, Math.min(limit, -track.scrollLeft));
  const blocked = () => paused || hovered || focused || pointerId !== null || !visible || document.hidden || limit <= 0;

  function schedule() {
    cancelAnimationFrame(frame);
    clearTimeout(resumeTimer);
    frame = null;
    lastTime = null;
    animatedPosition = null;
    if (blocked()) return;
    const delay = resumeAt - performance.now();
    if (delay > 0) resumeTimer = setTimeout(schedule, delay);
    else frame = requestAnimationFrame(animate);
  }

  function yieldToInput() {
    resumeAt = performance.now() + 2500;
    lastWritten = null;
    schedule();
  }

  function animate(time) {
    if (blocked()) { schedule(); return; }
    const elapsed = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, .05);
    lastTime = time;
    const current = animatedPosition ?? position();
    if (current >= limit - .5) direction = -1;
    else if (current <= .5) direction = 1;
    // Ease down near either edge, reverse there, and continue without a reset/jump.
    const distance = direction === 1 ? limit - current : current;
    const speed = 32 * Math.max(.16, Math.min(1, Math.sqrt(distance / 80)));
    const next = Math.max(0, Math.min(limit, current + direction * speed * elapsed));
    // Retain subpixel progress even when a browser rounds scrollLeft to whole pixels.
    animatedPosition = next;
    // Automatic frames must bypass smooth CSS scrolling; each frame is already eased.
    track.scrollTo({ left: -next, behavior: 'instant' });
    lastWritten = track.scrollLeft;
    frame = requestAnimationFrame(animate);
  }

  function updatePlay() {
    playButton.setAttribute('aria-pressed', String(paused));
    playButton.setAttribute('aria-label', paused ? 'شروع حرکت خودکار' : 'توقف حرکت خودکار');
    playIcon.setAttribute('d', paused ? 'm9 5 10 7-10 7Z' : 'M9 6v12M15 6v12');
    schedule();
  }

  function navigate(step) {
    yieldToInput();
    direction = step;
    const card = track.querySelector('.sale-product');
    const stride = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
    track.scrollTo({ left: -Math.max(0, Math.min(limit, position() + step * stride)), behavior: motion.matches ? 'auto' : 'smooth' });
  }

  function measure() {
    limit = Math.max(0, track.scrollWidth - track.clientWidth);
    previousButton.disabled = nextButton.disabled = playButton.disabled = limit === 0;
    lastWritten = null;
    schedule();
  }

  previousButton.addEventListener('click', () => navigate(-1));
  nextButton.addEventListener('click', () => navigate(1));
  playButton.addEventListener('click', () => { paused = !paused; updatePlay(); });
  track.addEventListener('keydown', (event) => {
    yieldToInput();
    // Only handle row navigation; product controls keep their native keyboard behavior.
    if (event.target !== track) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(event.key === 'ArrowLeft' ? 1 : -1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      track.scrollTo({ left: event.key === 'Home' ? 0 : -limit, behavior: motion.matches ? 'auto' : 'smooth' });
    }
  });
  track.addEventListener('wheel', yieldToInput, { passive: true });
  track.addEventListener('scroll', () => {
    // Ignore our own animation frames, but extend the grace period through native momentum.
    if (lastWritten === null || Math.abs(track.scrollLeft - lastWritten) > 1) yieldToInput();
  }, { passive: true });
  carousel.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'touch') { hovered = true; schedule(); }
  });
  carousel.addEventListener('pointerleave', () => { hovered = false; yieldToInput(); });
  carousel.addEventListener('pointerdown', (event) => { pointerId = event.pointerId; yieldToInput(); }, { passive: true });
  function releasePointer(event) {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    yieldToInput();
  }
  window.addEventListener('pointerup', releasePointer, { passive: true });
  window.addEventListener('pointercancel', releasePointer, { passive: true });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', (event) => { focused = carousel.contains(event.relatedTarget); yieldToInput(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePlay(); });
  window.addEventListener('blur', () => { pointerId = null; hovered = false; schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: .1 }).observe(track);
  } else visible = true;
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(track);
  else window.addEventListener('resize', measure);
  measure();
  updatePlay();
}
