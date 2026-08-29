import { fetchBookSelectOptions } from "@/services/client/fetchBookSelectOptions";
import { useQuery } from "@tanstack/react-query";
import { QuizFiltersType } from "./use-filters";
import { fetchQuizFilterData } from "@/services/client/fetchQuizFilterData";

export const useQuizFilterSelectData = (filterId: string, quizFilters: QuizFiltersType) => {
  const {
    data: BookSelectData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["filter-options", filterId],
    queryFn: () => fetchQuizFilterData(filterId, quizFilters),
    enabled: !!quizFilters.book, // فقط وقتی کتاب انتخاب شده، فچ کن
  });

  console.log(BookSelectData);

  return { options: BookSelectData, isLoading, error, loadOptions: refetch };
};
