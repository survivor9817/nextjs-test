import { getQuizes } from "../data/quizSessionsData";

export const fetchQuizSessions = (userId: string, bookId: string) => {
  return getQuizes(userId, bookId);
};
