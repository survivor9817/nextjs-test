"use client";

import { useBookContext } from "@/components/study-page/book/book-provider";
import AsyncFloatingCombobox from "./async-floating-combobox";
import { useBookSelectData } from "./use-book-select-data";

type BookSelectProps = {
  className?: string;
  label?: string;
};

const BookSelect = ({ className, label = "فهرست کتاب" }: BookSelectProps) => {
  const { currentBookSelectOption, changeBook } = useBookContext();
  const { BookSelectData, error, loadBookSelectData } = useBookSelectData();

  return (
    <AsyncFloatingCombobox
      items={BookSelectData}
      value={currentBookSelectOption}
      onValueChange={(book) => book && changeBook(book.value)}
      getLabel={(book) => book.label}
      getKey={(book) => book.value}
      label={label}
      emptyMessage="کتابی موجود نیست"
      className={className}
      error={error}
      onRetry={loadBookSelectData}
      errorMessage="خطا در بارگذاری فهرست کتاب‌ها"
    />
  );
};

export default BookSelect;
