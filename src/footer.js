// Enhance footer headings on mobile; the unenhanced HTML keeps all links readable.
const footerMobile = window.matchMedia('(max-width: 1023px)');
const footerGroups = [...document.querySelectorAll('[data-footer-toggle]')].map((heading) => {
  const content = document.getElementById(heading.dataset.footerToggle);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'footer-toggle';
  button.textContent = heading.textContent;
  button.setAttribute('aria-controls', content.id);
  heading.replaceChildren(button);
  const group = { button, content, expanded: false };
  button.addEventListener('click', () => {
    if (!footerMobile.matches) return;
    group.expanded = !group.expanded;
    updateFooterGroup(group);
  });
  return group;
});

function updateFooterGroup(group) {
  const { button, content } = group;
  const expanded = !footerMobile.matches || group.expanded;
  button.disabled = !footerMobile.matches;
  // Keep focus on the toggle when a breakpoint collapses focused links.
  if (!expanded && content.contains(document.activeElement)) button.focus({ preventScroll: true });
  content.hidden = !expanded;
  if (footerMobile.matches) button.setAttribute('aria-expanded', String(expanded));
  else button.removeAttribute('aria-expanded');
}

footerGroups.forEach(updateFooterGroup);
footerMobile.addEventListener('change', () => footerGroups.forEach(updateFooterGroup));

// Footer navigation and a consent-based, local-only newsletter demonstration.
const form = document.querySelector('[data-newsletter]');
const storageKey = 'supermarket.newsletter.email';

if (form) {
  const email = form.elements.email;
  const status = document.querySelector('#newsletter-status');
  const remove = form.querySelector('[data-newsletter-remove]');
  const announce = (message, error = false) => {
    status.textContent = message;
    status.classList.toggle('is-error', error);
  };

  try {
    remove.hidden = !localStorage.getItem(storageKey);
  } catch {
    // The form still renders when browser storage is unavailable.
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    try {
      const value = email.value.trim();
      const duplicate = localStorage.getItem(storageKey) === value;
      localStorage.setItem(storageKey, value);
      remove.hidden = false;
      announce(duplicate
        ? 'این ایمیل قبلاً در این مرورگر ذخیره شده است؛ عضویت واقعی انجام نشده است.'
        : 'ایمیل شما در این مرورگر ذخیره شد. این فرم نمایشی است و عضویت واقعی انجام نشده است.');
      form.reset();
    } catch {
      announce('مرورگر اجازه ذخیره ایمیل را نمی‌دهد. چیزی ذخیره نشد؛ تنظیمات مرورگر را بررسی کنید.', true);
    }
  });

  remove.addEventListener('click', () => {
    try {
      localStorage.removeItem(storageKey);
      remove.hidden = true;
      announce('ایمیل ذخیره‌شده از این مرورگر حذف شد.');
      email.focus();
    } catch {
      announce('حذف ایمیل ممکن نشد. داده‌های این سایت را از تنظیمات مرورگر پاک کنید.', true);
    }
  });
}

function revealResource(hash) {
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target?.matches('.footer-resources details')) return;
  let parent = target.parentElement;
  while (parent) {
    if (parent.tagName === 'DETAILS') parent.open = true;
    parent = parent.parentElement;
  }
  target.open = true;
  target.scrollIntoView({ block: 'start' });
}

// Repeated links to the same hash also reopen an article that was collapsed.
document.querySelector('.site-footer')?.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (link) revealResource(link.hash);
});
window.addEventListener('hashchange', () => revealResource(location.hash));
revealResource(location.hash);

const year = document.querySelector('[data-footer-year]');
if (year) year.textContent = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());

const shareUrl = new URL(location.href);
shareUrl.hash = '';
const storeName = 'هایپرمارکت عصر جدید';
const shareTargets = {
  telegram: `https://t.me/share/url?${new URLSearchParams({ url: shareUrl.href, text: storeName })}`,
  whatsapp: `https://wa.me/?${new URLSearchParams({ text: `${storeName} ${shareUrl.href}` })}`,
  x: `https://twitter.com/intent/tweet?${new URLSearchParams({ text: storeName, url: shareUrl.href })}`,
};
document.querySelectorAll('[data-share]').forEach((link) => {
  link.href = shareTargets[link.dataset.share];
});
