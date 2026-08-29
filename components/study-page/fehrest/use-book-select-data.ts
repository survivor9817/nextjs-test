// useBookSelectData.ts
import { useQuery } from "@tanstack/react-query";
import { useBookContext } from "@/components/study-page/book/book-provider";
import { fetchBookSelectOptions } from "@/services/client/fetchBookSelectOptions";
import { QuizFilterOption } from "../quiz/use-filters";

export const useBookSelectData = () => {
  const {
    data: BookSelectData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBookSelectOptions,
  });

  return { BookSelectData, isLoading, error, loadBookSelectData: refetch };
};
