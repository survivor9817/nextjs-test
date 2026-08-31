import IconBtn from "@/components/ui/icon-btn";

type Props = {
  color: string;
  i: string;
  onClick?: () => void;
  isOn: boolean;
};

const QuestionReactionBtn = ({ color, i, onClick, isOn }: Props) => {
  const cls = isOn ? `${color} filled` : ``;
  return <IconBtn icon={i} className={cls} onClick={onClick} />;
};

export default QuestionReactionBtn;
