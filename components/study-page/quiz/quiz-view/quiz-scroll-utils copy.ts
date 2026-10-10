const getScrollParent = (el: HTMLElement): HTMLElement | null => {
  let parent = el.parentElement;
  while (parent) {
    const { overflowY } = getComputedStyle(parent);
    if (/(auto|scroll)/.test(overflowY) && parent.scrollHeight > parent.clientHeight) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
};

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type ScrollRevealOptions = {
  delay?: number; // شروع نسبت به لحظهٔ کلیک (ms)
  duration?: number; // مدت اسکرول (ms)
  offsetBottom?: number; // فاصله از پایین (مثلاً ارتفاع نوار شناور)
  maxDistance?: number; // سقف اسکرول به پیکسل
};

export function scrollToRevealBottom(
  el: HTMLElement,
  { delay = 150, duration = 300, offsetBottom = 80, maxDistance = 100 }: ScrollRevealOptions = {},
) {
  let rafId = 0;

  const timeoutId = window.setTimeout(() => {
    const parent = getScrollParent(el);
    const finalHeight = el.scrollHeight + 4; // ۴ پیکسل برای border

    const viewportBottom = parent ? parent.getBoundingClientRect().bottom : window.innerHeight;
    const startScroll = parent ? parent.scrollTop : window.scrollY;

    const finalBottom = el.getBoundingClientRect().top + finalHeight;
    const delta = Math.min(maxDistance, Math.max(finalBottom - (viewportBottom - offsetBottom), 0));
    if (delta <= 0) return;

    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = startScroll + delta * easeInOutCubic(progress);
      if (parent) parent.scrollTop = value;
      else window.scrollTo(0, value);
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
  }, delay);

  return () => {
    clearTimeout(timeoutId);
    cancelAnimationFrame(rafId);
  };
}

export function scrollBackToClosedLimit(
  el: HTMLElement,
  { duration = 250 }: { duration?: number } = {},
) {
  let rafId = 0;
  const parent = getScrollParent(el);

  const scrollHeight = parent ? parent.scrollHeight : document.documentElement.scrollHeight;
  const clientHeight = parent ? parent.clientHeight : window.innerHeight;
  const startScroll = parent ? parent.scrollTop : window.scrollY;

  // فضایی که پنل (با margin) از ارتفاع اسکرول اشغال کرده
  const marginBottom = parseFloat(getComputedStyle(el).marginBottom) || 0;
  const panelSpace = el.offsetHeight + marginBottom;

  // بیشترین اسکرول ممکن وقتی پنل کامل بسته باشه
  const closedMaxScroll = Math.max(scrollHeight - panelSpace - clientHeight, 0);

  // اگه کاربر از قبل داخل محدودهٔ مجاز هست، کاری نکن
  if (startScroll <= closedMaxScroll) return () => {};

  const distance = startScroll - closedMaxScroll;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const target = startScroll - distance * easeInOutCubic(progress);
    const current = parent ? parent.scrollTop : window.scrollY;
    // رو به پایین برنمی‌گرده (مرورگر هنگام جمع شدن پنل خودش کلمپ می‌کنه)
    const value = Math.min(current, target);
    if (parent) parent.scrollTop = value;
    else window.scrollTo(0, value);
    if (progress < 1) rafId = requestAnimationFrame(step);
  };
  rafId = requestAnimationFrame(step);

  return () => cancelAnimationFrame(rafId);
}

// baalaaee haa ya in:
export function revealAnswer(el: HTMLElement, delay = 150) {
  const id = window.setTimeout(
    () => el.scrollIntoView({ behavior: "smooth", block: "nearest" }),
    delay,
  );
  return () => clearTimeout(id);
}
