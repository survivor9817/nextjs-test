export type UiReactionId = "isCorrect" | "isIncorrect" | "isLike" | "isStar" | "isReport";

export type UiReaction = {
  isCorrect: boolean;
  isIncorrect: boolean;
  isLike: boolean;
  isStar: boolean;
  isReport: boolean;
};

export type ReactionBtnType = {
  id: UiReactionId;
  isOn: boolean;
  icon: string;
  color: string;
};

export const reactionBtnData: ReactionBtnType[] = [
  {
    id: "isCorrect",
    isOn: false,
    icon: "check_circle",
    color: "text-[#4caf50]",
  },
  {
    id: "isIncorrect",
    isOn: false,
    icon: "cancel",
    color: "text-[#f44336]",
  },
  {
    id: "isLike",
    isOn: false,
    icon: "favorite",
    color: "text-[#ff69b4]",
  },
  {
    id: "isStar",
    isOn: false,
    icon: "stars",
    color: "text-[#ffd700]",
  },
  {
    id: "isReport",
    isOn: false,
    icon: "error",
    color: "text-[#ff8c00]",
  },
];

// reactions meta
export type ReactionMsgType = {
  id: UiReactionId;
  isOn: boolean;
  label: string;
  icon: string;
  color: string;
};

export const reactionMsgData: ReactionMsgType[] = [
  {
    id: "isCorrect",
    isOn: false,
    label: "درست گفتم!",
    icon: "check_circle",
    color: "bg-[#4caf50] text-white",
  },
  {
    id: "isIncorrect",
    isOn: false,
    label: "اشتباه گفتم!",
    icon: "cancel",
    color: "bg-[#f44336] text-white",
  },
  {
    id: "isLike",
    isOn: false,
    label: "سؤال قشنگیه!",
    icon: "favorite",
    color: "bg-[#ff69b4] text-white",
  },
  {
    id: "isStar",
    isOn: false,
    label: "سؤال مهمیه!",
    icon: "stars",
    color: "bg-[#ffd700] text-black",
  },
  {
    id: "isReport",
    isOn: false,
    label: "ایراد داره!",
    icon: "error",
    color: "bg-[#ff8c00] text-white",
  },
];
