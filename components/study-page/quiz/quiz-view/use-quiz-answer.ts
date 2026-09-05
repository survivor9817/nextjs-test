import useToggle from "@/hooks/use-toggle";
import { useEffect, useState } from "react";

export const useQuizAnswer = (descriptiveAnswer: string, currentQuestionIndex: number) => {
  const [answerContent, setAnswerContent] = useState(descriptiveAnswer);
  const [isAnswerVisible, toggleAnswer, , hideAnswer] = useToggle();

  // const { set: setAnswer  } = useTimeoutFn(() => {
  //   setAnswerContent(descriptiveAnswer);
  // }, 700);

  useEffect(() => {
    hideAnswer();
    const timerId = setTimeout(() => setAnswerContent(descriptiveAnswer), 700);
    return () => clearTimeout(timerId);
  }, [currentQuestionIndex, descriptiveAnswer]);

  return { answerContent, isAnswerVisible, toggleAnswer };
};
