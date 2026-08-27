import { getQuestionForQuiz, getQuestionFromDB } from "../data/questionsData";

export const fetchQuestionById = (questionId: string) => {
  return getQuestionFromDB(questionId);
};

export const fetchQuestionByIdForQuiz = (questionId: string, quizId: string) => {
  // return getQuestionFromDB(questionId);
  return getQuestionForQuiz(questionId, quizId);
};
