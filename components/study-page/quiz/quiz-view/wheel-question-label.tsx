import { reactionBtnData, type UiReaction } from "@/data/reactionData";
import { toFaDigits } from "@/lib/toFaDigits";
import { cn } from "@/lib/utils";

type Props = { number: number; reactions?: UiReaction };

const WheelQuestionLabel = ({ number, reactions }: Props) => (
  <span className="flex items-center justify-center gap-1 relative w-full h-full">
    <span>{toFaDigits(number)}</span>
    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-row-reverse gap-0.5   items-center pl-2 w-4/10">
      {reactionBtnData
        .filter((btn) => reactions?.[btn.id])
        .map((btn) => (
          <span key={btn.id} className={cn("msr text-base leading-none", btn.color)}>
            {btn.icon}
          </span>
        ))}
    </div>
  </span>
);

export default WheelQuestionLabel;
