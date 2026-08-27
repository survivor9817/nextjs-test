"use client";

import * as React from "react";
import { useRef, useMemo, useEffect, useState, ChangeEvent } from "react";
import { Combobox } from "@base-ui/react/combobox";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useBookParams } from "@/hooks/use-study-params";
import { useBookContext } from "@/app/providers/book-provider";
import type { BookOption } from "@/data/booksData";
import { ChevronDownIcon } from "lucide-react";

type BookSelectProps = {
  className?: string;
  label?: string;
  dir?: "rtl" | "ltr";
};

export default function BookSelect({
  className,
  label = "فهرست کتاب",
  dir = "rtl",
}: BookSelectProps) {
  const { books, selectedBook } = useBookContext();
  const searchParams = useSearchParams();
  const { bookId } = useBookParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [localValue, setLocalValue] = useState<BookOption | null>(selectedBook);

  const comboboxInputValue = open ? inputValue : (localValue?.label ?? "");

  const hasValue = Boolean(localValue);
  const isFloating = hasValue || open || inputValue.length > 0;
  const isRtl = dir === "rtl";

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Sync localValue with context when it changes externally
  useEffect(() => {
    setLocalValue(selectedBook);
  }, [selectedBook]);

  useEffect(() => {
    if (open) {
      setInputValue(localValue?.label ?? "");
    }
  }, [open, localValue?.label]);

  // Select text when opened
  useEffect(() => {
    if (!inputRef.current || !open) return;
    const raf = requestAnimationFrame(() => {
      inputRef.current?.select();
    });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    if (!inputValue || inputValue === localValue?.label) {
      return books;
    }
    const lowerQuery = inputValue.toLowerCase();
    return books.filter((book) => book.label.toLowerCase().includes(lowerQuery));
  }, [books, inputValue, localValue?.label]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!open) setOpen(true);
    setInputValue(e.target.value);
  };

  const changeBook = (newBookId: string) => {
    const query = searchParams.toString();
    router.push(`/study/${newBookId}/1${query ? `?${query}` : ""}`);
  };

  const handleValueChange = (next: BookOption | BookOption[] | null) => {
    const selected = Array.isArray(next) ? next[0] : next;

    // اول state محلی را به‌روز کن (سریع)
    setLocalValue(selected);

    // بعد navigation را انجام بده
    if (selected && selected.value !== bookId) {
      changeBook(selected.value);
    }

    setOpen(false);
    setInputValue("");
  };

  // const handleTriggerClick = () => {
  //   setOpen(!open);
  //   inputRef.current?.focus();
  // };

  const ui = {
    wrapper: cn("relative mt-10 cursor-pointer w-full max-w-75", className),
    label: cn(
      "pointer-events-none absolute z-10 px-2 transition-all duration-200 ease-out",
      "bg-[#ebebeb] font-bold",
      isRtl ? "right-5 origin-right" : "left-5 origin-left",
      isFloating
        ? "-top-2 text-xs scale-90 bg-background"
        : "top-1/2 -translate-y-1/2 text-base scale-100",
    ),
    inputGroup: cn(
      "relative flex items-center",
      "h-[2.875rem] w-full border-2 border-[rgb(200,200,200)] bg-background",
    ),
    input: cn(
      "flex-1 px-3 text-center text-base font-black cursor-pointer w-full ",
      "focus:outline-none",
      isRtl ? "pr-3 pl-10" : "pl-3 pr-10",
    ),
    trigger: cn(
      "flex items-center justify-center",
      "w-10 h-full",
      "border-0 bg-transparent cursor-pointer",
      "text-gray-600 hover:text-gray-900",
      "dark:text-gray-400 dark:hover:text-white",
    ),
    content: cn(
      "w-(--anchor-width) border border-[rgb(200,200,200)] bg-white shadow-lg",
      "dark:border-white dark:bg-[oklch(14.5%_0_0deg)] dark:text-white",
      "transition-[opacity,transform,scale] duration-100",
      "data-[starting-style]:opacity-0 data-[starting-style]:[transform:scale(0.95)]",
      "data-[ending-style]:opacity-0 data-[ending-style]:[transform:scale(0.95)]",
    ),
    list: cn(
      "max-h-[min(22.5rem,var(--available-height))]",
      "overflow-y-auto overscroll-contain py-1",
      "[outline:0]",
    ),
    item: cn(
      "cursor-pointer px-3 py-2 text-center text-base font-bold",
      "[outline:0]",
      "data-[highlighted]:bg-[oklch(14.5%_0_0deg)] data-[highlighted]:text-white",
      "dark:data-[highlighted]:bg-white dark:data-[highlighted]:text-[oklch(14.5%_0_0deg)]",
    ),
    empty: cn("p-2 text-center text-sm font-bold text-gray-500"),
  };

  return (
    <div
      className={ui.wrapper}
      dir={dir}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && inputRef.current) {
          e.preventDefault();
          inputRef.current.focus();
          setOpen(true);
        }
      }}
    >
      <Combobox.Root
        items={filteredBooks}
        value={localValue}
        open={open}
        onOpenChange={setOpen}
        onValueChange={handleValueChange}
        autoHighlight
      >
        <label htmlFor="book-select-input" className={ui.label}>
          {label}
        </label>

        <Combobox.InputGroup className={ui.inputGroup}>
          <Combobox.Input
            ref={inputRef}
            id="book-select-input"
            value={comboboxInputValue}
            onChange={onInputChange}
            placeholder="کتابی که می‌خوای رو انتخاب کن."
            className={ui.input}
          />

          <Combobox.Trigger
            ref={triggerRef}
            className={ui.trigger}
            // onClick={handleTriggerClick}
            aria-label="Open popup"
          >
            {/* <CaretDownIcon className={cn("transition-transform", open && "rotate-180")} /> */}
            <ChevronDownIcon
              className={cn(
                "pointer-events-none size-4 text-muted-foreground",
                "transition-transform",
                open && "rotate-180",
              )}
            />
          </Combobox.Trigger>
        </Combobox.InputGroup>

        <Combobox.Portal>
          <Combobox.Positioner sideOffset={4}>
            <Combobox.Popup className={ui.content}>
              <Combobox.Empty className={ui.empty}>
                {inputValue ? `هیچ کتابی با "${inputValue}" پیدا نشد` : "کتابی موجود نیست"}
              </Combobox.Empty>

              <Combobox.List className={ui.list}>
                {filteredBooks.map((book) => (
                  <Combobox.Item key={book.value} value={book} className={ui.item}>
                    {book.label}
                  </Combobox.Item>
                ))}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}

function CaretDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}
