const countdown = document.querySelector('[data-sale-countdown]');

if (countdown) {
  const endTime = Date.parse(countdown.dataset.saleEnd);
  const timer = countdown.querySelector('[data-countdown-timer]');
  const label = countdown.querySelector('[data-countdown-label]');
  const status = countdown.querySelector('[data-countdown-status]');
  const digits = new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2, useGrouping: false });
  const fields = ['days', 'hours', 'minutes', 'seconds'].map((unit) => countdown.querySelector(`[data-time="${unit}"]`));
  let interval;

  function updateCountdown() {
    if (!Number.isFinite(endTime)) {
      label.textContent = 'زمان پایان پیشنهاد مشخص نشده است';
      clearInterval(interval);
      return;
    }

    const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    const values = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
    fields.forEach((field, index) => { field.textContent = digits.format(values[index]); });
    timer.setAttribute('aria-label', `${digits.format(values[0])} روز، ${digits.format(values[1])} ساعت، ${digits.format(values[2])} دقیقه و ${digits.format(values[3])} ثانیه باقی‌مانده`);

    if (remaining === 0) {
      label.textContent = 'زمان این پیشنهاد به پایان رسید';
      status.textContent = label.textContent;
      clearInterval(interval);
    }
  }

  interval = setInterval(updateCountdown, 1000);
  updateCountdown();
  // Recalculate from the fixed deadline after a background tab becomes visible.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateCountdown();
  });
}
