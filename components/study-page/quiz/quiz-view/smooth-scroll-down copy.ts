/**
 * یک div مشخص را با سرعت نرم حداکثر ۱۰۰ پیکسل به پایین اسکرول می‌کند.
 *
 * @param element - المانی که باید اسکرول شود
 * @param distance - مقدار اسکرول به پیکسل (پیش‌فرض ۱۰۰)
 * @param duration - مدت زمان انیمیشن به میلی‌ثانیه (پیش‌فرض ۴۰۰)
 */
export function smoothScrollDown(
  element: HTMLElement | null,
  distance: number = 100,
  duration: number = 400,
): void {
  if (!element) return;

  // حداکثر ۱۰۰ پیکسل
  const target = Math.min(distance, 100);

  const start = element.scrollTop;
  const startTime = performance.now();

  const easeInOutCubic = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    element.scrollTop = start + target * eased;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}
