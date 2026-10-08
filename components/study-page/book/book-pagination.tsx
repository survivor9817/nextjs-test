"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useBookContext } from "@/components/study-page/book/book-provider";
import { ArrowRight, ArrowLeft, Search } from "lucide-react";
import { FehrestButton } from "../fehrest/fehrest-sheet";
import { BookSearch } from "./book-search";
import { NumberWheelPickerResponsive } from "@/components/ui/number-wheel-picker-responsive";
import IconButton from "@/components/ui/icon-button";

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
  } = useBookContext();

  const inputError = pageInputError ? "bg-[rgb(255,124,124)] animate-shake" : "";
  const isDisabled = !currentBookId && !currentPage;

  return (
    <div className="flex items-center p-1 w-fit max-w-fit gap-1 sm:max-w-fit sm:w-fit border-2 rounded-[48px] bg-white border-[#bcbcbc]">
      {/* دکمه فهرست */}
      <FehrestButton />

      {/* رفتن به صفحه قبل */}
      <IconButton
        onClick={goToPrevPage}
        disabled={isDisabled}
        title="رفتن به صفحه قبلی"
        icon={<ArrowRight strokeWidth={3} />}
      />

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

      {/* رفتن به صفحه بعد */}
      <IconButton
        onClick={goToNextPage}
        disabled={isDisabled}
        title="رفتن به صفحه بعدی"
        icon={<ArrowLeft strokeWidth={3} />}
      />

      {/* جستجو در کتاب */}
      <BookSearch trigger={<IconButton title="جستجو" icon={<Search strokeWidth={3} />} />} />
    </div>
  );
};

export default BookPagination;
