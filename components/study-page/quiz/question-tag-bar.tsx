import type { MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  tags: string[];
};

const QuestionTagBar = ({ tags }: Props) => {
  const onMouseLeave = (e: MouseEvent) => {
    e.currentTarget.scrollTo({ left: 0 });
  };

  const isEmpty = !tags?.length;
  const items = isEmpty ? [null] : tags;

  return (
    <div
      className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 max-w-34 hover:max-w-full",
        "bg-white rounded-full overflow-auto z-3",
        "transition-[max-width] duration-300 ease-in-out",
        "scrollbar-none [-ms-overflow-style:none]",
      )}
      onMouseLeave={onMouseLeave}
    >
      <ul className="inline-flex rounded-full flex-row gap-2 mx-2 h-12 items-center">
        {items.map((tag, i) => (
          <Badge
            key={tag ?? i}
            render={<li className="shrink-0 first:w-30" />}
            className="h-10 px-4 py-2 rounded-[48px] bg-black hover:bg-[#333] text-[16px] text-white whitespace-nowrap cursor-pointer"
          >
            {tag ?? (
              <div className="animate-pulse h-4 md:h-5 flex-1 bg-gray-300 rounded dark:bg-gray-400" />
            )}
          </Badge>
        ))}
      </ul>
    </div>
  );
};

export default QuestionTagBar;
