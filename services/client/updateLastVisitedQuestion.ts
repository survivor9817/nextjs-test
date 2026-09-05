// services/client/updateLastVisitedQuestion.ts
import { QuizSession, updateQuizLastVisitedQuestionInDB } from "@/data/quizSessionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const updateLastVisitedQuestion = async (
  quizId: string,
  questionId: string,
): Promise<QuizSession> => {
  const updated = await fakeFetch(() => updateQuizLastVisitedQuestionInDB(quizId, questionId));

  if (!updated) {
    throw new Error(`سشن با شناسه ${quizId} پیدا نشد.`);
  }

  return updated;
};
