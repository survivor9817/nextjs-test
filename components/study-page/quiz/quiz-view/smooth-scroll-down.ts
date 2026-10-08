export function smoothScrollDown(
  element: HTMLElement,
  distance = 100,
  duration = 400,
): Promise<void> {
  return new Promise((resolve) => {
    const maxScroll = element.scrollHeight - element.clientHeight - element.scrollTop;
    const delta = Math.min(distance, 100, Math.max(maxScroll, 0));

    if (delta <= 0) return resolve();

    const start = element.scrollTop;
    const startTime = performance.now();
    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      element.scrollTop = start + delta * easeInOut(progress);

      if (progress < 1) requestAnimationFrame(step);
      else resolve();
    };

    requestAnimationFrame(step);
  });
}
