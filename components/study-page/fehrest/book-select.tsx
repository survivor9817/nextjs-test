"use client";

import { useQuery } from "@tanstack/react-query";
import { useBookContext } from "@/components/study-page/book/book-provider";
import { fetchBookSelectOptions } from "@/services/client/fetchBookSelectOptions";
import FloatingCombobox from "./floating-combobox";

type BookSelectProps = {
  className?: string;
  label?: string;
};

const BookSelect = ({ className, label = "فهرست کتاب" }: BookSelectProps) => {
  const { currentBookId, changeBook } = useBookContext();

  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBookSelectOptions,
  });

  const selectedBook = books.find((b) => b.value === currentBookId) ?? null;

  return (
    <FloatingCombobox
      items={books}
      value={selectedBook}
      onValueChange={(book) => book && changeBook(book.value)}
      getLabel={(book) => book.label}
      getKey={(book) => book.value}
      label={label}
      emptyMessage="کتابی موجود نیست"
      className={className}
    />
  );
};

export default BookSelect;
