import { useLayoutEffect, useRef, useState, useMemo } from "react";

interface ProgressiveDisclosureOptions {
  conditions: unknown[];
  initialHeight?: number;
  extraHeight?: number;
  resetKey?: unknown;
}

export const useProgressiveDisclosure = <T extends HTMLElement = HTMLDivElement>({
  conditions,
  initialHeight = 110,
  extraHeight = 0,
  resetKey,
}: ProgressiveDisclosureOptions) => {
  const containerRef = useRef<T>(null);
  const [height, setHeight] = useState<number>(initialHeight);

  // محاسبه منطق دومینویی مراحل
  const visibility = useMemo(() => {
    const states: boolean[] = [];
    let isPreviousFilled = true;

    for (let i = 0; i < conditions.length; i++) {
      states.push(isPreviousFilled);
      const isCurrentFilled = Boolean(conditions[i]);
      if (!isCurrentFilled) {
        isPreviousFilled = false;
      }
    }
    return states;
  }, [conditions]);

  const visibleCount = visibility.filter(Boolean).length;
  const isAllVisible = visibleCount === conditions.length;

  // ریست شدن ارتفاع هنگام تغییر کتاب یا ریست‌کی
  useLayoutEffect(() => {
    if (resetKey !== undefined) {
      setHeight(initialHeight);
    }
  }, [resetKey, initialHeight]);

  // فقط در زمان تغییر تعداد مراحل، ارتفاع دقیق DOM یک‌بار خوانده می‌شود (بدون آبزرور مزاحم)
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // خواندن ارتفاع کامل فرزندان + آفست دکمه نهایی
    const targetHeight = el.scrollHeight + (isAllVisible ? extraHeight : 0);
    setHeight(targetHeight);
  }, [visibleCount, isAllVisible, extraHeight]);

  return {
    containerRef,
    height,
    visibility,
    isStepVisible: (index: number) => Boolean(visibility[index]),
    visibleCount,
    isAllVisible,
  };
};
