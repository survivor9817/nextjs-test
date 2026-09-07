"use client";

import { useBookContext } from "@/components/study-page/book/book-provider";
import AsyncFloatingCombobox from "../../ui/async-floating-combobox";
import { useBookSelectData } from "./use-book-select-data";

const BookSelect = () => {
  const { currentBookSelectOption, changeBook } = useBookContext();
  const { BookSelectData, error, loadBookSelectData } = useBookSelectData();

  return (
    <AsyncFloatingCombobox
      items={BookSelectData}
      value={currentBookSelectOption}
      onValueChange={(book) => book && changeBook(book.value)}
      getLabel={(book) => book.label}
      getKey={(book) => book.value}
      label={"فهرست کتاب"}
      emptyMessage="کتابی موجود نیست"
      error={error}
      onRetry={loadBookSelectData}
      errorMessage="خطا در بارگذاری فهرست کتاب‌ها"
    />
  );
};

export default BookSelect;
