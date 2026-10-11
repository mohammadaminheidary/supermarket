// Selection and tactile feedback only; no store data or routes are changed.
import { initAdaptiveContrast } from './navigation-contrast.js';

const navbar = document.querySelector('[data-bottom-nav]');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (navbar) {
  initAdaptiveContrast(navbar);
  const items = [...navbar.querySelectorAll('.nav-item')];
  let response;

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      items.forEach((choice) => {
        const selected = choice === item;
        choice.classList.toggle('is-active', selected);
        choice.setAttribute('aria-pressed', String(selected));
      });
      navbar.style.setProperty('--active-index', index);

      // Retarget from the current pose during rapid clicks, without snapping to rest.
      const currentPose = getComputedStyle(navbar).transform;
      response?.cancel();
      if (motionQuery.matches) return;

      // A restrained elastic response keeps the silhouette and hit areas stable.
      response = navbar.animate([
        { transform: currentPose === 'none' ? 'scale(1)' : currentPose, easing: 'cubic-bezier(.4, 0, .2, 1)' },
        { transform: 'scale(1.003, .995)', offset: .32, easing: 'cubic-bezier(.4, 0, .2, 1)' },
        { transform: 'scale(.999, 1.002)', offset: .68, easing: 'cubic-bezier(.4, 0, .2, 1)' },
        { transform: 'scale(1)' },
      ], { duration: 620, easing: 'linear' });
    });
  });

  motionQuery.addEventListener('change', () => response?.cancel());
}
