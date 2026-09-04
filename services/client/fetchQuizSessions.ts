// services/client/fetchQuizSessions.ts
import { getQuizes, QuizSession } from "@/data/quizSessionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchQuizSessions = async (userId: string, bookId: string): Promise<QuizSession[]> => {
  const sessions = await fakeFetch(() => getQuizes(userId, bookId));
  return sessions ?? [];
};
