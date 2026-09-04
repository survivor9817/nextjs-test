// services/quizService.ts
import { completeQuizSessionInDB, QuizSession } from "@/data/quizSessionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const terminateQuizSession = async (quizId: string): Promise<QuizSession> => {
  const closedSession = await fakeFetch(() => completeQuizSessionInDB(quizId));

  if (!closedSession) {
    throw new Error(`Session with ID ${quizId} not found`);
  }

  return closedSession;
};
