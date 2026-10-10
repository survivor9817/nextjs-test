"use client";

import * as React from "react";
import { FileTextIcon, Loader2Icon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useBookSearch } from "./use-book-search";

export type BookSearchResult = {
  id: string;
  title: string;
  snippet?: string;
  chapterId?: string;
};

export type BookSearchProps = {
  /** متن دکمه‌ی بازکننده */
  triggerLabel?: string;
  /** placeholder اینپوت */
  inputPlaceholder?: string;
  /** متن راهنمای وسط، قبل از جستجو */
  emptyHint?: string;
  /** پیام وقتی نتیجه‌ای نیست */
  noResultsText?: string;
  /** متن هنگام بارگذاری */
  loadingText?: string;
  /** آدرس API */
  endpoint?: string;
  /** حداقل کاراکتر برای جستجو */
  minChars?: number;
  /** تاخیر debounce */
  debounceMs?: number;
  /** وقتی روی نتیجه کلیک می‌شود */
  onSelect?: (result: BookSearchResult) => void;
  /** کنترل باز/بسته از بیرون (اختیاری) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** المنت سفارشی برای دکمه بازکننده */
  trigger?: React.ReactElement;
  children?: React.ReactNode;
};

export function BookSearch({
  triggerLabel,
  inputPlaceholder = "کلمه مورد نظرتان را اینجا بنویسید...",
  emptyHint = "برای جستجو در کتاب، کلمه مورد نظرتان را در کادر بالا ثبت کنید.",
  noResultsText = "نتیجه‌ای یافت نشد.",
  loadingText = "در حال جستجو...",
  endpoint = "/api/search",
  minChars = 2,
  debounceMs = 300,
  onSelect,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
  children,
}: BookSearchProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (!isControlled) setUncontrolledOpen(value);
      controlledOnOpenChange?.(value);
    },
    [isControlled, controlledOnOpenChange],
  );

  const { query, setQuery, results, isLoading, error, reset } = useBookSearch({
    endpoint,
    debounceMs,
    minChars,
  });

  // پاک کردن وضعیت جستجو با بسته شدن پنجره
  React.useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const trimmed = query.trim();
  const showHint = trimmed.length < minChars && !isLoading;
  const showNoResults = trimmed.length >= minChars && !isLoading && results.length === 0 && !error;

  const handleSelect = (result: BookSearchResult) => {
    setOpen(false);
    onSelect?.(result);
  };

  const customTrigger = trigger ?? (React.isValidElement(children) ? children : null);

  const defaultTrigger = triggerLabel ? (
    <Button type="button" variant="outline" className="w-fit gap-2">
      <Search className="size-4" strokeWidth={3} />
      <span>{triggerLabel}</span>
    </Button>
  ) : (
    <Button type="button" variant="outline" size="icon" title="جستجو" aria-label="جستجو">
      <Search strokeWidth={3} />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={customTrigger ?? defaultTrigger} />

      <DialogContent showCloseButton={false} className="overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{triggerLabel || "جستجو در کتاب"}</DialogTitle>
          <DialogDescription>{emptyHint}</DialogDescription>
        </DialogHeader>

        {/* ارتفاع کل کانتینر روی ۴۰۰ پیکسل (یا هر مقدار دلخواه مثل h-[420px]) قفل می‌شود */}
        <Command
          shouldFilter={false}
          className="h-[400px] flex flex-col [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
        >
          <CommandInput value={query} onValueChange={setQuery} placeholder={inputPlaceholder} />

          {/* لیست کل فضای باقیمانده را پر می‌کند و اسکرول داخلی می‌گیرد */}
          <CommandList className="flex-1 h-full max-h-none overflow-y-auto">
            {/* حالت راهنما پیش از جستجو - با flex-1 کامپوننت وسط‌چین می‌شود */}
            {showHint && (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 px-4 py-8 text-center">
                <Search className="size-8 text-muted-foreground/60" strokeWidth={2} />
                <p className="max-w-xs text-sm leading-6 text-muted-foreground">{emptyHint}</p>
              </div>
            )}

            {/* در حال بارگذاری */}
            {isLoading && (
              <div className="flex h-full min-h-[280px] items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
                <Loader2Icon className="size-5 animate-spin" />
                <span>{loadingText}</span>
              </div>
            )}

            {/* خطا در دریافت اطلاعات */}
            {error && (
              <div className="flex h-full min-h-[280px] items-center justify-center py-8 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            {/* عدم وجود نتیجه */}
            {showNoResults && (
              <CommandEmpty className="flex h-full min-h-[280px] items-center justify-center py-8 text-center text-sm">
                {noResultsText}
              </CommandEmpty>
            )}

            {/* نمایش نتایج سرور */}
            {results.length > 0 && !isLoading && (
              <CommandGroup heading="نتایج" className="p-2">
                {results.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.id} ${item.title}`}
                    onSelect={() => handleSelect(item)}
                    className="flex cursor-pointer items-start gap-3 rounded-md px-3 py-2 text-start"
                  >
                    <FileTextIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <span className="truncate font-medium text-foreground">{item.title}</span>
                      {item.snippet && (
                        <span className="truncate text-xs text-muted-foreground">
                          {item.snippet}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
