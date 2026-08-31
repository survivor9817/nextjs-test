import QuestionReactionMsg from "./question-reaction-msg";

type Props = {
  msgs: {
    id: string;
    isOn: boolean;
    label: string;
    icon: string;
    color: string;
  }[];
};

const QuestionReactionMsgs = ({ msgs }: Props) => {
  return (
    <div className="absolute left-0 bottom-0 pointer-events-none">
      <div className="relative overflow-hidden w-62.5 h-30 z-2">
        {msgs.map((item) => (
          <QuestionReactionMsg
            key={item.id}
            label={item.label}
            icon={item.icon}
            color={item.color}
            isOn={item.isOn}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionReactionMsgs;
