"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useMediaQuery } from "@/hooks/use-media-query";

export interface ResponsivePopoverProps {
  children: React.ReactNode;
  trigger: React.ReactElement;
  title?: React.ReactNode;
  description?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  desktopBreakpoint?: string;
  nativeButton?: boolean;
  align?: "center" | "start" | "end";
  side?: "top" | "bottom" | "left" | "right";
  showSwipeHandle?: boolean;
}

export function ResponsivePopover({
  children,
  trigger,
  title,
  description,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  className,
  contentClassName,
  desktopBreakpoint = "(min-width: 640px)",
  nativeButton = false,
  align = "center",
  side = "top",
  showSwipeHandle = true,
}: ResponsivePopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const isDesktop = useMediaQuery(desktopBreakpoint);

  // هماهنگی حالت Controlled و Uncontrolled
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

  // حل قطعی خطای Hydration در Next.js
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return trigger;
  }

  // ۱. حالت موبایل: ResponsiveDialog در حالت دراور
  if (!isDesktop) {
    return (
      <ResponsiveDialog
        type="drawer"
        open={open}
        onOpenChange={setOpen}
        trigger={trigger}
        title={title ?? ""}
        description={description}
        hideHeader={!title && !description}
        nativeButton={nativeButton}
        showSwipeHandle={showSwipeHandle}
        className={className}
        contentClassName={contentClassName}
      >
        {children}
      </ResponsiveDialog>
    );
  }

  // ۲. حالت دسکتاپ: Popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger nativeButton={nativeButton} render={trigger} />
      <PopoverContent
        align={align}
        side={side}
        className={cn("w-auto p-3 flex flex-col gap-2", className)}
      >
        {(title || description) && (
          <div className="text-center">
            {title && <div className="font-semibold text-xs text-foreground">{title}</div>}
            {description && (
              <div className="text-[11px] text-muted-foreground mt-0.5">{description}</div>
            )}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </PopoverContent>
    </Popover>
  );
}
