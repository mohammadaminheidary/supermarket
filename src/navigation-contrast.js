// Estimate the backdrop from painted CSS surfaces, without screenshot permissions.
const colorPattern = /rgba?\([^)]+\)|transparent/g;

function parseColor(value) {
  if (value === 'transparent') return [0, 0, 0, 0];
  const channels = value.match(/[\d.]+/g)?.map(Number);
  return channels?.length >= 3 ? [...channels.slice(0, 3), channels[3] ?? 1] : [0, 0, 0, 0];
}

function composite(base, color, opacity = 1) {
  const alpha = color[3] * opacity;
  return base.map((channel, index) => channel * (1 - alpha) + color[index] * alpha);
}

function gradientLayers(background) {
  let depth = 0;
  let start = 0;
  const layers = [];
  for (let index = 0; index < background.length; index++) {
    if (background[index] === '(') depth++;
    if (background[index] === ')') depth--;
    if (background[index] === ',' && depth === 0) {
      layers.push(background.slice(start, index));
      start = index + 1;
    }
  }
  layers.push(background.slice(start));
  return layers.reverse();
}

function brightness(color) {
  const linear = color.map(channel => {
    const value = channel / 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  });
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}

export function initAdaptiveContrast(navbar) {
  const wrapper = navbar.closest('.bottom-nav');
  const forcedColors = matchMedia('(forced-colors: active)');
  let frame = 0;
  let lightInk = false;

  function update() {
    frame = 0;
    if (document.hidden || forcedColors.matches) return;
    const bounds = navbar.getBoundingClientRect();
    const styles = new Map();
    const samples = [];

    // Sample each item at three heights, excluding the glass and its controls.
    for (const row of [.25, .5, .75]) {
      for (const column of [.1, .3, .5, .7, .9]) {
        const x = bounds.left + bounds.width * column;
        const y = bounds.top + bounds.height * row;
        let color = [255, 255, 255];
        const layers = document.elementsFromPoint(x, y).filter(element => !wrapper.contains(element));
        for (const element of layers.reverse()) {
          let style = styles.get(element);
          if (!style) {
            style = getComputedStyle(element);
            styles.set(element, style);
          }
          if (style.visibility !== 'visible' || Number(style.opacity) === 0) continue;
          const opacity = Number(style.opacity);
          color = composite(color, parseColor(style.backgroundColor), opacity);
          for (const layer of gradientLayers(style.backgroundImage)) {
            if (!layer.includes('gradient(')) continue;
            const stops = (layer.match(colorPattern) ?? []).map(parseColor);
            if (!stops.length) continue;
            // Average premultiplied stops so transparent edges do not count as black.
            const alpha = stops.reduce((sum, stop) => sum + stop[3], 0);
            if (!alpha) continue;
            const average = [0, 1, 2].map(index => stops.reduce((sum, stop) => sum + stop[index] * stop[3], 0) / alpha);
            color = composite(color, [...average, alpha / stops.length], opacity);
          }
        }
        const luminance = brightness(color);
        const high = Math.max(...color);
        const saturation = high ? (high - Math.min(...color)) / high : 0;
        samples.push({ luminance, needsLightInk: luminance < .36 || (saturation > .38 && luminance < .82) });
      }
    }

    const coverage = samples.filter(sample => sample.needsLightInk).length / samples.length;
    // Hysteresis avoids oscillating when the navbar straddles a section edge.
    lightInk = coverage >= (lightInk ? .2 : .34);
    const brightest = Math.max(...samples.map(sample => sample.luminance));
    navbar.style.setProperty('--glass-shade', brightest > .5 ? '.16' : '.10');
    navbar.classList.toggle('has-light-ink', lightInk);
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  // Event-driven sampling: no perpetual animation loop or scroll-blocking work.
  document.addEventListener('scroll', schedule, { passive: true, capture: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
  document.addEventListener('load', schedule, true);
  document.addEventListener('transitionend', schedule);
  document.addEventListener('animationend', schedule);
  document.addEventListener('visibilitychange', schedule);
  forcedColors.addEventListener('change', schedule);
  // Existing carousels change classes without scrolling; ignore navbar mutations.
  const observer = new MutationObserver(records => {
    if (records.some(record => !wrapper.contains(record.target))) schedule();
  });
  observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
  new ResizeObserver(schedule).observe(navbar);
  schedule();
}
