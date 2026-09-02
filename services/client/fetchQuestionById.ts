import { getQuestionForQuiz, getQuestionFromDB } from "@/data/questionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchQuestionById = async (questionId: string) => {
  const question = await fakeFetch(() => getQuestionFromDB(questionId));
  if (!question) {
    throw new Error(`Question with ID "${questionId}" not found`);
  }
  return question;
};

export const fetchQuestionByIdForQuiz = async (questionId: string, quizId: string) => {
  const question = await fakeFetch(() => getQuestionForQuiz(questionId, quizId));
  if (!question) {
    throw new Error(`Question with ID "${questionId}" not found in quiz "${quizId}"`);
  }
  return question;
};
