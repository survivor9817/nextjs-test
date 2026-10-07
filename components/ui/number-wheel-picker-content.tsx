import * as React from "react";
import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@/components/ui/wheel-picker";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

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
}

export function NumberWheelPickerContent({
  value,
  min,
  max,
  step = 1,
  persianDigits = true,
  onConfirm,
  onCancel,
}: NumberWheelPickerContentProps) {
  const numericValue = Number(value);
  const safeMax = Math.max(min, max || min, Number.isNaN(numericValue) ? min : numericValue);
  const safeValue = clamp(numericValue, min, safeMax);

  const [tempValue, setTempValue] = React.useState<number>(safeValue);

  const options: WheelPickerOption<number>[] = React.useMemo(() => {
    const list: WheelPickerOption<number>[] = [];
    for (let i = min; i <= safeMax; i += step) {
      list.push({
        value: i,
        label: persianDigits ? toPersianDigits(i) : i.toString(),
      });
    }
    return list;
  }, [min, safeMax, step, persianDigits]);

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

// import {
//   WheelPicker,
//   WheelPickerWrapper,
//   type WheelPickerOption,
// } from "@/components/ui/wheel-picker";
// import { Button } from "@/components/ui/button";
// import React from "react";

// function toPersianDigits(n: number | string): string {
//   const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
//   return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
// }

// function clamp(val: number, min: number, max: number): number {
//   if (Number.isNaN(val)) return min;
//   return Math.min(Math.max(val, min), Math.max(min, max));
// }

// interface NumberWheelPickerContentProps {
//   value: number;
//   min: number;
//   max: number;
//   step?: number;
//   persianDigits?: boolean;
//   onConfirm: (val: number) => void;
//   onCancel: () => void;
// }

// /**
//  * کامپوننت مستقل محتوا و لاجیک چرخ انتخاب عدد
//  */
// export function NumberWheelPickerContent({
//   value,
//   min,
//   max,
//   step = 1,
//   persianDigits = true,
//   onConfirm,
//   onCancel,
// }: NumberWheelPickerContentProps) {
//   const numericValue = Number(value);
//   const safeMax = Math.max(min, max || min, Number.isNaN(numericValue) ? min : numericValue);
//   const safeValue = clamp(numericValue, min, safeMax);

//   const [tempValue, setTempValue] = React.useState<number>(safeValue);

//   const options: WheelPickerOption<number>[] = React.useMemo(() => {
//     const list: WheelPickerOption<number>[] = [];
//     for (let i = min; i <= safeMax; i += step) {
//       list.push({
//         value: i,
//         label: persianDigits ? toPersianDigits(i) : i.toString(),
//       });
//     }
//     return list;
//   }, [min, safeMax, step, persianDigits]);

//   React.useEffect(() => {
//     const valid = clamp(Number(value), min, safeMax);
//     setTempValue(valid);
//   }, [value, min, safeMax]);

//   return (
//     <div className="flex flex-col items-center gap-3 w-full">
//       <div className="flex justify-center py-1 w-full" dir="ltr">
//         <WheelPickerWrapper className="h-44 w-36 rounded-2xl border bg-muted/20">
//           <WheelPicker
//             options={options}
//             value={tempValue}
//             onValueChange={(val) => setTempValue(Number(val))}
//           />
//         </WheelPickerWrapper>
//       </div>

//       <div className="flex w-full gap-2 pt-1">
//         <Button size="sm" className="flex-1" onClick={() => onConfirm(tempValue)}>
//           تایید
//         </Button>
//         <Button size="sm" variant="outline" className="flex-1" onClick={onCancel}>
//           انصراف
//         </Button>
//       </div>
//     </div>
//   );
// }
