import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  color: string;
  isOn: boolean;
};

const QuestionReactionMsg = ({ icon, label, color, isOn }: Props) => {
  const popInClass = isOn ? "translate-x-0" : "-translate-x-[105%]";

  return (
    <div
      id={`id-${color}`}
      className={`absolute left-2 bottom-2 flex items-center justify-center w-41.25 p-2 
        rounded-[16px_4px_16px_4px] text-center transition-transform duration-300 ease-in-out 
        ${color} ${popInClass}`}
    >
      <span className="msr text-2xl font-normal">{icon}</span>
      <span className="mr-2"> {label} </span>
    </div>
  );
};

export default QuestionReactionMsg;
