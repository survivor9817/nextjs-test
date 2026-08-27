"use client";

import { useState, useEffect, useMemo, ChangeEvent, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import type { BookOption } from "@/data/booksData";
import { BaseUIEvent } from "@base-ui/react";
import { Label } from "@/components/ui/label";
import { useBookContext } from "@/providers/book-provider";

type BookSelectProps = {
  className?: string;
  label?: string;
};

const BookSelect = ({ className, label = "فهرست کتاب" }: BookSelectProps) => {
  const { books, selectedBook } = useBookContext();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [localValue, setLocalValue] = useState<BookOption | null>(selectedBook);
  const comboboxInputValue = open ? inputValue : (localValue?.label ?? "");
  const hasValue = Boolean(localValue);
  const isFloating = hasValue || open || inputValue.length > 0;

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
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!inputRef.current) return;
    if (open) {
      const raf1 = requestAnimationFrame(() => {
        inputRef.current?.select();
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [open]);

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    if (!inputValue || inputValue === localValue?.label) return books;
    return books.filter((book) => book.label.toLowerCase().includes(inputValue.toLowerCase()));
  }, [books, inputValue, localValue?.label]);

  const onInputChange = (e: BaseUIEvent<ChangeEvent<HTMLInputElement, HTMLInputElement>>) => {
    if (!open) setOpen(true);
    setInputValue(e.target.value);
  };

  const { changeBook } = useBookContext();
  const handleSelect = (newSelectedBook: BookOption | null) => {
    if (!newSelectedBook) return;
    setLocalValue(newSelectedBook);
    const newBookId = newSelectedBook.value;
    if (newBookId !== selectedBook?.value) changeBook(newBookId);
    setOpen(false);
    setInputValue("");
  };

  return (
    <div
      className={cn("relative mt-10 w-full max-w-80", className)}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT") {
          return;
        }
        if (inputRef.current) {
          e.preventDefault();
          inputRef.current.focus();
          setOpen(true);
        }
      }}
    >
      <Combobox
        items={filteredBooks}
        value={localValue}
        isItemEqualToValue={(item, value) => item?.value === value?.value}
        open={open}
        onOpenChange={setOpen}
        onValueChange={handleSelect}
        autoHighlight
      >
        <Label
          className={cn(
            "pointer-events-none absolute z-10 px-2 ", // must be fixed by using useId
            "top-0 right-4 transition-transform duration-200 ease-out",
            "font-bold",
            isFloating
              ? "-translate-y-2 text-xs scale-90 bg-background"
              : "translate-y-3 text-base scale-100",
          )}
        >
          {label}
        </Label>

        <ComboboxInput
          ref={inputRef}
          value={comboboxInputValue}
          onChange={onInputChange}
          // placeholder={!isFloating ? "کتابی که می‌خوای رو انتخاب کن." : ""}
          placeholder={isFloating ? "انتخاب کنید." : ""}
          className={cn(
            "h-11.5 w-full border-2 border-[rgb(200,200,200)] bg-background",
            "px-3 text-center text-base font-black cursor-pointer",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
        />

        <ComboboxContent className="w-(--anchor-width) p-0">
          <ComboboxList>
            <ComboboxEmpty className="p-2 text-center text-sm font-bold text-gray-500">
              {inputValue ? `هیچ کتابی با "${inputValue}" پیدا نشد` : "کتابی موجود نیست"}
            </ComboboxEmpty>

            {filteredBooks.map((book) => (
              <ComboboxItem
                key={book.value}
                value={book}
                className="justify-center font-bold cursor-pointer"
              >
                {book.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default BookSelect;
