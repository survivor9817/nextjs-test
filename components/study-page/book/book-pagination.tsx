"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useBookContext } from "@/components/study-page/book/book-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Search } from "lucide-react";
import { FehrestButton } from "../fehrest/fehrest-sheet";
import { BookSearch } from "./book-search";

const BookPagination = () => {
  const {
    currentBookId,
    currentPage,
    currentBookLastPage,
    pageInput,
    pageInputError,

    goToPrevPage,
    goToNextPage,

    onSliderChange,
    onInputChange,
    onFocus,
    onBlur,
    onInputKeyDown,
  } = useBookContext();

  // اضافه شدن انیمیشن لرزش همزمان با قرمز شدن پس‌زمینه
  const inputError = pageInputError ? "bg-[rgb(255,124,124)] animate-shake" : "";
  const isDisabled = !currentBookId && !currentPage;

  const iconButtonClasses = "h-10 w-10 text-muted-foreground hover:text-foreground shadow-none";

  return (
    <>
      <div className="flex items-center p-1 w-fit max-w-fit gap-1 sm:max-w-fit sm:w-fit border-2 rounded-[48px] bg-white border-[#bcbcbc]">
        <FehrestButton />

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={goToPrevPage}
          disabled={isDisabled}
          title="رفتن به صفحه قبلی"
          className={iconButtonClasses}
        >
          <ArrowRight className="" strokeWidth={3} />
        </Button>

        <Input
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
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={goToNextPage}
          disabled={isDisabled}
          title="رفتن به صفحه بعدی"
          className={iconButtonClasses}
        >
          <ArrowLeft className="" strokeWidth={3} />
        </Button>

        <BookSearch
          trigger={
            <Button
              type="button"
              variant="outline"
              size="icon"
              title="جستجو"
              className={iconButtonClasses}
            >
              <Search className="" strokeWidth={3} />
            </Button>
          }
        />
      </div>
    </>
  );
};

export default BookPagination;
