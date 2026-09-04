// components/quiz-review-modal.tsx
"use client";

import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import QuizResultsTable from "./quiz-results-table";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  startQuizLoading: boolean;
  reviewQuiz: (quizId: string) => void | Promise<unknown>;
};

const QuizReviewModal = ({ isOpen, onClose, quizId, reviewQuiz, startQuizLoading }: Props) => {
  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="نتیجه تمرین قبلی"
      description="گزارش عملکرد و درصد پاسخ‌های شما در این آزمون"
      className="sm:max-w-[440px]"
    >
      <div className="flex flex-col gap-4 pt-1">
        <QuizResultsTable quizId={quizId} />

        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="flex-1 rounded-full h-11"
            disabled={startQuizLoading}
            onClick={() => reviewQuiz(quizId)}
          >
            {startQuizLoading ? <Spinner className="w-5 h-5" /> : "مرور دوباره"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="flex-1 rounded-full h-11"
            onClick={onClose}
          >
            بستن
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default QuizReviewModal;
