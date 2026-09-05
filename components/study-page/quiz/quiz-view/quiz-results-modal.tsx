// components/quiz-results-modal.tsx
"use client";

import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import QuizResultsTable from "../quiz-reviews/quiz-results-table";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onReview: () => void;
  onTerminate: () => void;
  quizId: string;
};

const QuizResultsModal = ({ isOpen, onClose, onReview, onTerminate, quizId }: Props) => {
  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={<span className="sr-only">نتیجه تمرین</span>}
      // description="خلاصه عملکرد و درصد پاسخ‌ها"
      className="sm:max-w-[320px]"
    >
      <div className="flex flex-col gap-4 pt-1">
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold text-gray-900">خسته نباشی!</p>
          <p className="text-center text-sm leading-6 p-1 text-gray-600">
            حدود ۲۰ دقیقه‌ست که برای تمرین درس علوم وقت گذاشتی!
          </p>
        </div>

        <QuizResultsTable quizId={quizId} />

        <div className="flex items-center gap-3">
          <Button type="button" className="flex-1 rounded-full h-11" onClick={onReview}>
            مرور دوباره
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="flex-1 rounded-full h-11 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onTerminate}
          >
            اتمام تمرین
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default QuizResultsModal;
