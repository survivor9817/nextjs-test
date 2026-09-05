// Quiz.tsx
import { useFilters } from "./use-filters";
import { useQuizSession } from "./use-quiz-session";
import QuizView from "./quiz-view/quiz-view";
import QuizReviews from "./quiz-reviews/quiz-reviews";
import FilterView from "./filter-view/filter-view";
import { useBookContext } from "../book/book-provider";

const USER_ID = "123";

const Quiz = () => {
  const { quizFilters, onChangeFilterSelect, clearFilters } = useFilters();
  const { currentBookId } = useBookContext();
  const {
    activeSession,
    isQuizStarted,
    isLoading,
    isCheckingActiveSession,
    isSubmitting,
    startSession,
    resumeSession,
    submitQuiz,
    terminateSession,
  } = useQuizSession(USER_ID, currentBookId);

  // اتمام نهایی تمرین: تخلیه کش سشن و ریست فیلترها
  const handleTerminateAndReset = () => {
    terminateSession();
    clearFilters();
  };

  // ۱. بررسی اولیه وضعیت سشن
  if (isCheckingActiveSession) {
    return (
      <div className="flex justify-center items-center min-h-80">
        <span className="text-gray-500 text-sm">در حال بررسی سشن فعال...</span>
      </div>
    );
  }

  // ۲. نمایش فرم فیلترها و سوابق در صورت عدم وجود سشن فعال
  if (!isQuizStarted || !activeSession) {
    return (
      <div className="flex flex-col justify-center items-center gap-18 p-2">
        <FilterView
          quizFilters={quizFilters}
          onChangeFilterSelect={onChangeFilterSelect}
          startQuizLoading={isLoading}
          startQuiz={() => startSession(JSON.stringify(quizFilters))}
        />

        <QuizReviews reviewQuiz={(quizId) => resumeSession(quizId)} startQuizLoading={isLoading} />
      </div>
    );
  }

  // ۳. نمایش پخش‌کننده کوئیز
  return (
    <QuizView
      key={activeSession.quizId}
      quiz={activeSession}
      questionIds={activeSession.questionIds}
      isSubmitting={isSubmitting}
      onSubmitQuiz={submitQuiz}
      onTerminateQuiz={handleTerminateAndReset}
    />
  );
};

export default Quiz;
