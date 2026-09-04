// useQuizData.ts

import { QuizSession } from "@/data/quizSessionsData";
import { fetchNewQuiz } from "@/services/client/fetchNewQuiz";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useNewQuizData = (userId: string, bookId: string, filters: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery<QuizSession>({
    queryKey: ["new-quiz", filters],
    queryFn: () => fetchNewQuiz(userId, bookId, filters),
    enabled: false,
  });

  const clearQuiz = () => {
    queryClient.removeQueries({
      queryKey: ["existing-quiz", filters],
    });
  };

  return {
    quiz: data,
    quizLoading: isLoading,
    quizError: error,
    loadNewQuiz: refetch,
    clearQuiz,
  };
};
