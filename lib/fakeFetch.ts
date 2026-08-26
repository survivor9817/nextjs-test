// src/utils/fakeFetch.ts
type FetchOptions = {
  /** تاخیر به میلی‌ثانیه (پیش‌فرض: 500) */
  delay?: number;
  /** احتمال خطا بین 0 تا 1، یا تابعی که احتمال خطا رو برگردونه */
  errorChance?: number | (() => boolean);
  /** پیام خطای سفارشی */
  errorMessage?: string;
};

export const fakeFetch = <T>(
  resolver: () => T | Promise<T>,
  options: FetchOptions & { signal?: AbortSignal } = {},
): Promise<T> => {
  const { delay = 100, errorChance = 0, errorMessage, signal } = options;

  return new Promise((resolve, reject) => {
    // اگر signal قبلاً abort شده
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const timer = setTimeout(() => {
      const shouldError =
        typeof errorChance === "function" ? errorChance() : Math.random() < errorChance;

      if (shouldError) {
        reject(new Error(errorMessage));
        return;
      }

      Promise.resolve(resolver()).then(resolve).catch(reject);
    }, delay);

    // لغو درخواست
    const abortHandler = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };

    signal?.addEventListener("abort", abortHandler);

    // cleanup
    return () => {
      signal?.removeEventListener("abort", abortHandler);
      clearTimeout(timer);
    };
  });
};
