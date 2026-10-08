"use client";
import { ArrowRight, ArrowLeft, Power } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import { NumberWheelPickerResponsive } from "@/components/ui/number-wheel-picker-responsive";
import StopWatchDrawer from "./stop-watch-drawer";

type Props = {
  currentQuestion: number; // شماره سوال فعلی (۱-مبنا)
  totalQuestions: number;
  isQuizCompleted: boolean;
  inputError?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPowerClick: () => void;
  onGoToQuestion: (questionNumber: number) => void;
};

const QuizActions = ({
  currentQuestion,
  totalQuestions,
  isQuizCompleted,
  inputError = false,
  onPrev,
  onNext,
  onPowerClick,
  onGoToQuestion,
}: Props) => {
  const powerLabel = isQuizCompleted ? "مشاهده کارنامه" : "پایان آزمون";
  const isOnFirst = currentQuestion <= 1;
  const isOnLast = currentQuestion >= totalQuestions;

  return (
    <div className="flex items-center p-1 w-fit max-w-fit gap-1 sm:max-w-fit sm:w-fit border-2 rounded-[48px] bg-white border-[#bcbcbc]">
      {/* کرونومتر */}
      <StopWatchDrawer />

      {/* سوال قبلی */}
      <IconButton
        onClick={onPrev}
        disabled={isOnFirst}
        title="سوال قبلی"
        aria-label="سوال قبلی"
        icon={<ArrowRight strokeWidth={3} />}
      />

      {/* انتخاب شماره سوال */}
      <NumberWheelPickerResponsive
        value={currentQuestion}
        min={1}
        max={Math.max(totalQuestions, 1)}
        title="انتخاب شماره سوال"
        error={inputError}
        onValueChange={onGoToQuestion}
      />

      {/* سوال بعدی */}
      <IconButton
        onClick={onNext}
        disabled={isOnLast}
        title="سوال بعدی"
        aria-label="سوال بعدی"
        icon={<ArrowLeft strokeWidth={3} />}
      />

      {/* پایان آزمون / مشاهده کارنامه */}
      <IconButton
        onClick={onPowerClick}
        title={powerLabel}
        aria-label={powerLabel}
        className="text-red-700 hover:text-red-700"
        icon={<Power className="size-5" strokeWidth={3} />}
      />
    </div>
  );
};

export default QuizActions;
