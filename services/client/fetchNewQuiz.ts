import { startNewQuiz } from "@/data/quizSessionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchNewQuiz = async (userId: string, bookId: string, filters: string) => {
  const newQuestionIds = await fakeFetch(() => startNewQuiz(userId, bookId, filters));

  if (!newQuestionIds) {
    throw new Error(`Failed to start new quiz for user: ${userId}, book: ${bookId}`);
  }

  return newQuestionIds;
};
