// fehrest-button.tsx
"use client";

import * as React from "react";
import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Fehrest from "./fehrest";

export function FehrestButton() {
  const [open, setOpen] = React.useState(false);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // بررسی می‌کند که آیا هدف کلیک داخل دکمه‌ای با data-close-sheet="true" بوده یا خیر
    if (target.closest('[data-close-fehrest="true"]')) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            title="فهرست"
            aria-label="فهرست"
            className="h-10 w-10 text-muted-foreground hover:text-foreground shadow-none"
          />
        }
      >
        <List className="scale-x-[-1]" strokeWidth={3} />
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col gap-0 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>فهرست مطالب</SheetTitle>
          <SheetDescription>رفتن به بخش‌های کتاب</SheetDescription>
        </SheetHeader>

        {/* بررسی انتشار رویداد روی والد */}
        <div className="flex-1 overflow-y-auto p-4" onClick={handleContainerClick}>
          <Fehrest />
        </div>
      </SheetContent>
    </Sheet>
  );
}
