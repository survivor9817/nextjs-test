import IconBtn from "@/components/ui/icon-btn";

type Props = {
  color: string;
  icon: string;
  onClick?: () => void;
  isOn: boolean;
};

const QuestionReactionBtn = ({ color, icon, onClick, isOn }: Props) => {
  const cls = isOn ? `${color} [font-variation-settings:'FILL'_1]` : ``;
  return (
    <IconBtn
      icon={<span className={`msr text-5xl font-normal ${cls}`}>{icon}</span>}
      // className={cls}
      onClick={onClick}
    />
  );
};

export default QuestionReactionBtn;
