import { getUiReactionObjectForQuiz, UiReaction } from "@/data/questionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchQuestionReactions = async (
  quizId: string,
  userId: string,
  questionId: string,
): Promise<UiReaction> => {
  return fakeFetch(() => getUiReactionObjectForQuiz(questionId, quizId, userId));
};
