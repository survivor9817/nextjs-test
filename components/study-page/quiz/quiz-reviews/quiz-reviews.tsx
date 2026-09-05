// components/QuizReview.tsx

import QuizReviewsTable from "./quiz-reviews-table";

type Props = {
  startQuizLoading: boolean;
  reviewQuiz: (quizId: string) => void | Promise<unknown>;
};

const QuizReviews = ({ reviewQuiz, startQuizLoading }: Props) => {
  return (
    <div className="relative flex flex-col gap-8 border-2 border-gray-300 rounded-4xl w-full max-w-115 m-auto py-8 px-6">
      <div className="absolute -top-5 right-8 text-2xl bg-white px-2">تمرین‌های قبلی</div>
      <QuizReviewsTable reviewQuiz={reviewQuiz} startQuizLoading={startQuizLoading} />
    </div>
  );
};

export default QuizReviews;
