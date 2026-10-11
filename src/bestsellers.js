// Page-local interactions for the featured section, independent of catalog previews.
const section = document.querySelector('#bestsellers');
const number = new Intl.NumberFormat('fa-IR');

for (const card of section?.querySelectorAll('[data-product]') ?? []) {
  const name = card.querySelector('h3').textContent.trim();
  const price = Number(card.dataset.price);
  const favorite = card.querySelector('.favorite');
  const buy = card.querySelector('.buy');
  const quantity = card.querySelector('.quantity');
  const label = card.querySelector('.quantity-label');
  const increment = card.querySelector('.increment');
  const decrement = card.querySelector('.decrement');
  const note = card.querySelector('.cart-note');
  const defaultNote = note.textContent;
  let count = 0;

  favorite.addEventListener('click', () => {
    const selected = favorite.getAttribute('aria-pressed') !== 'true';
    favorite.setAttribute('aria-pressed', String(selected));
    favorite.setAttribute('aria-label', `${selected ? 'حذف' : 'افزودن'} ${name} ${selected ? 'از' : 'به'} علاقه‌مندی‌ها`);
  });

  function updateQuantity(nextCount) {
    count = Math.min(99, Math.max(0, nextCount));
    buy.hidden = count > 0;
    quantity.hidden = count === 0;
    label.textContent = `${number.format(count)} عدد در سبد`;
    increment.disabled = count === 99;
    note.classList.toggle('active', count > 0);
    note.textContent = count > 0
      ? `جمع: ${number.format(count * price)} تومان`
      : defaultNote;
  }

  buy.addEventListener('click', () => {
    updateQuantity(1);
    increment.focus({ preventScroll: true });
  });
  increment.addEventListener('click', () => updateQuantity(count + 1));
  decrement.addEventListener('click', () => {
    updateQuantity(count - 1);
    if (count === 0) buy.focus({ preventScroll: true });
  });
}
