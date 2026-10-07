"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type Entry = { id: string; close: () => void };

// پشته‌ی سراسری overlayهای باز؛ آخرین عنصر = بالاترین لایه
const stack: Entry[] = [];
// برای Strict Mode: cleanup را یک tick به تعویق می‌اندازیم تا mount مجدد بتواند لغوش کند
const pendingRemoval = new Map<string, ReturnType<typeof setTimeout>>();
// تعداد popstateهایی که خودمان با history.back() ساخته‌ایم و نباید چیزی ببندند
let ignoredPops = 0;
let listening = false;

function onPopState() {
  if (ignoredPops > 0) {
    ignoredPops--;
    return;
  }
  // فقط بالاترین overlay بسته می‌شود
  stack.pop()?.close();
}

function ensureListener() {
  if (listening || typeof window === "undefined") return;
  window.addEventListener("popstate", onPopState);
  listening = true;
}

/**
 * وقتی open=true می‌شود یک ورودی در history می‌سازد.
 * - دکمه‌ی بک: بالاترین overlay را می‌بندد (onClose صدا زده می‌شود).
 * - بسته شدن به روش‌های دیگر (ESC، overlay، X، کد): ورودی history برداشته می‌شود.
 */
export function useBackClose(open: boolean, onClose: () => void) {
  const id = useId();
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    ensureListener();

    const pending = pendingRemoval.get(id);
    if (pending !== undefined) {
      // mount مجدد (Strict Mode): ثبت قبلی هنوز معتبر است
      clearTimeout(pending);
      pendingRemoval.delete(id);
    } else {
      window.history.pushState({ overlayId: id }, "");
      stack.push({ id, close: () => onCloseRef.current() });
    }

    return () => {
      const timer = setTimeout(() => {
        pendingRemoval.delete(id);

        const index = stack.findIndex((e) => e.id === id);
        // index === -1 یعنی با دکمه‌ی بک بسته شده و ورودی history قبلاً برداشته شده
        if (index === -1) return;
        stack.splice(index, 1);

        // فقط اگر ورودی فعلی history همان ورودی خودمان است برگرد.
        // اگر در این فاصله ناوبری‌ای انجام شده، back زدن ناوبری را خنثی می‌کرد.
        if (window.history.state?.overlayId === id) {
          ignoredPops++;
          window.history.back();
        }
      }, 0);
      pendingRemoval.set(id, timer);
    };
  }, [open, id]);
}

type OpenChangeHandler = (
  open: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventDetails: any,
) => void;

/**
 * state بازبودن را (هم controlled و هم uncontrolled) مدیریت می‌کند
 * و useBackClose را به آن وصل می‌کند. روی Root هر Dialog/Sheet/Drawer استفاده شود.
 */
export function useBackCloseControl({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  backClose = true,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: OpenChangeHandler;
  /** برای پنل‌هایی که history را خودشان (مثلاً با nuqs) مدیریت می‌کنند false بدهید */
  backClose?: boolean;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = openProp ?? uncontrolledOpen;

  const handleOpenChange = useCallback<OpenChangeHandler>(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next, eventDetails);
    },
    [isControlled, onOpenChange],
  );

  useBackClose(open && backClose, () => handleOpenChange(false, undefined));

  return { open, onOpenChange: handleOpenChange };
}
