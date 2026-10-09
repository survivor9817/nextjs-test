import { getUiReactionsMapForQuiz, UiReaction } from "@/data/questionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchQuizReactions = (
  quizId: string,
  userId: string,
): Promise<Record<string, UiReaction>> => fakeFetch(() => getUiReactionsMapForQuiz(quizId, userId));
