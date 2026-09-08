import { useMemo } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "@/services/client/fetchBook";
import { BookOption } from "@/data/booksData";

export const useBookState = (defaultBookId = "706") => {
  const [currentBookId, setCurrentBookId] = useQueryState(
    "book",
    parseAsString.withDefault(defaultBookId),
  );

  const { data: currentBookInfo, isLoading: isBookInfoLoading } = useQuery({
    queryKey: ["bookInfo", currentBookId],
    queryFn: () => fetchBook(currentBookId),
  });

  const currentBookSelectOption: BookOption | null = useMemo(() => {
    if (!currentBookInfo) return null;
    return { value: currentBookInfo.value, label: currentBookInfo.label };
  }, [currentBookInfo]);

  const currentBookLastPage = currentBookInfo?.lastPage || 2;

  return {
    currentBookId,
    setCurrentBookId,
    currentBookInfo,
    currentBookSelectOption,
    currentBookLastPage,
    isBookInfoLoading,
  };
};
