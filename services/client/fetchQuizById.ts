// import { getQuestionIds } from "../data/questionsData";
import { getQuizById } from "../data/quizSessionsData";

export const fetchQuizById = (quizId: string) => {
  return getQuizById(quizId);
};
