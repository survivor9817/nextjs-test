import type { ReactionBtnType, UiReactionId } from "@/data/reactionData";
import QuestionReactionBtn from "./question-reaction-btn";

type Props = {
  btnsMeta: ReactionBtnType[];
  onClick: (reactionId: UiReactionId) => void;
};

const QuizReactionBtns = ({ btnsMeta, onClick }: Props) => {
  return (
    <div className="flex justify-between items-center mx-2">
      {/* dokme haaye feedback */}
      {btnsMeta.map((item) => (
        <QuestionReactionBtn
          key={item.id}
          i={item.icon}
          color={item.color}
          isOn={item.isOn}
          onClick={() => onClick(item.id)}
        />
      ))}
    </div>
  );
};

export default QuizReactionBtns;
