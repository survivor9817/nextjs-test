// use-progressive-disclosure.ts
import { useLayoutEffect, useEffect, useRef, useState } from "react";

type ProgressiveField<TValues> = {
  /** یک شناسه یکتا برای فیلد */
  id: string;
  /** آیا این فیلد پر شده (یعنی فیلد بعدی باید نشون داده بشه)؟ */
  isFilled: (values: TValues) => boolean;
};

type UseProgressiveDisclosureOptions<TValues> = {
  fields: ProgressiveField<TValues>[];
  values: TValues;
  /** وقتی این مقدار تغییر کنه، همه چیز به حالت اولیه ریست می‌شه (مثلاً عوض شدن کتاب) */
  resetKey?: unknown;
  initialHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  /** فاصله‌ی اضافه در ارتفاع وقتی آخرین فیلد (یا دکمه‌ی نهایی) نمایش داده می‌شه */
  extraHeightWhenComplete?: number;
};

export const useProgressiveDisclosure = <TValues>({
  fields,
  values,
  resetKey,
  initialHeight = 110,
  minWidth = 260,
  maxWidth = 460,
  extraHeightWhenComplete = 24,
}: UseProgressiveDisclosureOptions<TValues>) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(initialHeight);
  const [width, setWidth] = useState<number>(minWidth);

  // فیلد اول همیشه نمایش داده می‌شه؛ فیلد i+1 فقط وقتی نمایش داده می‌شه که فیلد i پر شده باشه
  const visibility: Record<string, boolean> = {};
  fields.forEach((field, index) => {
    if (index === 0) {
      visibility[field.id] = true;
      return;
    }
    const prevField = fields[index - 1];
    visibility[field.id] = visibility[prevField.id] && prevField.isFilled(values);
  });

  const visibleCount = fields.filter((field) => visibility[field.id]).length;
  const isComplete = fields.length > 0 && fields[fields.length - 1].isFilled(values);

  useEffect(() => {
    setHeight(initialHeight);
    setWidth(minWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    setHeight(el.scrollHeight + (isComplete ? extraHeightWhenComplete : 0));

    const step = fields.length > 1 ? (maxWidth - minWidth) / (fields.length - 1) : 0;
    const targetWidth = Math.min(minWidth + step * (visibleCount - 1), maxWidth);
    setWidth(targetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, isComplete]);

  return {
    boxRef,
    height,
    width,
    isComplete,
    isVisible: (fieldId: string) => visibility[fieldId] ?? false,
  };
};
