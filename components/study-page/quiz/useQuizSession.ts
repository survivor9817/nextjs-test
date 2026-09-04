// hooks/useQuizSession.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchActiveQuizByUserId } from "@/services/client/fetchActiveQuizByUserId";
import { fetchNewQuiz } from "@/services/client/fetchNewQuiz";
import { fetchQuizById } from "@/services/client/fetchQuizById";
import { terminateQuizSession } from "@/services/client/terminateQuizSession";

export const useQuizSession = (userId: string, bookId: string) => {
  const queryClient = useQueryClient();
  const activeQuizKey = ["active-quiz-session", userId, bookId];
  const userQuizzesKey = ["user-quizzes", userId, bookId];

  // ۱. بررسی سشن فعال در لود صفحه
  const {
    data: activeSession = null,
    isLoading: isCheckingActiveSession,
    error: activeSessionError,
  } = useQuery({
    queryKey: activeQuizKey,
    queryFn: () => fetchActiveQuizByUserId(userId, bookId),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(userId && bookId), // if user is guest then its unnecessary
  });

  // ۲. ساخت سشن جدید
  const startQuizMutation = useMutation({
    mutationFn: (filters: string) => fetchNewQuiz(userId, bookId, filters),
    onSuccess: (newSession) => {
      queryClient.setQueryData(activeQuizKey, newSession);
    },
  });

  // ۳. بازخوانی سشن قبلی با quizId
  const resumeQuizMutation = useMutation({
    mutationFn: (quizId: string) => fetchQuizById(quizId),
    onSuccess: (session) => {
      queryClient.setQueryData(activeQuizKey, session);
    },
  });

  // ۴. سابمیت و ثبت اتمام آزمون در سرور (بدون نال کردن کش)
  const submitQuizMutation = useMutation({
    mutationFn: (quizId: string) => terminateQuizSession(quizId),
    onSuccess: (completedSession) => {
      // کش را با سشنِ تمام‌شده (که endTime معتبر دارد) جایگزین می‌کنیم
      queryClient.setQueryData(activeQuizKey, completedSession);
      // لیست سوابق در پس‌زمینه آپدیت می‌شود
      queryClient.invalidateQueries({ queryKey: userQuizzesKey });
    },
  });

  // ۵. خروج قطعی از محیط آزمون و بازگشت به فیلترها
  const terminateSession = () => {
    queryClient.setQueryData(activeQuizKey, null);
  };

  return {
    activeSession,
    isQuizStarted: Boolean(activeSession),
    isQuizCompleted: Boolean(activeSession?.endTime),
    isLoading:
      isCheckingActiveSession || startQuizMutation.isPending || resumeQuizMutation.isPending,
    isSubmitting: submitQuizMutation.isPending,
    error: activeSessionError || startQuizMutation.error || resumeQuizMutation.error,
    // startSession: (filters: string) => startQuizMutation.mutate(filters),
    startSession: (filters: string) => startQuizMutation.mutateAsync(filters),
    resumeSession: (quizId: string) => resumeQuizMutation.mutate(quizId),
    submitQuiz: async () => {
      if (!activeSession) return;
      return submitQuizMutation.mutateAsync(activeSession.quizId);
    },
    terminateSession,
  };
};
