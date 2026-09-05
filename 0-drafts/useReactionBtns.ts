import { useState } from "react";
import type { UiReactionId, UiReaction } from "@/data/reactionData";
import { reactionBtnData } from "@/data/reactionData";

export const useReactionBtns = () => {
  const [btnsMeta, setBtnsMeta] = useState(reactionBtnData);

  const setBtnOnClick = (clickedBtnId: UiReactionId, newState: boolean) =>
    setBtnsMeta((prev) =>
      prev.map((btn) => {
        if (btn.id === clickedBtnId) return { ...btn, isOn: newState };
        const clickedOnCorrect = btn.id === "isIncorrect" && clickedBtnId === "isCorrect";
        const clickedOnIncorrect = btn.id === "isCorrect" && clickedBtnId === "isIncorrect";
        if (clickedOnCorrect || clickedOnIncorrect) return { ...btn, isOn: false };
        return btn;
      }),
    );

  const turnOffAllBtns = () => setBtnsMeta((prev) => prev.map((btn) => ({ ...btn, isOn: false })));

  const applyReactionsOnUI = (
    state: UiReaction = {
      isCorrect: false,
      isIncorrect: false,
      isLike: false,
      isStar: false,
      isReport: false,
    },
  ) => {
    setBtnsMeta((prev) => prev.map((btn) => ({ ...btn, isOn: state[btn.id] })));
  };

  return {
    btnsMeta,
    setBtnOnClick,
    turnOffAllBtns,
    applyReactionsOnUI,
  };
};
