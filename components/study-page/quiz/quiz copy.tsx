const Quiz = () => {
  const isLoggedIn = false;
  const hasUnfinishedQuiz = false;

  return (
    <>
      {/* شرط اول: اگر لاگین نیست، فیلتر ویو رو نشون بده */}
      {!isLoggedIn ? (
        <div className="flex flex-col justify-center gap-18 p-2">
          <FilterView
            quizFilters={quizFilters}
            onChangeFilterSelect={onChangeFilterSelect}
            startQuizLoading={startQuizLoading}
            startQuiz={startQuiz}
          />
        </div>
      ) : null}

      {/* شرط دوم: اگر لاگین هست و نشست تمرینی ناتمام داره، QuizView رو نشون بده */}
      {isLoggedIn && hasUnfinishedQuiz && quiz && question ? (
        <QuizView
          quiz={quiz}
          questionData={question}
          currentQuestionIndex={currentQuestionIndex}
          lastQuestionIndex={lastQuestionIndex}
          isFirstQuestion={isOnFirstQuestion}
          isLastQuestion={isOnLastQuestion}
          prevLoading={prevLoading}
          goToPrevQuestion={goToPrevQuestion}
          nextLoading={nextLoading}
          goToNextQuestion={goToNextQuestion}
          endConfirmModal={endConfirmModal}
          openEndConfirm={openEndConfirm}
          submitQuiz={submitQuiz}
          closeEndConfirm={closeEndConfirm}
          resultsModal={resultsModal}
          terminateQuiz={terminateQuiz}
          closeResultsModal={closeResultsModal}
        />
      ) : null}

      {/* شرط سوم: اگر لاگین هست ولی نشست تمرینی ناتمام نداره (اختیاری - می‌تونی بعداً اضافه کنی) */}
      {isLoggedIn && !hasUnfinishedQuiz ? (
        <div className="flex flex-col justify-center gap-18 p-2">
          <FilterView
            quizFilters={quizFilters}
            onChangeFilterSelect={onChangeFilterSelect}
            startQuizLoading={startQuizLoading}
            startQuiz={startQuiz}
          />
          <QuizReviews reviewQuiz={reviewQuiz} startQuizLoading={startQuizLoading} />
        </div>
      ) : null}
    </>
  );
};

export default Quiz;
