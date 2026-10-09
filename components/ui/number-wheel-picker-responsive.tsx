import * as React from "react";
import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@/components/ui/wheel-picker";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { Input } from "@/components/ui/input";
import { ResponsivePopover } from "@/components/ui/responsive-popover";

function toPersianDigits(n: number | string): string {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}

function clamp(val: number, min: number, max: number): number {
  if (Number.isNaN(val)) return min;
  return Math.min(Math.max(val, min), Math.max(min, max));
}

interface NumberWheelPickerContentProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  persianDigits?: boolean;
  onConfirm: (val: number) => void;
  onCancel: () => void;
  renderLabel?: (n: number) => React.ReactNode;
}

export function NumberWheelPickerContent({
  value,
  min,
  max,
  step = 1,
  persianDigits = true,
  onConfirm,
  onCancel,
  renderLabel,
}: NumberWheelPickerContentProps) {
  const numericValue = Number(value);
  const safeMax = Math.max(min, max || min, Number.isNaN(numericValue) ? min : numericValue);
  const safeValue = clamp(numericValue, min, safeMax);

  const [tempValue, setTempValue] = React.useState<number>(safeValue);

  // const options: WheelPickerOption<number>[] = React.useMemo(() => {
  //   const list: WheelPickerOption<number>[] = [];
  //   for (let i = min; i <= safeMax; i += step) {
  //     list.push({
  //       value: i,
  //       label: persianDigits ? toPersianDigits(i) : i.toString(),
  //     });
  //   }
  //   return list;
  // }, [min, safeMax, step, persianDigits]);

  const options: WheelPickerOption<number>[] = React.useMemo(() => {
    const list: WheelPickerOption<number>[] = [];
    const text = (n: number) => (persianDigits ? toPersianDigits(n) : String(n));
    for (let i = min; i <= safeMax; i += step) {
      list.push({
        value: i,
        label: renderLabel ? renderLabel(i) : text(i),
        textValue: text(i), // برای type-ahead وقتی label دیگر رشته نیست
      });
    }

    console.log(list);
    return list;
  }, [min, safeMax, step, persianDigits, renderLabel]);

  React.useEffect(() => {
    const valid = clamp(Number(value), min, safeMax);
    setTempValue(valid);
  }, [value, min, safeMax]);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* 
        استفاده از touch-none یا touch-pan-y برای جلوگیری از ژست‌های پیش‌فرض مرورگر 
        و محدود کردن رویداد تعاملی به مرزهای ویل‌پیکر
      */}
      <div className="flex justify-center py-1 w-full select-none touch-none" dir="ltr">
        <WheelPickerWrapper
          className={cn(
            "h-44 w-36 rounded-2xl border bg-muted/20 overflow-hidden",
            // "cursor-grab active:cursor-grabbing [&_*]:cursor-grab [&_*]:active:cursor-grabbing",
          )}
        >
          <WheelPicker
            options={options}
            value={tempValue}
            onValueChange={(val) => setTempValue(Number(val))}
          />
        </WheelPickerWrapper>
      </div>

      <div className="flex w-full gap-2 pt-1">
        <Button size="sm" className="flex-1" onClick={() => onConfirm(tempValue)}>
          تایید
        </Button>
        <Button size="sm" variant="outline" className="flex-1" onClick={onCancel}>
          انصراف
        </Button>
      </div>
    </div>
  );
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
  renderLabel?: (n: number) => React.ReactNode;
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
  renderLabel,
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
        renderLabel={renderLabel}
      />
    </ResponsivePopover>
  );
}
