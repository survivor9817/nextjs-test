import { reviewExistingQuiz } from "../data/quizSessionsData";

export const fetchQuestionIdsByQuizId = (quizId: string) => {
  return reviewExistingQuiz(quizId);
};
