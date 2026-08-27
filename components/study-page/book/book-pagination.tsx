"use client";
import IconBtn from "@/components/ui/icon-btn";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
// import { useBook } from "@/app/hooks/useBook";
import { cn } from "@/lib/utils";
import { fetchBook } from "@/services/client/fetchBook";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// type Props = {};

const BookPagination = () => {
  const {
    currentBook,
    currentPage,
    pageInput,
    pageInputError,

    goToPrevPage,
    goToNextPage,

    onSliderChange,
    onInputChange,
    onFocus,
    onBlur,
    onInputKeyDown,
  } = useBook();

  const inputError = pageInputError ? "bg-[rgb(255,124,124)]" : "";

  const {} = useSearchParams();
  const { data: lastPageData } = useQuery({
    queryKey: ["books", bookId, "lastPage"],
    queryFn: () => fetchBook(bookId),
    initialData: bookId === defaultBookId ? initialLastPage : undefined,
  });
  return (
    <>
      {currentPage && (
        <div className="flex items-center p-1 max-w-[86vw] sm:max-w-90 border-2 border-black rounded-[48px] bg-white">
          <IconBtn
            icon="arrow_circle_right"
            iconSize="48px"
            onClick={goToPrevPage}
            isDisabled={!currentBook}
            aria-label="رفتن به صفحه بعدی"
          />
          <IconBtn
            icon="arrow_circle_left"
            iconSize="48px"
            onClick={goToNextPage}
            isDisabled={!currentBook}
            aria-label="رفتن به صفحه قبلی"
          />
          {/* <input
            className="w-50 min-w-25 max-w-50 text-[rgba(225,163,193,1)] mx-1"
            type="range"
            min="1"
            max={currentBook?.lastPage}
            step="1"
            value={currentPage}
            onChange={onSliderChange}
            disabled={!currentBook}
          /> */}
          <Slider
            className="w-50 min-w-25 max-w-50 mx-1"
            min={1}
            max={currentBook?.lastPage ?? 2}
            step={1}
            value={[currentPage]}
            onValueChange={(value) => onSliderChange((value as number[])[0])}
            disabled={!currentBook}
          />
          {/* <input
            className={`border-[3px] border-black rounded-3xl text-center p-0 h-11 w-11 text-[18px] appearance-none ${inputError}`}
            type="text"
            inputMode="numeric"
            onChange={onInputChange}
            value={pageInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onInputKeyDown}
            disabled={!currentBook}
            autoComplete="off"
          /> */}
          <Input
            type="text"
            inputMode="numeric"
            value={pageInput}
            onChange={onInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onInputKeyDown}
            disabled={!currentBook}
            autoComplete="off"
            className={cn(
              "h-11 w-11 min-w-11 max-w-11 rounded-3xl border-[3px] border-black p-0 text-center text-[18px] appearance-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              inputError,
            )}
          />
        </div>
      )}
    </>
  );
};

export default BookPagination;
