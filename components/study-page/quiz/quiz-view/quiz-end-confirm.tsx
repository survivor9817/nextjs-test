// components/quiz-end-confirm.tsx
"use client";

import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<unknown>;
  isLoading?: boolean;
};

const QuizEndConfirm = ({ isOpen, onClose, onConfirm, isLoading = false }: Props) => {
  return (
    <ResponsiveDialog
      //   type="dialog"
      showSwipeHandle={true}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) onClose();
      }}
      title="می‌خوای این جلسه تمرین رو تموم کنی؟"
      //   description="با تایید این مرحله، آزمون خاتمه یافته و کارنامه عملکرد شما ثبت می‌شود."
      className="sm:max-w-[380px]"
    >
      <div className="flex flex-col gap-6 pt-2">
        {/* <p className="text-center text-base sm:text-lg leading-relaxed text-gray-800">
          می‌خوای این جلسه تمرین رو تموم کنی؟
        </p> */}

        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="flex-1 rounded-full h-11"
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? <Spinner className="w-5 h-5" /> : "بله"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="flex-1 rounded-full h-11"
            disabled={isLoading}
            onClick={onClose}
          >
            خیر
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default QuizEndConfirm;
