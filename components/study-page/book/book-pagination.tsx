"use client";
import IconBtn from "@/components/ui/icon-btn";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
// import { useBook } from "@/app/hooks/useBook";
import { cn } from "@/lib/utils";
import { useBookContext } from "@/providers/book-provider";
import { fetchBook } from "@/services/client/fetchBook";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// type Props = {};

const BookPagination = () => {
  const {
    currentBookId,
    currentBookInfo,
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
  } = useBookContext();

  const inputError = pageInputError ? "bg-[rgb(255,124,124)]" : "";

  return (
    <>
      {currentPage && (
        <div className="flex items-center p-1 max-w-[86vw] sm:max-w-90 border-2 border-black rounded-[48px] bg-white">
          <IconBtn
            icon={<span className="msr text-5xl">arrow_circle_right</span>}
            onClick={goToPrevPage}
            disabled={!currentBookId}
            aria-label="رفتن به صفحه بعدی"
          />
          <IconBtn
            icon={<span className="msr text-5xl">arrow_circle_left</span>}
            onClick={goToNextPage}
            disabled={!currentBookId}
            aria-label="رفتن به صفحه قبلی"
          />
          {/* <input
            className="w-50 min-w-25 max-w-50 text-[rgba(225,163,193,1)] mx-1"
            type="range"
            min="1"
            max={currentBookInfo?.lastPage}
            step="1"
            value={currentPage}
            onChange={onSliderChange}
            disabled={!currentBookId}
          /> */}
          <Slider
            className="w-80  min-w-25 max-w-80 mx-1"
            min={1}
            max={currentBookInfo?.lastPage ?? 2}
            step={1}
            value={[currentPage]}
            onValueChange={onSliderChange}
            disabled={!currentBookId}
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
            disabled={!currentBookId}
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
            disabled={!currentBookId}
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
