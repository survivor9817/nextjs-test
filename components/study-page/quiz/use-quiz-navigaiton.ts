// useQuestionNavigation.ts
import { isInRange } from "@/lib/isInRange";
import { useState } from "react";

export const useQuestionNavigation = (totalQuestions: number) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const lastQuestionIndex = totalQuestions > 0 ? totalQuestions - 1 : 0;
  const isOnFirstQuestion = currentQuestionIndex === 0;
  const isOnLastQuestion = currentQuestionIndex === lastQuestionIndex;

  const isIndexInRange = (index: number) => {
    return isInRange(index, 0, totalQuestions);
  };

  const goToQuestion = (index: number) => {
    if (!totalQuestions) return;
    if (isIndexInRange(index)) {
      setCurrentQuestionIndex(index);
    }
  };

  const goToPrevQuestion = () => {
    if (isOnFirstQuestion) return;
    goToQuestion(currentQuestionIndex - 1);
  };

  const goToNextQuestion = () => {
    if (isOnLastQuestion) return;
    goToQuestion(currentQuestionIndex + 1);
  };

  const resetQuestionIndex = () => {
    setCurrentQuestionIndex(0);
  };

  return {
    currentQuestionIndex,
    lastQuestionIndex,
    isOnFirstQuestion,
    isOnLastQuestion,
    goToQuestion,
    goToPrevQuestion,
    goToNextQuestion,
    resetQuestionIndex,
  };
};
