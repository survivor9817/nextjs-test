"use client";

import { useCallback, useEffect, useRef } from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";

const PANELS = ["fehrest"] as const;
export type PanelValue = (typeof PANELS)[number];

/**
 * پنلی که state آن در URL است (?panel=fehrest).
 * history را همین هوک مدیریت می‌کند، پس به Sheet باید backClose={false} بدهید.
 *
 * - باز کردن: push
 * - دکمه‌ی بک مرورگر: پارامتر از URL برداشته می‌شود و پنل بسته می‌شود
 * - بستن با X / ESC / کلیک روی overlay (setOpen): اگر خودمان push کرده‌ایم history.back()،
 *   وگرنه (ورود مستقیم با لینک) پارامتر با replace حذف می‌شود
 * - بستن همراه با ناوبری (closeReplace): پارامتر با replace حذف می‌شود تا ناوبری خنثی نشود
 */
export function usePanelParam(panel: PanelValue) {
  const [active, setActive] = useQueryState(
    "panel",
    parseAsStringLiteral(PANELS).withOptions({ shallow: true }),
  );

  const open = active === panel;
  const pushedByUs = useRef(false);

  useEffect(() => {
    if (!open) pushedByUs.current = false;
  }, [open]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (next) {
        pushedByUs.current = true;
        setActive(panel, { history: "push" });
      } else if (pushedByUs.current) {
        pushedByUs.current = false;
        window.history.back();
      } else {
        setActive(null, { history: "replace" });
      }
    },
    [panel, setActive],
  );

  const closeReplace = useCallback(() => {
    pushedByUs.current = false;
    setActive(null, { history: "replace" });
  }, [setActive]);

  return { open, setOpen, closeReplace };
}
