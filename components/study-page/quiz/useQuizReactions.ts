// hooks/useQuizReactions.ts
import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactionBtns } from "./useReactionBtns";
import { useReactionMsgs } from "./useReactionMsgs";
import { UiReactionId, UiReaction } from "@/data/reactionData";
import { postQuizReaction } from "@/services/client/postQuizReaction";

type ReactionMutationVariables = {
  targetQuestionId: string;
  reactionId: UiReactionId;
};

export const useQuizReactions = (
  quizId: string,
  questionId: string,
  userId: string,
  userReactions: UiReaction | undefined,
) => {
  const queryClient = useQueryClient();
  const { btnsMeta, setBtnOnClick, applyReactionsOnUI } = useReactionBtns();
  const { msgsMeta, setMsgOnClick, setVisibleMsg } = useReactionMsgs();

  const isFirstMount = useRef(true);

  // اعمال دکمه‌ها پس از ترنزیشن ۴۰۰ میلی‌ثانیه‌ای هنگام تغییر سوال
  useEffect(() => {
    setVisibleMsg(null);

    if (isFirstMount.current) {
      applyReactionsOnUI(userReactions);
      isFirstMount.current = false;
      return;
    }

    const timerId = setTimeout(() => {
      applyReactionsOnUI(userReactions);
    }, 400);

    return () => clearTimeout(timerId);
  }, [questionId, userReactions]);

  // میوتیشن ایزوله بدون وابستگی به متغیرهای اسکوپ کامپوننت
  const reactionMutation = useMutation({
    mutationFn: ({ targetQuestionId, reactionId }: ReactionMutationVariables) =>
      postQuizReaction(quizId, userId, targetQuestionId, reactionId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["quiz-results", quizId] });
      // استفاده دقیق از شناسه‌ای که در زمان کلیک فرستاده شده بود
      queryClient.invalidateQueries({
        queryKey: ["question-data", variables.targetQuestionId, quizId],
      });
    },
  });

  const onClickOnReactionBtn = (reactionId: UiReactionId) => {
    const isClickedBtnOn = btnsMeta.find((item) => item.id === reactionId)?.isOn;

    setBtnOnClick(reactionId, !isClickedBtnOn);
    setMsgOnClick(reactionId, !!isClickedBtnOn);

    reactionMutation.mutate({
      targetQuestionId: questionId,
      reactionId,
    });
  };

  return {
    btnsMeta,
    msgsMeta,
    onClickOnReactionBtn,
  };
};
