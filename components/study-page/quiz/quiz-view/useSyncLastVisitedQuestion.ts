// hooks/useSyncLastVisitedQuestion.ts
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLastVisitedQuestion } from "@/services/client/updateLastVisitedQuestion";
import { QuizSession } from "@/data/quizSessionsData";

export const useSyncLastVisitedQuestion = (
  quizId: string,
  currentQuestionId: string,
  userId = "123",
  bookId = "706",
) => {
  const queryClient = useQueryClient();

  const syncMutation = useMutation({
    mutationFn: (targetQuestionId: string) => updateLastVisitedQuestion(quizId, targetQuestionId),
    onSuccess: (updatedSession) => {
      // به‌روزرسانی مستقیم کش سشن بدون نیاز به ری‌فچ اضافی
      queryClient.setQueryData<QuizSession | null>(
        ["active-quiz-session", userId, bookId],
        (prev) =>
          prev ? { ...prev, lastVisitedQuestion: updatedSession.lastVisitedQuestion } : prev,
      );
    },
  });

  useEffect(() => {
    if (!currentQuestionId || !quizId) return;

    const timerId = setTimeout(() => {
      syncMutation.mutate(currentQuestionId);
    }, 600);

    return () => clearTimeout(timerId);
  }, [currentQuestionId, quizId]);
};
