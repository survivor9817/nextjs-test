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
import { usePanelParam } from "../use-sheet-params";

export function FehrestButton() {
  const { open, setOpen, closeReplace } = usePanelParam("fehrest");
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-close-fehrest="true"]')) {
      closeReplace();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen} backClose={false}>
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

      <SheetContent
        ref={contentRef}
        tabIndex={-1}
        side="right"
        // فوکوس روی دکمه بستن؛ در صورت عدم وجود، روی خود کانتینر
        initialFocus={() => {
          const closeBtn = contentRef.current?.querySelector<HTMLElement>(
            'button[aria-label*="close" i], button[aria-label*="بستن" i], [data-slot="sheet-close"]',
          );
          return closeBtn ?? contentRef.current;
        }}
        className="flex flex-col gap-0 p-0 outline-none"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>فهرست مطالب</SheetTitle>
          <SheetDescription>رفتن به بخش‌های کتاب</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4" onClick={handleContainerClick}>
          <Fehrest />
        </div>
      </SheetContent>
    </Sheet>
  );
}
