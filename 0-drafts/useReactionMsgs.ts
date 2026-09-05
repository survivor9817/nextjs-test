import { useState, useRef, useEffect } from "react";
import type { UiReactionId } from "@/data/reactionData";
import { reactionMsgData } from "@/data/reactionData";
import { useTimeoutFn } from "@/hooks/use-timeout-fn";

export const useReactionMsgs = () => {
  const [visibleMsg, setVisibleMsg] = useState<UiReactionId | null>(null);

  // hide msg
  const { set: setMsgTimeout } = useTimeoutFn(() => setVisibleMsg(null), 1500);

  const setMsg = (reactionId: UiReactionId) => {
    setVisibleMsg(reactionId);
    setMsgTimeout();
  };

  const setMsgOnClick = (clickedBtn: UiReactionId, isClickedBtnOn: boolean) => {
    const isPreviousBtn = visibleMsg === clickedBtn;
    if (isPreviousBtn) return setVisibleMsg(null);
    if (isClickedBtnOn) return;
    setMsg(clickedBtn);
  };

  const msgsMeta = reactionMsgData.map((btn) => ({
    ...btn,
    isOn: visibleMsg === btn.id,
  }));

  return {
    msgsMeta,
    setMsgOnClick,
    setVisibleMsg,
  };
};

// export const useReactionMsgs = () => {
//   const [visibleMsg, setVisibleMsg] = useState<UiReactionId | null>(null);

//   const msgTimerRef = useRef<number | null>(null);
//   const clearPrevMsgTimeout = () => {
//     if (msgTimerRef.current) {
//       clearTimeout(msgTimerRef.current);
//       msgTimerRef.current = null;
//     }
//   };

//   useEffect(() => {
//     return () => clearPrevMsgTimeout();
//   }, []);

//   const setMsg = (reactionId: UiReactionId) => {
//     clearPrevMsgTimeout();
//     setVisibleMsg(reactionId);
//     msgTimerRef.current = setTimeout(() => {
//       setVisibleMsg(null);
//     }, 1500);
//   };

//   const setMsgOnClick = (clickedBtn: UiReactionId, isClickedBtnOn: boolean) => {
//     const isPreviousBtn = visibleMsg === clickedBtn;
//     if (isPreviousBtn) return setVisibleMsg(null);
//     if (isClickedBtnOn) return;
//     setMsg(clickedBtn);
//   };

//   const msgsMeta = reactionMsgData.map((btn) => ({
//     ...btn,
//     isOn: visibleMsg === btn.id,
//   }));

//   return {
//     msgsMeta,
//     setMsgOnClick,
//   };
// };
