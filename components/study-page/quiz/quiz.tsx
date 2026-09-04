// Quiz.tsx
import { useFilters } from "./use-filters";
import { useQuizSession } from "./useQuizSession";
import FilterView from "./filter-view";
import QuizView from "./quiz-view";

// مقادیر userId و bookId می‌توانند از props یا context/params خوانده شوند
const USER_ID = "123";
const BOOK_ID = "706";

const Quiz = () => {
  const { quizFilters, onChangeFilterSelect } = useFilters();

  const {
    activeSession,
    isQuizStarted,
    isLoading,
    isSubmitting,
    startSession,
    resumeSession,
    submitQuiz,
    terminateSession,
  } = useQuizSession(USER_ID, BOOK_ID);

  // ۱. اگر هنوز کوئیزی شروع نشده یا سشن فعال نداریم
  if (!isQuizStarted || !activeSession) {
    return (
      <div className="flex flex-col justify-center items-center gap-18 p-2">
        <FilterView
          quizFilters={quizFilters}
          onChangeFilterSelect={onChangeFilterSelect}
          startQuizLoading={isLoading}
          startQuiz={() => {
            startSession(JSON.stringify(quizFilters));
          }}
        />

        {/* لیست سوابق قبلی برای امکان مرور */}
        {/* <QuizReview
          reviewQuiz={(quizId) => resumeSession(quizId)}
          startQuizLoading={isLoading}
        /> */}
      </div>
    );
  }

  // ۲. نمایش محیط کوئیز
  return (
    <QuizView
      key={activeSession.quizId} // ریست کامل استیت فرزند با تغییر آیدی سشن
      quiz={activeSession}
      questionIds={activeSession.questionIds}
      isSubmitting={isSubmitting}
      onSubmitQuiz={submitQuiz}
      onTerminateQuiz={terminateSession}
    />
  );
};

export default Quiz;
