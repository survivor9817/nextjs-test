import { getActiveQuizByUserId, QuizSession } from "@/data/quizSessionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchActiveQuizByUserId = async (
  userId: string,
  bookId: string,
): Promise<QuizSession | null> => {
  const activeQuiz = await fakeFetch(() => getActiveQuizByUserId(userId, bookId));
  return activeQuiz ?? null;
};
