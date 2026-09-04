// useQuizData.ts

import { QuizSession } from "@/data/quizSessionsData";
import { fetchQuizById } from "@/services/client/fetchQuizById";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useExistingQuizData = (quizId: string | null) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery<QuizSession>({
    queryKey: ["existing-quiz", quizId],
    queryFn: () => fetchQuizById(quizId!),
    enabled: false,
  });

  const clearQuiz = () => {
    queryClient.removeQueries({
      queryKey: ["existing-quiz", quizId],
    });
  };

  return {
    quiz: data,
    quizLoading: isLoading,
    quizError: error,
    loadExistingQuiz: refetch,
    clearQuiz,
  };
};
