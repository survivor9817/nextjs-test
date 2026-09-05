import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import Answer from "./answer";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  answer: string | TrustedHTML;
};

const CollapsibleAnswer = ({ open, onOpenChange, answer }: Props) => {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <CollapsibleContent
        className={cn(
          "flex flex-col gap-2 overflow-hidden transition-all duration-300",
          "h-(--collapsible-panel-height) data-starting-style:h-0 data-ending-style:h-0",
          "opacity-100 data-starting-style:opacity-0 data-ending-style:opacity-0",

          "border-2 rounded-[16px_6px_28px_28px] mb-4 leading-[1.6] text-justify overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out pb-12 min-h-32.5 relative",
        )}
        keepMounted
      >
        <Answer answer={answer} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleAnswer;
