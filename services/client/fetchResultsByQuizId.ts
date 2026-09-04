// services/client/fetchResultsByQuizId.ts
import { getResultsByQuizId, type QuizResults } from "@/data/questionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchResultsByQuizId = async (quizId: string): Promise<QuizResults> => {
  const results = await fakeFetch(() => getResultsByQuizId(quizId));

  if (!results) {
    throw new Error(`کارنامه‌ای برای کوئیز با شناسه ${quizId} پیدا نشد.`);
  }

  return results;
};
