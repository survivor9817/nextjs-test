"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useBookContext } from "@/components/study-page/book/book-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Search } from "lucide-react";
import { FehrestButton } from "../fehrest/fehrest-sheet";
import { BookSearch } from "./book-search";
import { NumberWheelPickerResponsive } from "@/components/ui/number-wheel-picker-responsive";

const BookPagination = () => {
  const {
    currentBookId,
    currentPage,
    currentBookLastPage,
    pageInput,
    pageInputError,
    goToPage,
    goToPrevPage,
    goToNextPage,

    onInputChange,
    onFocus,
    onBlur,
    onInputKeyDown,
  } = useBookContext();

  const inputError = pageInputError ? "bg-[rgb(255,124,124)] animate-shake" : "";
  const isDisabled = !currentBookId && !currentPage;

  const iconButtonClasses = "h-10 w-10 text-muted-foreground hover:text-foreground shadow-none";

  return (
    <div className="flex items-center p-1 w-fit max-w-fit gap-1 sm:max-w-fit sm:w-fit border-2 rounded-[48px] bg-white border-[#bcbcbc]">
      {/* دکمه فهرست */}
      <FehrestButton />

      {/* رفتن به صفحه قبل */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={goToPrevPage}
        disabled={isDisabled}
        title="رفتن به صفحه قبلی"
        className={iconButtonClasses}
      >
        <ArrowRight strokeWidth={3} />
      </Button>

      {/* ویل‌پیکر واکنش‌گرا (پاپ‌اور دسکتاپ / دراور موبایل) */}
      <NumberWheelPickerResponsive
        value={Number(pageInput) || currentPage || 1}
        min={1}
        max={Math.max(currentPage || 1, currentBookLastPage || 1)}
        title="انتخاب شماره صفحه"
        onValueChange={goToPage}
        trigger={
          <Input
            type="button"
            value={pageInput}
            readOnly
            disabled={isDisabled}
            className={cn(
              "h-10 w-10 min-w-10 max-w-10 rounded-3xl border-[3px] border-gray-300 p-0 text-center text-sm appearance-none cursor-pointer",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              inputError,
            )}
          />
        }
      />

      {/* <Input
        // readOnly
        type="text"
        inputMode="numeric"
        value={pageInput}
        onChange={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onInputKeyDown}
        disabled={isDisabled}
        autoComplete="off"
        className={cn(
          "h-10 w-10 min-w-10 max-w-10 rounded-3xl border-[3px] border-gray-300 p-0 text-center text-sm appearance-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          inputError,
        )}
      /> */}

      {/* رفتن به صفحه بعد */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={goToNextPage}
        disabled={isDisabled}
        title="رفتن به صفحه بعدی"
        className={iconButtonClasses}
      >
        <ArrowLeft strokeWidth={3} />
      </Button>

      {/* جستجو در کتاب */}
      <BookSearch
        trigger={
          <Button
            type="button"
            variant="outline"
            size="icon"
            title="جستجو"
            className={iconButtonClasses}
          >
            <Search strokeWidth={3} />
          </Button>
        }
      />
    </div>
  );
};

export default BookPagination;
