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
      icon={
        <span
          className={`msr text-5xl font-normal ${cls} bg-transparent transition-transform duration-100 ease-in-out 
            rounded-full select-none tap-highlight-transparent outline-none hover:scale-[1.07] 
            active:scale-[0.95] focus:outline-none`}
        >
          {icon}
        </span>
      }
      // className={cls}
      onClick={onClick}
    />
  );
};

export default QuestionReactionBtn;
