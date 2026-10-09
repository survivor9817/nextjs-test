import { useQuery } from "@tanstack/react-query";
import { fetchQuestionReactions } from "@/services/client/fetchQuestionReactions";
import type { UiReaction } from "@/data/questionsData";

export const useQuestionReactionsData = (quizId: string, userId: string, questionId: string) => {
  const { data, isLoading, error, refetch } = useQuery<UiReaction>({
    queryKey: ["question-reactions", quizId, userId, questionId],
    queryFn: () => fetchQuestionReactions(quizId, userId, questionId),
    enabled: !!quizId && !!userId && !!questionId,
  });

  return {
    reactions: data,
    reactionsLoading: isLoading,
    reactionsError: error,
    loadReactions: refetch,
  };
};
