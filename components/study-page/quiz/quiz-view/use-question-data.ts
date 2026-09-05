import { useQuery } from "@tanstack/react-query";
import { fetchQuestionByIdForQuiz } from "@/services/client/fetchQuestionById";
import { QuestionType } from "@/data/questionsData";

export const useQuestionData = (questionId: string, quizId: string) => {
  const { data, isLoading, error, refetch } = useQuery<QuestionType>({
    queryKey: ["question", quizId, questionId],
    queryFn: () => fetchQuestionByIdForQuiz(questionId, quizId),
    enabled: !!questionId && !!quizId,
  });

  return {
    question: data,
    questionLoading: isLoading,
    questionError: error,
    loadQuestion: refetch,
  };
};
