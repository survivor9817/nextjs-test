import { useEffect } from "react";
import { useReactionBtns } from "./useReactionBtns";
import { useReactionMsgs } from "./useReactionMsgs";
import { useTimeoutFn } from "@/hooks/use-timeout-fn";
import { UiReactionId, UiReaction } from "@/data/reactionData";
import { postQuizReaction } from "@/services/client/postQuizReaction";

export const useQuizReactions = (
  quizId: string,
  currentQuestionID: string,
  userId: string,
  uiReaction: UiReaction | undefined,
) => {
  const { btnsMeta, setBtnOnClick, turnOffAllBtns, applyReactionsOnUI } = useReactionBtns();
  const { msgsMeta, setMsgOnClick } = useReactionMsgs();

  const { set: onQuestionChange, clear: clearReactionTimeout } = useTimeoutFn(() => {
    turnOffAllBtns();
    applyReactionsOnUI(uiReaction);
  }, 700);

  useEffect(() => {
    onQuestionChange();
    return clearReactionTimeout;
  }, [currentQuestionID]);

  const onClickOnReactionBtn = (reactionId: UiReactionId) => {
    // optimistic save
    postQuizReaction(quizId, userId, currentQuestionID, reactionId);

    const isClickedBtnOn = btnsMeta.find((item) => item.id === reactionId)?.isOn;
    setBtnOnClick(reactionId, !isClickedBtnOn);
    setMsgOnClick(reactionId, !!isClickedBtnOn);
  };

  return {
    btnsMeta,
    msgsMeta,
    onClickOnReactionBtn,
  };
};
