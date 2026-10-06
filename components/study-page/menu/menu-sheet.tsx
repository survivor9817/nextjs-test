"use client";

import * as React from "react";
import { Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Menu from "./menu";

export interface MenuButtonProps {
  trigger?: React.ReactElement;
}

export function MenuButton({ trigger }: MenuButtonProps) {
  const [open, setOpen] = React.useState(false);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // با کلیک روی هر لینک، دکمه یا المنتی که دارای data-close-menu="true" باشد، شیت بسته می‌شود
    if (
      target.closest('[data-close-menu="true"]') ||
      target.closest("a") ||
      target.closest("button")
    ) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          trigger ?? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              title="منو"
              aria-label="منو"
              className="h-10 w-10 text-muted-foreground hover:text-foreground shadow-none"
            >
              <MenuIcon strokeWidth={2.5} />
            </Button>
          )
        }
      />

      <SheetContent
        showCloseButton={false}
        side="left"
        className="flex flex-col gap-0 p-0 sm:max-w-xs"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>منوی کاربری</SheetTitle>
          <SheetDescription>دسترسی به بخش‌ها و پروفایل کاربری</SheetDescription>
        </SheetHeader>

        {/* شنود کلیک برای بستن خودکار شیت پس از انتخاب آیتم */}
        <div className="flex-1 overflow-y-auto" onClick={handleContainerClick}>
          <Menu />
        </div>
      </SheetContent>
    </Sheet>
  );
}
