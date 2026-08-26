"use client";
import { getBookById } from "@/data/booksData";
import { useQuery } from "@tanstack/react-query";

export const bookQueryKey = (bookId: string) => ["book", bookId] as const;

export function useBookQuery(bookId: string | undefined) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: bookQueryKey(bookId ?? ""),
    queryFn: () => getBookById(bookId!),
    enabled: Boolean(bookId),
  });

  return { bookInfo: data, isLoading, isError, refetch };
}
