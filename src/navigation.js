// Selection and tactile feedback only; no store data or routes are changed.
import { initAdaptiveContrast } from './navigation-contrast.js';

const navbar = document.querySelector('[data-bottom-nav]');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (navbar) {
  initAdaptiveContrast(navbar);
  const items = [...navbar.querySelectorAll('.nav-item')];
  let response;
  const iconResponses = new Map();

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

      const icon = item.querySelector('svg');
      iconResponses.get(icon)?.cancel();
      const pose = getComputedStyle(icon).transform;
      const base = pose === 'none' ? '' : pose;
      const shake = icon.animate([
        { transform: `${base} rotate(0deg)` },
        { transform: `${base} translateX(-1.5px) rotate(-5deg)`, offset: .22 },
        { transform: `${base} translateX(1.5px) rotate(4deg)`, offset: .46 },
        { transform: `${base} translateX(-.5px) rotate(-2deg)`, offset: .7 },
        { transform: `${base} rotate(0deg)` },
      ], { duration: 420, easing: 'ease-in-out' });
      iconResponses.set(icon, shake);
      shake.addEventListener('finish', () => { if (iconResponses.get(icon) === shake) iconResponses.delete(icon); });

      // A restrained elastic response keeps the silhouette and hit areas stable.
      response = navbar.animate([
        { transform: currentPose === 'none' ? 'scale(1)' : currentPose, easing: 'cubic-bezier(.4, 0, .2, 1)' },
        { transform: 'scale(1.003, .995)', offset: .32, easing: 'cubic-bezier(.4, 0, .2, 1)' },
        { transform: 'scale(.999, 1.002)', offset: .68, easing: 'cubic-bezier(.4, 0, .2, 1)' },
        { transform: 'scale(1)' },
      ], { duration: 620, easing: 'linear' });
    });
  });

  motionQuery.addEventListener('change', () => {
    response?.cancel();
    iconResponses.forEach((animation) => animation.cancel());
    iconResponses.clear();
  });
}
