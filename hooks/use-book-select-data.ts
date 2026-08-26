// hooks/use-book-query.ts
"use client";
import { getBookSelectOptions } from "@/data/booksData";
import { useQuery } from "@tanstack/react-query";

export function useBookSelectData() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["book-select-options"],
    queryFn: () => getBookSelectOptions(),
  });
  return { options: data, isLoading, error, loadOptions: refetch };
}
