"use client";
import IconBtn from "@/components/ui/icon-btn";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useBookContext } from "@/components/study-page/book/book-provider";

// type Props = {};

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

  const inputError = pageInputError ? "bg-[rgb(255,124,124)]" : "";
  const isDisabled = !currentBookId && !currentPage;

  return (
    <>
      <div className="flex items-center p-1 w-[86vw] max-w-[86vw] sm:max-w-90 sm:w-90 border-2 border-black rounded-[48px] bg-white">
        <IconBtn
          icon={<span className="msr text-5xl">arrow_circle_right</span>}
          onClick={goToPrevPage}
          disabled={isDisabled}
          aria-label="رفتن به صفحه بعدی"
        />
        <IconBtn
          icon={<span className="msr text-5xl">arrow_circle_left</span>}
          onClick={goToNextPage}
          disabled={isDisabled}
          aria-label="رفتن به صفحه قبلی"
        />
        <Slider
          className="  mx-1"
          // className="flex-1 min-w-25 max-w-80 mx-1"
          min={1}
          max={currentBookLastPage}
          step={1}
          value={[currentPage]}
          onValueChange={onSliderChange}
          disabled={isDisabled}
        />
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
            "h-11 w-11 min-w-11 max-w-11 rounded-3xl border-[3px] border-black p-0 text-center text-[18px] appearance-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            inputError,
          )}
        />
      </div>
    </>
  );
};

export default BookPagination;
