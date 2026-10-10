"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  fadeSize?: number; // px
};

const DRAG_THRESHOLD = 5;

const ScrollRow = ({ children, className, fadeSize = 32 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ left: false, right: false });
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const rtl = getComputedStyle(el).direction === "rtl";
    // فاصله از لبهٔ چپ؛ در RTL مقدار scrollLeft بین -max و 0 است
    const fromLeft = rtl ? max + el.scrollLeft : el.scrollLeft;
    setFade({ left: fromLeft > 1, right: fromLeft < max - 1 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(inner);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return; // تاچ خودش اسکرول بومی دارد
    const el = ref.current!;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    ref.current!.scrollLeft = d.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // اگر کاربر درگ کرده بود، کلیک روی لینک/بج اجرا نشود
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const mask = `linear-gradient(to right, transparent 0, #000 ${
    fade.left ? fadeSize : 0
  }px, #000 calc(100% - ${fade.right ? fadeSize : 0}px), transparent 100%)`;

  const isScrollable = fade.left || fade.right;

  return (
    <div
      ref={ref}
      onPointerDown={isScrollable ? onPointerDown : undefined}
      onPointerMove={isScrollable ? onPointerMove : undefined}
      onPointerUp={isScrollable ? endDrag : undefined}
      onPointerCancel={isScrollable ? endDrag : undefined}
      onClickCapture={isScrollable ? onClickCapture : undefined}
      onDragStart={isScrollable ? (e) => e.preventDefault() : undefined}
      style={isScrollable ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      className={cn(
        "overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden",
        isScrollable && (dragging ? "cursor-grabbing select-none" : "cursor-grab"),
        className,
      )}
    >
      <div ref={innerRef} className="flex w-max gap-2">
        {children}
      </div>
    </div>
  );
};

export default ScrollRow;
