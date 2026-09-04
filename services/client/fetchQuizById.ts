import { getQuizById } from "@/data/quizSessionsData";
import { fakeFetch } from "@/lib/fakeFetch";

export const fetchQuizById = async (quizId: string) => {
  const quiz = await fakeFetch(() => getQuizById(quizId));

  if (!quiz) {
    throw new Error(`Quiz not found: ${quizId}`);
  }

  return quiz;
};
