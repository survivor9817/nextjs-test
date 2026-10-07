"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ResponsivePopover } from "@/components/ui/responsive-popover";
import { NumberWheelPickerContent } from "./number-wheel-picker-content";

// تابع کمکی برای نمایش ارقام به فارسی روی خود تریگر
function toPersianDigits(n: number | string): string {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}

interface NumberWheelPickerProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  persianDigits?: boolean;
  title?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  trigger?: React.ReactElement; // اختیاری در صورت نیاز به تریگر دلخواه در آینده
  onValueChange: (val: number) => void;
}

export function NumberWheelPickerResponsive({
  value,
  min,
  max,
  step = 1,
  persianDigits = true,
  title = "انتخاب شماره صفحه",
  disabled = false,
  error = false,
  className,
  trigger,
  onValueChange,
}: NumberWheelPickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = (confirmedValue: number) => {
    onValueChange(confirmedValue);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // تریگر پیش‌فرض اینپوت با طراحی و کلاس‌های مدنظر شما
  const defaultTrigger = (
    <Input
      type="button"
      value={persianDigits ? toPersianDigits(value) : String(value)}
      readOnly
      disabled={disabled}
      className={cn(
        "h-10 w-10 min-w-10 max-w-10 rounded-3xl border-[3px] border-gray-300 p-0 text-center text-sm appearance-none cursor-pointer",
        "focus-visible:ring-0 focus-visible:ring-offset-0",
        error && "bg-[rgb(255,124,124)] animate-shake",
        className,
      )}
    />
  );

  return (
    <ResponsivePopover
      open={open}
      onOpenChange={setOpen}
      trigger={trigger ?? defaultTrigger}
      title={title}
      contentClassName="flex flex-col items-center"
    >
      <NumberWheelPickerContent
        value={value}
        min={min}
        max={max}
        step={step}
        persianDigits={persianDigits}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ResponsivePopover>
  );
}
