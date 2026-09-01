// useQuestionNavigation.ts
import { isInRange } from "@/lib/isInRange";
import { useState } from "react";

export const useQuestionNavigation = (minIndex: number, maxIndex: number, initialIndex: number) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex);

  const lastQuestionIndex = maxIndex > minIndex ? maxIndex - 1 : minIndex;
  const isOnFirstQuestion = currentQuestionIndex === minIndex;
  const isOnLastQuestion = currentQuestionIndex === lastQuestionIndex;

  const isIndexInRange = (index: number) => {
    return isInRange(index, minIndex, maxIndex);
  };

  const goToQuestion = (index: number) => {
    if (!maxIndex) return;
    if (isIndexInRange(index)) {
      setCurrentQuestionIndex(index);
    }
  };

  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((prev) => {
      if (prev === minIndex) return prev;
      return isInRange(prev - 1, minIndex, maxIndex) ? prev - 1 : prev;
    });
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => {
      if (prev === lastQuestionIndex) return prev;
      return isInRange(prev + 1, minIndex, maxIndex) ? prev + 1 : prev;
    });
  };

  const resetQuestionIndex = () => {
    setCurrentQuestionIndex(minIndex);
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

// // useQuestionNavigation.ts
// import { isInRange } from "@/lib/isInRange";
// import { useState } from "react";

// export const useQuestionNavigation = (initialIndex: number, maxIndex: number) => {
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);

//   const lastIndex = maxIndex > 0 ? maxIndex - 1 : 0;
//   const isOnFirst = currentIndex === 0;
//   const isOnLast = currentIndex === lastIndex;

//   const isIndexInRange = (index: number) => {
//     return isInRange(index, 0, maxIndex);
//   };

//   const goTo = (index: number) => {
//     if (!maxIndex) return;
//     if (isIndexInRange(index)) {
//       setCurrentIndex(index);
//     }
//   };

//   const goToPrev = () => {
//     if (isOnFirst) return;
//     goTo(currentIndex - 1);
//   };

//   const goToNext = () => {
//     if (isOnLast) return;
//     goTo(currentIndex + 1);
//   };

//   const resetIndex = () => {
//     setCurrentIndex(0);
//   };

//   return {
//     currentIndex,
//     lastIndex,
//     isOnFirst,
//     isOnLast,
//     goTo,
//     goToPrev,
//     goToNext,
//     resetIndex,
//   };
// };

// const goToPrevQuestion = () => {
//   if (isOnFirstQuestion) return;
//   goToQuestion(currentQuestionIndex - 1);
// };

// const goToNextQuestion = () => {
//   if (isOnLastQuestion) return;
//   goToQuestion(currentQuestionIndex + 1);
// };
