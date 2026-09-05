// hooks/useResultsTableData.ts
import { useQuery } from "@tanstack/react-query";
import { fetchResultsByQuizId } from "@/services/client/fetchResultsByQuizId";
import { type QuizResults } from "@/data/questionsData";

export const useResultsTableData = (quizId: string) => {
  const {
    data: results,
    error,
    isLoading,
    refetch,
  } = useQuery<QuizResults>({
    queryKey: ["quiz-results", quizId],
    queryFn: () => fetchResultsByQuizId(quizId),
    enabled: Boolean(quizId),
    staleTime: 1000 * 60 * 10,
  });

  return {
    results,
    error,
    isLoading,
    loadQuizResults: refetch,
  };
};
