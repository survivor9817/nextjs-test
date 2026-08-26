// hooks/use-study-params.ts
"use client";
import { useParams } from "next/navigation";

type BookParams = {
  book: string;
  page: string;
};

export function useBookParams() {
  const params = useParams<BookParams>();
  return { bookId: params.book, page: params.page };
}
