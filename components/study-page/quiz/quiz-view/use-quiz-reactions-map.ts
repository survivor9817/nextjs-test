import { useQuery } from "@tanstack/react-query";
import { fetchQuizReactions } from "@/services/client/fetchQuizReactions";
import type { UiReaction } from "@/data/questionsData";

const EMPTY_MAP: Record<string, UiReaction> = {}; // رفرنس ثابت

export const useQuizReactionsMap = (quizId: string, userId: string) => {
  const { data } = useQuery({
    queryKey: ["quiz-reactions", quizId, userId],
    queryFn: () => fetchQuizReactions(quizId, userId),
    enabled: !!quizId && !!userId,
  });
  return data ?? EMPTY_MAP;
};
