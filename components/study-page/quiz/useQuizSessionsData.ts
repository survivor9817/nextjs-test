// hooks/useQuizSessionsData.ts
import { useQuery } from "@tanstack/react-query";
import { useBookContext } from "../book/book-provider";
import { fetchQuizSessions } from "@/services/client/fetchQuizSessions";

const USER_ID = "123";

export const useQuizSessionsData = () => {
  const { currentBookId } = useBookContext();
  const queryKey = ["user-quizzes", USER_ID, currentBookId];

  const {
    data: quizSessions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => fetchQuizSessions(USER_ID, currentBookId),
    enabled: Boolean(USER_ID && currentBookId),
  });

  return {
    quizSessions,
    isLoading,
    error,
    loadQuizSessions: refetch,
  };
};
