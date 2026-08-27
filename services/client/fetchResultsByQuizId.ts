import { getResultsByQuizId } from "../data/questionsData";

export const fetchResultsByQuizId = (quizId: string) => {
  const newQuestionIds = getResultsByQuizId(quizId);
  return newQuestionIds;
};
