// Carousel behavior only; campaign CTAs are presentation previews.
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.promotion-slide, .product-banner')];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const playButton = carousel.querySelector('[data-carousel-play]');
  const playIcon = carousel.querySelector('[data-play-icon]');
  const status = carousel.querySelector('[data-carousel-status]');
  const viewport = carousel.querySelector('.promotion-viewport, .product-promotion-viewport');
  const mobile = carousel.hasAttribute('data-mobile-carousel') ? window.matchMedia('(max-width: 680px)') : null;
  const enabled = () => !mobile || mobile.matches;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const number = new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 });
  let current = 0;
  let paused = motion.matches;
  let hovered = false;
  let focused = false;
  let visible = true;
  let timer;
  let touchStart;

  const schedule = () => {
    window.clearTimeout(timer);
    if (enabled() && !paused && !hovered && !focused && visible && !document.hidden) {
      timer = window.setTimeout(() => show(current + 1), 6500);
    }
  };

  const show = (index, announce = false) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.inert = enabled() && !active;
      slide.setAttribute('aria-hidden', String(enabled() && !active));
      dots[i].classList.toggle('is-active', active);
      dots[i].setAttribute('aria-pressed', String(active));
    });
    carousel.querySelector('[data-slide-count]').textContent = number.format(current + 1);
    if (announce) status.textContent = slides[current].getAttribute('aria-label');
    schedule();
  };

  const updatePlay = () => {
    playButton.setAttribute('aria-label', paused ? 'شروع پخش خودکار' : 'توقف پخش خودکار');
    playButton.setAttribute('aria-pressed', String(paused));
    playIcon.setAttribute('d', paused ? 'm9 5 10 7-10 7Z' : 'M9 6v12M15 6v12');
    schedule();
  };

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => show(current - 1, true));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => show(current + 1, true));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i, true)));
  playButton.addEventListener('click', () => { paused = !paused; updatePlay(); });
  carousel.addEventListener('keydown', (event) => {
    if (!enabled()) return;
    // RTL: the next slide is to the left.
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    // Keep keyboard focus on the stable controls when a CTA's slide becomes inert.
    if (event.target.closest('.promotion-slide, .product-banner')) playButton.focus();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowLeft' ? 1 : -1);
    show(index, true);
  });
  carousel.addEventListener('pointerenter', (event) => { if (event.pointerType !== 'touch') { hovered = true; schedule(); } });
  carousel.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', (event) => { focused = carousel.contains(event.relatedTarget); schedule(); });
  viewport.addEventListener('pointerdown', (event) => {
    if (enabled() && event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
  });
  viewport.addEventListener('pointerup', (event) => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = undefined;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) show(current + (dx > 0 ? 1 : -1), true);
  });
  viewport.addEventListener('pointercancel', () => { touchStart = undefined; });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePlay(); });
  mobile?.addEventListener('change', () => {
    touchStart = undefined;
    // A resize must not leave keyboard focus inside a newly hidden banner/control.
    if (carousel.contains(document.activeElement)) document.activeElement.blur();
    focused = false;
    show(current);
    if (mobile.matches) carousel.setAttribute('aria-roledescription', 'اسلایدشو');
    else carousel.removeAttribute('aria-roledescription');
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: .15 }).observe(carousel);
  }
  show(0);
  if (mobile?.matches) carousel.setAttribute('aria-roledescription', 'اسلایدشو');
  updatePlay();
});
